console.log('Hello from 4filmDetailsPage');

const addToWatchedFilm = document.querySelector('.btn-modal'); //todo: Кнопки на модалке
console.log(addToWatchedFilm);
const addToWatchedQueue = document.querySelector('.btn-modal'); //todo: Кнопки на модалке
const watched = document.querySelector('.button-watched'); //? Кнопки на хедере
const addToWatched = document.querySelector('.btn-modal'); //? Кнопки на хедере

let filmsWatched = [];
let filmsQueue = [];
//let QUEUE = false;
function getFilm(data) {
  console.log(data);
  data.find(el => {
    console.log(el);
    let less;
  });
}

const interest = { QUEUE: false, WATCHED: false };
//const WATCHED = false;
//todo: начало нашего варианта  варианта =================================================================
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
  console.log(findFilm);
  if (findFilm === undefined) {
    console.log(findFilm);
    findFilm = { id: currentFilmId }; //todo: убрал из объекта test
  }

  const test = Object.keys(findFilm);

  test.forEach(el => {
    //где-то тут проблема

    findFilm.QUEUE = !interest.QUEUE;

    findFilm.interest = !interest.QUEUE;
    interest.QUEUE = !interest.QUEUE;
  });

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
//! Функция на кнопку toWatched ================================================
function toggleToWatched(e) {
  e.preventDefault();
  const currentFilmId = e.currentTarget.dataset.id;
  const savedSettings = localStorage.getItem('filmsQueue');
  const parsedSettings = JSON.parse(savedSettings);

  filmsWatched = parsedSettings; // todo: Надо мапать , и в мапе прописать логику
  if (filmsWatched === null) {
    filmsWatched = [];
  }
  let nextFilm = filmsWatched.find(el => {
    return el.id === currentFilmId;
  });
  //console.log(findFilm);
  if (nextFilm === undefined) {
    nextFilm = { id: currentFilmId }; //todo: убрал из объекта test
  }

  const test = Object.keys(nextFilm);

  // console.log(!filmsWatched);
  test.forEach(el => {
    nextFilm.test1 = !filmsWatched;
    filmsWatched = !filmsWatched;
  });

  nextFilm.QUEUE = !nextFilm[filmsWatched];

  let massiv = { ...nextFilm };

  const findIndex = filmsWatched.findIndex(el => {
    return el.id === currentFilmId;
  });
  if (findIndex === -1) {
    filmsWatched.push(massiv);
  } else {
    filmsWatched.splice(findIndex, 1, massiv);
  }

  localStorage.setItem('filmsQueue', JSON.stringify(filmsWatched));
}
