"""Visual-polish structure checks (Timeline, de-duplication, placeholders, skeleton, footer, empty states). Needs vite preview :4180."""
import os, time
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH','/opt/pw-browsers')
from playwright.sync_api import sync_playwright
B='http://localhost:4180'
def ok(n,c,x=''): print('PASS' if c else 'FAIL', n, x, flush=True)
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={'width':1280,'height':900}); pg=ctx.new_page(); errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m: m.type=='error' and '403' not in m.text and 'ERR_NAME_NOT_RESOLVED' not in m.text and errs.append(m.text))
    # ---- Timeline page
    pg.goto(B+'/timeline'); pg.wait_for_timeout(2000)
    ok('timeline: composed journey renders (19 entries)', pg.locator('ol > li').count()==19, str(pg.locator('ol > li').count()))
    pg.get_by_role('button',name='Project',exact=False).first.click(); pg.wait_for_timeout(1000); ok('timeline: type filter -> 5 projects', pg.locator('ol > li').count()==5)
    pg.locator('ol button[aria-expanded]').first.click(); pg.wait_for_timeout(500); ok('timeline: expanded entry offers "View details"', pg.get_by_role('link',name='View details').count()==1)
    pg.get_by_role('link',name='View details').click(); pg.wait_for_timeout(1500); ok('timeline: link opens the source project dialog', '/projects?p=project-' in pg.url and pg.locator('[role=dialog]').count()==1)
    pg.keyboard.press('Escape'); pg.wait_for_timeout(700)
    pg.goto(B+'/'); pg.wait_for_timeout(1500); pg.keyboard.press('Control+k'); pg.wait_for_timeout(500); pg.keyboard.type('milestone 2'); pg.wait_for_timeout(400)
    ok('search finds timeline entries (Timeline group)', 'TIMELINE' in ' '.join(pg.evaluate("[...document.querySelectorAll('[role=dialog] [role=listbox] li > p')].map(p=>p.textContent)")).upper())
    pg.keyboard.press('Enter'); pg.wait_for_timeout(1700); ok('timeline search result deep-links to + expands entry', '/timeline' in pg.url and 'focus=' not in pg.url and pg.locator('ol button[aria-expanded=true]').count()==1)
    # ---- de-duplication
    pg.goto(B+'/achievements'); pg.wait_for_timeout(1800); titles=pg.evaluate("[...document.querySelectorAll('article h2')].map(h=>h.textContent)")
    ok('achievements: each item appears exactly once', len(titles)==7 and len(set(titles))==7, str(len(titles)))
    pg.goto(B+'/activity'); pg.wait_for_timeout(1800)
    ok('activity: no redundant pinned focus row', pg.get_by_text('Currently focused on').count()==0 and pg.locator('ul li a.card').count()==9)
    pg.goto(B+'/contact'); pg.wait_for_timeout(1800)
    ok('contact: links are one compact list (6 rows, no stacked cards)', pg.locator('section[aria-label="Links"] li').count()==6 and pg.locator('section[aria-label="Links"] li .card').count()==0)
    # ---- placeholder styling
    pg.goto(B+'/'); pg.wait_for_timeout(1800)
    st=pg.evaluate("(()=>{const e=document.querySelector('h2 .placeholder-tag');const c=getComputedStyle(e);return [c.borderBottomStyle,c.backgroundColor,c.fontFamily.includes('mono')]})()")
    ok('placeholders in headings are quiet (dashed underline, no box)', st[0]=='dashed' and st[1] in ('rgba(0, 0, 0, 0)','transparent') and st[2]==False, str(st))
    # ---- footer + scrim + shortcuts hint
    ok('footer with shortcut hint present', pg.locator('footer:has-text("for shortcuts")').count()==1)
    ok('bottom scrim behind dock present', pg.evaluate("!![...document.querySelectorAll('div[aria-hidden=true]')].find(d=>d.className.includes('bg-gradient-to-t')&&d.className.includes('fixed'))"))
    # ---- empty state + 404
    pg.goto(B+'/projects'); pg.wait_for_timeout(1500); pg.get_by_label('Search projects').fill('zzzz'); pg.wait_for_timeout(700)
    ok('projects: shared empty state with action', pg.get_by_text('No projects match these filters').count()==1 and pg.get_by_role('button',name='Clear filters').count()==1)
    pg.goto(B+'/nope'); pg.wait_for_timeout(1500); ok('404 page is designed (heading, hint, link home)', pg.get_by_role('heading',name='Page not found').count()==1 and pg.get_by_role('link',name='Back to Home').count()==1)
    # ---- loading skeleton (delay the lazy chunk)
    d=b.new_context(viewport={'width':1280,'height':900}); dp=d.new_page()
    def slow(route): time.sleep(1.2); route.continue_()
    dp.route('**/assets/Timeline-*.js', slow); dp.goto(B+'/timeline'); dp.wait_for_timeout(500)
    ok('loading state: skeleton shows while a page chunk loads', dp.get_by_label('Loading page').count()>=1)
    dp.wait_for_timeout(3500); ok('loading state: real page replaces skeleton', dp.get_by_role('heading',name='Career journey').count()==1 and dp.get_by_label('Loading page').count()==0)
    # ---- reduced motion: skeleton does not animate
    r=b.new_context(viewport={'width':1280,'height':900},reduced_motion='reduce').new_page(); r.route('**/assets/Timeline-*.js', slow); r.goto(B+'/timeline'); r.wait_for_timeout(500)
    ok('reduced motion: skeleton shimmer disabled', r.evaluate("(()=>{const s=document.querySelector('.skeleton');return s?getComputedStyle(s).animationName:'none'})()")=='none')
    ok('no page errors', not errs, ';'.join(errs)[:200]); b.close()
