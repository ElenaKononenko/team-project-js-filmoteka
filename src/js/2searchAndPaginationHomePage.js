

refs.error.textContent = '';

refs.searchForms.addEventListener('submit', searchFilms);
refs.backBtn.addEventListener('click', plaginationNavigation);
refs.nextBtn.addEventListener('click', plaginationNavigation);  

$(window).on("load",function(){
    $(".loader-container").fadeOut('slow')
});
  
if (pageNumber === 1) {
  refs.backBtn.classList.add('btnIsHidden');
}

function errorContent() {
  refs.error.textContent =
    'Search result not successful. Enter the correct movie name and try again.';
}

function fetchFilms() {
  let url = `${BASE_URL}?api_key=${API_KEY}&query=${inputValue}&page=${pageNumber}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      renderFilms = data.results;
      let totalPages = data.total_pages;
      if (pageNumber >= totalPages) {
        refs.nextBtn.classList.add('btnIsHidden');
      } else {
        refs.nextBtn.classList.remove('btnIsHidden');
      }
      console.log(data.total_pages);
      console.log(renderFilms);
      list.innerHTML = '';
      if (renderFilms.length === 0) {
        errorContent();
      }
      const cardsFragment = document.createDocumentFragment();
      renderFilms.map(el => {
        cardsFragment.appendChild(createCardFunc(el));
      });
      list.appendChild(cardsFragment);
    })
    .catch(Error => {
      console.log(Error);
      errorContent();
    });
}

if (pageNumber === 1) {
  refs.backBtn.classList.add('btnIsHidden');
}
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
  pageNumber === 1 || pageNumber < 1
    ? refs.backBtn.classList.add('btnIsHidden')
    : refs.backBtn.classList.remove('btnIsHidden');
}

function resetPage() {
  pageNumber = 1;
  currentPageNumber.textContent = pageNumber;
  refs.backBtn.classList.add('btnIsHidden');
}

function scroll() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
