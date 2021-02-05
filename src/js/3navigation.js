console.log('Hello from 3navigation');
const modalCard = document.querySelector('.modalCard');
const backDropRef = document.querySelector('.js-modal');
const overlayRef = document.querySelector('.overlay');

function activeDetailsPage(movie) {
  //console.log(movie);
  backDropRef.classList.add('is-open');
  showDetails(movie);
  const watchedModalBtnRef = document.getElementById('btnModal-watched-js');
  watchedModalBtnRef.addEventListener('click', toggleToWatched);

  const queueModalBtnRef = document.getElementById('btnModal-queue-js');
  queueModalBtnRef.addEventListener('click', toggleToQueue);
  window.addEventListener('keydown', onPressEscape);
  overlayRef.addEventListener('click', onBackDropClick);
}

// console.log(fetchPopularMoviesList());
// console.log(renderFilms);
function showDetails({
  poster_path: imgPath,
  title: filmTitle,
  vote_average: voteAverage,
  vote_count: voteCount,
  popularity: popularity,
  original_title: originalTitle,
  genre_ids: genre,
  overview: description,
  id: movieId,
}) {
  const modalCardinfo = `<img class="modalImg"
                    src='${basicPosterUrl}${imgPath}'
                    alt=${filmTitle}
                    />
                    <div class="description">
        <h2 class="modal_title">${filmTitle}</h2>
        <table>
<tr>
  <td class="definition">Vote/Votes</td>
  <td class="definition info"><span class="rating-modal">${voteAverage}</span> / ${voteCount}</td>
  </tr>
<tr>
  <td class="definition">Popularity</td>
  <td class="definition info">${popularity}</td>
</tr>
<tr>
  <td class="definition">Original Title</td>
  <td class="definition info originalTitle">${originalTitle}</td>
</tr>
<tr>
  <td class="definition">Genre</td>
  <td class="definition info">${genreStringModal(genre)}</td>
</tr>
</table>
<h2 class="about">ABOUT</h2>
<p class="overview">${description}</p>
<button id="btnModal-watched-js"  data-id=${movieId} class="btn-modal" >
      ADD TO WATCHED
    </button>
    <button id="btnModal-queue-js" class="btn-modal" data-id=${movieId}>ADD TO QUEUE</button></div>`;

  modalCard.insertAdjacentHTML('afterbegin', modalCardinfo);

  //! Кнопки на добавление в очередь и просмотренные
  //   const watchedModalBtnRef = document.getElementById('btnModal-watched-js');
  //   watchedModalBtnRef.addEventListener('click', e => {
  //     console.log('Привет это просмотренные');
  //   });

  //   const queueModalBtnRef = document.getElementById('btnModal-queue-js');
  //   queueModalBtnRef.addEventListener('click', e => {
  //     console.log('Привет это в очереди');
  //     Queue();
  //   });
}

function Queue() {
  let filmQueueMass = [];
  localStorage.setItem('filmsQueue', JSON.stringify(filmQueueMass));
  let localStorageData = localStorage.getItem('filmsQueue');
  console.log(localStorageData);

  if (localStorageData !== null) {
    filmQueueMass.push(...JSON.parse(localStorageData));
  }
}

//===========================================================================================================
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
  return genre
    .reduce((acc, el) => {
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

//модальное окно на кнопку GoIT Students
const teamModal = document.querySelector('.js-teamModal');
const teamOverlay = document.querySelector('.teamOverlay');
const teamBtn = document.querySelector('.button_footer');
const team = document.querySelector('.team-container');

teamBtn.addEventListener('click', onOpenModalTeam);

function onOpenModalTeam() {
  teamModal.classList.add('is-open');
  window.addEventListener('keydown', onPressEscapeTeam);
  teamOverlay.addEventListener('click', onBackDropClickTeam);
  console.log(teamOverlay);
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
