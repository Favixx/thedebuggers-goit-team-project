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
  pagination: document.querySelector('.pagination'),
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
    if (!name && !comics) {
      refs.charactersGallery.innerHTML = defaultImage;
      return;
    }
    console.log(comics, selectValue, name, modifiedSince);
    const dispayWidth = document.documentElement.clientWidth;

    widthParam(dispayWidth, marvelApi);

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

function widthParam(width, fn) {
  if (width < 768) {
    fn.setPaginationParams(1, 5);
  } else if (width >= 768 && width < 1440) {
    fn.setPaginationParams(1, 8);
  } else {
    fn.setPaginationParams(1, 14);
  }
}

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

const element = document.querySelector('.pagination ul');
element.addEventListener('click', handleClickPagination);
function handleClickPagination(event) {
  console.log(event.target);
  if (event.target === 0) {
  }
}
let totalPages = 10;
let page = 1;

element.innerHTML = createPagination(totalPages, page);
function createPagination(totalPages, page) {
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page >= 1) {
    liTag += `<button class="btn prev"><span><</span></button>`;
  }

  if (page > 2) {
    liTag += `<button class="first numb"><span>1</span></button>`;
    if (page > 3) {
      liTag += `<button class="dots"><span>...</span></button>`;
    }
  }

  if (page === totalPages) {
    beforePage = beforePage - 2;
  } else if (page === totalPages - 1) {
    beforePage = beforePage - 1;
  }

  if (page === 1) {
    afterPage = afterPage + 1;
  } else if (page === 2) {
    afterPage = afterPage + 1;
  }

  for (let plength = beforePage; plength <= afterPage; plength += 1) {
    if (plength > totalPages) {
      continue;
    }
    if (plength === 0) {
      plength = plength + 1;
    }
    if (page === plength) {
      active = 'active';
    } else {
      active = '';
    }
    liTag += `<button class="numb ${active}"><span>${plength}</span></button>`;
  }

  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<button class="dots"><span>...</span></button>`;
    }
    liTag += `<button class="last numb"><span>${totalPages}</span></button>`;
  }

  if (page < totalPages) {
    liTag += `<button class="btn next"><span>></span></button>`;
  }
  element.innerHTML = liTag;
  return liTag;
}
