#!/usr/bin/env bash
# Proves content is replaceable from src/data alone: copies the project to /tmp/filled, fills the data files with obviously
# fake values (NO component is edited), builds it, and serves it on :4182. Then run: python3 scripts/filled-content-check.py
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; OUT=/tmp/filled
rm -rf "$OUT" && mkdir -p "$OUT" && cd "$ROOT" && cp -r src public index.html package.json tsconfig.json vite.config.ts tailwind.config.js postcss.config.js scripts "$OUT"/ && ln -s "$ROOT/node_modules" "$OUT/node_modules"
cd "$OUT" && python3 - <<'PY'
def sub(p, pairs):
    s = open(p).read()
    for a, b in pairs:
        assert a in s, (p, a); s = s.replace(a, b)
    open(p, 'w').write(s)
d = 'src/data/'
sub(d+'profile.ts', [("'[YOUR NAME]'","'Test Person'"),("'[YOUR TITLE]'","'Test Engineer'"),("'[SHORT INTRODUCTION — 2 TO 3 SENTENCES ABOUT YOU]'","'I test things for fun.'"),("'[YOUR PHOTO]'","'/images/me.svg'"),("'[YOUR LOCATION]'","'Testville'"),("'[AVAILABILITY STATUS]'","'Open to tests'"),("'[CURRENT FOCUS]'","'Testing focus'"),("'[YOUR EMAIL]'","'test@example.com'"),("'[ADD RESUME PDF]'","'/resume.pdf'"),("url: '[YOUR GITHUB]', handle: '[YOUR GITHUB HANDLE]'","url: 'https://example.com/gh', handle: '@testgh'")])
sub(d+'academics.ts', [("isSample: true","isSample: false"),("'[YOUR UNIVERSITY]'","'Test University'"),("'[YOUR DEGREE]'","'BSc Testing'"),("value: 8.5","value: 7.5")])
sub(d+'skills.ts', [("isSample: true","isSample: false")]); sub(d+'activity.ts', [("isSample: true","isSample: false")])
sub(d+'projects.ts', [("github: '[PROJECT LINK]'","github: 'https://example.com/repo'"),("image: '[ADD IMAGE]'","image: '/images/p.svg'")])
sub(d+'certificates.ts', [("file: '[ADD CERTIFICATE]'","file: '/images/c.svg'")]); sub(d+'blog.ts', [("cover: '[ADD IMAGE]'","cover: '/images/b.svg'")])
sub(d+'pages.ts', [("projects: { title: 'Projects'","projects: { title: 'My Work'")])
sub(d+'widgets.ts', [("{ id: 'links', title: 'Profiles & links', size: 'third' }","{ id: 'links', title: 'Profiles & links', size: 'third', visible: false }")])
sub(d+'contact.ts', [("['Opportunity', 'Collaboration', 'Question', 'Just saying hi']","['Hello', 'Hire']"),("'[RESPONSE TIME]'","'Within a day'")])
PY
mkdir -p public/images && for n in me p c b; do echo '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#4452de"/></svg>' > public/images/$n.svg; done
printf '%%PDF-1.1\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj 3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 200 200]>>endobj\ntrailer<</Root 1 0 R>>\n' > public/resume.pdf
npx tsc -b && npx vite build >/dev/null && echo "Filled copy built in $OUT. Serve it:  cd $OUT && npx vite preview --port 4182"
