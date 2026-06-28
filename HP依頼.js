document.addEventListener('DOMContentLoaded', () => {
  const textAnims = document.querySelectorAll('.text-anim');

  setTimeout(() => {
    textAnims.forEach(text => text.classList.add('is-active'));
  }, 2300);
});

// スクロールフェードイン
const fadeTargets = document.querySelectorAll('.setumei1, .setumei2, .setumei3, .setumei4, .gaiyou, .gaiyou1, .gaiyou2, .setumei-image');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('scroll-show');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeTargets.forEach(el => scrollObserver.observe(el));