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
  return `<img src="${thumbnail.path}.${
    thumbnail.extension
  }" width="332" height="445">
  <h2>${title}</h2>
      <h3>${creators.items[3].name} | ${modified}</h3>
      <p class="comics-description">
        ${description}
      </p>
      <ul>
      <li>
      <p>format</p>
      <p>${format}</p>
      </li>
      <li><p>year realeased</p>
      <p>${new Date(dates.date).toDateString()}</p>
      </li>
<li>
<p>pages</p>
<p>${pageCount}</p>
</li>
<li>
<p>price</p><p>${printPrice.price}$</p></li>
</ul>`;
}

function renderCreators(creators, array) {
  return creators
    .map((el, index) => {
      return `<li>
        <img src="${el.thumbnail.path}.${el.thumbnail.extension}" alt="portrait of ${el.fullName}" height="50" width="50" />
        <p>${array[index].role}</p>
          <p>${el.fullName}</p>
    </li>`;
    })
    .join('');
}
function renderCharacters(characters) {
  return characters
    .map(el => {
      return `<li class="modal-window-character-item">
        <img class="modal-comics-character-pict" src="${el.thumbnail.path}.${el.thumbnail.extension}" alt="title page of ${el.name}" height="60" width="60" />
          <p>${el.name}</p>
    </li>`;
    })
    .join('');
}
function renderComicsGallery(images) {
  return images
    .map(el => {
      return `<li>
        <img class="modal-comics-gallery" src="${el.path}.${el.extension}" alt="title page of ${el.title}" height="80" width="80" />
    </li>`;
    })
    .join('');
}
