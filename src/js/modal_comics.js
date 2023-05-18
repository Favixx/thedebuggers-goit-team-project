import MarvelAPI from './api_defaults';
import 'animate.css';
import { openModalCharacters } from './modal_characters';
const marvelAPI = new MarvelAPI();

const modalWindow = document.querySelector('.backdrop-modal');
const modalContainer = modalWindow.querySelector('.modal-comics-container');
export const closeIcon = modalContainer.innerHTML;

const monthName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export async function OpenComicsModal(comicsID) {
  const comicsEndpoint = `comics/${comicsID}`;
  const [comicsData, creators, characters] = await Promise.all([
    marvelAPI.getData(comicsEndpoint),
    marvelAPI.getComicCreators(comicsID),
    marvelAPI.getComicCharacters(comicsID),
  ]);
  modalContainer.innerHTML =
    closeIcon + renderComicsModal(comicsData, creators, characters);

  const closeButton = modalWindow.querySelector('.modal-comics-close-btn');
  const characterList = modalWindow.querySelector('.comics-modal-characters-list')

  modalWindow.classList.add(
    'modal-active',
    'animate__animated',
    'animate__fadeIn'
  );
  characterList.addEventListener('click', onClickCharacter)
  closeButton.addEventListener('click', closeModal);
  modalWindow.addEventListener('click', closeModal);

  function closeModal(event) {
    if (event === null 
      || event.target === event.currentTarget 
      || event.target.closest('.modal-comics-close-btn') === closeButton){
      modalWindow.classList.remove(
        'animate__animated',
        'animate__fadeIn',
        'modal-active',
        false
      );
      document.body.classList.remove('modal-open');
      closeButton.removeEventListener('click', closeModal);
      modalWindow.removeEventListener('click', closeModal);
    }
  }
  function onClickCharacter(event){
    event.preventDefault();
    const characterId = event.target.closest('li')?.dataset.id;
    if (characterId) {
      console.log(characterId);
      characterList.removeEventListener('click', onClickCharacter);
      closeModal(null);
      openModalCharacters(characterId);
    }
  }
}

function renderComicsCard(comicsData) {
  const {
    title,
    format,
    dates: [dates],
    pageCount,
    prices: [printPrice],
    description,
    creators,
    characters,
    modified,
  } = comicsData[0];
  return `
      <div class="modal-comics-title-wrapper"> 
        <h2 class="modal-comics-title-main">${title}</h2>
        <h3>${creators.items[3]?.name} | ${formatDate(modified)}</h3>
      </div>
      <p class="modal-comics-text">
        ${description || 'description missing'}
      </p>
      <ul class="modal-comics-filter-info">
      <li class="modal-comics-filter-item">
      <p class="modal-comics-filter">format</p>
      <p class="modal-comics-filter-descr">${format}</p>
      </li>
      <li>
      <p class="modal-comics-filter">year realeased</p>
      <p class="modal-comics-filter-descr">${new Date(
        dates.date
      ).getFullYear()}</p>
      </li>
<li>
<p class="modal-comics-filter">pages</p>
<p class="modal-comics-filter-descr">${pageCount}</p>
</li>
<li>
<p class="modal-comics-filter">price</p>
<p class="modal-comics-filter-descr">${printPrice.price}$</p>
  </li>
</ul>`;
}

function renderCreators(creators, array) {
  return creators
    .map((el, index) => {
      return `<li class="modal-comics-creators-li">
        <img class="comics-modal-author-portrait" src="${el.thumbnail.path}/standard_medium.${el.thumbnail.extension}" alt="portrait of ${el.fullName}" height="50" width="50" />
        <div class="comics-modal-author-descr"><p class="modal-comics-author-role">${array[index].role}</p>
          <p class="modal-comics-text">${el.fullName}</p></div>
    </li>`;
    })
    .join('');
}
function renderCharacters(characters) {
  return characters
    .map(el => {
      return `<li class="modal-window-character-item" data-id="${el.id}">
      <a href="#">
        <img class="modal-comics-character-pict" src="${el.thumbnail.path}/standard_medium.${el.thumbnail.extension}" alt="title page of ${el.name}" height="60" width="60" />
        <p class="modal-comics-text">${el.name}</p>
      </a>
    </li>`;
    })
    .join('');
}
function renderComicsGallery(images) {
  return images
    .map(el => {
      return `<li>
        <img class="modal-comics-gallery-item" src="${el.path}/standard_medium.${el.extension}" alt="title page of ${el.title}" height="80" width="80" />
    </li>`;
    })
    .join('');
}

function renderTitleImage([{ thumbnail, images }]) {
  return `
      <img class="modal-comics-main-pict" src="${thumbnail.path}.${
    thumbnail.extension
  }" width="295">
      <ul class="modal-comics-gallery">${renderComicsGallery(images)}</ul>`;
}

function renderComicsModal(comics, creators, characters) {
  return `
  <div class="modal-comics-title-image-wrapper">${renderTitleImage(
    comics
  )}</div>
    <div class="modal-comics-info-wrapper">
      <div class="modal-comics-general-info">${renderComicsCard(comics)}</div>
      <h2 class="modal-comics-title">Creator</h2>
      <ul class="comics-modal-creators-list">${renderCreators(
        creators,
        comics[0].creators.items
      )}</ul>
      <h2 class="modal-comics-title">Characters</h2>
      <ul class="comics-modal-characters-list">${renderCharacters(
        characters
      )}</ul>
    </div>`;
}
function formatDate(str) {
  const date = new Date(str);
  return `${
    monthName[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
}
