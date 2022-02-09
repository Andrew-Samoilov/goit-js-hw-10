console.log('6666');
import './css/styles.css';
import './sass/main.scss';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import getRefs from './js/get-refs';
import countryCardTpl from './templates/country-card.hbs';
import countriesCardTpl from './templates/countries-card.hbs';
const refs = getRefs();

const DEBOUNCE_DELAY = 300;
refs.dateField.addEventListener('input', debounce(onFieldInput, DEBOUNCE_DELAY));

function onFieldInput() {
    let trimedField = refs.dateField.value.trim();
    // console.log(`dateField.value ${trimedField}`);

    fetchCountries(trimedField)
        .then(renderCountries)
        .catch(onFetchError);
        //  .finally(() => Notiflix.Notify.info(`finalize it`));
}

function renderCountries(countries) {
    const countriesCount = Object.keys(countries).length;
    // console.log(`Found ${countriesCount} countries`);

    if (countriesCount > 10) {
        Notiflix.Notify.warning(
            `Too many matches found. (${countriesCount}) Please enter a more specific name.`,
        );
    } else if (countriesCount === 1) {
        refs.countryList.innerHTML = '';
        const markup = countryCardTpl(countries);
        refs.countryInfo.innerHTML = markup;
    } else {
        refs.countryInfo.innerHTML = '';
        const markup = [];
        for (const c of countries) {
            markup.push(countriesCardTpl(c));
            // console.log(`countriesCardTpl(c)`, countriesCardTpl(c));
        }
        refs.countryList.innerHTML = markup.join('');
    }
}

function onFetchError(error) {
    // console.error('!!!', error);
    Notiflix.Notify.failure(`Oops, there is no country with that name ${error}`);
}
