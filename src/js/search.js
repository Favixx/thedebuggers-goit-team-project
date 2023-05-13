import MarvelAPI from './api_defaults';
import debounce from 'lodash.debounce';
// const modalLightboxGallery = new SimpleLightbox('.characters-gallery a', {
//   captionDelay: 250,
// });

const refs = {
  body: document.querySelector('body'),
  comicsInput: document.querySelector("[id = 'comics']"),
  selectInput: document.querySelector("[id = 'select']"),
  nameInput: document.querySelector("[id='name-input']"),
  dateInput: document.querySelector("[id = 'date']"),
  charactersGallery: document.querySelector('.characters-gallery'),
};

const marvelApi = new MarvelAPI();

async function fetchCharacter() {
  const charactersArray = await marvelApi.getNameStartWith('black widow');
  const character = await marvelApi.getCharacterByID(1017109);
  console.log(charactersArray);
  console.log(character);
}
fetchCharacter();

refs.nameInput.addEventListener('change', debounce(onInputSearch), 500);

function onInputSearch() {
  const listMarkup = charactersArray
    .map(({ thumbnail, name }) => {
      `<a href=______________________ class="character-card-link js-character-card-link">
        <div class="character-card">
          <img class="character-photo" src="${c.thumbnail.path}/${imageSize}.${c.thumbnail.extension}" loading="lazy" />
          <div class="character-info">
            <p class="character-info-item">
              ${name}
            </p>
          </div>
        </div>
      </a>`;
    })
    .join('');
  const inputQuantity = charactersArray.length;
  if (!inputQuantity) {
    refs.charactersGallery.innerHTML = defaultImage;
    return;
  }
  refs.charactersGallery.innerHTML = listMarkup;
  return listMarkup;
}

const defaultImage = `<img
  class="try-looking"
  srcset="
                    ./images/________-min.jpg 1x,
                    ./images/___________-min.jpg 2x
                  "
  src="./images/_____________-min.jpg"
  title="default-image"
  alt="Try looking for something else"
  width="___"
  height="____"
  loading="lazy"
/>
`;
