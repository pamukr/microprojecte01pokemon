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
        case "bigGen":
            let arranygen = [];
            for (let i = 1; i < 8; i++) {
                let numGen = 0;
                pokemons.forEach(function (pokemon) { if (pokemon.generation == i) numGen++; })
                arranygen.push(i + ": " + numGen);
            };

            if (arranygen instanceof Array) {
                arranygen.sort(function (a, b) {
                    var menys = parseInt(a.split(": ")[1]);
                    var més = parseInt(b.split(": ")[1]);
                    return menys - més;
                });
            }
            return arranygen[arranygen.length - 1].split(": "[0])[0];
            break;
        case "n2Tipus":
            let tipus2 = 0;
            pokemons.forEach(function (pokemon) { if (pokemon.type2 != "") tipus2++; })
            return tipus2;
            break;

        // Retorna un dels 4 tipus amb més Pokémons
        case "rBigTipus":
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
            return arrayntipus[arrayntipus.length - 1].split(": "[0])[0];
            break;

        // Retorna el número de counters que té un tipus
        case "rBigCounter":
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

            return arraycounters[arraycounters.length - 1].split(": "[0])[0];
            break;
        // Retorna el número de Pokémon que tenen l'altura 
        case "nHumanHeight":
            let numHumanHeight = 0;
            pokemons.forEach(function (pokemon) { if (pokemon.height_m > 1.2 && pokemon.height_m < 2) numHumanHeight++; })
            return numHumanHeight;
            break;
        // Retorna sempre el pokémon del pes mig.
        case "mWeightPokemon":
            pokemons.sort(function (a, b) {
                return a.weight_kg - b.weight_kg;
            })
            return pokemons[Math.floor(pokemons.length / 2)];
            break;
        // Retorna sempre el pokémon de la velocitat del mig.
        case "mSpeedPokemon":
            pokemons.sort(function (a, b) {
                return a.speed - b.speed;
            })
            return pokemons[Math.floor(pokemons.length / 2)];
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

function updatePokemons(param, si, data) {
    switch (param) {
        case "2tipus":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.type2 != ""; });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.type2 == ""; });
            }
            break;
        case "lastgen":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.generation) >= "4"; });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.generation) < "4"; });
            }
            break;
        case "mesdefensaf":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.defense) > parseInt(pokemon.sp_defense); });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.defense) <= parseInt(pokemon.sp_defense); });
            }
            break;
        case "mesatacf":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.attack) > parseInt(pokemon.sp_attack); });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.attack) <= parseInt(pokemon.sp_attack); });
            }
            break;
        case "counter":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon["against_" + data]) > 1 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon["against_" + data]) <= 1 });
            }
            break;
        case "pesames":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.weight_kg) > (parseInt(data) - 3) });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.weight_kg) < (parseInt(data) + 3) });
            }
            break;
        case "alturahumana":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.height_m >= 1.2 && pokemon.height_m <= 2 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.height_m < 1.2 || pokemon.height_m > 2 });
            }
            break;
        case "rapid":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.speed > 50 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.speed < 70 });
            }
            break;
        case "facilcapturar":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.capture_rate > 80 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.capture_rate <= 120 });
            }
            break;
        case "moltavida":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.hp >= 70 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.hp <= 120 });
            }
            break;
        case "bonatacf":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.attack >= 100 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.attack <= 130 });
            }
            break;
        case "bonatace":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.sp_attack >= 100 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.sp_attack <= 130 });
            }
            break;
        case "bonadefensaf":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.defense >= 100 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.defense <= 130 });
            }
            break;
        case "bonadefensae":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.sp_defense >= 100 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.sp_defense <= 130 });
            }
            break;
        case "tipus":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.type1 == data || pokemon.type2 == data });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.type1 != data & pokemon.type2 != data });
            }
            break;
        case "gen":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.generation == data });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.generation != data });
            }
            break;
        default:
            console.log("Paràmatre no vàlid");
            break;
    }
}

var conceptes1 = ["2tipus", "lastgen", "mesdefensaf", "mesatacf", "counter", "pesames"];
var conceptes2 = ["alturahumana", "rapid", "facilcapturar", "moltavida", "bonatacf", "bonatace", "bonadefensaf", "bonadefensae", "tipus", "gen", "counter", "pesames"];
var conceptes3 = ["tipus", "descripció"]
const preguntah1 = document.getElementById("preguntah1");
const respostes = document.querySelectorAll('.resposta');

