const header = document.querySelector('.header')
window.addEventListener('scroll', scrolBlur)
function scrolBlur(){
    header.classList.toggle('scroll', window.scrollY > 0)
}