console.log('777');
import './css/styles.css';
import './sass/main.scss';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

// import getRefs from '.js/get-refs';

const refs = getRefs();

refs.dateField.addEventListener('input', onFieldInput);

function onFieldInput() {
  let trimedField = dateField.value.trim();
  console.log(`dateField.value ${trimedField}`);

  fetchCountries(trimedField)
    .then(renderCountries)
    .catch(onFetchError)
    .finally(() => console.log(`finalize it`));

  // API.fetchPokemon(searchQuery)
  // .then(renderPokemonCard)
  // .catch(onFetchError)
  // .finally(() => form.reset());
}

const DEBOUNCE_DELAY = 300;

function renderCountries(countries) {
  console.log(`renderCountries ${countries}`);
}

function onFetchError(error) {
  Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
  Notiflix.Notify.failure(`❌ Oops, there is no country with that name`);
}
