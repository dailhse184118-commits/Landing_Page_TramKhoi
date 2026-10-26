from pathlib import Path
root=Path(__file__).parent
p=root/'site/assets/site-motion.js';s=p.read_text(encoding='utf-8')
start=s.index("  $$('.band h2,.static-copy h2').forEach(heading => {")
end=s.index('  function updateTicker()',start)
s=s[:start]+s[end:]
s=s.replace("play([...heading.querySelectorAll('.motion-letter')], { y: ['80%', '0%'], rotateX: [55, 0], opacity: [0, 1] }, { duration: .64, delay: stagger(.025, { startDelay: .1 }), ease });", "play([...heading.querySelectorAll('.motion-word')], { y: ['100%', '0%'], rotateX: [25, 0], opacity: [0, 1] }, { duration: .64, delay: stagger(.075, { startDelay: .1 }), ease });")
p.write_text(s,encoding='utf-8')
p=root/'site/assets/motion.css';s=p.read_text(encoding='utf-8')
s=s.replace('.band h2 em .motion-word,.static-copy h2 em .motion-word{color:var(--gold);text-shadow:none}', '.band h2 em .motion-word,.static-copy h2 em .motion-word{background:linear-gradient(120deg,#f3da9a,#e7bc56 50%,#bde4bd);background-clip:text;-webkit-background-clip:text;color:transparent;text-shadow:none}')
s=s.replace('letter-spacing:-.06em;line-height:1.12','letter-spacing:-.035em;line-height:1.15').replace('letter-spacing:-.065em','letter-spacing:-.04em')
s+='\nhtml,body,.lightbox{scrollbar-width:none;-ms-overflow-style:none}\nhtml::-webkit-scrollbar,body::-webkit-scrollbar,.lightbox::-webkit-scrollbar{display:none;width:0;height:0}\n'
p.write_text(s,encoding='utf-8')
p=root/'review/typography-audit.mjs';s=p.read_text(encoding='utf-8').replace("document.querySelectorAll('.motion-letter').length>50","document.querySelectorAll('.motion-word').length>35")
start=s.index('const widths=');end=s.index('const shot=',start)
s=s[:start]+'''const widths=await js(`(()=>{const words=[...document.querySelector('${el}').querySelectorAll('.motion-word')];return words.map(e=>({text:e.textContent,w:e.getBoundingClientRect().width,letters:e.querySelectorAll('.motion-letter').length}))})()`);
assert.ok(widths.every(word=>word.w>0&&word.letters===0));
assert.equal(await js("getComputedStyle(document.documentElement).scrollbarWidth"),'none');
assert.equal(await js("getComputedStyle(document.querySelector('dialog')).scrollbarWidth"),'none');
''' +s[end:]
p.write_text(s,encoding='utf-8')
p=root/'review/detail.mjs';s=p.read_text(encoding='utf-8').replace('.band .motion-letter{visibility:hidden!important}', '.band h2 .motion-word{visibility:hidden!important}')
p.write_text(s,encoding='utf-8')
print('Restored whole-word font shaping and retained Motion word effects. Scrollbars hidden without disabling scrolling.')
