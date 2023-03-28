const COUNTRY_URL = 'https://restcountries.com/v3.1/name';

function fetchCountry(name) {  
    return fetch(
      `${COUNTRY_URL}/${name}?fields=name,capital,population,languages,flags`,
    ).then(response => {
        if (!response.ok) {
            throw new Error (response.status);
          }
          return response.json();
        });
}  
export { fetchCountry };