// Simple gallery lightbox + basic accessibility
document.addEventListener('DOMContentLoaded', () => {
  const imgs = Array.from(document.querySelectorAll('.gallery-img'));
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose = document.getElementById('lb-close');

  function openLightbox(src, alt, caption) {
    lbImg.src = src;
    lbImg.alt = alt || 'Photo';
    lbCaption.textContent = caption || '';
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    // trap focus if needed
    lbClose.focus();
  }

  function closeLightbox() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    lbImg.src = '';
  }

  imgs.forEach(img => {
    img.addEventListener('click', () => {
      const src = img.src;
      const alt = img.alt;
      const caption = img.getAttribute('data-caption') || '';
      openLightbox(src, alt, caption);
    });

    img.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') img.click();
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.classList.contains('open')) closeLightbox();
  });
});
