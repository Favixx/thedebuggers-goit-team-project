const searchHeaderInput = document.querySelector('.search-header')
const header = document.querySelector('.header')
const form = document.querySelector('.header_search')
const buttonSearchHeader = document.querySelector('#header-search')
window.addEventListener('scroll', scrolBlur)
function scrolBlur(){
    header.classList.toggle('scroll', window.scrollY > 0)
}
function submitSearchHandle(event){
    event.preventDefault()
    localStorage.setItem('searchQuery', searchHeaderInput.value);
    form.submit()
}
form.addEventListener('submit', submitSearchHandle)
function submitHeaderForm(){
    form.submit()
}
buttonSearchHeader.addEventListener('click', submitHeaderForm)