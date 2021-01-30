const refs = {
  searchForms: document.querySelector('#search-form')
};
// console.log(refs.searchForms);

let sForm = refs.searchForms.addEventListener('input', searchFilms);

function fetchFilms() {
  let url = `${BASE_URL}?api_key=${API_KEY}&query=${inputValue}&page=${pageNumber}`;

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
            el.title,
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
  inputValue = event.target.value;
  fetchFilms();
}

// searchFilms();

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
