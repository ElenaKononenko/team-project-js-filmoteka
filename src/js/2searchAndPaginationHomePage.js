const refs = {
  searchForms: document.getElementById('js-search-form'),
  backBtn: document.getElementById('js-backBtn'),
  nextBtn: document.getElementById('js-nextBtn'),
  error: document.getElementById('js-error'),
};

refs.error.textContent = '';
let currentPageNumber = document.getElementById('js-currentPageNumber');

refs.searchForms.addEventListener('input', resetErrors);
refs.searchForms.addEventListener('submit', searchFilms);
refs.backBtn.addEventListener('click', plaginationNavigation);
refs.nextBtn.addEventListener('click', plaginationNavigation);

if (pageNumber === 1) {
  refs.backBtn.classList.add('btnIsHidden');
}

function errorContent() {
  refs.error.textContent =
    'Search result not successful. Enter the correct movie name and try again.';
  fetchPopularMoviesList();
}

function resetErrors() {
  refs.error.textContent = '';
  fetchPopularMoviesList();
};

function fetchFilms() {
  let url = `${BASE_URL}?api_key=${API_KEY}&query=${inputValue}&page=${pageNumber}`;

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      renderFilms = data.results;
      console.log(renderFilms);
      list.innerHTML = '';
      if (renderFilms.length === 0) {
        errorContent();
      }
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
      errorContent();
    });
}

//CREATE FUNCTION TO CHECK INPUT

function checkInput(){
  if (inputValue === '') {
    resetErrors();
  } else {
    fetchFilms();
  }
}

function searchFilms(event) {
  event.preventDefault();
  refs.error.textContent = '';
  inputValue = event.currentTarget.search.value;
  checkInput()
}

function plaginationNavigation(e) {
  if (e.target.id === 'js-backBtn') {
    pageNumber = pageNumber - 1;
    currentPageNumber.textContent = pageNumber;
    checkInput()
  } else {
    pageNumber = pageNumber + 1;
    currentPageNumber.textContent = pageNumber;
    checkInput()
  }
  pageNumber === 1 || pageNumber < 1
    ? refs.backBtn.classList.add('btnIsHidden')
    : refs.backBtn.classList.remove('btnIsHidden');
}
