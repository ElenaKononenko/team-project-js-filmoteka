// console.log('Hello page5');
// const listLibrary = document.querySelector('.galleryLibrary');
// function createLibraryCardFunc(
//   imgPath,
//   filmTitle,
//   genre,
//   date,
//   voteAverage,
//   movieId,
// ) {
//   const listLibraryItem = cardTemplate(
//     imgPath,
//     filmTitle,
//     genre,
//     date,
//     voteAverage,
//   );
//   listLibraryItem.addEventListener('click', () => {
//     activeDetailsPage(movieId, true);
//   });
//   return listLibraryItem;
// }

console.log('Hello page5');

let filmsWatched = [];
let filmsQueue = [];

const q = {
  name: 'mango',
  id: 123,
  color: 'red',
  wathed: true,
};

const h = {
  name: 'rusik',
  id: 1236,
  color: 'blue',
  wathed: false,
};

const listLibrary = document.querySelector('.galleryLibrary');

function createLibraryCardFunc(movie) {
  const listLibraryItem = cardTemplate(movie);
  listLibraryItem.addEventListener('click', () => {
    activeDetailsPage(movie);
  });
  return listLibraryItem;
}

function drawWatchedFilmList(film) {
  filmsWatched.push(film);
  console.log(filmsWatched);
  localStorage.setItem('filmsWatched', JSON.stringify(filmsWatched));
}

function drawQueueFilmList(film) {
  filmsQueue.push(film);
  console.log(filmsQueue);
  localStorage.setItem('filmsQueue', JSON.stringify(filmsQueue));
}

function readWathedLocalStorage() {
  const savedSettings = localStorage.getItem('wathedfilm');
  const parsedSettings = JSON.parse(savedSettings);
  parsedSettings.map(e => console.log(e));
}

function readQueueLocalStorage() {
  const savedSettings = localStorage.getItem('queuefilm');
  const parsedSettings = JSON.parse(savedSettings);
  parsedSettings.map(e => console.log(e));
}

// Менет Хедер по нажатию на myLibrary

const homeHeader =  document.getElementById('homeHeader');
const libaryHeader = document.getElementById('libraryHeader');
const libraryLink = document.getElementById('libraryLink');
const homeLink = document.getElementById('homeLink');



libraryLink.addEventListener('click', (e) => {
  console.log(e.target);
  homeHeader.classList.add('visually-hidden')
  libaryHeader.classList.remove('visually-hidden')
})

homeLink.addEventListener('click', e => {
  homeHeader.classList.remove('visually-hidden')
})