(() => {
  'use strict';
  const names={mobile:'Linh động · 10.000.000 VNĐ',standard:'Tiêu chuẩn · 25.000.000 VNĐ',full:'Toàn diện · 85.000.000 VNĐ'};
  document.querySelectorAll('[data-package]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-package]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    const summary=document.getElementById('selected-package');summary.hidden=false;summary.textContent='Bạn đang quan tâm gói '+names[button.dataset.package]+'.';
    document.getElementById('cong-dong').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  }));
})();
