console.log('Hello from 4filmDetailsPage');

function onPicClick(event) {
  event.preventDefault();
  // console.log(event.target.dataset);
  // console.log(event.target.nodeName);

  if (event.target.nodeName !== 'IMG') {
    console.log('мимо');
    return;
  } else {
    console.log(event.target.dataset.source);
  }

  backDropRef.classList.add('is-open');
  lightboxImg.src = event.target.dataset.source;
  window.addEventListener('keydown', onPressEscape);
}

closeModalBtn.addEventListener('click', onCloseModal);
OverlayRef.addEventListener('click', onBackDropClick);

function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  backDropRef.classList.remove('is-open');
  lightboxImg.src = '';
}

function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
  lightboxImg.src = '';
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
