from pathlib import Path
import re
import urllib.request
import cv2

ROOT = Path(__file__).parent
ASSETS = ROOT / 'site' / 'assets'
URL = 'https://zaloapp.com/qr/g/xcnavihbxw36sivl3ojr?src=qr'
matrix = cv2.QRCodeEncoder_create().encode(URL)
h, w = matrix.shape
paths = ' '.join(f'M{x+4},{y+4}h1v1h-1z' for y in range(h) for x in range(w) if matrix[y, x] == 0)
(ASSETS / 'community-qr.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w+8} {h+8}" shape-rendering="crispEdges"><path fill="#fff" d="M0 0h{w+8}v{h+8}H0z"/><path fill="#163e2d" d="{paths}"/></svg>', encoding='utf-8')

font_url = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap'
request = urllib.request.Request(font_url, headers={'User-Agent': 'Mozilla/5.0'})
css = urllib.request.urlopen(request, timeout=30).read().decode('utf-8')
for i, remote in enumerate(dict.fromkeys(re.findall(r'url\((https://[^)]+)\)', css))):
    ext = '.woff2' if '.woff2' in remote else '.ttf'
    name = f'font-{i}{ext}'
    (ASSETS / name).write_bytes(urllib.request.urlopen(remote, timeout=30).read())
    css = css.replace(remote, name)
(ASSETS / 'fonts.css').write_text(css, encoding='utf-8')
print('QR generated from decoded supplied poster. Local fonts:', i+1)
