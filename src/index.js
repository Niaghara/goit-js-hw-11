import './css/styles.css';
import { fetchCountry } from './api-country.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { countryListMarkup } from './templates/country-list.js';
import { countryBlankMarkup } from './templates/country-blank.js';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener(`input`, debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  // e.preventDefault();

  const searchBoxValue = e.target.value.trim();
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  if (!searchBoxValue) return;

  fetchCountry(searchBoxValue)
    .then(data => {
      if (data.length === 1) {
        const markup = data.map(country => countryBlankMarkup(country));
        refs.countryInfo.innerHTML = markup.join('');
        refs.countryList.innerHTML = '';
      }

      if (data.length > 1 && data.length <= 10) {
        const markup = data.map(country => countryListMarkup(country));
        refs.countryInfo.innerHTML = markup.join('');
        refs.countryList.innerHTML = '';
      }

      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}
