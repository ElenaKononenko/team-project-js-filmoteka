console.log('Hello from 4filmDetailsPage');

const addToWatchedFilm = document.querySelector('.btn-modal'); //todo: Кнопки на модалке
console.log(addToWatchedFilm);
const addToWatchedQueue = document.querySelector('.btn-modal'); //todo: Кнопки на модалке
const watched = document.querySelector('.button-watched'); //? Кнопки на хедере
const addToWatched = document.querySelector('.btn-modal'); //? Кнопки на хедере

let filmsWatched = [];
let filmsQueue = [];
let QUEUE = false;
const WATCHED = false;
function toggleToQueue(e) {
  e.preventDefault();
  const currentFilmId = e.currentTarget.dataset.id;
  const savedSettings = localStorage.getItem('filmsQueue');
  const parsedSettings = JSON.parse(savedSettings);

  filmsQueue = parsedSettings; // todo: Надо мапать , и в мапе прописать логику
  if (filmsQueue === null) {
    filmsQueue = [];
  }
  let findFilm = filmsQueue.find(el => {
    return el.id === currentFilmId;
  });
  if (findFilm === undefined) {
    findFilm = { test1, id: currentFilmId };
  }

  const test = Object.keys(findFilm);
  console.log(!QUEUE);
  test.forEach(el => {
    findFilm.test1 = !QUEUE;
    QUEUE = !QUEUE;
  });

  findFilm.QUEUE = !findFilm[QUEUE];

  let mass = { ...findFilm };

  const findIndex = filmsQueue.findIndex(el => {
    return el.id === currentFilmId;
  });
  if (findIndex === -1) {
    filmsQueue.push(mass);
  } else {
    filmsQueue.splice(findIndex, 1, mass);
  }

  localStorage.setItem('filmsQueue', JSON.stringify(filmsQueue));
}

// function toggleToWatched(film) {
//   filmsWatched.push(film);
//   console.log(filmsWatched);
//   localStorage.setItem('filmsWatched', JSON.stringify(filmsWatched));
// }
