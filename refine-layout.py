from pathlib import Path
root = Path(__file__).parent
p = root / 'site/index.html'
s = p.read_text(encoding='utf-8')
s = s.replace('img{display:block;max-width:100%}', 'img{display:block;max-width:100%;height:auto}')
s = s.replace('.band:first-child{opacity:1;visibility:visible;pointer-events:auto}', '.band:first-child{opacity:1}')
s = s.replace('window.HERO_BYTES||12000000', '8210811')
s = s.replace('.drink-card:hover .product-window{', '.drink-card:nth-child(1) .product-window{clip-path:polygon(40% 0,88% 0,90% 24%,81% 31%,61% 100%,14% 100%)}.drink-card:nth-child(2) .product-window{clip-path:polygon(20% 0,85% 20%,64% 100%,3% 100%)}.drink-card:nth-child(3) .product-window{clip-path:polygon(28% 0,93% 27%,75% 100%,9% 100%)}.drink-card:nth-child(4) .product-window{clip-path:polygon(25% 0,85% 22%,66% 100%,10% 100%)}.drink-card:hover .product-window{')
s = s.replace('--y:-432%', '--y:-440.708%')
p.write_text(s, encoding='utf-8')
p = root / 'review/audit.mjs'
s = p.read_text(encoding='utf-8').replace('filter(i=>i.complete&&i.naturalWidth===0)', "filter(i=>i.getAttribute('src')&&i.complete&&i.naturalWidth===0)")
p.write_text(s, encoding='utf-8')
print('Refined logo sizing, inactive caption hit areas, product framing and audit empty-image handling.')
