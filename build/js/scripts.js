"use strict";

'use strict';

var firebaseConfig = {
  apiKey: 'AIzaSyDYFDsGasHWWG9JVZMqavo8otHQIfri16c',
  authDomain: 'team-project-js-filmoteka.firebaseapp.com',
  projectId: 'team-project-js-filmoteka',
  storageBucket: 'team-project-js-filmoteka.appspot.com',
  messagingSenderId: '378351083417',
  appId: '1:378351083417:web:43f8e90e12a94511ff3d08'
};
firebase.initializeApp(firebaseConfig);
var posterUrl = 'https://image.tmdb.org/t/p';
var sizePoster = '/w500';
var basicPosterUrl = posterUrl + sizePoster;
var BASE_URL = 'https://api.themoviedb.org/3/search/movie';
var API_KEY = 'd407875648143dbc537f3d16fab2b882';
var MEDIA_TYPE = 'movie';
var TIME_WINDOW = 'week';
var pageNumber = 1;
var inputValue = '';
var renderFilms = [];
var genres = [];
var currentPageNumber = document.getElementById('js-currentPageNumber');
var list = document.querySelector('.galleryHome');
var homeSection = document.querySelector('#home-section');
var librarySection = document.querySelector('#library-section');
var homeHeader = document.getElementById('homeHeader');
var libaryHeader = document.getElementById('libraryHeader');
var libraryLink = document.getElementById('libraryLink');
var galleryHomeLink = document.getElementById('galleryHomeLink');
var homeLink = document.getElementById('homeLink');
var refs = {
  searchForms: document.getElementById('js-search-form'),
  backBtn: document.getElementById('js-backBtn'),
  nextBtn: document.getElementById('js-nextBtn'),
  error: document.getElementById('js-error')
};
var loggedIn = false;
var userGrantedButtons = [document.querySelector('.button-queue'), document.querySelector('.button-watched')];
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var userName = user.email.length > 10 ? user.email.slice(0, 7) + '...' : user.email;
    btnAuth.textContent = userName;
    btnAuthLibrary.textContent = userName;
    loggedIn = true;
    userGrantedButtons.map(function (el) {
      el.classList.remove('visually-hidden');
    });
  } else {
    btnAuth.textContent = 'Sign in';
    btnAuthLibrary.textContent = 'Sign in';
    loggedIn = false;
    userGrantedButtons.map(function (el) {
      el.classList.add('visually-hidden');
    });
  }
});
fetchGenres();
onHomelink();
homeLink.addEventListener('click', onHomelink);
galleryHomeLink.addEventListener('click', onHomelink);

function fetchGenres() {
  return fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=".concat(API_KEY, "&language=en-US")).then(function (res) {
    return res.json();
  }).then(function (result) {
    genres = result.genres;
    return result.genres;
  });
}

function fetchPopularMoviesList() {
  var url = "https://api.themoviedb.org/3/trending/".concat(MEDIA_TYPE, "/").concat(TIME_WINDOW, "?api_key=").concat(API_KEY, "&page=").concat(pageNumber);
  return fetch(url).then(function (res) {
    return res.json();
  }).then(function (data) {
    renderFilms = data.results;
    var totalPages = data.total_pages;

    if (pageNumber >= totalPages) {
      refs.nextBtn.classList.add('btnIsHidden');
    } else {
      refs.nextBtn.classList.remove('btnIsHidden');
    }

    list.innerHTML = '';
    var cardsFragment = document.createDocumentFragment();
    renderFilms.map(function (el) {
      cardsFragment.appendChild(createCardFunc(el));
    });
    list.appendChild(cardsFragment);
    return data;
  }).then(function (data) {}).catch(function (error) {
    errorPlug();
    refs.nextBtn.classList.add('btnIsHidden');
  });
}

function createCardFunc(movie) {
  var listItem = cardTemplate(movie);
  listItem.addEventListener('click', function () {
    activeDetailsPage(movie);
  });
  return listItem;
}

