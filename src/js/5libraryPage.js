console.log('Hello page5');

const listLibrary = document.querySelector('.galleryLibrary');

// Меняет Хедер по нажатию на myLibrary

libraryLink.addEventListener('click', e => {
  console.log(e.target);

  homeHeader.classList.add('visually-hidden');
  homeSection.classList.add('visually-hidden');
  libaryHeader.classList.remove('visually-hidden');
  librarySection.classList.remove('visually-hidden');
  renderAuthCheckLibrary();
  libraryLink.classList.add('current');
  homeLink.classList.remove('current');

  btnWatchedRef.classList.add(selectedClassName);
});

btnQueueRef.addEventListener('click', () => {
  btnQueueRef.classList.add(selectedClassName);
  btnWatchedRef.classList.remove(selectedClassName);
});
btnWatchedRef.addEventListener('click', () => {
  btnWatchedRef.classList.add(selectedClassName);
  btnQueueRef.classList.remove(selectedClassName);
});

function renderAuthCheckLibrary() {
  if (loggedIn) {
    onLibraryPageLoad();
  } else {
    console.log('qqqqq');
    // СЮДА ВСТАВИТЬ "ЗАГЛУШКУ " НА БИБЛИОТЕКУ, КОТОРАЯ НЕ ПОКАЗЫВАЕТ ЕЕ ДО АВТОРИЗАЦИИ
    listLibrary.innerHTML = `
      <div class="empty-state">
        Please login to use the library
      </div>`;
  }
}
