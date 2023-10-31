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

function getInfoPokemon(param) {
    switch (param) {
        case "nLegendaris":
            let legendaris = 0;
            pokemons.forEach(function (pokemon) { if (pokemon.is_legendary == 1) legendaris++; })
            return legendaris;
            break;
        case "nGeneracio":
            let arranygen = [];
            for (let i = 1; i < 8; i++) {
                let numGen = 0;
                pokemons.forEach(function (pokemon) { if (pokemon.generation == i) numGen++; })
                arranygen.push(i + ": " + numGen);
            };
            return arranygen;
            break;
        case "n2Tipus":
            let tipus2 = 0;
            pokemons.forEach(function (pokemon) { if (pokemon.type2 != "") tipus2++; })
            return tipus2;
            break;
            
        // Retorna un dels 4 tipus amb més Pokémons
        case "nBigTipus":
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
            break;

        // Retorna el número de counters que té un tipus
        case "nCounter":
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
            break;
        // Retorna el número de Pokémon que tenen l'altura 
        case "nHumanHeight":
            let numHumanHeight = 0;
            pokemons.forEach(function (pokemon) { if (pokemon.height_m > 1.2 && pokemon.height_m < 2) numHumanHeight++; })
            return numHumanHeight;
            break;
        // Retorna un Pokémon que tingui un pes entre 15 i 40 kg
        case "nWeightPokemon":
            pokemons.sort(function (a, b) {
                return a.weight_kg - b.weight_kg;
            })
            return pokemons[Math.floor(Math.random() * (500 - 300 + 1)) + 300];
            break;
        // Retorna el número de Pokémons que tenen més AttackSP que AttackFísic
        case "nMoreSPAttack":
            morespattack = 0;
            pokemons.forEach(function (pokemon) {
                if (pokemon.sp_attack > pokemon.attack) {
                    morespattack++;
                }
            })
            return morespattack;
            break;
        // Retorna el número de Pokémons que tenen més DefensaSP que DefensaFísica
        case "nMoreSPDefense":
            morespdefense = 0;
            pokemons.forEach(function (pokemon) {
                if (pokemon.sp_defense > pokemon.defense) {
                    morespdefense++;
                }
            })
            return morespdefense;
            break;
    }
}

var conceptes1 = ["2tipus", "primesgen", "mesdefensaf", "mesatacf", "countertipus"];
var conceptes2 = ["alturahumana", ""]

function deletepokemons(param, si, data) {
    conceptes1 = conceptes1.filter(function (concepte) { return concepte !== parametre })
    switch (param) {
        case "2tipus":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.type2 != ""; });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.type2 == ""; });
            }
            break;
        case "primesgen":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.generation <= "3"; });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.generation > "3"; });
            }
            break;
        case "mesdefensaf":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.defense > pokemon.sp_defense; });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.defense <= pokemon.sp_defense; });
            }
            break;
        case "mesatacf":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.attack > pokemon.sp_attack; });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.attack <= pokemon.sp_attack; });
            }
            break;
        case "countertipus":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return ["against_" + data] > 1 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return ["against_" + data] <= 1 });
            }
            break;

        default:
            console.log("Paràmatre no vàlid");
            break;
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
deletepokemons("2tipus", true);
console.log(pokemons);