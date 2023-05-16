import axios from 'axios';
import MarvelAPI from './api_defaults';

const marvelAPI = new MarvelAPI();

const comicsDescription = document.querySelector(
  '.comics-modal-comics-description'
);
const modalWindow = document.querySelector('.comics-modal-window');
const creatorsList = modalWindow.querySelector('.comics-modal-creators-list');
const charactersList = modalWindow.querySelector(
  '.comics-modal-characters-list'
);
const genInfo = modalWindow.querySelector('.modal-comics-general-info');

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
async function getComicsByID(comicsID) {
  //   const promises = [];
  const comicsEndpoint = `comics/${comicsID}`;
  const comicsData = await marvelAPI.getData(comicsEndpoint);
  const creators = await marvelAPI.getComicCreators(comicsID);
  const characters = await marvelAPI.getComicCharacters(comicsID);
  //   const commonPromis = await Promise.all([comicsData, creators, characters]);
  //   console.log(commonPromis);
  //   promises.push(comicsData, creators,characters)
  console.log(comicsData);
  console.log(creators);
  genInfo.innerHTML = renderComicsCard(comicsData);
  console.log(renderComicsCard(comicsData));
  console.log(characters);
  charactersList.innerHTML = renderCharacters(characters);
  creatorsList.innerHTML = renderCreators(
    creators,
    comicsData[0].creators.items
  );
  //   marvelAPI.setdefaultURL(comicsData[0].creators.items[0].resourceURI);
  //   const creatorsData = await marvelAPI.getData('');
  //   console.log(creatorsData);

  //   console.log(comicsData[0].creators.items[0].resourceURI);
}

getComicsByID(21366);

function renderComicsCard(comicsData, creatorsNew) {
  const {
    title,
    format,
    dates: [dates],
    pageCount,
    prices: [printPrice],
    thumbnail,
    description,
    creators,
    characters,
    modified,
    images,
  } = comicsData[0];
  // const creatorsMarkup = renderComicsCard(creatorsNew)
  return `<div><img class="modal-comics-main-pict" src="${thumbnail.path}.${
    thumbnail.extension
  }" width="295">
  <ul class="modal-comics-gallery">${renderComicsGallery(images)}</ul>
  </div>
  <h2 class="title">${title}</h2>
      <h3>${creators.items[3].name} | ${
    monthName[new Date(modified).getMonth()]
  } ${new Date(modified).getDate()}, ${new Date(modified).getFullYear()}</h3>
      <p class="comics-modal-comics-description">
        ${description}
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
        <img class="comics-modal-author-portrait" src="${el.thumbnail.path}.${el.thumbnail.extension}" alt="portrait of ${el.fullName}" height="50" width="50" />
        <div class=""><p class="modal-comics-author-role">${array[index].role}</p>
          <p class="modal-comics-author-name">${el.fullName}</p></div>
    </li>`;
    })
    .join('');
}
function renderCharacters(characters) {
  return characters
    .map(el => {
      return `<li class="modal-window-character-item">
        <img class="modal-comics-character-pict" src="${el.thumbnail.path}.${el.thumbnail.extension}" alt="title page of ${el.name}" height="60" width="60" />
          <p class="modal-comics-character-name">${el.name}</p>
    </li>`;
    })
    .join('');
}
function renderComicsGallery(images) {
  return images
    .map(el => {
      return `<li>
        <img class="modal-comics-gallery-item" src="${el.path}.${el.extension}" alt="title page of ${el.title}" height="80" width="80" />
    </li>`;
    })
    .join('');
}
