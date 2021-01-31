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
  const listLibraryItem = cardTemplate(
    imgPath,
    filmTitle,
    genre,
    date,
    voteAverage,
  );
  listLibraryItem.addEventListener('click', () => {
    activeDetailsPage(movieId, true);
  });
  return listLibraryItem;
}
