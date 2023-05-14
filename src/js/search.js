import MarvelAPI from './api_defaults';
import debounce from 'lodash.debounce';

const refs = {
  body: document.querySelector('body'),
  comicsInput: document.getElementById('comics'),
  selectInput: document.getElementById('select'),
  nameInput: document.getElementById('name-input'),
  dateInput: document.getElementById('date'),
  charactersGallery: document.querySelector('.characters-gallery'),
  form: document.querySelector('.searchandsort-container'),
};

const marvelApi = new MarvelAPI();

// Create a character card
function createCharacterCard(character) {
  const card = document.createElement('li');
  card.innerHTML = `
    <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
    <h3>${character.name}</h3>
  `;
  return card;
}

// Render character cards in the page
function renderCharacterCards(characters) {
  refs.charactersGallery.innerHTML = '';
  characters.forEach(character => {
    const card = createCharacterCard(character);
    refs.charactersGallery.appendChild(card);
  });
}

// Event listener
refs.form.addEventListener(
  'change',
  debounce(async event => {
    const comics = refs.comicsInput.value;
    const selectValue = refs.selectInput.value;
    const name = refs.nameInput.value;
    const modifiedSince = refs.dateInput.value;
    console.log(comics, selectValue, name, modifiedSince);
    const dispayWidth = document.documentElement.clientWidth;

    marvelApi.setPaginationParams(1, 5);

    const data = await marvelApi.getFilteredCharacters(
      modifiedSince,
      name,
      selectValue,
      comics
    );
    if (data.length !== 0) {
      console.log(marvelApi.totalResults);
      renderCharacterCards(data);
    } else {
      refs.charactersGallery.innerHTML = defaultImage;
    }
  }),
  500
);

const defaultImage = `<img
  class="try-looking"
  srcset="
  ./img/tab/frame-tabl-deskt.png 1x,
  ./img/tab/frame-2x@tabl-deskt.png 2x
  "
  src="./img/tab/frame-tabl-deskt.png"
  title="default-image"
  alt="Try looking for something else"
  width="375px"
  height="221px"
  loading="lazy"
/>
`;
