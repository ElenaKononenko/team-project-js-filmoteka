console.log('Hello from 4filmDetailsPage');

const addToWatchedFilm = document.querySelector('.btn-modal'); //todo: Кнопки на модалке
console.log(addToWatchedFilm);
const addToWatchedQueue = document.querySelector('.btn-modal'); //todo: Кнопки на модалке
const watched = document.querySelector('.button-watched'); //? Кнопки на хедере
const addToWatched = document.querySelector('.btn-modal'); //? Кнопки на хедере

function toggleFilmId(key, filmId) {
  const filmIds = JSON.parse(localStorage.getItem(key)) || {};

  if (isFilmAddedToList(key, filmId)) {
    delete filmIds[filmId];
  } else {
    filmIds[filmId] = true;
  }

  localStorage.setItem(key, JSON.stringify(filmIds));
}

function isFilmAddedToList(key, filmId) {
  const filmIds = JSON.parse(localStorage.getItem(key)) || {};

  return filmIds[filmId] != undefined;
}
