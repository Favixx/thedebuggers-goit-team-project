import MarvelAPI from './api_defaults';
const marvelAPI = new MarvelAPI();

const modalWindow = document.querySelector('.backdrop-modal');
const modalContainer = modalWindow.querySelector('.modal-comics-container');
export const closeIcon = modalContainer.innerHTML;
// let isClosed = false;

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
    marvelAPI.getComicCharacters(comicsID)
  ])
  modalContainer.innerHTML = closeIcon + renderComicsModal(comicsData, creators, characters);
  modalWindow.classList.toggle('modal-active',true);
  console.log(modalWindow.offsetHeight, modalWindow.clienHeight, window.innerHeight);
  setTimeout(()=>{console.log(modalWindow.offsetHeight, modalWindow.clienHeight, window.innerHeight)},3000)
  const closeButton = modalWindow.querySelector('.modal-comics-close-btn');
  closeButton.addEventListener('click', closeModal);
  modalWindow.addEventListener('click', event => {
    console.log('clicked modal');
    if (event.target == event.currentTarget) {
      // showAnimation(modalWindow)
      closeModal()
    }
  });
}

// export function setClosed(bool) {
//   isClosed = bool;
// }
// export function getClosed(){
//   return isClosed;
// }
function closeModal() {
  modalWindow.classList.toggle('modal-active',false);
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
        <h2 class="modal-comics-title">${title}</h2>
        <h3>${creators.items[3]?.name} | ${formatDate(modified)}</h3>
      </div>
      <p class="modal-comics-text">
        ${description || "description missing"}
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
      return `<li class="modal-window-character-item" data-id="el.id">
        <img class="modal-comics-character-pict" src="${el.thumbnail.path}/standard_medium.${el.thumbnail.extension}" alt="title page of ${el.name}" height="60" width="60" />
          <p class="modal-comics-text">${el.name}</p>
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

function renderTitleImage([{thumbnail, images}]) {
  return `
      <img class="modal-comics-main-pict" src="${thumbnail.path}.${
        thumbnail.extension
      }" width="295">
      <ul class="modal-comics-gallery">${renderComicsGallery(images)}</ul>`;
}

function renderComicsModal(comics, creators, characters){
  return `
  <div class="modal-comics-title-image-wrapper">${renderTitleImage(comics)}</div>
    <div class="modal-comics-info-wrapper">
      <div class="modal-comics-general-info">${renderComicsCard(comics)}</div>
      <h2>Creator</h2>
      <ul class="comics-modal-creators-list">${renderCreators(creators, comics[0].creators.items)}</ul>
      <h2>Characters</h2>
      <ul class="comics-modal-characters-list">${renderCharacters(characters)}</ul>
    </div>`
}
function formatDate(str){
  const date = new Date(str);
  console.log(str);
  return `${
    monthName[date.getMonth()]} ${
    date.getDate()}, ${
    date.getFullYear()}`
}
// export function showAnimation(elem){
//   console.log('showAnimation started');
//   elem.classList.toggle('modal-animation');
//   setTimeout(()=>{
//     if (isClosed) elem.classList.toggle('modal-active',false)
//     else elem.classList.toggle('modal-animation', false);
//   },500)
// }
