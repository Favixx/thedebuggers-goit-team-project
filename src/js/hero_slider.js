// import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';
// // import Swiper and modules styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import Swiper from 'swiper/bundle';

// import styles bundle
//import 'swiper/css/bundle';
// init Swiper:
const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  //modules: [Navigation, Pagination, Scrollbar],
  direction: 'vertical',
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

  // Navigation arrows
});
// Ініціалізація Swiper слайдера

// Обробник події ініціалізації слайдера
swiper.on('init', function () {
  updateScrollbarColor(); // Виклик функції для зміни кольору Scrollbar при ініціалізації
});

// Обробник події зміни слайда
swiper.on('slideChange', function () {
  updateScrollbarColor(); // Виклик функції для зміни кольору Scrollbar при зміні слайда
});

// Функція для зміни кольору Scrollbar
function updateScrollbarColor() {
  var activeSlideIndex = swiper.activeIndex; // Отримання індексу поточного слайда

  // Зміна кольору Scrollbar в залежності від поточного слайда
  if (activeSlideIndex === 0) {
    swiper.scrollbar.dragEl.style.backgroundColor = 'blue';
  } else if (activeSlideIndex === 1) {
    swiper.scrollbar.dragEl.style.backgroundColor = 'green';
  } else if (activeSlideIndex === 2) {
    swiper.scrollbar.dragEl.style.backgroundColor = 'red';
  }
}
