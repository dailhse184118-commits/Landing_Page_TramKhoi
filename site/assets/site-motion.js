(() => {
  'use strict';
  const M = window.Motion;
  const root = document.documentElement;
  if (!M) { root.dataset.motionState = 'fallback'; return; }
  const { animate, scroll, inView, hover, press, stagger } = M;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const originals = new Map();
  const finite = new Set();
  const lanes = new Map();
  const gestureLeaves = new Set();
  const cardAnimations = new Map();
  const cancels = [];
  let armed = false, ticker = null, ribbonVisible = false, ribbonUserPaused = false;
  let resizeTimer = 0;
  const spring = { type: 'spring', stiffness: 260, damping: 26 };
  const ease = [.22, 1, .36, 1];
  function remember(el) {
    if (!originals.has(el)) originals.set(el, el.getAttribute('style'));
    return el;
  }
  function play(el, values, options = {}) {
    const subjects = typeof el === 'string' ? $$(el) : el instanceof Element ? [el] : el;
    const key = Object.keys(values).sort().join(',');
    for (const node of subjects) {
      remember(node);
      const previous = lanes.get(node)?.get(key);
      if (previous) finite.delete(previous);
    }
    const control = animate(el, values, options);
    finite.add(control);
    for (const node of subjects) {
      if (!lanes.has(node)) lanes.set(node, new Map());
      lanes.get(node).set(key, control);
    }
    control.then(() => {
      finite.delete(control);
      for (const node of subjects) {
        const owner = lanes.get(node);
        if (owner?.get(key) === control) owner.delete(key);
        if (owner?.size === 0) lanes.delete(node);
      }
    });
    return control;
  }
  function splitWords(el) {
    if (el.dataset.motionWords) return;
    const nodes = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) if (walker.currentNode.textContent.trim()) nodes.push(walker.currentNode);
    let index = 0;
    for (const node of nodes) {
      const fragment = document.createDocumentFragment();
      for (const part of node.textContent.split(/(\s+)/)) {
        if (!part.trim()) { fragment.append(document.createTextNode(part)); continue; }
        const clip = document.createElement('span');
        clip.className = 'motion-word-clip';
        const word = document.createElement('span');
        word.className = 'motion-word';
        word.style.setProperty('--wi', String(index++));
        word.textContent = part;
        clip.append(word); fragment.append(clip);
      }
      node.replaceWith(fragment);
    }
    el.dataset.motionWords = 'true';
  }
  $$('.band h2,.static-copy h2,.section-heading,.intro-text').forEach(splitWords);
  function updateTicker() {
    if (!ticker) return;
    if (!armed || document.hidden || !ribbonVisible || ribbonUserPaused) ticker.pause();
    else ticker.play();
  }
  function buildTicker() {
    ticker?.stop();
    if (!armed) return;
    const track = remember($('.ribbon-track'));
    const group = $('.ribbon-group');
    while (group.getBoundingClientRect().width < innerWidth + 64) group.innerHTML += group.innerHTML;
    if (group.nextElementSibling.innerHTML !== group.innerHTML) group.nextElementSibling.innerHTML = group.innerHTML;
    const width = group.getBoundingClientRect().width;
    ticker = animate(track, { x: [0, -width] }, { duration: width / 45, repeat: Infinity, ease: 'linear' });
    updateTicker();
  }
  $('.ribbon-pause').addEventListener('click', e => {
    ribbonUserPaused = !ribbonUserPaused;
    const button = e.currentTarget;
    button.setAttribute('aria-pressed', String(ribbonUserPaused));
    button.setAttribute('aria-label', ribbonUserPaused ? 'Tiếp tục dải chữ' : 'Tạm dừng dải chữ');
    button.firstElementChild.textContent = ribbonUserPaused ? '▷' : 'Ⅱ';
    updateTicker();
  });
  function setupEntrances() {
    cancels.push(inView('.section-heading,.intro-text', el => {
      if (el.dataset.motionEntered) return;
      el.dataset.motionEntered = 'true';
      play([...el.querySelectorAll('.motion-word')], { y: ['105%', '0%'], rotateX: [35, 0], rotate: [3, 0], opacity: [0, 1] }, { duration: .68, delay: stagger(.055), ease });
    }, { amount: .35 }));
    cancels.push(inView('#drink-grid', grid => {
      if (grid.dataset.motionEntered) return;
      grid.dataset.motionEntered = 'true';
      const images = [...grid.querySelectorAll('.drink-image')];
      images.forEach((el, i) => play(el, { y: [65, 0], rotate: [i % 2 ? 5 : -5, 0], scale: [.94, 1], opacity: [0, 1] }, { type: 'spring', visualDuration: .58, bounce: .16, delay: i * .08 }));
    }, { amount: .15 }));
    cancels.push(inView('.story-right', el => {
      if (el.dataset.motionEntered) return;
      el.dataset.motionEntered = 'true';
      const steps = [...el.querySelectorAll('.story-step')];
      steps.forEach(step => step.classList.add('step-visible'));
      play(steps, { x: [28, 0], opacity: [0, 1] }, { duration: .5, delay: stagger(.12), ease });
    }, { amount: .2 }));
    cancels.push(inView('.community-card', el => {
      if (el.dataset.motionEntered) return;
      el.dataset.motionEntered = 'true';
      play(el, { y: [45, 0], rotate: [-6, 3], opacity: [0, 1] }, { type: 'spring', visualDuration: .65, bounce: .16 });
    }, { amount: .25 }));
    if (scrollY < 100) {
      const heading = document.body.classList.contains('hero-static') ? $('.static-copy h2') : $('.band h2');
      play([...heading.querySelectorAll('.motion-word')], { y: ['100%', '0%'], rotateX: [25, 0], opacity: [0, 1] }, { duration: .64, delay: stagger(.075, { startDelay: .1 }), ease });
    }
  }
  function setupScroll() {
    const bar = remember($('.read-progress'));
    const progress = animate(bar, { scaleX: [0, 1] }, { ease: 'linear', autoplay: false });
    cancels.push(scroll(progress), () => progress.cancel());
    if (fine.matches) {
      const image = remember($('.coffee-photo'));
      const parallax = animate(image, { y: [-18, 18], scale: [1.08, 1.08] }, { ease: 'linear', autoplay: false });
      cancels.push(scroll(parallax, { target: $('.coffee-section'), offset: ['start end', 'end start'] }), () => parallax.cancel());
      const stamp = remember($('.round-stamp'));
      const rotate = animate(stamp, { rotate: [-20, 8] }, { ease: 'linear', autoplay: false });
      cancels.push(scroll(rotate, { target: $('.coffee-section'), offset: ['start end', 'end start'] }), () => rotate.cancel());
    }
  }
  function setupGestures() {
    cancels.push(press('.btn,.filter,.drink-image,.ribbon-pause', el => {
      play(el, { scale: .97 }, { duration: .12, ease: 'easeOut' });
      return () => { if (armed) play(el, { scale: 1 }, spring); };
    }));
    if (!fine.matches) return;
    cancels.push(hover('.btn', el => {
      play(el, { y: -3 }, spring);
      const arrow = el.querySelector('.arrow');
      if (arrow) play(arrow, { x: 3, y: -3 }, spring);
      return () => {
        if (!armed) return;
        play(el, { y: 0 }, spring);
        if (arrow) play(arrow, { x: 0, y: 0 }, spring);
      };
    }));
    cancels.push(hover('.drink-image', el => {
      const card = el.closest('.drink-card');
      card.style.zIndex = '3';
      const rect = el.getBoundingClientRect();
      let raf = 0, x = 0, y = 0;
      const update = () => { raf = 0; if (armed) play(el, { rotateX: -y * 6, rotateY: x * 7 }, { type: 'spring', stiffness: 210, damping: 24 }); };
      const move = e => {
        x = Math.max(-1, Math.min(1, (e.clientX - rect.left) / rect.width * 2 - 1));
        y = Math.max(-1, Math.min(1, (e.clientY - rect.top) / rect.height * 2 - 1));
        if (!raf) raf = requestAnimationFrame(update);
      };
      play(el, { y: -10, scale: 1.025 }, spring);
      el.addEventListener('pointermove', move, { passive: true });
      const clear = () => { el.removeEventListener('pointermove', move); if (raf) cancelAnimationFrame(raf); card.style.removeProperty('z-index'); };
      gestureLeaves.add(clear);
      return () => {
        clear(); gestureLeaves.delete(clear);
        if (armed) play(el, { rotateX: 0, rotateY: 0, y: 0, scale: 1 }, spring);
      };
    }));
    cancels.push(hover('.community-card', el => {
      play(el, { rotate: 0, y: -7 }, spring);
      return () => { if (armed) play(el, { rotate: 3, y: 0 }, spring); };
    }));
  }
  function captureCards() {
    if (!armed) return null;
    const before = new Map();
    for (const el of $$('.drink-card:not([hidden])')) before.set(el, el.getBoundingClientRect());
    for (const control of cardAnimations.values()) { control.stop(); finite.delete(control); }
    cardAnimations.clear();
    return before;
  }
  function animateCards(before) {
    if (!armed || !before) return;
    const visible = $$('.drink-card:not([hidden])');
    for (const el of $$('.drink-card')) { el.style.removeProperty('transform'); el.style.removeProperty('opacity'); }
    const after = visible.map(el => el.getBoundingClientRect());
    visible.forEach((el, i) => {
      const old = before.get(el), next = after[i];
      const control = play(el, { x: [old ? old.left - next.left : 0, 0], y: [old ? old.top - next.top : 24, 0], opacity: [old ? 1 : 0, 1] }, { type: 'spring', visualDuration: .38, bounce: .1, delay: old ? 0 : i * .025 });
      cardAnimations.set(el, control);
      control.then(() => {
        if (cardAnimations.get(el) !== control) return;
        cardAnimations.delete(el);
        el.style.removeProperty('transform'); el.style.removeProperty('opacity');
      });
    });
    const feedback = $('#filter-feedback');
    play(feedback, { y: [5, 0], opacity: [.45, 1] }, { duration: .24, ease });
  }
  function openDialog() {
    if (armed) play($('.lightbox'), { opacity: [0, 1], y: [24, 0], scale: [.96, 1] }, { duration: .32, ease });
  }
  function stop() {
    armed = false;
    for (const leave of gestureLeaves) leave();
    gestureLeaves.clear();
    for (const cancel of cancels.splice(0)) cancel();
    for (const control of finite) control.stop();
    finite.clear(); cardAnimations.clear(); lanes.clear();
    ticker?.stop(); ticker = null;
    const saved = [...originals];
    const restore = () => {
      for (const [el, original] of saved) {
        if (original === null) el.removeAttribute('style'); else el.setAttribute('style', original);
      }
    };
    restore();
    requestAnimationFrame(() => { if (!armed) restore(); });
    originals.clear();
  }
  function apply() {
    stop();
    document.body.classList.add('motion-enhanced');
    root.dataset.motionState = reduce.matches ? 'reduced' : 'active';
    if (reduce.matches) return;
    armed = true;
    setupEntrances(); setupScroll(); setupGestures(); buildTicker();
    document.fonts.ready.then(() => { if (armed) buildTicker(); });
    cancels.push(inView('.brand-ribbon', () => { ribbonVisible = true; updateTicker(); return () => { ribbonVisible = false; updateTicker(); }; }));
  }
  window.tramMotion = { captureCards, animateCards, openDialog };
  let atmosphereVisible = false;
  const atmosphereObserver = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.target === document.querySelector('main')) atmosphereVisible = entry.isIntersecting;
    updateAtmosphere();
  });
  function updateAtmosphere() {
    document.body.classList.toggle('atmosphere-active', atmosphereVisible && !reduce.matches && !document.hidden && document.body.classList.contains('hero-static') || atmosphereVisible && !reduce.matches && !document.hidden && scrollY > document.querySelector('.journey').offsetHeight - innerHeight);
  }
  atmosphereObserver.observe(document.querySelector('main'));
  addEventListener('scroll', updateAtmosphere, { passive: true });
  reduce.addEventListener('change', updateAtmosphere);
  reduce.addEventListener('change', apply);
  fine.addEventListener('change', apply);
  document.addEventListener('visibilitychange', () => {
    updateAtmosphere();
    updateTicker();
    for (const control of finite) document.hidden ? control.pause() : control.play();
  });
  addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(buildTicker, 160); }, { passive: true });
  addEventListener('pagehide', stop);
  apply();
})();
