// import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';
// // import Swiper and modules styles
// import 'swiper/css';
// import 'swiper/css/navigation';

//const { Scrollbar } = require("swiper");

// import 'swiper/css/pagination';
import Swiper, { Scrollbar, Autoplay } from 'swiper';

// import styles bundle
//import 'swiper/css/bundle';
// init Swiper:
import 'swiper/css';
import 'swiper/css/autoplay'
// import 'swiper/css/scrollbar';
const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Scrollbar, Autoplay],
  //   pagination: {
  //     el: '.swiper-pagination',
  //     // clickable: true,
  //     type: 'progressbar',
  //   },
  scrollbar: {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true,
  },
  breakpoints: {
    320: {
      direction: 'vertical',
    },
    768:{
      direction: 'horizontal',
    },
    1440:{
      direction: 'vertical'
    }
  },
  
  // Navigation arrows
});
// Ініціалізація Swiper слайдера

//Обробник події ініціалізації слайдера
swiper.on('init', function () {
  updateScrollbarColor(); // Виклик функції для зміни кольору Scrollbar при ініціалізації
});

// Обробник події зміни слайда
swiper.on('slideChange', function () {
  updateScrollbarColor(); // Виклик функції для зміни кольору Scrollbar при зміні слайда
});

// Функція для зміни кольору Scrollbar
function updateScrollbarColor() {
  let activeSlideIndex = swiper.activeIndex; // Отримання індексу поточного слайда
  console.log(activeSlideIndex)
  // Зміна кольору Scrollbar в залежності від поточного слайда
  if (activeSlideIndex == 0) {
    swiper.scrollbar.dragEl.style.backgroundColor = '#34387F';
  } else if (activeSlideIndex == 1) {
    swiper.scrollbar.dragEl.style.backgroundColor = '#5B7F3C';
  } else if (activeSlideIndex == 2) {
    swiper.scrollbar.dragEl.style.backgroundColor = '#600404';
  }
}
