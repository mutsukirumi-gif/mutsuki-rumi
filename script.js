document.addEventListener("DOMContentLoaded", () => {
  console.log('video-wrap:', document.querySelector('.video-wrap'));
  console.log('cursor-effect:', document.querySelector('.cursor-effect'));

  // ── フェードイン ──
  const fadeElements = document.querySelectorAll('.fade-in');
  const showOnScroll = () => {
    fadeElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight - 100) {
        element.classList.add('show');
      }
    });
  };
  showOnScroll();
  window.addEventListener('scroll', showOnScroll);

  // ── 文字のアニメーション ──
  const elements = document.querySelectorAll('.rolling-text');
  elements.forEach(element => {
    let innerText = element.innerText;
    element.innerHTML = '';
    let textContainer = document.createElement('div');
    textContainer.classList.add('block');
    for (let letter of innerText) {
      let span = document.createElement('span');
      span.innerText = letter.trim() === '' ? '\xa0' : letter;
      span.classList.add('letter');
      textContainer.appendChild(span);
    }
    element.appendChild(textContainer);
    if (window.innerWidth > 768) {  // ← スマホでは複製しない
      element.appendChild(textContainer.cloneNode(true));
    }
  });

  elements.forEach(element => {
    element.addEventListener('mouseover', () => {
      element.classList.remove('play');
    });
  });

  // ── カーソルエフェクト（流れ星） ──
  const videoWrap = document.querySelector('.video-wrap');
  const mainImage = document.querySelector('.main-image');  // ← 追加

  // WORKSページ用
  const worksMain = document.querySelector('main');

  const targetArea = videoWrap || worksMain;  // どちらかがあれば適用

  if (videoWrap) {
    videoWrap.addEventListener('mousemove', (e) => {
      const rect = videoWrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 流れ星の粒を生成
      const star = document.createElement('div');
      star.classList.add('star-particle');
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      videoWrap.appendChild(star);

      // アニメーション後に削除
      setTimeout(() => {
        star.remove();
      }, 600);
    });
  }

});

// ── ローダー制御 ──
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  gsap.set('svg', { visibility: 'visible' });
  gsap.set('.dot', { transformOrigin: '50% 50%', attr: { cx: 'random(350, 450)', cy: 440, r: 'random(4, 20)' } });
  gsap.set('.outsideDot', { transformOrigin: '50% 50%', attr: { cx: 'random(370, 420)', cy: 420, r: 'random(3, 19)' } });
  gsap.to('.dots1 .dot', { duration: 'random(2,8)', attr: { cy: 'random(-220, -320)' }, stagger: { each: 0.16, repeat: -1 }, ease: 'linear' }).seek(100);
  gsap.to('.dots2 .dot', { duration: 'random(2,5)', attr: { cy: 'random(-220, -320)' }, stagger: { each: 0.16, repeat: -1 }, ease: 'sine.in' }).seek(100);
  gsap.to('.dots3 .dot', { duration: 'random(6,12)', attr: { cy: 'random(-220, -320)' }, stagger: { each: 0.16, repeat: -1 }, ease: 'sine.in' }).seek(100);
  gsap.to('.dots4 .dot', { duration: 'random(3,9)', attr: { cy: 'random(-220, -320)' }, stagger: { each: 0.16, repeat: -1 }, ease: 'sine.in' }).seek(100);
  gsap.to('.dots5 .outsideDot', { duration: 'random(3,9)', attr: { cy: 'random(-220, -320)', r: 0 }, stagger: { each: 0.16, repeat: -1 }, ease: 'power2.in' }).seek(100);
  gsap.to('.outline', { duration: gsap.utils.wrap([7, 6.1, 5.2]), svgOrigin: '400 300', rotation: gsap.utils.wrap([-360, -360]), ease: 'linear', stagger: { each: 1, repeat: -1 } }).seek(200);
  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => { loader.style.display = 'none'; }, 300);
  }, 2000);
});

document.querySelectorAll('a[href]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#')) return;
    e.preventDefault();
    const loader = document.querySelector('.loader');
    
    loader.style.display = 'flex';
    loader.style.opacity = '1';
    loader.classList.remove('hide');

    // GSAPを再起動
    gsap.set('#mainSVG', { visibility: 'visible' });
    gsap.to('.dots1 .dot', { duration: 'random(2,8)', attr: { cy: 'random(-220, -320)' }, stagger: { each: 0.16, repeat: -1 }, ease: 'linear' }).seek(100);
    gsap.to('.dots2 .dot', { duration: 'random(2,5)', attr: { cy: 'random(-220, -320)' }, stagger: { each: 0.16, repeat: -1 }, ease: 'sine.in' }).seek(100);
    gsap.to('.outline', { duration: gsap.utils.wrap([7, 6.1, 5.2]), svgOrigin: '400 300', rotation: gsap.utils.wrap([-360, -360]), ease: 'linear', stagger: { each: 1, repeat: -1 } }).seek(200);

    setTimeout(() => { window.location.href = href; }, 800);
  });
});