
export function countryListMarkup({ flags, name }) {
return   `<li class="country-list__item">
            <div class="country-list__image">
                <img  src="${flags.svg}" alt="flag ${name.official}">
            </div>
            <p class="country-list__name">${name.common}</p>
         </li>
        `;
}