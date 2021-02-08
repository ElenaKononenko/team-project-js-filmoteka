console.log('Hello from 4filmDetailsPage');

// Local storage keys
const moviesWatchedKeyName = 'filmsWatched';
const moviesQueuedKeyName = 'filmsQueue';
const selectedClassName = 'selected';
const btnWatchedRef = document.querySelector('.button-watched');
const btnQueueRef = document.querySelector('.button-queue');

// Config file for button titles for each watched and queued movies
const buttonTitles = {
  [moviesWatchedKeyName]: {
    add: 'ADD TO WATCHED',
    delete: 'DELETE FROM WATCHED',
  },
  [moviesQueuedKeyName]: {
    add: 'ADD TO QUEUE',
    delete: 'DELETE FROM QUEUE',
  },
};

// Set default selected Tab
let selectedMovieListKey = moviesWatchedKeyName;

function initModalDialogButton(movieListKey, buttonId, movie) {
  const buttonElement = document.getElementById(buttonId);
  if (!loggedIn) {
    buttonElement.classList.add('visually-hidden');
    return;
  }

  if (!isMovieAddedToList(movieListKey, movie.id)) {
    buttonElement.classList.add(selectedClassName);
  }

  buttonElement.addEventListener('click', event => {
    const btn = event.currentTarget;
    const movieId = btn.dataset.id;

    toggleMovieExistenceInList(movieListKey, movie);
    btn.innerHTML = getButtonTitle(movieListKey, movieId);
    btn.classList.toggle(selectedClassName);
    rerenderPageWithMovies(selectedMovieListKey);
  });
}

function getButtonTitle(movieListKey, movieId) {
  return isMovieAddedToList(movieListKey, movieId)
    ? buttonTitles[movieListKey].delete
    : buttonTitles[movieListKey].add;
}

function toggleMovieExistenceInList(movieListKey, movie) {
  const movieId = movie.id;
  const movieIds = getMoviesList(movieListKey) || {};

  if (isMovieAddedToList(movieListKey, movieId)) {
    delete movieIds[movieId];
  } else {
    movieIds[movieId] = movie;
  }

  localStorage.setItem(movieListKey, JSON.stringify(movieIds));
}

function isMovieAddedToList(movieListKey, movieId) {
  const movieIds = getMoviesList(movieListKey) || {};

  return movieIds[movieId] !== undefined;
}

function getMoviesList(movieListKey) {
  return JSON.parse(localStorage.getItem(movieListKey));
}

initHeaderButton('.button-queue', moviesQueuedKeyName);
initHeaderButton('.button-watched', moviesWatchedKeyName);

function initHeaderButton(buttonId, movieListKey) {
  const buttonElement = document.querySelector(buttonId);

  buttonElement.addEventListener('click', () => {
    selectedMovieListKey = movieListKey;
    rerenderPageWithMovies(movieListKey);
  });
}

function rerenderPageWithMovies(movieListKey) {
  const listElement = document.querySelector('.galleryLibrary');
  const moviesMap = getMoviesList(movieListKey);
  const moviesToRender = Object.values(moviesMap).filter(movie =>
    isMovieAddedToList(movieListKey, movie.id),
  );

  if (moviesToRender.length === 0) {
    listElement.innerHTML = `
    <div class="empty-container">
      <div class="empty-state">
        You do not have to ${
          movieListKey === moviesWatchedKeyName ? 'watched' : 'queue'
        } movies to watch
        </div>
        <div class="empty-img"><img src="./images/noPoster.jpg"alt="Ошибка"></div></div>`;

    return;
  }

  const cardsFragment = document.createDocumentFragment();

  moviesToRender.map(movie => {
    cardsFragment.appendChild(createCardFunc(movie));
  });

  listElement.innerHTML = '';
  listElement.appendChild(cardsFragment);
}

function onLibraryPageLoad() {
  rerenderPageWithMovies(selectedMovieListKey);
}
