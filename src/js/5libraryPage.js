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

// Меняет Хедер по нажатию на myLibrary
const homeSection = document.querySelector('#home-section');
const homeHeader = document.getElementById('homeHeader');
const libaryHeader = document.getElementById('libraryHeader');
const libraryLink = document.getElementById('libraryLink');
const homeLink = document.getElementById('homeLink');

console.log(homeSection);

libraryLink.addEventListener('click', e => {
  console.log(e.target);

  homeHeader.classList.add('visually-hidden');
  homeSection.classList.add('visually-hidden');
  libaryHeader.classList.remove('visually-hidden');

  libraryLink.classList.add('current');
  homeLink.classList.remove('current');
});
