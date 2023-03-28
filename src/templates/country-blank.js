export function countryBlankMarkup({
flags,
name,
capital,
population,
languages,
}) {
return `
 <div class = "country-wrapper">
                <div class = "country-flag-wrapper">
                 <img class = "country-flag" src = "${flags.svg}" alt = "${name.official}">
                </div>
                <p class = "country-name"> ${name.common} </p>
            </div>
            <p class="country-capital">Capital:<span class="info-text">${capital}</span> </p>
            <p class="country-population">Population:<span class="info-text">${population}</span> </p>
            <p class="country-languages">Languages:<span class="info-text">${Object.values(languages).join(', ')}</span> </p>`
}