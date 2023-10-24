const loadButton = document.getElementById('loadButton');
const jsonOutput = document.getElementById('jsonOutput');

// Ruta al archivo JSON local
const jsonFile = 'pokemons.json';

// Realiza una solicitud XMLHttpRequest para cargar el archivo
const xhr = new XMLHttpRequest();
xhr.open('GET', jsonFile, true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        // Parsea el contenido JSON
        const jsonObject = JSON.parse(xhr.responseText);
        console.log("hola")
        console.log(jsonObject);


        let pkmLegendaris = 0;
        let pkmNoLegendaris = 0;

        jsonObject.forEach(function (pokemon) {
            if (pokemon.is_legendary == 1) {
                pkmLegendaris++;
            } else {
                pkmNoLegendaris++;
            }
        })

        console.log(pkmNoLegendaris);
        console.log(pkmLegendaris);
    }
};
xhr.send();

