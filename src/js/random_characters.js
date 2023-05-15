import MarvelAPI from './api_defaults';
const INTERVAL = 3500;
const NumberOfCards = 1562;
const listRef = document.querySelector('.random-characters-list');
const imgRef = document.querySelector('.img-wrapper');

const marvelApi = new MarvelAPI();

const getRandomNumbers = number => {
  const randomNumbers = [];
  for (let i = 0; i < 5; i++) {
    const randomNumber = Math.floor(Math.random() * (number + 1));
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
};

const randomNumbers = getRandomNumbers(NumberOfCards);

async function initialRandomizing() {
  const data = await marvelApi.getFiveCharacters(randomNumbers);
  const randomCards = data.sort(() => 0.5 - Math.random());
  let selectedCards = randomCards.slice(0, 5);
  let currentCard = selectedCards[0];
  let slideIndex = selectedCards.indexOf(currentCard);
  function getImgUrl(obj) {
    return `${obj.path}.${obj.extension}`;
  }

  function renderImage() {
    imgRef.innerHTML = '';
    const imgElement = document.createElement('img');
    imgElement.src = getImgUrl(currentCard.thumbnail);
    imgElement.classList.add('random-characters-img');
    imgRef.appendChild(imgElement);
    setTimeout(() => imgElement.classList.add('show'), 300);
  }

  function hideImage() {
    const imgElement = imgRef.querySelector('.random-characters-img');
    if (imgElement) {
      imgElement.classList.remove('show');
      setTimeout(() => (imgRef.innerHTML = ''), 3500);
    }
  }

  function renderItems() {
    listRef.innerHTML = '';
    return selectedCards.forEach(item => {
      listRef.insertAdjacentHTML(
        'afterbegin',
        `<li class="random-characters-item">
        <a href="#" class=" random-item-link ${
          item.id === currentCard.id ? 'active' : ''
        }">
        <h2 class="random-item-title">${item.name}</h2>
        <p class="random-item-text">${item.description}</p>
        </a>
        </li>`
      );
    });
  }

  function showSlides() {
    hideImage();
    renderImage();
    renderItems();
    let slides = document.getElementsByClassName('random-characters-item');
    for (let i = 0; i < slides.length; i++) {
      if (slideIndex === 4) {
        currentCard = selectedCards[0];
      } else {
        currentCard = selectedCards[slideIndex + 1];
      }
    }
    slideIndex++;
    if (slideIndex > slides.length - 1) {
      slideIndex = 0;
    }
    setTimeout(showSlides, INTERVAL); // Change image every 3.5 seconds
  }
  showSlides();
}
initialRandomizing();
