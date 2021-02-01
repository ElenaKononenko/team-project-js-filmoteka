console.log('Hello page5');
const listLibrary = document.querySelector('.galleryLibrary');

function createLibraryCardFunc(movie) {
  const listLibraryItem = cardTemplate(movie);
  listLibraryItem.addEventListener('click', () => {
    activeDetailsPage(movie);
  });
  return listLibraryItem;
}
