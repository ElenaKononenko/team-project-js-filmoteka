console.log('Hello from 3navigation');
const backDropRef = document.querySelector('.js-modal');
const overlayRef = document.querySelector('.overlay');

showDetails(movieId);
fetchPopularMoviesListModal();

function showDetails(
  imgPath,
  filmTitle,
  voteAverage,
  voteCount,
  popularity,
  originalTitle,
  genre,
  description,
  id,
) {
  const modalWindow = document.createElement('div');
  modalWindow.classList.add('modalCard is-hidden');

  const modalCardinfo = `<img class="gallery__item__picture"
                    src='${basicPosterUrl}${imgPath}'
                    alt=${filmTitle}
                    />
        <h2 class="gallery__item__title">${filmTitle}</h2>
        <p class="votes">Vote/Votes${voteAverage}${voteCount}</p>
        <p class="votes">Popularity${popularity}</p>
        <p class="votes">Original Title${originalTitle}</p>
        <p class="votes">${genreString}</p>
        <h2 class="about">ABOUT</h2>
        <p class="votes about">${description}</p>`;

  modalWindow.insertAdjacentHTML('afterbegin', modalCardinfo);
}

function fetchPopularMoviesListModal() {
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
            el.title,
            el.vote_average,
            el.vote_count,
            el.popularity,
            el.original_title,
            el.genre_ids,
            el.overview,
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

function activeDetailsPage(event) {
  event.preventDefault();
}

backDropRef.classList.add('is-open');
gallery.classList.add('is-hidded');
window.addEventListener('keydown', onPressEscape);

OverlayRef.addEventListener('click', onBackDropClick);

function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  backDropRef.classList.remove('is-open');
  gallery.classList.remove('is-hidded');
}

function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
  gallery.classList.add('is-hidded');
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
