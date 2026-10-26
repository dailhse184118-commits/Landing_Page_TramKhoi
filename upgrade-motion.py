from pathlib import Path
import re,shutil,subprocess
root=Path(__file__).parent
site=root/'site';assets=site/'assets'
backup=root/'review/before-motion'
backup.mkdir(parents=True,exist_ok=True)
if not (backup/'index.html').exists():shutil.copy2(site/'index.html',backup/'index.html')
photos=[
    ('honey','ChatGPT Image Oct 26, 2026, 01_33_40 PM-1.png','Mật Ong'),
    ('milk','ChatGPT Image Oct 26, 2026, 01_33_42 PM-2.png','Sữa'),
    ('yogurt','cae334f5-2ead-4d03-9e0a-c32cff8e7594.png','Sữa Chua'),
    ('gold','ChatGPT Image Oct 26, 2026, 01_33_44 PM-4.png','Vàng')]
for slug,name,title in photos:
    source=Path('C:/Users/Admin/Downloads')/name
    archive=root/'source-assets'/('kombucha-'+slug+'.png')
    if not archive.exists():shutil.copy2(source,archive)
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-i',str(source),'-vf','scale=900:-2','-c:v','libwebp','-quality','89','-y',str(assets/('kombucha-'+slug+'.webp'))],check=True)
(assets/'vendor').mkdir(exist_ok=True)
shutil.copy2(root/'node_modules/motion/dist/motion.js',assets/'vendor/motion.js')
shutil.copy2(root/'node_modules/motion/LICENSE.md',assets/'vendor/MOTION-LICENSE.md')
p=site/'index.html';s=p.read_text(encoding='utf-8')
pattern=r'<div class="drink-image"><span class="number">(\d+)</span><div class="product-window"[^>]*><img[^>]+></div></div>'
matches=list(re.finditer(pattern,s))
assert len(matches)==4,'Expected original four drink photo blocks'
for match,(slug,_,title) in reversed(list(zip(matches,photos))):
    block=f'<button class="drink-image" data-lightbox="assets/kombucha-{slug}.webp" data-title="Kombucha {title} · Trạm Khởi" aria-label="Xem ảnh Kombucha {title}"><span class="number" aria-hidden="true">{match.group(1)}</span><span class="product-window"><img src="assets/kombucha-{slug}.webp" alt="Kombucha {title}, ảnh mới do Trạm Khởi cung cấp" loading="lazy" width="900" height="1124"></span><span class="product-peek" aria-hidden="true"><svg class="arrow"><use href="#arrow"/></svg></span></button>'
    s=s[:match.start()]+block+s[match.end():]
s=s.replace('</style>','</style>\n  <link rel="stylesheet" href="assets/motion.css">\n  <script src="assets/vendor/motion.js" defer></script>\n  <script src="assets/site-motion.js" defer></script>',1)
s=s.replace('<body class="hero-static">','<body class="hero-static">\n  <div class="read-progress" aria-hidden="true"></div>',1)
old='<div class="brand-ribbon"><div class="wrap ribbon-inner"><span>COFFEE & KOMBUCHA</span><span class="ribbon-star" aria-hidden="true">✳</span><span>MỘT VỊ MỚI. MỘT KHỞI ĐẦU.</span><span class="ribbon-star optional" aria-hidden="true">✳</span><span class="optional">HẸN BẠN Ở TRẠM</span></div></div>'
unit='<span>COFFEE & KOMBUCHA</span><svg viewBox="0 0 24 24"><use href="#bean"/></svg><span>MỘT VỊ MỚI. MỘT KHỞI ĐẦU.</span><svg viewBox="0 0 24 24"><use href="#bean"/></svg><span>HẸN BẠN Ở TRẠM</span><svg viewBox="0 0 24 24"><use href="#bean"/></svg>'
group='<div class="ribbon-group">'+unit*2+'</div>'
new='<div class="brand-ribbon"><span class="sr-only">Coffee & Kombucha. Một vị mới. Một khởi đầu. Hẹn bạn ở Trạm.</span><div class="ribbon-track" aria-hidden="true">'+group*2+'</div><button class="ribbon-pause" aria-label="Tạm dừng dải chữ" aria-pressed="false"><span aria-hidden="true">Ⅱ</span></button></div>'
assert old in s;s=s.replace(old,new,1)
s=s.replace("const filter=button.dataset.filter;$$('.filter')", "const before=window.tramMotion?.captureCards();const filter=button.dataset.filter;$$('.filter')",1)
s=s.replace("$('#filter-feedback').textContent=count+' vị đang chờ bạn'", "$('#filter-feedback').textContent=count+' vị đang chờ bạn';window.tramMotion?.animateCards(before)",1)
s=s.replace('dialog.showModal()','dialog.showModal();window.tramMotion?.openDialog()',1)
p.write_text(s,encoding='utf-8')
print('Four new product photos installed in menu and lightbox. Local Motion 14.6.0 vendored.')
