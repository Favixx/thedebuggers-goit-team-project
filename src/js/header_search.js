import MarvelAPI from './api_defaults';
import { debounce } from 'lodash';
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

const apiSearch = new MarvelAPI()

async function getDataSearch (inputValue){
    apiSearch.setPerPage(8)
    const objectNameInfo = await apiSearch.getNameStartWith(inputValue)
    const arrName = objectNameInfo.map(el=>{return el.name})
    
    return arrName
    return console.log(arrName);
}

const searchHeader = document.querySelector('.search-header')
const autocompleteList = document.querySelector('.autocomplete-list')

searchHeader.addEventListener('input', 
debounce(
    async (event)=>{
        if(event.target.value.trim() === ''){
            autocompleteList.innerHTML = ''
            return
        }
        const result = await getDataSearch(event.target.value.trim())
        // console.log(result);
        if(result !== []){
            autocompleteList.innerHTML = ''
            result.forEach(element => {
                const newElement = element.substring(0, 18) + "..."
                autocompleteList.insertAdjacentHTML('beforeend', createItemListSearch(newElement))
            });
        } else {
            autocompleteList.innerHTML = ''
        }

        return result
    },250)
    )
        
    buttonSearchHeader.addEventListener('click', submitHeaderForm);
    
    function submitHeaderForm(){
        form.submit()
     }
function createItemListSearch(newElement){
   return `
   <li class="autocomplete-list-item"><a class="autocomplete-list-link" href="">${newElement}</a></li>
   `
}


// СДЕЛАЛ НО ХУЙ ЕГО НОРМАЛЬНО ЧИ НЕ. НО Я ПРОВЕРИЛ НЕСКОЛЬКО РАЗ, ТО ЧТО ПОПАДАЕТ В ЛОКАЛ ВОПЛНЕ ХВАТАТ ДЛЯ ТОГО ЧТОБЫ ЗАПРОС ПОНЯЛ О ЧЁМ РЕЧь

autocompleteList.addEventListener('click', async (event) => {
    event.preventDefault();
    if (event.target.classList.contains('autocomplete-list-link')) {
        const contentLocal = event.target.textContent.replace('...', '').trim();
        
        localStorage.setItem("searchQuery", JSON.stringify(await getDataSearch(contentLocal)));
        
        // Получаем родительскую форму
        const form = event.target.closest('form');
        
        // Проверяем, что форма существует и вызываем метод submit()
        if (form) {
            form.submit();
        }
    }
});

// Очистить значение поля
searchHeader.addEventListener('blur', (event)=> {
    searchHeader.value = '';
    autocompleteList.style.display = 'none'
  });