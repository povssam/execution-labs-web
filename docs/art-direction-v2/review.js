const viewer = document.querySelector('.viewer');
const viewerImage = document.querySelector('.viewer-image');
const viewerClose = document.querySelector('.viewer-close');

function closeViewer() {
  if (viewer.open) viewer.close();
  viewerImage.removeAttribute('src');
}

document.querySelectorAll('[data-image]').forEach((button) => {
  button.addEventListener('click', () => {
    viewerImage.src = `./${button.dataset.image}`;
    viewerImage.alt = button.dataset.alt || '';
    viewer.showModal();
  });
});

viewerClose.addEventListener('click', closeViewer);
viewer.addEventListener('click', (event) => {
  if (event.target === viewer) closeViewer();
});
viewer.addEventListener('close', () => viewerImage.removeAttribute('src'));
