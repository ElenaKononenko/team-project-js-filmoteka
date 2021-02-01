console.log('Hello from 3navigation');
const modalCard = document.querySelector('.modalCard');
const backDropRef = document.querySelector('.js-modal');
const overlayRef = document.querySelector('.overlay');

function activeDetailsPage(movie) {
  backDropRef.classList.add('is-open');
  showDetails(movie);
  window.addEventListener('keydown', onPressEscape);
  overlayRef.addEventListener('click', onBackDropClick);
}

function showDetails({
  poster_path: imgPath,
  title: filmTitle,
  vote_average: voteAverage,
  vote_count: voteCount,
  popularity: popularity,
  original_title: originalTitle,
  genre_ids: genre,
  overview: description,
}) {
  const modalCardinfo = `<img class="gallery__item__picture"
                    src='${basicPosterUrl}${imgPath}'
                    alt=${filmTitle}
                    />
        <h2 class="gallery__item__title">${filmTitle}</h2>
        <p class="votes">Vote/Votes${voteAverage}${voteCount}</p>
        <p class="votes">Popularity${popularity}</p>
        <p class="votes">Original Title${originalTitle}</p>
        <p class="votes">${genreStringModal(genre)}</p>
        <h2 class="about">ABOUT</h2>
        <p class="votes about">${description}</p>`;

  modalCard.insertAdjacentHTML('afterbegin', modalCardinfo);
}

function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  backDropRef.classList.remove('is-open');
  modalCard.innerHTML = '';
}

function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

//********************************************//

const selectFilm = [];

const refs = {
  home: document.getElementById('js-home'),
  myLibrary: document.getElementById('js-library'),
  sectionHomePage: document.querySelector('.sectionHomePage'),
  sectionDetailsPage: document.querySelector('.sectionDetailsPage'),
  sectionLibrary: document.querySelector('.sectionLibrary'),
  btnQueue: document.querySelector('.btnQueue'),
  btnWatched: document.querySelector('.btnWatched'),
  btnAddQueue: document.querySelector('.btnAddQueue'),
  btnAddWatched: document.querySelector('.btnAddWatched'),
  logo: document.getElementById('js-logo'),
};

function activeHomePage() {
  refs.sectionHomePage.classList.remove('.btnIsHidden'); //открываем секцию
  refs.sectionDetailsPage.classList.add('.btnIsHidden'); //скрываем секцию
  refs.sectionLibrary.classList.add('.btnIsHidden'); //скрываем секцию

  refs.backBtn.addEventListener('click', plaginationNavigation); //Ира 2
  refs.nextBtn.addEventListener('click', plaginationNavigation); //Ира 2

  refs.btnQueue.removeEventListener('click', drawQueueFilmList); //пишет Женя 5
  refs.btnWatched.removeEventListener('click', drawWatchedFilmList); //пишет Женя 5

  refs.btnAddQueue.removeEventListener('click', toggleToQueue()); //пишет Артем
  refs.btnAddWatched.removeEventListener('click', toggleToWatched()); //пишет Артем
}

function activeLibraryPage() {
  refs.sectionLibrary.classList.remove('.btnIsHidden');
  refs.sectionHomePage.classList.add('.btnIsHidden');
  refs.sectionDetailsPage.classList.add('.btnIsHidden');

  drawQueueFilmList(
    'функцию отрисовки фильмов из очереди drawQueueFilmList которую сделает пятый участник',
  );

  refs.btnQueue.classList.add('.создать класс эффект выбранной кнопки');

  refs.btnQueue.addEventListener('click', drawQueueFilmList); //пишет Женя 5
  refs.btnWatched.addEventListener('click', drawWatchedFilmList); //пишет Женя 5

  refs.btnAddQueue.removeEventListener('click', toggleToQueue()); //пишет Артем
  refs.btnAddWatched.removeEventListener('click', toggleToWatched()); //пишет Артем

  refs.backBtn.removeEventListener('click', plaginationNavigation); //Ира 2
  refs.nextBtn.removetListener('click', plaginationNavigation); //Ира 2
}

// function activeDetailsPage(movield, itsLibraryFilm) {
//   refs.sectionLibrary.classList.add('.btnIsHidden');
//   refs.sectionHomePage.classList.add('.btnIsHidden');
//   refs.sectionDetailsPage.classList.remove('.btnIsHidden');

//   //модалка

//   refs.btnQueue.removeEventListener('click', drawQueueFilmList); //пишет Женя 5
//   refs.btnWatched.removeEventListener('click', drawWatchedFilmList); //пишет Женя 5

//   refs.btnAddQueue.addEventListener('click', toggleToQueue); //пишет Артем 4
//   refs.btnAddWatched.addEventListener('click', toggleToWatched); //пишет Артем 4

//   refs.backBtn.removeEventListener('click', plaginationNavigation); //Ира 2
//   refs.nextBtn.removetListener('click', plaginationNavigation); //Ира 2
// }

refs.home.addEventListener('click', activeHomePage);
refs.myLibrary.addEventListener('click', activeLibraryPage);
refs.logo.addEventListener('click', activeHomePage);

function genreStringModal(genre) {
  if (genre.length === 0) {
    return 'Other';
  }
  return genre
    .reduce((acc, el, index) => {
      return (
        acc +
        (genres.find(elem => {
          return elem.id === el;
        }).name || 'Other') +
        ', '
      );
    }, '')
    .slice(0, -2);
}


