console.log('7 77');
import './css/styles.css';
import './sass/main.scss';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import getRefs from './js/get-refs';

const refs = getRefs();

const DEBOUNCE_DELAY = 300;
refs.dateField.addEventListener('input', debounce(onFieldInput, DEBOUNCE_DELAY));

function onFieldInput() {
  let trimedField = refs.dateField.value.trim();
  console.log(`dateField.value ${trimedField}`);

  fetchCountries(trimedField)
    .then(renderCountries)
    .catch(onFetchError)
    .finally(() => Notiflix.Notify.success(`finalize it`));
    
}

function renderCountries(countries) {
  const countriesCount = Object.keys(countries).length;
  console.log(`Found ${countriesCount} countries`);

  if (countriesCount > 10) {
    console.log(`Too many matches found. Please enter a more specific name.`);
    Notiflix.Notify.info(`Too many matches found. (${countriesCount}) Please enter a more specific name.`);
  }
  console.log(`renderCountries`, countries[0].name.official);

}

function onFetchError(error) {
  console.error('!!!', error);
  Notiflix.Notify.failure(`❌ Oops, there is no country with that name ${error}`);
}