function cardTemplate(_ref) {
  var imgPath = _ref.poster_path,
      filmTitle = _ref.title,
      filmOrigTitle = _ref.original_title,
      genre = _ref.genre_ids,
      date = _ref.release_date,
      voteAverage = _ref.vote_average;
  var result = document.createElement('li');
  result.classList.add('gallery__item');
  var poster = './images/noPoster.jpg';

  if (imgPath) {
    poster = basicPosterUrl + imgPath;
  }

  var temp = "<img class=\"gallery__item__picture\"\n                    src='".concat(poster, "'\n                    alt=").concat(filmTitle, "\n                    />\n                    <div class=\"gallery__item__picture__background\">\n                <h2 class=\"gallery__item__title\">").concat(filmTitle || filmOrigTitle, "</h2>\n                \n                <p class=\"gallery__item__description\">\n                \n                    ").concat(genreString(genre), "\n                   ");

  if (date.length >= 4) {
    temp += "<span class=\"gallery__item__description__decor\">|</span>\n             <span class=\"gallery__item__description__year\">".concat(date.substring(0, 4), "</span>\n            ");
  }

  temp += "<span class=\"gallery__item__description__rating\">\n            ".concat(voteAverage, "</span>\n            </p>  </div>");
  result.insertAdjacentHTML('afterbegin', temp);
  return result;
}

function genreString(genre) {
  if (genre.length === 0) {
    return 'Other';
  }

  var genreFilter = genre.slice(0, 3).reduce(function (acc, el, index) {
    if (index === 2 && genre.length > 3) {
      return acc + 'Other' + ', ';
    }

    return acc + (genres.find(function (elem) {
      return elem.id === el;
    }).name || 'Other') + ', ';
  }, '').slice(0, -2);

  if (genreFilter.length > 30) {
    var genreFilterMini = genreFilter.split(',');
    genreFilterMini.splice(2, 1, 'Other');
    return genreFilterMini;
  }

  return genreFilter;
}

function errorPlug() {
  var error = "<div class=\"errorPlug\">\n <p>\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A! \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440</p>\n <img src=\"./images/noPoster.jpg\"alt=\"\u041E\u0448\u0438\u0431\u043A\u0430\">\n </div>";
  list.insertAdjacentHTML('afterbegin', error);
}

function startFetch() {
  resetPage();
  checkInput();
} //authorization


var formAuth = document.querySelector('.container__modalAuth__form');
var inputEmail = document.querySelector('.container__modalAuth__form__email');
var inputRassword = document.querySelector('.container__modalAuth__form__password');
var btnAuth = document.querySelector('.btnAuth');
var btnAuthLibrary = document.querySelector('.btnAuthLibrary');
var btnIn = document.querySelector('.in');
var btnRegister = document.querySelector('.register');
var btnExit = document.querySelector('.exit'); // const btnEnter = document.querySelector('.enter');

var modalAuth = document.getElementById('js_modalAuth');
var overlayAuth = document.getElementById('overlay__modalAuth');
var authError = document.querySelector('.auth__text');
btnAuth.addEventListener('click', onOpenModalAuth);
btnAuthLibrary.addEventListener('click', onOpenModalAuth); //кнопка вход

btnIn.addEventListener('click', function (event) {
  event.preventDefault();
  authError.textContent = '';
  signInWithEmailPassword();
}); //кнопка регистрации

btnRegister.addEventListener('click', function (event) {
  event.preventDefault();
  authError.textContent = '';
  signUpWithEmailPasswoerd();
}); //кнопка выход

btnExit.addEventListener('click', function (event) {
  event.preventDefault();
  authError.textContent = '';
  signOut();
}); //ф-ция регистрация

function signUpWithEmailPasswoerd() {
  var email = inputEmail.value;
  var password = inputRassword.value;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function (userCredential) {
    authError.classList.add('visually-hidden');
    var user = userCredential.user;
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    authError.textContent = errorMessage;
    authError.classList.remove('visually-hidden');
  });
} //функция для входа


