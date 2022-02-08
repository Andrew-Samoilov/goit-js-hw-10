const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  console.log(` inside function fetchCountries ${name}`);
  return fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`).then(response =>
    response.json(),
  );
}

// function fetchPokemon(pokemonId) {
//   return fetch(`${BASE_URL}/pokemon/${pokemonId}`).then(response => response.json());
// }
