import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import md5 from 'md5';

const modalLightboxGallery = new SimpleLightbox('.character-gallery a', {
  captionDelay: 250,
});

window.addEventListener('load', () => {
  console.log('All resources finished loading!');
});
const refs = {
  body: document.querySelector('body'),
  form: document.querySelector('.search-form'),
  searchInput: document.querySelector('.search-form-input'),
  gallery: document.querySelector('.characters-gallery'),
};
const marvelAPI = new MarvelAPI();

// const options = {
//   root: null,
//   rootMargin: '100px',
//   threshold: 1.0,
// };

function createMarkup(charactersImages) {
  return charactersImages
    .map(({ characterSmallImageURL, characterLargeImageURL, name }) => {
      return /*html*/ `
            <a href='${characterLargeImageURL}' class="character-card-link js-character-card-link">
            <div class="character-card">
              <img class="character-photo" src="${characterSmallImageURL}" alt="${name}" loading="lazy" />
              <div class="character-info">

                <p class="character-info-item">
                  ${name}
                </p>

                // <p class="character-info-item">
                //   ${name}
                // </p>
                
              </div>
            </div>
            </a>`;
    })
    .join('');
}
