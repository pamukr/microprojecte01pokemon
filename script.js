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

var pokemons = getPokemons();
const arraytipus = [
    "grass",
    "fire",
    "water",
    "bug",
    "normal",
    "poison",
    "electric",
    "ground",
    "fairy",
    "fight",
    "psychic",
    "rock",
    "ghost",
    "ice",
    "dragon",
    "dark",
    "steel",
    "flying"
]

function countLegendaris() {
    let legendaris = 0;
    pokemons.forEach(function (pokemon) { if (pokemon.is_legendary == 1) legendaris++; })
    return legendaris;
}

function countGen() {
    let arranygen = [];
    for (let i = 1; i < 8; i++) {
        let numGen = 0;
        pokemons.forEach(function (pokemon) { if (pokemon.generation == i) numGen++; })
        arranygen.push(i + ": " + numGen);
    };
    return arranygen;
}

//Conta cuants pokemons de dos tipus hi han.
function count2Tipus() {
    let tipus2 = 0;
    pokemons.forEach(function (pokemon) { if (pokemon.type2 != "") tipus2++; })
    return tipus2;
}

//Retorna un dels 4 tipus amb més pokemons actualment
function getBigTipus() {
    let arrayntipus = [];
    arraytipus.forEach(function (tipus) {
        let numTipus = 0;
        pokemons.forEach(function (pokemon) { if (pokemon.type1 == tipus || pokemon.type2 == tipus) numTipus++; })
        arrayntipus.push(tipus + ": " + numTipus);
    });

    if (arrayntipus instanceof Array) {
        arrayntipus.sort(function (a, b) {
            var menys = parseInt(a.split(": ")[1]);
            var més = parseInt(b.split(": ")[1]);
            return menys - més;
        });
    }

    if (arrayntipus instanceof Array && arrayntipus.length > 2) {
        const grans = arrayntipus.slice(-4);
        return (grans[Math.floor(Math.random() * grans.length)]).split(": "[0])[0];
    } else {
        return arrayntipus[0] || arrayntipus;
    }
}

function countCounter() {
    let arraycounters = [];
    arraytipus.forEach(function (tipus) {
        let nCounter = 0;
        pokemons.forEach(function (pokemon) { if (pokemon["against_" + tipus] > 1) nCounter++; })
        arraycounters.push(tipus + ": " + nCounter);
    });

    if (arraycounters instanceof Array) {
        arraycounters.sort(function (a, b) {
            var menys = parseInt(a.split(": ")[1]);
            var més = parseInt(b.split(": ")[1]);
            return menys - més;
        });
    }

    return arraycounters;

    /*if (arraycounters instanceof Array && arraycounters.length > 2) {
        const grans = arraycounters.slice(-4);
        return (grans[Math.floor(Math.random() * grans.length)]).split(": "[0])[0];
    } else {
        return arraycounters[0] || arraycounters;
    }*/
}

function countHumanHeight() {
    let numHumanHeight = 0;
    pokemons.forEach(function (pokemon) { if (pokemon.height_m > 1.2 && pokemon.height_m < 2) numHumanHeight++; })
    return numHumanHeight;
}

function getWeightpokemon() {
    pokemons.sort(function (a, b) {
        return a.weight_kg - b.weight_kg;
    })
    return pokemons[Math.floor(Math.random() * (500 - 300 + 1)) + 300];
}

function countmesAtacSP() {
    morespattack = 0;
    pokemons.forEach(function (pokemon) {
        if (pokemon.sp_attack > pokemon.attack) {
            morespattack++;
        }
    })
    return morespattack;
}

function countmesDefensaSP() {
    morespdefense = 0;
    pokemons.forEach(function (pokemon) {
        if (pokemon.sp_defense > pokemon.defense) {
            morespdefense++;
        }
    })
    return morespdefense;
}

var conceptes1 = ["2tipus", "primesgen", "ultimesgen", "mesdefensaf", "mesatacf", "mesdefensae", "mesatace", "countertipus"];
var conceptes2 = ["alturahumana",]

function deletepokemons(parametre, resposta, info) {
    conceptes1 = conceptes1.filter(function (concepte) { return concepte!==parametre})
    if (parametre === "2tipus") {
        if (resposta === true) {
            pokemons = pokemons.filter(function (pokemon) { return pokemon.type2 != ""; });
        } else {
            pokemons = pokemons.filter(function (pokemon) { return pokemon.type2 == ""; });
        }
    }

    if(parametre === "primesgen"){

    }
}




// console.log("Llegendaris:");
// console.log(countLegendaris());
// console.log("Tipus:");
// console.log(getBigTipus());
// console.log("Counter:");
// console.log(countCounter());
// console.log("Gen:");
// console.log(countGen());
// console.log("Pokemons mida huma:")
// console.log(countHumanHeight());
// console.log("Pokemon del mig:")
// console.log(getWeightarray());
// console.log("Pokemons amb 2 tipus:")
// console.log(count2Tipus());
// console.log("Pokemons amb més atac especial:")
// console.log(countmesAtacSP());
// console.log("Pokemons amb més defensa especial:")
// console.log(countmesDefensaSP());

console.log(pokemons);
deletepokemons("2tipus",true);
console.log(pokemons);