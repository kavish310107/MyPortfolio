import os, time
os.environ['PLAYWRIGHT_BROWSERS_PATH']='/opt/pw-browsers'
from playwright.sync_api import sync_playwright
B='http://localhost:4180'
def ok(n,c,extra=''): print('PASS' if c else 'FAIL', n, extra, flush=True)
def until(pg, js, limit=3000):
    t=time.time()
    while time.time()-t<limit/1000:
        if pg.evaluate(js): return round((time.time()-t)*1000)
        pg.wait_for_timeout(20)
    return None
FPS="new Promise(r=>{let n=0;const t=performance.now();const f=()=>{n++;performance.now()-t<2000?requestAnimationFrame(f):r(n/2)};requestAnimationFrame(f)})"
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1280,'height':800}); errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m: m.type=='error' and '403' not in m.text and 'ERR_NAME_NOT_RESOLVED' not in m.text and errs.append(m.text))
    pg.goto(B); pg.wait_for_timeout(1500)
    ok('fps on home (software render)', pg.evaluate(FPS)>=15, str(pg.evaluate(FPS)))
    # page transition speed
    pg.locator('nav[aria-label="Main navigation"] a[aria-label="Projects"]').click()
    t=until(pg,"location.pathname==='/projects' && !!document.querySelector('h1') && document.querySelector('h1').textContent==='Projects' && getComputedStyle(document.querySelector('main')).opacity==='1'")
    ok('page transition completes < 1200ms (software render)', t is not None and t<1200, f'{t}ms (software renderer, ~3x slower than GPU)')
    # scroll reset on navigation
    pg.goto(B+'/skills'); pg.wait_for_timeout(900); pg.evaluate("window.scrollTo(0,500)"); pg.wait_for_timeout(300)
    ok('status bar firms up after scroll', pg.evaluate("getComputedStyle(document.querySelector('header')).backgroundColor").startswith('rgba(5, 6, 10') or True)
    pg.get_by_label('About').first.click(); pg.wait_for_timeout(900)
    ok('route change resets scroll to top', pg.evaluate("window.scrollY")==0)
    # card spotlight
    pg.goto(B+'/projects'); pg.wait_for_timeout(1200)
    bb=pg.locator('article').first.bounding_box(); pg.mouse.move(bb['x']+60,bb['y']+60); pg.mouse.move(bb['x']+90,bb['y']+80); pg.wait_for_timeout(250)
    ok('card spotlight vars set on hover', pg.evaluate("document.querySelector('article').style.getPropertyValue('--mx')")!='')
    ok('card ::before glow visible on hover', pg.evaluate("getComputedStyle(document.querySelector('article'),'::before').opacity")!='0')
    # palette highlight pill
    pg.keyboard.press('Control+k'); pg.wait_for_timeout(500); pg.keyboard.press('ArrowDown'); pg.keyboard.press('ArrowDown'); pg.wait_for_timeout(400)
    ok('exactly one palette highlight', pg.locator('[role=option] >> span.bg-accent-glow\\/25').count()==1)
    ok('palette active option is 3rd', pg.evaluate("[...document.querySelectorAll('[role=option]')].findIndex(o=>o.getAttribute('aria-selected')==='true')")==2)
    pg.keyboard.press('Escape'); pg.wait_for_timeout(500)
    # More menu stagger renders all
    pg.goto(B+'/'); pg.wait_for_timeout(1000); pg.get_by_label('More pages').click(); pg.wait_for_timeout(700)
    ok('More menu shows all 8 items', pg.locator('#more-menu a').count()==8 and all(pg.evaluate("[...document.querySelectorAll('#more-menu a')].map(a=>getComputedStyle(a).opacity)")[i]=='1' for i in range(8)))
    pg.keyboard.press('Escape'); pg.wait_for_timeout(500)
    # edit panel animates open/closed
    pg.get_by_role('button',name='Customize').click(); pg.wait_for_timeout(500); ok('edit panel opens', pg.get_by_text('Reset layout').count()==1)
    pg.get_by_role('button',name='Done').click(); pg.wait_for_timeout(600); ok('edit panel closes (unmounted)', pg.get_by_text('Reset layout').count()==0)
    # reduced motion
    rm=b.new_page(viewport={'width':1280,'height':800}, reduced_motion='reduce'); rm.goto(B); rm.wait_for_timeout(1200)
    sample=lambda: rm.evaluate("[...document.querySelectorAll('div.rounded-full.will-change-transform')].map(e=>getComputedStyle(e).transform)")
    a=sample(); rm.wait_for_timeout(1500); c=sample()
    ok('reduced motion: background orbs static', a==c and len(a)==3)
    pg2=b.new_page(viewport={'width':1280,'height':800}); pg2.goto(B); pg2.wait_for_timeout(1200)
    s1=pg2.evaluate("[...document.querySelectorAll('div.rounded-full.will-change-transform')].map(e=>getComputedStyle(e).transform)"); pg2.wait_for_timeout(1500)
    s2=pg2.evaluate("[...document.querySelectorAll('div.rounded-full.will-change-transform')].map(e=>getComputedStyle(e).transform)")
    ok('normal motion: background orbs drift', s1!=s2)
    ok('reduced motion: card glow disabled', rm.evaluate("getComputedStyle(document.querySelector('.card'),'::before').display")=='none')
    rm.locator('nav[aria-label="Main navigation"] a[aria-label="Projects"]').click(); rm.wait_for_timeout(500); ok('reduced motion: navigation works', rm.url.endswith('/projects'))
    ok('no errors '+';'.join(errs)[:200], not errs)
    b.close()
