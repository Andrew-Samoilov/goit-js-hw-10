console.log('7 77');
import './css/styles.css';
import './sass/main.scss';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import getRefs from './js/get-refs';
import countryCardTpl from './templates/country-card.hbs';
import countriesCardTpl from './templates/countries-card.hbs';
const refs = getRefs();

const DEBOUNCE_DELAY = 1000;
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
        Notiflix.Notify.info(
            `Too many matches found. (${countriesCount}) Please enter a more specific name.`,
        );
    }

    // if (countriesCount > 2) {
    //     const markup = countriesCardTpl(countries);
    //     refs.countryList.innerHTML = markup;
    //     refs.countryInfo.remove();
    // }

    if (countriesCount === 1) {
        refs.countryList.innerHTML = '';
        const markup = countryCardTpl(countries);
        refs.countryInfo.innerHTML = markup;
    } else {
        refs.countryInfo.innerHTML = '';
        const markup =[];
        for (const c of countries) {
           
            markup.push(countriesCardTpl(c));
            console.log(`countriesCardTpl(c)`, countriesCardTpl(c));
        }
        // const markup = countriesCardTpl(countries);
        refs.countryList.innerHTML = markup.join('');
    }

    console.log(`renderCountries`, countries[0].name.official);
}

function onFetchError(error) {
    console.error('!!!', error);
    Notiflix.Notify.failure(`❌ Oops, there is no country with that name ${error}`);
}
