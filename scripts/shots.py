"""Visual review helper: screenshots every route and builds contact sheets in /tmp/shots. Usage: python3 scripts/shots.py [desktop|mobile] [prefix]"""
import os, sys
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH','/opt/pw-browsers')
from playwright.sync_api import sync_playwright
from PIL import Image
B='http://localhost:4180'
ROUTES=['/','/about','/academics','/skills','/projects','/experience','/achievements','/certificates','/blog','/activity','/resume','/contact','/timeline']
mode=sys.argv[1] if len(sys.argv)>1 else 'desktop'; pre=sys.argv[2] if len(sys.argv)>2 else 'v'
vp={'desktop':(1440,900),'mobile':(390,844)}[mode]; os.makedirs('/tmp/shots',exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_context(viewport={'width':vp[0],'height':vp[1]},has_touch=mode=='mobile').new_page(); files=[]
    for r in ROUTES:
        pg.goto(B+r); pg.wait_for_timeout(2300); f=f"/tmp/shots/{pre}_{mode}_{r.strip('/') or 'home'}.png"; pg.screenshot(path=f); files.append(f)
    b.close()
per=4 if mode=='desktop' else 6; cols=2 if mode=='desktop' else 6; tw=720 if mode=='desktop' else 300
for n in range(0,len(files),per):
    chunk=files[n:n+per]; ims=[Image.open(f) for f in chunk]; th=int(ims[0].height*tw/ims[0].width)
    rows=(len(ims)+cols-1)//cols; sheet=Image.new('RGB',(tw*cols,th*rows),(0,0,0))
    for i,im in enumerate(ims): sheet.paste(im.resize((tw,th)),((i%cols)*tw,(i//cols)*th))
    sheet.save(f"/tmp/shots/{pre}_{mode}_sheet{n//per}.png")
print('ok')
