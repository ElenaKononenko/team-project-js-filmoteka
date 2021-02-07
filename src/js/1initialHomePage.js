('use strict');

var firebaseConfig = {
  apiKey: 'AIzaSyDYFDsGasHWWG9JVZMqavo8otHQIfri16c',
  authDomain: 'team-project-js-filmoteka.firebaseapp.com',
  projectId: 'team-project-js-filmoteka',
  storageBucket: 'team-project-js-filmoteka.appspot.com',
  messagingSenderId: '378351083417',
  appId: '1:378351083417:web:43f8e90e12a94511ff3d08',
};

firebase.initializeApp(firebaseConfig);

const posterUrl = 'https://image.tmdb.org/t/p';
const sizePoster = '/w500';
const basicPosterUrl = posterUrl + sizePoster;
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = 'd407875648143dbc537f3d16fab2b882';
const MEDIA_TYPE = 'movie';
const TIME_WINDOW = 'week';
let pageNumber = 1;
const inputValue = '';
let renderFilms = [];
let genres = [];
let currentPageNumber = document.getElementById('js-currentPageNumber');
const list = document.querySelector('.galleryHome');
const homeSection = document.querySelector('#home-section');
const librarySection = document.querySelector('#library-section');
const homeHeader = document.getElementById('homeHeader');
const libaryHeader = document.getElementById('libraryHeader');
const libraryLink = document.getElementById('libraryLink');
const galleryHomeLink = document.getElementById('galleryHomeLink');
const homeLink = document.getElementById('homeLink');
const refs = {
  searchForms: document.getElementById('js-search-form'),
  backBtn: document.getElementById('js-backBtn'),
  nextBtn: document.getElementById('js-nextBtn'),
  error: document.getElementById('js-error'),
};
let loggedIn = false;
const userGrantedButtons = [
  document.querySelector('.button-queue'),
  document.querySelector('.button-watched'),
];
console.log(userGrantedButtons);
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(user);
    const userName =
      user.email.length > 10 ? user.email.slice(0, 7) + '...' : user.email;
    btnAuth.textContent = userName;
    btnAuthLibrary.textContent = userName;
    loggedIn = true;
    userGrantedButtons.map(el => {
      el.classList.remove('visually-hidden');
    });
  } else {
    btnAuth.textContent = 'Sign in';
    btnAuthLibrary.textContent = 'Sign in';
    loggedIn = false;
    userGrantedButtons.map(el => {
      el.classList.add('visually-hidden');
    });
  }
});
fetchGenres();

onHomelink();

homeLink.addEventListener('click', onHomelink);
galleryHomeLink.addEventListener('click', onHomelink);

function fetchGenres() {
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
  )
    .then(res => res.json())
    .then(result => {
      genres = result.genres;
      return result.genres;
    });
}

function fetchPopularMoviesList() {
  let url = `https://api.themoviedb.org/3/trending/${MEDIA_TYPE}/${TIME_WINDOW}?api_key=${API_KEY}&page=${pageNumber}`;

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      renderFilms = data.results;

      let totalPages = data.total_pages;

      if (pageNumber >= totalPages) {
        refs.nextBtn.classList.add('btnIsHidden');
      } else {
        refs.nextBtn.classList.remove('btnIsHidden');
      }
      list.innerHTML = '';
      const cardsFragment = document.createDocumentFragment();

      renderFilms.map(el => {
        cardsFragment.appendChild(createCardFunc(el));
      });
      list.appendChild(cardsFragment);
      return data;
    })
    .then(data => {
      // getFilm(data);
      //console.log(data);
    })
    .catch(error => {
      errorPlug();
      refs.nextBtn.classList.add('btnIsHidden');
    });
}

function createCardFunc(movie) {
  const listItem = cardTemplate(movie);

  listItem.addEventListener('click', () => {
    activeDetailsPage(movie);
  });
  return listItem;
}

function cardTemplate({
  poster_path: imgPath,
  title: filmTitle,
  original_title: filmOrigTitle,
  genre_ids: genre,
  release_date: date,
  vote_average: voteAverage,
}) {
  const result = document.createElement('li');
  result.classList.add('gallery__item');
  let poster = '../images/noPoster.jpg';
  if (imgPath) {
    poster = basicPosterUrl + imgPath;
  }

  let temp = `<img class="gallery__item__picture"
                    src='${poster}'
                    alt=${filmTitle}
                    />
                    <div class="gallery__item__picture__background">
                <h2 class="gallery__item__title">${
                  filmTitle || filmOrigTitle
                }</h2>
                
                <p class="gallery__item__description">
                
                    ${genreString(genre)}
                   `;
  if (date.length >= 4) {
    temp += `<span class="gallery__item__description__decor">|</span>
             <span class="gallery__item__description__year">${date.substring(
               0,
               4,
             )}</span>
            `;
  }
  temp += `<span class="gallery__item__description__rating">
            ${voteAverage}</span>
            </p>  </div>`;
  result.insertAdjacentHTML('afterbegin', temp);
  return result;
}

