console.log('Hello from 4filmDetailsPage');

const addToWatchedFilm = document.querySelector('.btn-modal'); //todo: Кнопки на модалке
console.log(addToWatchedFilm);
const addToWatchedQueue = document.querySelector('.btn-modal'); //todo: Кнопки на модалке
const watched = document.querySelector('.button-watched'); //? Кнопки на хедере
const addToWatched = document.querySelector('.btn-modal'); //? Кнопки на хедере

function monitorButtonStatusText() {
  // должна следить за состоянием, читает  local storage по ключу filmsQueue и  filmsWatched
  //  и меняет текст и значки в кнопках:
  // Delete from queue / Add to queue; Delete from watched / Add to watched.
}

let filmsWatched = [];

function toggleToQueue(film) {
  let filmsQueue = [];
  const savedSettings = localStorage.getItem('filmsQueue');

  if (savedSettings !== []) {
    filmsQueue.push(film);
    filmsQueue.forEach(e => console.log(`добавил фильм c ${e.id}`));
  } else {
    console.log('пустой масив');
  }

  console.log(filmsQueue);
  localStorage.setItem('filmsQueue', JSON.stringify(filmsQueue));
}

function toggleToWatched(film) {
  filmsWatched.push(film);
  console.log(filmsWatched);
  localStorage.setItem('filmsWatched', JSON.stringify(filmsWatched));
}
