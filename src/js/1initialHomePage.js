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
const list = document.querySelector('.galleryHome');

fetchGenres();
fetchPopularMoviesList();

function createCardFunc(imgPath, filmTitle, genre, date, voteAverage, movieId) {
  const listItem = cardTemplate(imgPath, filmTitle, genre, date, voteAverage);
  listItem.addEventListener('click', () => {
    activeDetailsPage(movieId, false);
  });
  return listItem;
}

function fetchPopularMoviesList() {
  let url = `https://api.themoviedb.org/3/trending/${MEDIA_TYPE}/${TIME_WINDOW}?api_key=${API_KEY}&page=${pageNumber}`;

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      renderFilms = data.results;
      list.innerHTML = '';
      const cardsFragment = document.createDocumentFragment();
      renderFilms.map(el => {
        cardsFragment.appendChild(
          createCardFunc(
            el.poster_path,
            el.title || el.original_title,
            el.genre_ids,
            el.release_date,
            el.vote_average,
            el.id,
          ),
        );
      });
      list.appendChild(cardsFragment);
    })
    .catch(Error => {
      console.log(Error);
    });
}

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

function genreString(genre) {
  if (genre.length === 0) {
    return 'Other';
  }
  return genre
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
}

function cardTemplate(imgPath, filmTitle, genre, date, voteAverage) {
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
                <h2 class="gallery__item__title">${filmTitle}</h2>

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
