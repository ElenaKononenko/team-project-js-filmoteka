console.log('Hello page5');

const listLibrary = document.querySelector('.galleryLibrary');

function createLibraryCardFunc(
  imgPath,
  filmTitle,
  genre,
  date,
  voteAverage,
  movieId,
) {
  const listLibraryItem = document.createElement('li');
  listLibraryItem.classList.add('galleryLibrary__item');
  let genreString = genre
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
  const temp = `<img class="galleryLibrary__item__picture"
                      src='${basicPosterUrl}${imgPath}'
                      alt=${filmTitle}
                      />
                  <h2 class="galleryLibrary__item__title">${filmTitle}</h2>
  
                  <p class="galleryLibrary__item__description">
                      ${genreString}
                      <span class="galleryLibrary__item__description__decor">|</span>
                      <span class="galleryLibrary__item__movie__description__year">
                          ${date.substring(0, 4)}</span>
                      <span class="galleryLibrary__item__description__rating">
                      ${voteAverage}</span>
                  </p>
                          `;
  listLibraryItem.insertAdjacentHTML('afterbegin', temp);
  listLibraryItem.addEventListener('click', () => {
    activeDetailsPage(movieId, true);
  });
  return listLibraryItem;
}
