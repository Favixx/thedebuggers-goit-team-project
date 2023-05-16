import MarvelAPI from './api_defaults';
import debounce from 'lodash.debounce';
import { openModalCharacters } from './modal_characters';

export const refs = {
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
let totalPages = 10;
let page = 1;
const element = document.querySelector('.pagination ul');
const elementDiv = document.querySelector('.pagination');
const defaultImage = `<picture class="try-looking">
<source srcset="./img/tab/frame-tabl-deskt.png 1x, ./img/tab/frame-2x@tabl-deskt.png 2x" media="(min-width: 1440px)">
<source srcset="./img/mob/frame-mob.png 1x, ./img/mob/frame-2x@mob.png 2x" media="(max-width: 768px)">
<img src="./img/mob/frame-mob.png" title="default-image" alt="Try looking for something else" width="375px" height="221px"/>
</picture>`

// Create a character card
function createCharacterCard(character) {
  const card = document.createElement('li');
  card.setAttribute('data-id', character.id);
  card.innerHTML = `
    <button class="character-image-button"><img class="character-image" src="${character.thumbnail.path}.${character.thumbnail.extension}" 
    alt="${character.name}"></button>
    <h3 class="character-name">${character.name}</h3>
  `;
  return card;
}

// Render character cards
function renderCharacterCards(characters) {
  refs.charactersGallery.innerHTML = '';
  characters.forEach(character => {
    const card = createCharacterCard(character);
    refs.charactersGallery.appendChild(card);
  });
}

// Event listener at form
refs.form.addEventListener('change', debounce(handleChange, 500));
// refs.searchComicsIcon.addEventListener('click', handleChange);
// refs.searchNameIcon.addEventListener('click', handleChange);

async function handleChange() {
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
  totalPages = marvelApi.totalPage;
  page = marvelApi.currentPage;
  if (data.length !== 0) {
    console.log(marvelApi.totalResults);
    renderCharacterCards(data);
    element.innerHTML = createPagination(totalPages, page);
  } else {
    refs.charactersGallery.innerHTML = defaultImage;
  }
}

// Event listener at gallery
refs.charactersGallery.addEventListener('click', handleImageClick);
function handleImageClick(event) {
  console.log(event.target);
  console.log(event.target.parentNode);
  const card = event.target.closest('li');
  if (card && card.hasAttribute('data-id')) {
    openModalCharacters(Number(card.dataset.id));
  }
}

// Pagination at charactersGallery

//Amount of cards at page
function widthParam(width, fn) {
  if (width < 768) {
    fn.setPerPage(5);
  } else if (width >= 768 && width < 1440) {
    fn.setPerPage(8);
  } else {
    fn.setPerPage(14);
  }
}
console.log(element);
element.addEventListener('click', handleClickPagination);

function handleClickPagination(event) {
  const paginationBtn = event.target.closest('button');

  if (paginationBtn.classList.contains('btn')) {
    if (paginationBtn.classList.contains('prev')) {
      renderPagination(page - 1);
      element.innerHTML = createPagination(totalPages, page - 1);
    } else {
      renderPagination(page + 1);
      element.innerHTML = createPagination(totalPages, page + 1);
    }
  }

  if (event.target === 0) {
  }
}

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
    afterPage = afterPage + 2;
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
  elementDiv.classList.remove('invisible');
  return liTag;
}
async function renderPagination(pageNumb) {
  // marvelApi.setPaginationParams(pageNumb);
  console.log(pageNumb);
  const data = await marvelApi.getCharactersByPage(pageNumb);
  totalPages = marvelApi.totalPage;
  page = marvelApi.currentPage;
  if (data.length !== 0) {
    console.log(marvelApi.totalResults);
    renderCharacterCards(data);
  } else {
    refs.charactersGallery.innerHTML = defaultImage;
  }
}
