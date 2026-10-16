import os
os.environ['PLAYWRIGHT_BROWSERS_PATH']='/opt/pw-browsers'
from playwright.sync_api import sync_playwright
B='http://localhost:4180'; res=[]
def ok(n,c): res.append(('PASS' if c else 'FAIL',n))
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1280,'height':800})
    errs=[]; pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m: m.type=='error' and '403' not in m.text and 'ERR_NAME_NOT_RESOLVED' not in m.text and errs.append(m.text))
    pg.goto(B); pg.wait_for_timeout(800)
    # palette
    pg.keyboard.press('Control+k'); pg.wait_for_selector('[role=dialog]'); pg.wait_for_timeout(300)
    ok('palette opens, input focused', pg.evaluate("document.activeElement?.getAttribute('role')")=='combobox')
    pg.keyboard.type('proj'); pg.wait_for_timeout(150)
    ok('palette filters', pg.locator('[role=option]').count()>=1)
    pg.keyboard.press('Enter'); pg.wait_for_timeout(800)
    ok('palette navigates', '/projects' in pg.url)
    pg.keyboard.press('Control+k'); pg.wait_for_timeout(400); pg.keyboard.type('zzzz'); pg.wait_for_timeout(300)
    ok('palette empty state', pg.locator('p:not(.sr-only):has-text("No results")').count()==1)
    pg.keyboard.press('Escape'); pg.wait_for_timeout(600)
    ok('Escape closes palette', pg.locator('[role=dialog]').count()==0)
    # G shortcut
    pg.keyboard.press('g'); pg.keyboard.press('s'); pg.wait_for_timeout(500)
    ok('G S -> skills', pg.url.endswith('/skills'))
    # projects
    pg.goto(B+'/projects'); pg.wait_for_timeout(800)
    ok('6 project cards', pg.locator('article').count()==6)
    pg.get_by_role('button',name='Machine Learning',exact=True).click(); pg.wait_for_timeout(600)
    ok('category filter', pg.locator('article').count()==2)
    pg.get_by_role('button',name='Reset filters').click(); pg.wait_for_timeout(500)
    pg.get_by_label('Search projects').fill('zzz'); pg.wait_for_timeout(500)
    ok('search empty state', pg.get_by_text('No projects match').count()==1)
    pg.get_by_label('Clear search').click(); pg.wait_for_timeout(500)
    btn=pg.get_by_role('button', name='[PROJECT 2 TITLE]'); btn.focus(); pg.keyboard.press('Enter'); pg.wait_for_timeout(800)
    ok('modal opens via keyboard + URL', pg.locator('[role=dialog]').count()==1 and 'p=project-2' in pg.url)
    ok('focus moved into modal', pg.evaluate("!!document.activeElement.closest('[role=dialog]')"))
    for _ in range(12): pg.keyboard.press('Tab')
    ok('focus trapped in modal', pg.evaluate("!!document.activeElement.closest('[role=dialog]')"))
    pg.keyboard.press('ArrowRight'); pg.wait_for_timeout(300)
    ok('arrow steps next project', 'project-3' in pg.url)
    pg.keyboard.press('Escape'); pg.wait_for_timeout(800)
    ok('Escape closes modal', pg.locator('[role=dialog]').count()==0)
    ok('focus restored to the card title button', pg.evaluate("document.activeElement.tagName==='BUTTON' && !!document.activeElement.closest('article')"))
    # deep link + back
    pg.goto(B+'/projects?p=project-1'); pg.wait_for_timeout(800)
    ok('deep link opens modal', pg.locator('[role=dialog]').count()==1)
    # dock More menu
    pg.goto(B+'/'); pg.wait_for_timeout(600)
    pg.get_by_label('More pages').click(); pg.wait_for_timeout(600)
    ok('More menu opens, focus inside', pg.evaluate("!!document.activeElement.closest('#more-menu')"))
    pg.keyboard.press('Escape'); pg.wait_for_timeout(600)
    ok('Esc closes More, focus back on toggle', pg.locator('#more-menu').count()==0 and pg.evaluate("document.activeElement?.getAttribute('aria-label')")=='More pages')
    # skills expand
    pg.goto(B+'/skills'); pg.wait_for_timeout(600)
    pg.locator('button[aria-expanded]').first.click(); pg.wait_for_timeout(600)
    ok('skill expands', pg.locator('button[aria-expanded=true]').count()==1)
    # mobile overflow
    m=b.new_page(viewport={'width':375,'height':740})
    for path in ['/','/about','/academics','/skills','/projects']:
        m.goto(B+path); m.wait_for_timeout(800)
        ok(f'no horizontal overflow @375 {path}', m.evaluate("document.documentElement.scrollWidth<=window.innerWidth+1"))
    # reduced motion
    r=b.new_page(viewport={'width':1280,'height':800}, reduced_motion='reduce'); r.goto(B); r.wait_for_timeout(500)
    ok('reduced-motion page renders', r.locator('h1').count()==1)
    pg.screenshot(path='/tmp/projects.png'); m.goto(B+'/'); m.wait_for_timeout(900); m.screenshot(path='/tmp/mobile.png')
    ok('no console/page errors: '+';'.join(errs)[:200], not errs)
    b.close()
for r in res: print(*r)
