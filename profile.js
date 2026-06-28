document.addEventListener('DOMContentLoaded', () => {

  // ── レーダーチャート ──
  const radarData = [
    { label: '懐きやすさ',   value: 90 },
    { label: '好奇心',       value: 80 },
    { label: '思考力',       value: 50 },
    { label: '雑談力',       value: 30 },
    { label: '論理的思考力', value: 65 },
  ];

  const cx = 200, cy = 200, maxR = 150;
  const total = radarData.length;
  const svg = document.getElementById('radar-chart');

  if (svg) {
    const getPoint = (index, value) => {
      const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
      const r = (value / 100) * maxR;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    };

    // 背景の五角形
    [1, 0.8, 0.6, 0.4, 0.2].forEach(scale => {
      const points = radarData.map((_, i) => {
        const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
        const r = maxR * scale;
        return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
      }).join(' ');
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      poly.setAttribute('points', points);
      poly.setAttribute('fill', 'none');
      poly.setAttribute('stroke', '#c8dff4');
      poly.setAttribute('stroke-width', '1');
      svg.appendChild(poly);
    });

    // 軸線
    radarData.forEach((_, i) => {
      const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
      const x = cx + maxR * Math.cos(angle);
      const y = cy + maxR * Math.sin(angle);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy);
      line.setAttribute('x2', x);  line.setAttribute('y2', y);
      line.setAttribute('stroke', '#c8dff4');
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);
    });

    // データの五角形
    const dataPoints = radarData.map((d, i) => {
      const p = getPoint(i, d.value);
      return `${p.x},${p.y}`;
    }).join(' ');
    const dataPoly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    dataPoly.setAttribute('points', dataPoints);
    dataPoly.setAttribute('fill', 'rgba(181,212,244,0.4)');
    dataPoly.setAttribute('stroke', '#378ADD');
    dataPoly.setAttribute('stroke-width', '2');
    svg.appendChild(dataPoly);

    // 頂点の丸
    radarData.forEach((d, i) => {
      const p = getPoint(i, d.value);
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', p.x); circle.setAttribute('cy', p.y);
      circle.setAttribute('r', '5'); circle.setAttribute('fill', '#378ADD');
      svg.appendChild(circle);
    });

    // ラベル
    radarData.forEach((d, i) => {
      const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
      const r = maxR + 36;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x); text.setAttribute('y', y);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('font-size', '14');
      text.setAttribute('fill', '#042C53');
      text.setAttribute('font-family', 'Zen Maru Gothic');
      text.textContent = d.label;
      svg.appendChild(text);
    });
  }

  // ── メッセージフェードイン（スクロール連動） ──
  const messageParagraphs = document.querySelectorAll('#message p');

  const showMessageLines = () => {
    messageParagraphs.forEach((p, index) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              p.classList.add('visible');
            }, index * 150);
            observer.unobserve(p);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(p);
    });
  };

  // ── タブ切り替え ──
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const currentActive = document.querySelector('.tab-content.active');
      const next = document.getElementById(tab.dataset.tab);

      if (currentActive === next) return;

      currentActive.classList.remove('active');
      currentActive.classList.add('leave');

      setTimeout(() => {
        currentActive.classList.remove('leave');
        next.classList.add('active');

        // メッセージタブのフェードイン発火
        if (tab.dataset.tab === 'message') {
          messageParagraphs.forEach(p => p.classList.remove('visible'));
          setTimeout(showMessageLines, 300);
        }

      }, 300);

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

});