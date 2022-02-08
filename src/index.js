console.log('777');
import './css/styles.css';
import './sass/main.scss';
import { fetchCountries } from './js/fetchCountries';

let dateField= document.querySelector('#search-box');// console.log(dateField);

dateField.addEventListener('input',onFieldInput);

function onFieldInput(){
    console.log(`dateField.value ${dateField.value}`);
}

const DEBOUNCE_DELAY = 300;

fetchCountries(22);
// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages 

fetch("https://restcountries.com/v3.1/name/ukraine?fields=name,capital,population,flags,languages")
  .then(response => {
    // Response handling
  })
  .then(data => {
    // Data handling
  })
  .catch(error => {
    // Error handling
  });