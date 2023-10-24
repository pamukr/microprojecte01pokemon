// Realiza una solicitud XMLHttpRequest para cargar el archivo
function getPokemons() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', "pokemons.json", false); // El tercer argumento es 'false' para solicitud síncrona
    xhr.send();

    if (xhr.status === 200) {
        // Parsea el contenido JSON y almacena en la variable global
        return JSON.parse(xhr.responseText);
    }
}
const pokemons = getPokemons();


function getLegendaris(listapokemons) {
    let legendaris = 0;
    pokemons.forEach(function (pokemon) {
        if (pokemon.is_legendary == 1) {
            legendaris++;
        }
    })
    return legendaris;
}
console.log(getLegendaris(pokemons));
