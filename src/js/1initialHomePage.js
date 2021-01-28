// console.log('Hello from 1initialHomePage');
('use strict');
const list = document.querySelector('.galleryLibrary');
const posterUrl = 'https://image.tmdb.org/t/p';
const sizePoster = '/w500';
const basicPosterUrl = posterUrl + sizePoster;
// пример для проверки , потом удалить, заменить на ответ от фетча, взят из запроса Популярное
let response = [
  {
    adult: false,
    backdrop_path: '/mGJuQwMq1bEboaVTqQAK4p4zQvC.jpg',
    genre_ids: [28, 878],
    id: 399566,
    original_language: 'en',
    original_title: 'Godzilla vs. Kong',
    overview:
      'In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.',
    poster_path: '/5hai66csq5jlp8Du5REhZpb1XWP.jpg',
    release_date: '2021-03-25',
    title: 'Godzilla vs. Kong',
    video: false,
    vote_average: 0.0,
    vote_count: 0,
    popularity: 648.662,
    media_type: 'movie',
  },
  {
    genre_ids: [14, 28, 12],
    original_language: 'en',
    original_title: 'Wonder Woman 1984',
    poster_path: '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
    video: false,
    vote_average: 7.1,
    overview:
      'Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe by the name of the Cheetah.',
    id: 464052,
    vote_count: 3099,
    title: 'Wonder Woman 1984',
    adult: false,
    backdrop_path: '/srYya1ZlI97Au4jUYAktDe3avyA.jpg',
    release_date: '2020-12-16',
    popularity: 2597.599,
    media_type: 'movie',
  },
  {
    original_language: 'en',
    original_title: 'The White Tiger',
    poster_path: '/7K4mdWaLGF2F4ASb2L12tlya9c9.jpg',
    video: false,
    vote_average: 6.8,
    overview:
      'An ambitious Indian driver uses his wit and cunning to escape from poverty and rise to the top. An epic journey based on the New York Times bestseller.',
    release_date: '2021-01-13',
    vote_count: 84,
    title: 'The White Tiger',
    adult: false,
    backdrop_path: '/f97trg5SKptuFVn2bpObjBexTuw.jpg',
    id: 628534,
    genre_ids: [18],
    popularity: 125.969,
    media_type: 'movie',
  },
];

//
//для жанров нужен какой-то особый запрос, пока рисует только их id
//часть функции(откликается на запрос Популярное))))
const card = response.reduce((acc, el) => {
  const temp = `
    <li class="gallery__item">
   <img class="gallery__item__picture"
        src='${basicPosterUrl}${el.poster_path}'
        alt=${el.overview}
    />
    <h2 class="gallery__item__title">${el.name}</h2>
   
    <p class="gallery__item__description">
         ${el.genre_ids}
          <span class="gallery__item__description__decor">|</span>
          <span class="gallery__item__movie__description__year">
           ${el.release_date.substring(0, 4)}</span>
          <span class="gallery__item__description__rating">
          ${el.vote_average}</span>
    </p>
   </li>`;
  console.log('cfcc', el.first_air_date);
  return acc + temp;
}, '');

//вставка списка лишек в Дом
list.insertAdjacentHTML('afterbegin', card);
