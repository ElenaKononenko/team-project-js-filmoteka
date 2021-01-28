const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = 'd407875648143dbc537f3d16fab2b882';
const MEDIA_TYPE = 'movie';
const TIME_WINDOW = 'week';
const pageNumber = 1;
const inputValue = '';

function fetchFilms() {
  let url = '';
  if(inputValue == '') {
    url = `https://api.themoviedb.org/3/trending/${MEDIA_TYPE}/${TIME_WINDOW}?api_key=${API_KEY}`;
  }else{
    url = `${BASE_URL}?api_key=${API_KEY}&query=${inputValue}&page=${pageNumber}`
  }
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      return data.results;
    });
}

fetchFilms(inputValue);