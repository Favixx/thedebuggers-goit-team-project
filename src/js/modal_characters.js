import MarvelAPI from './api_defaults';
export async function openModalCharacters(charactersId) {
  const body = document.querySelector('body');
  const marvel = new MarvelAPI();
  const data = await marvel.getCharacterByID(1010354);
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
  const modalDiv = document.createElement('div');
  body.prepend(modalDiv);
  const markUp = data
    .map(
      e =>
        ` <div class="modal-characters-container">
      <button type="button" class="modal-characters-close-btn">
        <svg class="modal-characters-close-btn-icon" width="10" height="10">
          <use href="./img/sprite.svg#icon-close-btn"></use>
        </svg>
      </button>
  
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
              src="./images/image (2).jpg"
              alt=""
              class="modal-characters-gallery-image"
            />
          </li>
          <li class="modal-characters-gallery-item">
            <img
              src="./images/image (3).jpg"
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
          <ul class="modal-characters-info-comics-list">
            <li class="modal-characters-info-comics-item">
              <button type="button" class="modal-characters-info-comics-button">
                <img
                  src="./images/image (4).jpg"
                  alt=""
                  class="modal-characters-info-comics-image"
                />
              </button>
              <h3 class="modal-characters-info-comics-name">
                Black Widow (2020)
              </h3>
              <p class="modal-characters-info-comics-author">Kelly Thompson</p>
            </li>
            <li class="modal-characters-info-comics-item">
              <button type="button" class="modal-characters-info-comics-button">
                <img
                  src="./images/image (5).jpg"
                  alt=""
                  class="modal-characters-info-comics-image"
                />
              </button>
              <h3 class="modal-characters-info-comics-name">
                Black Widow (2020)
              </h3>
              <p class="modal-characters-info-comics-author">Kelly Thompson</p>
            </li>
            <li class="modal-characters-info-comics-item">
              <button type="button" class="modal-characters-info-comics-button">
                <img
                  src="./images/image 5.jpg"
                  alt=""
                  class="modal-characters-info-comics-image"
                />
              </button>
              <h3 class="modal-characters-info-comics-name">
                Black Widow (2020)
              </h3>
              <p class="modal-characters-info-comics-author">Kelly Thompson</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    `
    )
    .join('');
  modalDiv.innerHTML = markUp;
  const closeBtn = document.querySelector('.modal-characters-close-btn');
  closeBtn.addEventListener('click', e => modalDiv.remove());
}
