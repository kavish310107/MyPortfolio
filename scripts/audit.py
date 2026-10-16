"""Responsive + a11y audit. Needs: vite preview on :4180, axe-core installed. Usage: python3 scripts/audit.py"""
import os, json, collections
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH','/opt/pw-browsers')
from playwright.sync_api import sync_playwright
B='http://localhost:4180'
AXE=open(os.path.join(os.path.dirname(__file__),'..','node_modules','axe-core','axe.min.js')).read()
ROUTES=['/','/about','/academics','/skills','/projects','/projects?p=project-1','/experience','/achievements','/certificates','/certificates?c=cert-1','/activity','/blog','/blog/post-1','/timeline','/timeline?focus=jr-a1','/resume','/contact','/nope']
ALL={'desktop':(1440,900),'laptop':(1024,700),'tablet':(768,1024),'mobile':(390,844),'xs-320':(320,640)}
VIEWS={k:v for k,v in ALL.items() if k in os.environ.get('AUDIT_VIEWS',','.join(ALL)).split(',')}
SMALL="""() => [...document.querySelectorAll('a[href],button,input,textarea,select,[role=button],[role=tab],[role=option],summary')].filter(e=>{
  const r=e.getBoundingClientRect(); if(!r.width||!r.height) return false; const cs=getComputedStyle(e); if(cs.visibility==='hidden'||cs.display==='none') return false;
  if(e.closest('[aria-hidden=true]')||e.classList.contains('sr-only')) return false; const af=getComputedStyle(e,'::after'); if(af.position==='absolute'&&parseFloat(af.width)>=44&&parseFloat(af.height)>=44) return false; return r.width<44||r.height<44}).map(e=>(e.getAttribute('aria-label')||e.textContent||e.tagName).trim().slice(0,28)+' '+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height))"""
def run(pg, label, small=False, out=None):
    pg.evaluate(AXE)
    res=pg.evaluate("axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']}}).then(r=>r.violations.map(v=>({id:v.id,impact:v.impact,n:v.nodes.length,t:v.nodes[0].target.join(' ').slice(0,70)})))")
    for v in res: out['axe'][f"{v['id']} ({v['impact']})"].append(f"{label}: {v['n']}x {v['t']}")
    if pg.evaluate("document.documentElement.scrollWidth>window.innerWidth+1"): out['overflow'].append(label)
    if small:
        for s in pg.evaluate(SMALL): out['small'][s].append(label)
if __name__=='__main__':
    out={'axe':collections.defaultdict(list),'overflow':[],'small':collections.defaultdict(list)}
    with sync_playwright() as p:
        b=p.chromium.launch()
        for vn,(w,h) in VIEWS.items():
            ctx=b.new_context(viewport={'width':w,'height':h}, has_touch=(vn in('mobile','tablet','xs-320')))
            pg=ctx.new_page()
            for r in ROUTES:
                pg.goto(B+r); pg.wait_for_timeout(2000); run(pg,f'{vn} {r}',small=vn in('mobile','tablet','xs-320'),out=out)
            pg.goto(B+'/'); pg.wait_for_timeout(700); pg.keyboard.press('Control+k'); pg.wait_for_timeout(500); run(pg,f'{vn} palette',small=vn in('mobile','tablet','xs-320'),out=out); pg.keyboard.press('Escape'); pg.wait_for_timeout(300)
            pg.get_by_label('More pages').click(); pg.wait_for_timeout(500); run(pg,f'{vn} more-menu',small=vn in('mobile','tablet','xs-320'),out=out)
            ctx.close()
        b.close()
    print('OVERFLOW:', out['overflow'] or 'none')
    print('AXE:'); [print(' ',k,'->',len(v),'pages | e.g.',v[0]) for k,v in out['axe'].items()] if out['axe'] else print('  none')
    print('SMALL TARGETS (<44px on touch viewports):'); [print(' ',k,'|',len(v),'pages') for k,v in sorted(out['small'].items(), key=lambda kv:-len(kv[1]))[:25]] if out['small'] else print('  none')
