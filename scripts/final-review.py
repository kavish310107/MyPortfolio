"""Final review sweep.  usage: python3 scripts/final-review.py dev  (vite dev on :5199: React warnings + interactions)
                              python3 scripts/final-review.py prod (vite preview on :4180: links, external-link safety, network)"""
import os, sys, re
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH','/opt/pw-browsers')
from playwright.sync_api import sync_playwright
mode=sys.argv[1] if len(sys.argv)>1 else 'prod'
B='http://localhost:5199' if mode=='dev' else 'http://localhost:4180'
ROUTES=['/','/about','/academics','/skills','/projects','/experience','/achievements','/certificates','/activity','/timeline','/blog','/blog/post-1','/blog/post-5','/resume','/contact','/no-such-page']
def ok(n,c,x=''): print('PASS' if c else 'FAIL', n, x, flush=True)
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={'width':1280,'height':900}); pg=ctx.new_page()
    msgs=[]; fails=[]; ext=set()
    pg.on('console',lambda m: m.type in('error','warning') and msgs.append(f'{m.type}: {m.text[:180]}'))
    pg.on('pageerror',lambda e: msgs.append('pageerror: '+str(e)[:180]))
    pg.on('response',lambda r: r.status>=400 and fails.append(f'{r.status} {r.url[:90]}'))
    pg.on('request',lambda r: (not r.url.startswith(('http://localhost','data:','blob:','ws://localhost'))) and ext.add(r.url[:90]))
    if mode=='dev':
        for r in ROUTES:
            pg.goto(B+r); pg.wait_for_timeout(1500)
            ok(f'renders {r}', pg.locator('h1').count()==1, str(pg.locator('h1').count()))
        # interactions in dev (React warnings surface here)
        pg.goto(B+'/'); pg.wait_for_timeout(1500)
        pg.keyboard.press('Control+k'); pg.wait_for_timeout(500); pg.keyboard.type('skill 2'); pg.wait_for_timeout(300); pg.keyboard.press('Enter'); pg.wait_for_timeout(1500)
        pg.keyboard.press('Control+k'); pg.wait_for_timeout(500); pg.keyboard.type('zzzzqq'); pg.wait_for_timeout(300); pg.keyboard.press('Escape'); pg.wait_for_timeout(500)
        pg.goto(B+'/'); pg.wait_for_timeout(1200); pg.locator('body').click(position={'x':5,'y':300}); pg.keyboard.press('?'); pg.wait_for_timeout(600); pg.keyboard.press('Escape'); pg.wait_for_timeout(500)
        pg.get_by_role('button',name='Customize').click(); pg.wait_for_timeout(800)
        pg.get_by_label('Hide Skills snapshot').click(); pg.wait_for_timeout(500); pg.get_by_role('button',name='Skills snapshot').click(); pg.wait_for_timeout(500); pg.get_by_role('button',name='Done').click(); pg.wait_for_timeout(500)
        pg.goto(B+'/projects'); pg.wait_for_timeout(1500); pg.get_by_role('button',name='[PROJECT 2 TITLE]').click(); pg.wait_for_timeout(800); pg.keyboard.press('ArrowRight'); pg.wait_for_timeout(400); pg.keyboard.press('Escape'); pg.wait_for_timeout(600)
        pg.get_by_role('button',name='Machine Learning',exact=True).click(); pg.wait_for_timeout(700); pg.get_by_label('Search projects').fill('zzz'); pg.wait_for_timeout(500); pg.get_by_label('Clear search').click(); pg.wait_for_timeout(400)
        pg.goto(B+'/certificates'); pg.wait_for_timeout(1500); pg.get_by_role('button',name='[CERTIFICATE 2 TITLE]').click(); pg.wait_for_timeout(700); pg.keyboard.press('Escape'); pg.wait_for_timeout(600)
        pg.goto(B+'/skills'); pg.wait_for_timeout(1200); pg.locator('button[aria-expanded]').first.click(); pg.wait_for_timeout(400)
        pg.goto(B+'/timeline'); pg.wait_for_timeout(1500); pg.locator('ol button[aria-expanded]').first.click(); pg.wait_for_timeout(400)
        pg.goto(B+'/blog'); pg.wait_for_timeout(1200); pg.get_by_label('Search articles').fill('article 3'); pg.wait_for_timeout(500)
        pg.goto(B+'/contact'); pg.wait_for_timeout(1500); pg.get_by_role('button',name='Question').click(); pg.get_by_role('button',name='Open in email app').click(); pg.wait_for_timeout(600)
        pg.get_by_label('More pages').click(); pg.wait_for_timeout(500); pg.keyboard.press('Escape'); pg.wait_for_timeout(500)
        bad=[m for m in msgs if 'ERR_NAME_NOT_RESOLVED' not in m and 'fonts.g' not in m and 'Download the React DevTools' not in m]
        ok('dev console: no React warnings or errors across routes + interactions', not bad, ' | '.join(sorted(set(bad)))[:600])
    else:
        internal=set(); report=[]
        for r in ROUTES:
            pg.goto(B+r); pg.wait_for_timeout(1500)
            if r=='/skills': pg.get_by_role('tab',name='Programming').click() if pg.get_by_role('tab').count() else None
            for a in pg.locator('a[href]').all():
                h=a.get_attribute('href') or ''; tgt=a.get_attribute('target'); rel=a.get_attribute('rel') or ''
                if h.startswith('/') or h.startswith(B): internal.add(re.sub(r'^'+re.escape(B),'',h).split('#')[0])
                elif h.startswith('mailto:'): report.append(('mailto',h))
                elif h.startswith('http'):
                    if tgt!='_blank' or 'noopener' not in rel or 'noreferrer' not in rel: report.append(('unsafe-external',h))
                elif h=='#main': pass
                else: report.append(('bad-href',h))
        ok(f'crawled {len(ROUTES)} routes, found {len(internal)} unique internal links', len(internal)>20)
        broken=[]
        for h in sorted(internal):
            pg.goto(B+h); pg.wait_for_timeout(900)
            if pg.get_by_text('Page not found').count() or pg.locator('h1').count()!=1: broken.append(h)
        ok('every internal link resolves to a real page (not 404, exactly one h1)', not broken, str(broken[:6]))
        ok('no placeholder/empty/javascript hrefs, external links use target=_blank + noopener noreferrer', not [r for r in report if r[0] in('bad-href','unsafe-external')], str([r for r in report if r[0] in('bad-href','unsafe-external')][:4]))
        pg.goto(B+'/projects'); pg.wait_for_timeout(1500)
        ok('placeholder links are disabled controls, never live anchors', pg.locator('a[href^="["]').count()==0 and pg.locator('[aria-disabled=true]').count()>=6)
        ok('no request left the site (self-contained: fonts/icons/scripts all local)', not ext, str(ext))
        ok('no failed (4xx/5xx) responses incl. favicon', not [f for f in fails if '/no-such' not in f], str(fails[:4]))
        ok('no console errors on any route', not [m for m in msgs if 'ERR_NAME' not in m], ' | '.join(msgs)[:300])
        pg.goto(B+'/'); pg.wait_for_timeout(1500)
        ok('self-hosted Inter + JetBrains Mono actually in use', pg.evaluate("document.fonts.check('1em \"Inter Variable\"') && document.fonts.check('1em \"JetBrains Mono Variable\"')"))
        ok('favicon is linked', pg.locator('link[rel=icon][href="/favicon.svg"]').count()==1)
    b.close()
