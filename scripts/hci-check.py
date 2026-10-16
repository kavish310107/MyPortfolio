import os
os.environ['PLAYWRIGHT_BROWSERS_PATH']='/opt/pw-browsers'
from playwright.sync_api import sync_playwright
B='http://localhost:4180'
def ok(n,c,x=''): print('PASS' if c else 'FAIL', n, x, flush=True)
ROWS="""()=>{const ws=[...document.querySelectorAll('[data-widget-id]')];const rows={};ws.forEach(w=>{const r=w.getBoundingClientRect();const k=Math.round(r.top/8);(rows[k]=rows[k]||[]).push(r)});
 const cw=document.querySelector('main').getBoundingClientRect().width-48; return Object.values(rows).map(r=>Math.round(r.reduce((n,x)=>n+x.width,0)/cw*100))}"""
with sync_playwright() as p:
    b=p.chromium.launch(); errs=[]
    # --- tablet widget balance (default + after hiding widgets)
    t=b.new_context(viewport={'width':768,'height':1024},has_touch=True).new_page(); t.on('pageerror',lambda e:errs.append(str(e)))
    t.goto(B); t.wait_for_timeout(2000); rows=t.evaluate(ROWS); ok('tablet: every dashboard row is full width (default)', all(r>=95 for r in rows), str(rows))
    t.get_by_role('button',name='Customize').click(); t.wait_for_timeout(1000)
    for wid in ['Skills snapshot','Activity feed']:
        t.get_by_label(f'Hide {wid}').click(); t.wait_for_timeout(500)
    t.wait_for_timeout(600); rows=t.evaluate(ROWS); ok('tablet: rows stay full width after hiding 2 widgets', all(r>=95 for r in rows), str(rows))
    # --- reset needs confirmation
    btn=t.get_by_role('button',name='Reset layout'); btn.click(); t.wait_for_timeout(300)
    ok('reset: first click only arms (no reset yet)', t.get_by_role('button',name='Click again to confirm reset').count()==1 and len(t.evaluate("[...document.querySelectorAll('[data-widget-id]')]"))==10)
    t.get_by_role('button',name='Click again to confirm reset').click(); t.wait_for_timeout(700)
    ok('reset: second click restores all 12 widgets', t.evaluate("document.querySelectorAll('[data-widget-id]').length")==12)
    # --- mobile: touch close palette, breadcrumb, title, announcer
    m=b.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True).new_page(); m.on('pageerror',lambda e:errs.append(str(e)))
    m.goto(B+'/projects'); m.wait_for_timeout(1500)
    ok('title follows page', m.title().startswith('Projects'), m.title())
    ok('status bar names current page on mobile', m.locator('header [aria-current=page]').inner_text()=='Projects')
    ok('route announced to screen readers', m.locator('p[role=status]').first.inner_text()=='Projects page')
    m.get_by_label('Open command palette').tap(); m.wait_for_timeout(700)
    ok('mobile palette opens via dock search', m.locator('[role=dialog]').count()==1)
    cb=m.get_by_label('Done, close search'); bb=cb.bounding_box(); ok('palette has visible touch close button >=44px', bb['width']>=44 and bb['height']>=44)
    pb=m.locator('[role=dialog]').bounding_box(); ok('palette fits viewport', pb['x']>=0 and pb['x']+pb['width']<=390 and pb['y']+pb['height']<=844)
    cb.tap(); m.wait_for_timeout(600); ok('tap close works + focus returns', m.locator('[role=dialog]').count()==0)
    # --- mobile semester chart: rows, no tiny targets
    m.goto(B+'/academics'); m.wait_for_timeout(1500)
    ok('mobile semester chart is a row list (8 rows >=44px)', m.evaluate("[...document.querySelectorAll('ul.sm\\\\:hidden li')].filter(l=>l.getBoundingClientRect().height>=44).length")==8)
    # --- modal on mobile fits + scroll locked
    m.goto(B+'/projects?p=project-1'); m.wait_for_timeout(1500); mb=m.locator('[role=dialog]').bounding_box()
    ok('mobile modal sheet within viewport', mb['x']>=0 and mb['x']+mb['width']<=390.5 and mb['y']>=0)
    ok('body scroll locked behind modal', m.evaluate("getComputedStyle(document.body).overflow")=='hidden')
    # --- keyboard: every Tab stop on key pages shows a focus indicator
    d=b.new_context(viewport={'width':1280,'height':900}).new_page()
    JS="""()=>{const e=document.activeElement;const cs=getComputedStyle(e);const vis=(cs.outlineStyle!=='none'&&parseFloat(cs.outlineWidth)>0)||cs.boxShadow!=='none';return {vis,tag:e.tagName,label:(e.getAttribute('aria-label')||e.textContent||'').trim().slice(0,30),inRow:!!e.closest('[role=dialog]')&&e.getAttribute('role')==='combobox'}}"""
    for path in ['/','/projects','/contact','/skills']:
        d.goto(B+path); d.wait_for_timeout(1500); bad=[]
        for _ in range(40):
            d.keyboard.press('Tab'); r=d.evaluate(JS)
            if r['tag']=='BODY': break  # focus left the page (end of tab order)
            if not r['vis']: bad.append(r['tag']+':'+r['label'])
        ok(f'keyboard focus always visible on {path} (40 tab stops)', not bad, str(bad[:4]))
    d.goto(B+'/'); d.wait_for_timeout(1200); d.keyboard.press('Tab')
    ok('first Tab stop is the skip link and it becomes visible', d.evaluate("document.activeElement.textContent.trim()")=='Skip to content' and d.evaluate("document.activeElement.getBoundingClientRect().width")>20)
    d.keyboard.press('Enter'); d.wait_for_timeout(300); ok('skip link moves focus into main content', d.evaluate("document.activeElement.id")=='main')
    ok('no page errors', not errs, ';'.join(errs)[:150]); b.close()
