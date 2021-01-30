const refs = {
  searchForms: document.getElementById('js-search-form'),
  backBtn: document.getElementById('js-backBtn'),
  nextBtn: document.getElementById('js-nextBtn'),
};

let currentPageNumber = document.getElementById('js-currentPageNumber');

refs.searchForms.addEventListener('submit', searchFilms);
refs.backBtn.addEventListener('click', plaginationNavigation);
refs.nextBtn.addEventListener('click', plaginationNavigation);

if (pageNumber === 1) {
  refs.backBtn.classList.add('btnIsHidden');
}

function fetchFilms() {
  let url = `${BASE_URL}?api_key=${API_KEY}&query=${inputValue}&page=${pageNumber}`;

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      renderFilms = data.results;
      console.log(renderFilms);
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

function searchFilms(event) {
  event.preventDefault();
  inputValue = event.currentTarget.search.value;
  fetchFilms();
}

// searchFilms();

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
    ? refs.backBtn.classList.add('btnIsHidden')
    : refs.backBtn.classList.remove('btnIsHidden');
}
