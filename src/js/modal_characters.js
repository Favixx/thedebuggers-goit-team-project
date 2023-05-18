import MarvelAPI from './api_defaults';
import { OpenComicsModal, closeIcon } from './modal_comics';
import 'animate.css';

export async function openModalCharacters(charactersId) {
  const body = document.querySelector('body');
  body.classList.add('modal-open');
  const modal = window.modal;
  const marvel = new MarvelAPI();
  const data = await marvel.getCharacterByID(charactersId);
  const monthNames = [
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

  const modalDiv = document.querySelector('.modal-comics-container');

  const markUp = data
    .map(
      e => `
  <div class="modal-characters-gallery">
    <img
      src="${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}"
      alt="${e.name}"
      class="modal-characters-main-image"
    />
    <ul class="modal-characters-gallery-list">
      <li class="modal-characters-gallery-item">
        <img
          src=""
          alt=""
          class="modal-characters-gallery-image"
        />
      </li>
      <li class="modal-characters-gallery-item">
        <img
          src=""
          alt=""
          class="modal-characters-gallery-image"
        />
      </li>
      <li class="modal-characters-gallery-item">
        <img
          src=""
          alt=""
          class="modal-characters-gallery-image"
        />
      </li>
    </ul>
  </div>
  <div class="modal-characters-info">
    <div class="modal-characters-info-header-container">
      <h2 class="modal-characters-info-character-header">${e.name}</h2>
      <p class="modal-characters-info-date">${
        monthNames[new Date(e.modified).getMonth()]
      } ${new Date(e.modified).getDate()}, ${new Date(
        e.modified
      ).getFullYear()}</p>
    </div>
    <p class="modal-characters-info-descr">
      ${e.description}
    </p>
    <div class="modal-characters-info-comics-container">
      <h2 class="modal-characters-info-comics-header">List of comics</h2>
      <div class="modal-characters-info-comics-list swiper-characters mySwiper-characters">
       
    
      </div>
    </div>
  </div>
`
    )
    .join('');
  modalDiv.innerHTML = closeIcon + markUp;
  // modal.classList.toggle('modal-active');
  const closeBtn = document.querySelector('.modal-characters-close-btn');
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('keydown', event => {
    if (event.code === 'Escape') closeModal();
  });
  const backdrop = document.querySelector('.backdrop-modal');
  backdrop.addEventListener('click', event => {
    if (event.target === event.currentTarget) closeModal();
  });
  makeSlider(charactersId);

  setTimeout(() => {
    modal.classList.add('modal-active', 'animate__animated', 'animate__fadeIn');
  }, 800);

  modal.addEventListener('animationend', () => {
    modal.classList.remove('animate__animated', 'animate__fadeIn');
  });

  function closeModal() {
    modal.classList.remove('modal-active');
    body.classList.remove('modal-open');
  }
}

async function makeSlider(characterId) {
  const marvel = new MarvelAPI();
  const comicsData = await marvel.getComicsByCharacterID(characterId);
  const list = document.querySelector('.modal-characters-info-comics-list');
  list.innerHTML = '';

  comicsData.slice(0, 3).forEach(e => {
    const item = document.createElement('div');
    item.classList.add(
      'modal-characters-info-comics-item',
      'swiper-slide-characters'
    );

    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('modal-characters-info-comics-button');
    button.addEventListener('click', () => {
      setTimeout(() => {
        openModal(e.id);
      }, 500);
    });

    const image = document.createElement('img');
    image.src = `${e.thumbnail.path}/standard_amazing.${e.thumbnail.extension}`;
    image.alt = '';
    image.classList.add('modal-characters-info-comics-image');

    const title = document.createElement('h3');
    title.classList.add('modal-characters-info-comics-name');
    title.textContent = e.title;

    const author = document.createElement('p');
    author.classList.add('modal-characters-info-comics-author');
    author.textContent = e.creators.items[0]?.name;

    button.appendChild(image);
    item.appendChild(button);
    item.appendChild(title);
    item.appendChild(author);

    // showAnimation(modal);
    // setClosed(false)
    list.appendChild(item);
    button.removeEventListener();
  });
}

function openModal(id) {
  OpenComicsModal(id);
}
