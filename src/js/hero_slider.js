
import 'animate.css'

import Swiper, { Scrollbar, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/autoplay'
import 'swiper/css/mousewheel'
const swiper = new Swiper('.swiper', {
 
  modules: [Scrollbar, Autoplay, ],

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
 

});
swiper.on('scrollbarDragMove', ()=>{

  swiper.scrollbar.init()
})

swiper.on('init', function () {
  updateScrollbarColor(); 
});


swiper.on('slideChange', function () {
  updateScrollbarColor(); 
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