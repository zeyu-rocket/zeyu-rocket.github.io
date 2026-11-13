const photos = Array.from(document.querySelectorAll('.photo-link'));
const viewer = document.querySelector('.viewer');

if (typeof viewer.showModal === 'function') {
  const image = viewer.querySelector('.viewer-image');
  const caption = viewer.querySelector('.viewer-caption');
  let current = 0;
  let opener;

  function showPhoto(index) {
    current = (index + photos.length) % photos.length;
    const photo = photos[current];
    image.alt = photo.querySelector('img').alt;
    image.src = photo.href;
    caption.textContent = photo.dataset.title;
  }

  photos.forEach((photo, index) => {
    photo.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = photo;
      showPhoto(index);
      viewer.showModal();
    });
  });

  viewer.querySelector('.viewer-prev').addEventListener('click', () => showPhoto(current - 1));
  viewer.querySelector('.viewer-next').addEventListener('click', () => showPhoto(current + 1));
  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());

  viewer.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });

  viewer.addEventListener('close', () => {
    image.removeAttribute('src');
    opener?.focus();
  });
}
