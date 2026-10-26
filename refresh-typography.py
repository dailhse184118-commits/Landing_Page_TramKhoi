from pathlib import Path
import re,urllib.request,io
from fontTools import subset
root=Path(__file__).parent
assets=root/'site/assets'
url='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap'
request=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
css=urllib.request.urlopen(request,timeout=30).read().decode('utf-8')
for i,remote in enumerate(dict.fromkeys(re.findall(r'url\((https://[^)]+)\)',css))):
    raw=urllib.request.urlopen(remote,timeout=30).read()
    opts=subset.Options();opts.flavor='woff2';opts.layout_features=['*']
    font=subset.load_font(io.BytesIO(raw),opts)
    sub=subset.Subsetter(options=opts)
    sub.populate(unicodes=list(range(32,383))+list(range(0x1e00,0x1f00))+list(range(0x2000,0x2070))+[0x20ab,0x2191,0x2192,0x2197,0x21e5,0x25b7])
    sub.subset(font);font.flavor='woff2'
    name=f'montserrat-{i}.woff2';font.save(str(assets/name));font.close()
    css=css.replace(remote,name)
css=css.replace("format('truetype')","format('woff2')")
(assets/'fonts.css').write_text(css,encoding='utf-8')
p=root/'site/index.html';s=p.read_text(encoding='utf-8')
s=s.replace("font-family:'Be Vietnam Pro',sans-serif","font-family:'Montserrat',sans-serif")
s=s.replace('<br>Phim mở đầu là hình ảnh AI minh họa hành trình cà phê. Ảnh sản phẩm do Trạm Khởi cung cấp.','')
s=s.replace('<div class="read-progress" aria-hidden="true"></div>','<div class="read-progress" aria-hidden="true"></div><div class="color-atmosphere" aria-hidden="true"><i></i><i></i><i></i></div>')
p.write_text(s,encoding='utf-8')
print('Montserrat installed locally with Vietnamese glyph coverage. Footer line removed.')
