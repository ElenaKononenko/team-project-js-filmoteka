('use strict');
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
const refs = {
  searchForms: document.getElementById('js-search-form'),
  backBtn: document.getElementById('js-backBtn'),
  nextBtn: document.getElementById('js-nextBtn'),
  error: document.getElementById('js-error'),
};
fetchGenres();
startFetch();
console.log();

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
      //console.log(renderFilms);
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
    })
    .catch(error => {
      errorPlug();
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
                <h2 class="gallery__item__title">${
                  filmTitle || filmOrigTitle
                }</h2>

                <p class="gallery__item__description">
                    ${genreString(genre)}`;
  if (date.length >= 4) {
    temp += `<span class="gallery__item__description__decor">|</span>
             <span class="gallery__item__description__year">${date.substring(
               0,
               4,
             )}</span>`;
  }
  temp += `<span class="gallery__item__description__rating">
            ${voteAverage}</span>
            </p> `;
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
