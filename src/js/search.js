import MarvelAPI from './api_defaults';
import debounce from 'lodash.debounce';
import md5 from 'md5';
import axios from 'axios';

const refs = {
  body: document.querySelector('body'),
  comicsInput: document.querySelector("[id = 'comics']"),
  selectInput: document.querySelector("[id = 'select']"),
  nameInput: document.querySelector("[id='name-input']"),
  dateInput: document.querySelector("[id = 'date']"),
  charactersGallery: document.querySelector('.characters-gallery'),
};
// console.log(refs.dateInput);
const marvelApi = new MarvelAPI();

// const PUBLIC_KEY = 'e8d87ed088b5013742a2a9466816b30e';
// const PRIVATE_KEY = 'dbde977f898ea7131460b979ad9d4adf2e774ce4';

// Create a character card
function createCharacterCard(character) {
  const card = document.createElement('li');
  card.innerHTML = `
    <img src="${character.thumbnail.path}.${
    character.thumbnail.extension
  }" alt="${character.name}">
    <h3>${character.name}</h3>
    <p>${character.description || 'No description available'}</p>
  `;
  return card;
}

// Render character cards in the page
function renderCharacterCards(characters) {
  // const ul = document.querySelector('ul');
  // refs.charactersGallery.innerHTML = defaultImage;

  characters.forEach(character => {
    const card = createCharacterCard(character);
    refs.charactersGallery.appendChild(card);
  });
}

// Fetch characters
// async function fetchCharacters(comics, orderBy, nameStartsWith, modifiedSince) {
//   const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
//   const timestamp = new Date().getTime();
//   const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
//   const params = new URLSearchParams({
//     apikey: PUBLIC_KEY,
//     // comics: comics || null,
//     // orderBy: orderBy || null,
//     nameStartsWith: nameStartsWith || null,
//     // modifiedSince: modifiedSince || null,
//     ts: timestamp,
//     hash: hash,
//   });

//   const response = await fetch(`${baseUrl}?${params}`);
//   const data = await response.json();

//   if (data && data.data && data.data.results) {
//     const characters = data.data.results;
//     renderCharacterCards(characters);
//   } else {
//     console.error('Error fetching characters:', data);
//   }
// }

// Event listener
refs.comicsInput.addEventListener(
  'change',
  debounce(() => {
    const comics = refs.comicsInput.value;
    fetchCharacters(comics);
  }),
  500
);

refs.selectInput.addEventListener(
  'change',
  debounce(() => {
    const orderBy = refs.selectInput.value;
    fetchCharacters(null, orderBy);
  }),
  500
);

refs.nameInput.addEventListener(
  'change',
  debounce(() => {
    const nameStartsWith = refs.nameInput.value;
    // fetchCharacters(null, null, nameStartsWith);
    // marvelApi.getCharacters().then(data => {
    //   renderCharacterCards(data);
    // });
  }),
  500
);

refs.dateInput.addEventListener(
  'change',
  debounce(() => {
    const modifiedSince = refs.dateInput.value;
    fetchCharacters(null, null, null, modifiedSince);
  }),
  500
);

// const defaultImage = `<img
//   class="try-looking"
//   srcset="
//   ./src/img/tab/frame-tabl-desktop.png 1x,
//   ./src/img/tab/frame-2x@tabl-desktop.png 2x
//   "
//   src="./img/tab/frame-tabl-desktop.png"
//   title="default-image"
//   alt="Try looking for something else"
//   width="375px"
//   height="221px"
//   loading="lazy"
// />
// `;
