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
import 'swiper/css/mousewheel'
const swiper = new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Scrollbar, Autoplay, ],
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
swiper.on('scrollbarDragMove', ()=>{

  swiper.scrollbar.init()
})
//Обробник події ініціалізації слайдера
swiper.on('init', function () {
  updateScrollbarColor(); // Виклик функції для зміни кольору Scrollbar при ініціалізації
});

// Обробник події зміни слайда
swiper.on('slideChange', function () {
  updateScrollbarColor(); // Виклик функції для зміни кольору Scrollbar при зміні слайда
});




function updateScrollbarColor() {
  let activeSlideIndex = swiper.activeIndex;
  const slides = document.querySelectorAll('.swiper-slide');
  slides.forEach((slide, index) => {
    const part_2_1 = slide.querySelector('.part-2-1');
    part_2_1.classList.remove("color-1", "color-2", "color-3");
    part_2_1.classList.add("color-" + (index % 3 + 1));

    const scrollbar = slide.querySelector('.swiper-scrollbar');
    if (activeSlideIndex == 0) {
      swiper.scrollbar.dragEl.style.backgroundColor = '#34387F';
    } else if (activeSlideIndex == 1) {
      swiper.scrollbar.dragEl.style.backgroundColor = '#5B7F3C';
    } else if (activeSlideIndex == 2) {
      swiper.scrollbar.dragEl.style.backgroundColor = '#600404';
    }
  }); 
}