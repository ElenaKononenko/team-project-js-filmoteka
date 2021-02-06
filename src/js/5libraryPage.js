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
  authStateListenerLibrary();
  libraryLink.classList.add('current');
  homeLink.classList.remove('current');
});

function authStateListenerLibrary() {
  // [START auth_state_listener]
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user);
      btnAuth.textContent = user.email;
      btnAuthLibrary.textContent = user.email;
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User

      // СЮДА ВСТАВЛЯЕМ ФУНКЦИЮ ОТРИСОВКИ БИБЛИОТЕКИ!!!!!!!!

      //ЭТО ПРИМЕР, ПРОСТО ПОСМОТРЕТЬ КАК РИСУЕТ С АВТОРИЗАЦИЕЙ (ВНИЗУ 106-128 СТРОКА)

      // const cardsFragment = document.createDocumentFragment();

      // cardsFragment.appendChild(
      //   createLibraryCardFunc({
      //     adult: false,
      //     backdrop_path: '/eShw0LB5CkoEfYtpUcXPD85oz5Q.jpg',
      //     genre_ids: [27, 53, 35, 14],
      //     id: 551804,
      //     media_type: 'movie',
      //     original_language: 'en',
      //     original_title: 'Freaky',
      //     overview:
      //       'A mystical, ancient dagger causes a notorious serial killer to magically switch bodies with a 17-year-old girl.',
      //     popularity: 111.61,
      //     poster_path: '/8xC6QSyxrpm0D5A6iyHNemEWBVe.jpg',
      //     release_date: '2020-11-12',
      //     title: 'Freaky',
      //     video: false,
      //     vote_average: 6.8,
      //     vote_count: 409,
      //   }),
      // );
      // listLibrary.appendChild(cardsFragment);
      var uid = user.uid;
      // ...
    } else {
      console.log('qqqqq');
      // СЮДА ВСТАВИТЬ "ЗАГЛУШКУ " НА БИБЛИОТЕКУ, КОТОРАЯ НЕ ПОКАЗЫВАЕТ ЕЕ ДО АВТОРИЗАЦИИ
    }
  });
  // [END auth_state_listener]
}