function novapregunta() {
    if (conceptes1.length > 0) {
        preguntar("2tipus"/*conceptes1[Math.floor(Math.random() * conceptes1.length)]*/);
    }
}
function preguntar(param) {
    conceptes1 = conceptes1.filter(function (concepte) { return concepte !== param });
    data = "";
    switch (param) {
        case "2tipus":
            let preguntespos = ["El teu pokémon té dos tipus?", "El teu pokémon té més d'un tipus?"];
            let preguntesneg = ["El teu pokémon té només un tipus?", "El teu pokémon es d'un sol tipus?"];
            let positiu = Math.random() < 0.5;;
            if (positiu) {
                preguntah1.textContent = preguntespos[Math.floor(Math.random() * 2)];
            } else {
                preguntah1.textContent = preguntesneg[Math.floor(Math.random())];
                if (resposta != "idk") {
                    if (resposta == "yes") {
                        updatePokemons("2tipus", false);
                    } else {
                        updatePokemons("2tipus", true);
                    }
                }
            }
            break;
        case "lastgen":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.generation) >= "4"; });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.generation) < "4"; });
            }
            break;
        case "mesdefensaf":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.defense) > parseInt(pokemon.sp_defense); });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.defense) <= parseInt(pokemon.sp_defense); });
            }
            break;
        case "mesatacf":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.attack) > parseInt(pokemon.sp_attack); });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.attack) <= parseInt(pokemon.sp_attack); });
            }
            break;
        case "counter":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon["against_" + data]) > 1 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon["against_" + data]) <= 1 });
            }
            break;
        case "pesames":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.weight_kg) > (parseInt(data) - 3) });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.weight_kg) < (parseInt(data) + 3) });
            }
            break;
        case "alturahumana":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.height_m >= 1.2 && pokemon.height_m <= 2 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.height_m < 1.2 || pokemon.height_m > 2 });
            }
            break;
        case "rapid":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.speed > 50 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.speed < 70 });
            }
            break;
        case "facilcapturar":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.capture_rate >= 120 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.capture_rate <= 150 });
            }
            break;
        case "moltavida":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.hp >= 70 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.hp <= 120 });
            }
            break;
        case "bonatacf":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.attack >= 100 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.attack <= 130 });
            }
            break;
        case "bonatace":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.sp_attack >= 100 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.sp_attack <= 130 });
            }
            break;
        case "bonadefensaf":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.defense >= 100 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.defense <= 130 });
            }
            break;
        case "bonadefensae":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.sp_defense >= 100 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.sp_defense <= 130 });
            }
            break;
        case "tipus":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.type1 == data || pokemon.type2 == data });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.type1 != data & pokemon.type2 != data });
            }
            break;
        case "gen":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.generation == data });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.generation != data });
            }
            break;
        default:
            console.log("Paràmatre no vàlid");
            break;
    }

    respostes.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.getAttribute('answer');
            if (answer != "idk") {
                if (answer == "yes") {
                    updatePokemons(param,positiu,data);
                } else if (answer == "no") {
                    updatePokemons(param,!positiu,data);
                }
            }
            novapregunta();
        });
    });
}

console.log(pokemons);
updatePokemons("2tipus", false);
updatePokemons("mesdefensaf", false);
updatePokemons("mesatacf", true);
updatePokemons("lastgen", true);
updatePokemons("counter", false, "fight");
updatePokemons("alturahumana", false);
// updatePokemons("rapid", false);
// updatePokemons("facilcapturar", true);
// updatePokemons("moltavida", false);
// updatePokemons("bonatacf", false);
// updatePokemons("bonatace", false);
// updatePokemons("bonadefensaf", false);
// updatePokemons("bonadefensae", false);
updatePokemons("pesames", true, 20);
updatePokemons("tipus", false, "electric");
updatePokemons("tipus", false, "grass");

updatePokemons("counter", true, "flying");
updatePokemons("gen", false, 5);
console.log(getInfoPokemon("mWeightPokemon"));
console.log(getInfoPokemon("rBigCounter"));
console.log(getInfoPokemon("rBigTipus"));
console.log(getInfoPokemon("bigGen"));







console.log(pokemons);
