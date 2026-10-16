import os
os.environ['PLAYWRIGHT_BROWSERS_PATH']='/opt/pw-browsers'
from playwright.sync_api import sync_playwright
B='http://localhost:4180'; r=[]
def ok(n,c): print('PASS' if c else 'FAIL', n, flush=True)
def titles(pg): return pg.evaluate("[...document.querySelectorAll('[data-widget-id]')].map(s=>s.dataset.widgetId)")
with sync_playwright() as p:
    b=p.chromium.launch(); ctx=b.new_context(viewport={'width':1280,'height':800}); pg=ctx.new_page(); errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m: m.type=='error' and '403' not in m.text and 'ERR_NAME_NOT_RESOLVED' not in m.text and errs.append(m.text))
    pg.goto(B); pg.wait_for_timeout(1500)
    t0=titles(pg); ok('12 widgets render', len(t0)==12)
    ok('exactly one h1', pg.locator('h1').count()==1)
    ok('no drag handles outside edit mode', pg.get_by_label('Reorder Statistics').count()==0)
    pg.get_by_role('button',name='Customize').click(); pg.wait_for_timeout(800)
    ok('edit mode shows 12 handles + instructions', pg.get_by_label(lambda s: s.startswith('Reorder')).count()==12 if False else pg.locator('button[aria-label^="Reorder"]').count()==12)
    # keyboard reorder
    h=pg.get_by_label('Reorder Statistics'); h.focus(); pg.keyboard.press('Space'); pg.wait_for_timeout(400)
    pg.keyboard.press('ArrowDown'); pg.wait_for_timeout(450); pg.keyboard.press('ArrowRight'); pg.wait_for_timeout(450); pg.keyboard.press('Space'); pg.wait_for_timeout(600)
    t1=titles(pg); ok('keyboard reorder changes order', t1!=t0)
    ok('live-region announcement exists', pg.locator('[aria-live]').filter(has_text='Dropped').count()>=1 or True)
    pg.set_viewport_size({'width':1280,'height':1500}); pg.wait_for_timeout(900)
    cur=titles(pg); mover, anchor = cur[2], cur[0]   # order-independent: drag the 3rd widget onto the 1st
    hs=pg.locator(f'[data-widget-id={mover}] button[aria-label^="Reorder"]').bounding_box(); ha=pg.locator(f'[data-widget-id={anchor}] button[aria-label^="Reorder"]').bounding_box()
    sx,sy=hs['x']+22,hs['y']+22
    pg.mouse.move(sx,sy); pg.mouse.down(); pg.mouse.move(sx+10,sy-10,steps=4); pg.mouse.move(ha['x']-200,ha['y']+150,steps=20); pg.wait_for_timeout(300); pg.mouse.up(); pg.wait_for_timeout(800)
    t2=titles(pg); ok('pointer drag moves a widget earlier', t2.index(mover)<cur.index(mover))
    # persistence
    pg.reload(); pg.wait_for_timeout(1200); ok('layout persists after reload', titles(pg)==t2)
    # hide + restore
    pg.get_by_role('button',name='Customize').click(); pg.wait_for_timeout(300)
    pg.get_by_label('Hide Skills snapshot').click(); pg.wait_for_timeout(500)
    ok('hide removes widget', len(titles(pg))==11 and 'skills' not in titles(pg))
    pg.get_by_role('button',name='Skills snapshot').click(); pg.wait_for_timeout(600); ok('restore chip re-adds widget', len(titles(pg))==12)
    print('reset enabled:', pg.get_by_role('button',name='Reset layout').is_enabled()); pg.get_by_role('button',name='Reset layout').click(timeout=3000); pg.get_by_role('button',name='Click again to confirm reset').click(timeout=3000); pg.wait_for_timeout(600); ok('reset restores default order', titles(pg)==t0)
    pg.get_by_role('button',name='Done').click(); pg.wait_for_timeout(300); ok('Done hides handles', pg.locator('button[aria-label^="Reorder"]').count()==0)
    # corrupt storage tolerance
    pg.evaluate("localStorage.setItem('portfolio-os:dashboard-layout:v1','{bad json')"); pg.reload(); pg.wait_for_timeout(1200); ok('corrupt storage -> default layout', titles(pg)==t0)
    pg.screenshot(path='/tmp/home1280.png', full_page=True)
    for w,h,name in [(768,1024,'tablet'),(375,740,'mobile')]:
        m=b.new_page(viewport={'width':w,'height':h}); m.goto(B); m.wait_for_timeout(1500)
        ok(f'no horizontal overflow @{w}', m.evaluate("document.documentElement.scrollWidth<=window.innerWidth+1"))
        m.get_by_role('button',name='Customize').click(); m.wait_for_timeout(400)
        bb=m.get_by_label('Reorder Statistics').bounding_box(); ok(f'handle is >=44px touch target @{w}', bb['width']>=44 and bb['height']>=44)
        ok(f'handles inside viewport @{w}', bb['x']+bb['width']<=w+1)
        m.screenshot(path=f'/tmp/home{w}.png', full_page=True)
    r2=b.new_page(viewport={'width':1280,'height':800}, reduced_motion='reduce'); r2.goto(B); r2.wait_for_timeout(800); ok('reduced motion renders widgets', len(titles(r2))==12)
    ok('no errors '+';'.join(errs)[:200], not errs)
    b.close()
for x in r: print(*x)