function signInWithEmailPassword() {
  var email = inputEmail.value;
  var password = inputRassword.value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function (userCredential) {
    var user = userCredential.user;
    authError.classList.add('visually-hidden');
    authError.textContent = 'registration completed successfully';
    authError.classList.remove('visually-hidden');
    loggedIn = true;
    onCloseModalAuth();
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    authError.textContent = errorMessage;
    authError.classList.remove('visually-hidden');
  }); // [END auth_signin_password]
} //выход


function signOut() {
  // [START auth_sign_out]
  firebase.auth().signOut().then(function () {
    loggedIn = false;
    onCloseModalAuth(); // Sign-out successful.
  }).catch(function (error) {
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
"use strict";

refs.error.textContent = '';
refs.searchForms.addEventListener('submit', searchFilms);
refs.backBtn.addEventListener('click', plaginationNavigation);
refs.nextBtn.addEventListener('click', plaginationNavigation);
$(window).on('load', function () {
  $('.loader-container').fadeOut('slow');
});

if (pageNumber === 1) {
  refs.backBtn.classList.add('btnIsHidden');
}

function errorContent() {
  refs.error.textContent = 'Search result not successful. Enter the correct movie name and try again.';
}

function fetchFilms() {
  var url = "".concat(BASE_URL, "?api_key=").concat(API_KEY, "&query=").concat(inputValue, "&page=").concat(pageNumber);
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (data) {
    renderFilms = data.results;
    var totalPages = data.total_pages;

    if (pageNumber >= totalPages) {
      refs.nextBtn.classList.add('btnIsHidden');
    } else {
      refs.nextBtn.classList.remove('btnIsHidden');
    }

    list.innerHTML = '';

    if (renderFilms.length === 0) {
      errorContent();
    }

    var cardsFragment = document.createDocumentFragment();
    renderFilms.map(function (el) {
      cardsFragment.appendChild(createCardFunc(el));
    });
    list.appendChild(cardsFragment);
  }).catch(function (Error) {
    errorContent();
  });
} // if (pageNumber === 1) {
//   refs.backBtn.classList.add('btnIsHidden');
// }
//CREATE FUNCTION TO CHECK INPUT


function checkInput() {
  if (inputValue === '') {
    fetchPopularMoviesList();
  } else {
    fetchFilms();
  }
}

function searchFilms(event) {
  event.preventDefault();
  refs.error.textContent = '';
  inputValue = event.currentTarget.search.value;
  resetPage();
  checkInput();
}

function plaginationNavigation(e) {
  if (e.target.id === 'js-backBtn') {
    pageNumber = pageNumber - 1;
    currentPageNumber.textContent = pageNumber;
    checkInput();
    scroll();
  } else {
    pageNumber = pageNumber + 1;
    currentPageNumber.textContent = pageNumber;
    checkInput();
    scroll();
  }

  pageNumber === 1 || pageNumber < 1 ? refs.backBtn.classList.add('btnIsHidden') : refs.backBtn.classList.remove('btnIsHidden');
}

function resetPage() {
  pageNumber = 1;
  currentPageNumber.textContent = pageNumber;
  refs.backBtn.classList.add('btnIsHidden');
}

function scroll() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
"use strict";

var modalCard = document.querySelector('.modalCard');
var backDropRef = document.querySelector('.js-modal');
var overlayRef = document.querySelector('.overlay');

function activeDetailsPage(movie) {
  backDropRef.classList.add('is-open');
  showDetails(movie);
  window.addEventListener('keydown', onPressEscape);
  overlayRef.addEventListener('click', onBackDropClick);
  initModalDialogButton(moviesWatchedKeyName, 'btnModal-watched-js', movie);
  initModalDialogButton(moviesQueuedKeyName, 'btnModal-queue-js', movie);
}

function showDetails(_ref) {
  var imgPath = _ref.poster_path,
      filmTitle = _ref.title,
      voteAverage = _ref.vote_average,
      voteCount = _ref.vote_count,
      popularity = _ref.popularity,
      originalTitle = _ref.original_title,
      genre = _ref.genre_ids,
      description = _ref.overview,
      movieId = _ref.id;
  var modalCardinfo = "<img class=\"modalImg\"\n                    src='".concat(basicPosterUrl).concat(imgPath, "'\n                    alt=").concat(filmTitle, "\n                    />\n                    <div class=\"description\">\n        <h2 class=\"modal_title\">").concat(filmTitle, "</h2>\n        <table>\n<tr>\n  <td class=\"definition\">Vote/Votes</td>\n  <td class=\"definition info\"><span class=\"rating-modal\">").concat(voteAverage, "</span> / ").concat(voteCount, "</td>\n  </tr>\n<tr>\n  <td class=\"definition\">Popularity</td>\n  <td class=\"definition info\">").concat(popularity, "</td>\n</tr>\n<tr>\n  <td class=\"definition\">Original Title</td>\n  <td class=\"definition info originalTitle\">").concat(originalTitle, "</td>\n</tr>\n<tr>\n  <td class=\"definition\">Genre</td>\n  <td class=\"definition info\">").concat(genreStringModal(genre), "</td>\n</tr>\n</table>\n<h2 class=\"about\">ABOUT</h2>\n<p class=\"overview\">").concat(description, "</p>\n<button id=\"btnModal-watched-js\"\n        data-id=").concat(movieId, "\n        class=\"btn-modal\">\n  ").concat(getButtonTitle(moviesWatchedKeyName, movieId), "\n</button>\n\n<button id=\"btnModal-queue-js\"\n        class=\"btn-modal\"\n        data-id=").concat(movieId, ">\n  ").concat(getButtonTitle(moviesQueuedKeyName, movieId), "\n</button>\n\n</>");
  modalCard.insertAdjacentHTML('afterbegin', modalCardinfo);
} //===========================================================================================================


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

function genreStringModal(genre) {
  if (genre.length === 0) {
    return 'Other';
  }

  return genre.reduce(function (acc, el) {
    return acc + (genres.find(function (elem) {
      return elem.id === el;
    }).name || 'Other') + ', ';
  }, '').slice(0, -2);
} //модальное окно на кнопку GoIT Students


var teamModal = document.querySelector('.js-teamModal');
var teamOverlay = document.querySelector('.teamOverlay');
var teamBtn = document.querySelector('.button_footer');
var team = document.querySelector('.team-container');
teamBtn.addEventListener('click', onOpenModalTeam);

function onOpenModalTeam() {
  teamModal.classList.add('is-open');
  window.addEventListener('keydown', onPressEscapeTeam);
  teamOverlay.addEventListener('click', onBackDropClickTeam);
}

function onCloseModalTeam() {
  window.removeEventListener('keydown', onPressEscapeTeam);
  teamModal.classList.remove('is-open');
}

function onBackDropClickTeam(event) {
  if (event.target === event.currentTarget) {
    onCloseModalTeam();
  }
}

function onPressEscapeTeam(event) {
  if (event.code === 'Escape') {
    onCloseModalTeam();
  }
}

var body = document.querySelector('body');
console.log(body);
console.log(backDropRef);

if (backDropRef.classList.contains('is-open')) {
  body.classList.add('overflow-ishidden');
}
"use strict";

var _buttonTitles;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Local storage keys
var moviesWatchedKeyName = 'filmsWatched';
var moviesQueuedKeyName = 'filmsQueue';
var selectedClassName = 'selected';
var btnWatchedRef = document.querySelector('.button-watched');
var btnQueueRef = document.querySelector('.button-queue'); // Config file for button titles for each watched and queued movies

var buttonTitles = (_buttonTitles = {}, _defineProperty(_buttonTitles, moviesWatchedKeyName, {
  add: 'ADD TO WATCHED',
  delete: 'DEL FROM WATCHED'
}), _defineProperty(_buttonTitles, moviesQueuedKeyName, {
  add: 'ADD TO QUEUE',
  delete: 'DEL FROM QUEUE'
}), _buttonTitles); // Set default selected Tab

var selectedMovieListKey = moviesWatchedKeyName;

function initModalDialogButton(movieListKey, buttonId, movie) {
  var buttonElement = document.getElementById(buttonId);

  if (!loggedIn) {
    buttonElement.classList.add('visually-hidden');
    return;
  }

  if (!isMovieAddedToList(movieListKey, movie.id)) {
    buttonElement.classList.add(selectedClassName);
  }

  buttonElement.addEventListener('click', function (event) {
    var btn = event.currentTarget;
    var movieId = btn.dataset.id;
    toggleMovieExistenceInList(movieListKey, movie);
    btn.innerHTML = getButtonTitle(movieListKey, movieId);
    btn.classList.toggle(selectedClassName);
    rerenderPageWithMovies(selectedMovieListKey);
  });
}

function getButtonTitle(movieListKey, movieId) {
  return isMovieAddedToList(movieListKey, movieId) ? buttonTitles[movieListKey].delete : buttonTitles[movieListKey].add;
}

function toggleMovieExistenceInList(movieListKey, movie) {
  var movieId = movie.id;
  var movieIds = getMoviesList(movieListKey) || {};

  if (isMovieAddedToList(movieListKey, movieId)) {
    delete movieIds[movieId];
  } else {
    movieIds[movieId] = movie;
  }

  localStorage.setItem(movieListKey, JSON.stringify(movieIds));
}

function isMovieAddedToList(movieListKey, movieId) {
  var movieIds = getMoviesList(movieListKey) || {};
  return movieIds[movieId] !== undefined;
}

function getMoviesList(movieListKey) {
  return JSON.parse(localStorage.getItem(movieListKey));
}

initHeaderButton('.button-queue', moviesQueuedKeyName);
initHeaderButton('.button-watched', moviesWatchedKeyName);

function initHeaderButton(buttonId, movieListKey) {
  var buttonElement = document.querySelector(buttonId);
  buttonElement.addEventListener('click', function () {
    selectedMovieListKey = movieListKey;
    rerenderPageWithMovies(movieListKey);
  });
}

function rerenderPageWithMovies(movieListKey) {
  var listElement = document.querySelector('.galleryLibrary');
  var moviesMap = getMoviesList(movieListKey);
  var moviesToRender = Object.values(moviesMap).filter(function (movie) {
    return isMovieAddedToList(movieListKey, movie.id);
  });

  if (moviesToRender.length === 0) {
    listElement.innerHTML = "\n    <div class=\"empty-container\">\n      <div class=\"empty-state\">\n        You do not have to ".concat(movieListKey === moviesWatchedKeyName ? 'watched' : 'queue', " movies to watch\n        </div>\n        <div class=\"empty-img\"><img src=\"./images/noPoster.jpg\"alt=\"\u041E\u0448\u0438\u0431\u043A\u0430\"></div></div>");
    return;
  }

  var cardsFragment = document.createDocumentFragment();
  moviesToRender.map(function (movie) {
    cardsFragment.appendChild(createCardFunc(movie));
  });
  listElement.innerHTML = '';
  listElement.appendChild(cardsFragment);
}

function onLibraryPageLoad() {
  rerenderPageWithMovies(selectedMovieListKey);
}
"use strict";

var listLibrary = document.querySelector('.galleryLibrary'); // Change header whent tap myLibrary

libraryLink.addEventListener('click', function (e) {
  homeHeader.classList.add('visually-hidden');
  homeSection.classList.add('visually-hidden');
  libaryHeader.classList.remove('visually-hidden');
  librarySection.classList.remove('visually-hidden');
  renderAuthCheckLibrary();
  libraryLink.classList.add('current');
  homeLink.classList.remove('current');
  btnWatchedRef.classList.add(selectedClassName);
});
btnQueueRef.addEventListener('click', function () {
  btnQueueRef.classList.add(selectedClassName);
  btnWatchedRef.classList.remove(selectedClassName);
});
btnWatchedRef.addEventListener('click', function () {
  btnWatchedRef.classList.add(selectedClassName);
  btnQueueRef.classList.remove(selectedClassName);
});

function renderAuthCheckLibrary() {
  if (loggedIn) {
    onLibraryPageLoad();
  } else {
    listLibrary.innerHTML = "\n      <div class=\"empty-state\">\n        Please login to use the library\n      </div>";
  }
}