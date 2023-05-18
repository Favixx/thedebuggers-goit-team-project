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
  headerForm: document.querySelector('.header_search')
};

const marvelApi = new MarvelAPI();
let totalPages;
let page;
const element = document.querySelector('.pagination ul');
const elementDiv = document.querySelector('.pagination');
const defaultImage = `<picture class="try-looking">
<source srcset="https://i.ibb.co/WBRXLmm/frame-tabl-deskt.png 1x, https://i.ibb.co/s2KsRqF/frame-2x-tabl-deskt.png 2x" media="(min-width: 768px)" type="image/png">
<source srcset="https://i.ibb.co/HK8hr3T/frame-mob.png 1x, https://i.ibb.co/dW72Tjr/frame-2x-mob.png 2x" type="image/png">
<img src="https://i.ibb.co/HK8hr3T/frame-mob.png" title="default-image" alt="Try looking for something else" width="375px" height="221px"/>
</picture>`;
function preventionDefault(event){
  event.preventDefault()
}
refs.form.addEventListener('submit', preventionDefault)
refs.headerForm.addEventListener('submit', preventionDefault)
if((localStorage.getItem("searchQuery"))!==null){
document.addEventListener("DOMContentLoaded", submitOnLoadIfNotEmpty)
function submitOnLoadIfNotEmpty(){
  refs.nameInput.value = localStorage.getItem('searchQuery')
  localStorage.removeItem('searchQuery')
  handleChange();
}
} 
else if(localStorage.getItem("searchQueryAutocomplete")!==null){
  document.addEventListener("DOMContentLoaded", submitOnLoadIfNotEmpty)
  function submitOnLoadIfNotEmpty(){
    
    refs.nameInput.value = localStorage.getItem("searchQueryAutocomplete")
    localStorage.removeItem('searchQueryAutocomplete')
    handleChange()
  }
}
 else{
  handleChange()
}
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
  const comics = (refs.comicsInput.value.trim());
  const selectValue = refs.selectInput.value;
  const name = (refs.nameInput.value).trim();
  const modifiedSince = refs.dateInput.value;
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
    renderCharacterCards(data);
    element.innerHTML = createPagination(totalPages, page);
  } else {
    refs.charactersGallery.innerHTML = defaultImage;
    elementDiv.classList.add("invisible");
  }
}

// Event listener at gallery
refs.charactersGallery.addEventListener('click', handleImageClick);
function handleImageClick(event) {
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
    fn.setPerPage(16);
  }
}

element.addEventListener('click', handleClickPagination);
function handleClickPagination(event) {
  try{
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

  if (paginationBtn.classList.contains('numb')) {
    const pageNumber = parseInt(paginationBtn.textContent);
    renderPagination(pageNumber);
    element.innerHTML = createPagination(totalPages, pageNumber);
  }
}catch{
  return
}
}

function createPagination(totalPages, page) {
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (totalPages === 1) {
    return '';
  }
  if (page > 1) {
    liTag += `<button class="btn prev"><span><</span></button>`;
  }

  if (page > 2) {
    liTag += `<button class="first numb"><span>1</span></button>`;
    if (page > 3) {
      liTag += `<button class="dots"><span>...</span></button>`;
    }
  }

  for (let plength = beforePage; plength <= afterPage; plength += 1) {
    if (plength > totalPages || plength < 1) {
      continue;
    }
    if (plength === page) {
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

  const data = await marvelApi.getCharactersByPage(pageNumb);
  totalPages = marvelApi.totalPage;
  page = marvelApi.currentPage;
  if (data.length !== 0) {
    renderCharacterCards(data);
  } 
  if(data.length === 0){
    refs.charactersGallery.innerHTML = defaultImage;
    elementDiv.classList.add('invisible');
  }
}