function genreString(genre) {
  if (genre.length === 0) {
    return 'Other';
  }

  let genreFilter = genre
    .slice(0, 3)
    .reduce((acc, el, index) => {
      if (index === 2 && genre.length > 3) {
        return acc + 'Other' + ', ';
      }
      return (
        acc +
        (genres.find(elem => {
          return elem.id === el;
        }).name || 'Other') +
        ', '
      );
    }, '')
    .slice(0, -2);

  if (genreFilter.length > 30) {
    let genreFilterMini = genreFilter.split(',');
    genreFilterMini.splice(2, 1, 'Other');
    return genreFilterMini;
  }

  return genreFilter;
}
function errorPlug() {
  const error = `<div class="errorPlug">
 <p>Что-то пошло не так! Повторите запрос на сервер</p>
 <img src="../images/noPoster.jpg"alt="Ошибка">
 </div>`;
  list.insertAdjacentHTML('afterbegin', error);
}
function startFetch() {
  resetPage();
  checkInput();
}

//authorization

const formAuth = document.querySelector('.container__modalAuth__form');
const inputEmail = document.querySelector('.container__modalAuth__form__email');
const inputRassword = document.querySelector(
  '.container__modalAuth__form__password',
);
const btnAuth = document.querySelector('.btnAuth');
const btnAuthLibrary = document.querySelector('.btnAuthLibrary');

const btnIn = document.querySelector('.in');
const btnRegister = document.querySelector('.register');
const btnExit = document.querySelector('.exit');

// const btnEnter = document.querySelector('.enter');
const modalAuth = document.getElementById('js_modalAuth');
const overlayAuth = document.getElementById('overlay__modalAuth');
const authError = document.querySelector('.auth__text');

btnAuth.addEventListener('click', onOpenModalAuth);
btnAuthLibrary.addEventListener('click', onOpenModalAuth);

//кнопка вход
btnIn.addEventListener('click', event => {
  event.preventDefault();
  authError.textContent = '';
  signInWithEmailPassword();
});

//кнопка регистрации
btnRegister.addEventListener('click', event => {
  event.preventDefault();
  authError.textContent = '';
  signUpWithEmailPasswoerd();
});

//кнопка выход
btnExit.addEventListener('click', event => {
  event.preventDefault();
  authError.textContent = '';
  signOut();
});

//ф-ция регистрация

function signUpWithEmailPasswoerd() {
  var email = inputEmail.value;
  var password = inputRassword.value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      authError.classList.add('visually-hidden');
      var user = userCredential.user;
      console.log(user);
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      authError.textContent = errorMessage;
      authError.classList.remove('visually-hidden');
    });
}

//функция для входа

function signInWithEmailPassword() {
  var email = inputEmail.value;
  var password = inputRassword.value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      var user = userCredential.user;
      authError.classList.add('visually-hidden');
      console.log(email, 'email есть в базе');
      authError.textContent = 'registration completed successfully';
      authError.classList.remove('visually-hidden');
      loggedIn = true;
      onCloseModalAuth();
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      authError.textContent = errorMessage;
      authError.classList.remove('visually-hidden');
      console.log(email, 'email нету в базе ,нужно зарегаться');
    });
  // [END auth_signin_password]
}

//выход
function signOut() {
  // [START auth_sign_out]
  firebase
    .auth()
    .signOut()
    .then(() => {
      loggedIn = false;
      onCloseModalAuth();

      // Sign-out successful.
    })
    .catch(error => {
      authError.classList.remove('visually-hidden');
    });
}

function onCloseModalAuth() {
  window.removeEventListener('keydown', onPressEscapeAuth);
  modalAuth.classList.remove('is-open');
  modalCard.innerHTML = '';
  authError.textContent = '';
  authError.classList.add('visually-hidden');

  startFetch();
  renderAuthCheckLibrary();
}

function onBackDropClickAuth(event) {
  if (event.target === event.currentTarget) {
    onCloseModalAuth();
  }
}
function onPressEscapeAuth(event) {
  if (event.code === 'Escape') {
    onCloseModalAuth();
  }
}
function onOpenModalAuth() {
  modalAuth.classList.add('is-open');
  window.addEventListener('keydown', onPressEscapeAuth);

  overlayAuth.addEventListener('click', onBackDropClickAuth);
}
function onHomelink() {
  homeHeader.classList.remove('visually-hidden');
  homeSection.classList.remove('visually-hidden');
  librarySection.classList.add('visually-hidden');
  libaryHeader.classList.add('visually-hidden');

  libraryLink.classList.remove('current');
  homeLink.classList.add('current');
  startFetch();
}
