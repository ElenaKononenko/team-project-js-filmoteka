// const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
// const API_KEY = 'd407875648143dbc537f3d16fab2b882';
// const MEDIA_TYPE = 'movie';
// const TIME_WINDOW = 'week';

// let inputValue = '';
// let pageNumber = 1;

// function fetchFilms() {
//   let url = '';
//   if (inputValue == '') {
//     url = `https://api.themoviedb.org/3/trending/${MEDIA_TYPE}/${TIME_WINDOW}?api_key=${API_KEY}`;
//   } else {
//     url = `${BASE_URL}?api_key=${API_KEY}&query=${inputValue}&page=${pageNumber}`;
//   }
//   return fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data.results);
//       return data.results;
//     });
// }

// fetchFilms(inputValue);

const backBtn = document.querySelector('#js-backBtn');
const nextBtn = document.querySelector('#js-nextBtn');
backBtn.classList.add('btnHide');
let currentPageNumber = document.querySelector('#js-currentPageNumber');

function plaginationNavigation(e) {
  if (e.target.id === 'js-backBtn') {
    pageNumber = pageNumber - 1;
    currentPageNumber.textContent = pageNumber;
    if (inputValue === '') {
      fetchPopularMoviesList();
    } else {
      fetchFilms();
    }
  } else {
    pageNumber = pageNumber + 1;
    currentPageNumber.textContent = pageNumber;
    if (inputValue === '') {
      fetchPopularMoviesList();
    } else {
      fetchFilms();
    }
  }
  pageNumber === 1 || pageNumber < 1
    ? backBtn.classList.add('btnHide')
    : backBtn.classList.remove('btnHide');
}

backBtn.addEventListener('click', plaginationNavigation);
nextBtn.addEventListener('click', plaginationNavigation);
