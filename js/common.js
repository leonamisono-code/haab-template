document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // ハンバーガーメニュー（円形展開モーフアニメ）
  // =========================================
  const hamburger = document.querySelector('.hamburger-morph');
  const nav       = document.querySelector('.nav-morph');
  const menuLinks = document.querySelectorAll('.nav-morph__link');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('active');
      nav.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      nav.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
        nav.setAttribute('aria-hidden', true);
        document.body.style.overflow = '';
      });
    });
  }

  // =========================================
  // フワッとfade-in（IntersectionObserver）
  // =========================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // =========================================
  // Q&A アコーディオン（slideToggle風）
  // =========================================
  document.querySelectorAll('.faq-heading').forEach(heading => {
    heading.addEventListener('click', () => {
      const content = heading.nextElementSibling;
      const isActive = heading.classList.contains('active');

      // 他を閉じる場合は以下をコメント解除
      // document.querySelectorAll('.faq-heading.active').forEach(h => {
      //   h.classList.remove('active');
      //   h.nextElementSibling.style.display = 'none';
      // });

      heading.classList.toggle('active', !isActive);
      content.style.display = isActive ? 'none' : 'block';
    });
  });

  // =========================================
  // 画像タップ→詳細展開（toggle-expand）
  // 使い方:
  //   <div class="toggle-item">
  //     <img src="img/summary.png" class="toggle-thumb" alt="...">
  //     <div class="toggle-detail">
  //       <img src="img/detail.png" alt="...">
  //     </div>
  //   </div>
  // =========================================
  document.querySelectorAll('.toggle-thumb').forEach(thumb => {
    const detail = thumb.nextElementSibling;
    if (!detail) return;
    detail.style.maxHeight = '0';
    detail.style.overflow = 'hidden';
    detail.style.transition = 'max-height 0.5s ease';

    thumb.style.cursor = 'pointer';

    thumb.addEventListener('click', () => {
      const isOpen = thumb.classList.contains('is-open');
      if (isOpen) {
        // 閉じる：スクロール位置を戻す
        const top = thumb.getBoundingClientRect().top + document.querySelector('.content_wrapper').scrollTop;
        thumb.classList.remove('is-open');
        detail.style.maxHeight = '0';
        setTimeout(() => {
          document.querySelector('.content_wrapper').scrollTo({ top: top - 30, behavior: 'smooth' });
        }, 300);
      } else {
        // 開く
        thumb.classList.add('is-open');
        detail.style.maxHeight = detail.scrollHeight + 'px';
        // 詳細が開いたらスクロールして見せる
        setTimeout(() => {
          detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  });

  // =========================================
  // アクセスタブ
  // =========================================
  const tabItems  = document.querySelectorAll('.tab-item');
  const panelItems = document.querySelectorAll('.panel-item');
  tabItems.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabItems.forEach(t => t.classList.remove('is-active'));
      panelItems.forEach(p => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      if (panelItems[i]) panelItems[i].classList.add('is-active');
    });
  });

});
