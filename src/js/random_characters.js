import MarvelAPI from './api_defaults';
const INTERVAL = 3500;
const listRef = document.querySelector('.random-characters-list');
const imgRef = document.querySelector('.img-wrapper');
console.log(imgRef)

const marvelApi = new MarvelAPI();
// marvelApi.setPaginationParams(4, 20);
async function initialRandomizing(){
  const data = await marvelApi.getCharacters();
  console.log(data);
  const randomCards = data.sort(() => 0.5 - Math.random());
  let selectedCards = randomCards.slice(0, 5);
  let currentCard = selectedCards[0];
  let slideIndex = selectedCards.indexOf(currentCard);
  function getImgUrl(obj, size){
    return `${obj.path}/${size}.${obj.extension}`;
  };
  
  function renderImage(){
    imgRef.innerHTML = '';
    return imgRef.insertAdjacentHTML(
      'afterbegin',
      `<img src="${getImgUrl(
        currentCard.thumbnail,
        'portrait_uncanny'
        )}" class="random-characters-img" />`
        );
      };
      
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

