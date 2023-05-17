
import MarvelAPI from './api_defaults';
import { debounce } from 'lodash';


const searchHeaderInput = document.querySelector('.search-header')
const header = document.querySelector('.header')
const form = document.querySelector('.header_search')
window.addEventListener('scroll', scrolBlur)
function scrolBlur(){
    header.classList.toggle('scroll', window.scrollY > 0)
}
function submitSearchHandle(event){
    event.preventDefault()
    localStorage.setItem('searchQuery', searchHeaderInput.value);
    form.submit();
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
                const newElement = element.substring(0, 12) + "..."
                autocompleteList.insertAdjacentHTML('beforeend', createItemListSearch(newElement))
            });
        } else {
            autocompleteList.innerHTML = ''
        }
        
    },250)
    )
        

function createItemListSearch(newElement){
   return `
   <li class="autocomplete-list-item"><a class="autocomplete-list-link" href="">${newElement}</a></li>
   `
}