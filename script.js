// Es realitza una sol.licitud XMLHttpRequest para cargar l'arxiu
function getPokemons() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', "pokemons.json", false); // Es fa una sol.licitud síncrona a l'arxiu "pokemons.json"
    xhr.send();

    if (xhr.status === 200) {
        //Retorna el contingut en format json.
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

//S'aniràn afegint els counters ja preguntats per no repetir-los
var tipuspreguntats = [];

//S'aniràn afegint els tipus ja preguntats per no repetir-los
var counterspreguntats = [];

function getInfoPokemon(param) {
    switch (param) {
        //Retorna la generació amb més Pokémons.
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

        // Retorna el tipus més popular en els Pokémons.
        case "bigTipus":
            {
                let arrayntipus = [];
                arraytipus.forEach(function (tipus) {
                    if (!tipuspreguntats.includes(tipus)) {
                        let numTipus = 0;
                        pokemons.forEach(function (pokemon) { if (pokemon.type1 == tipus || pokemon.type2 == tipus) numTipus++; })
                        arrayntipus.push(tipus + ": " + numTipus);
                    }
                });

                if (arrayntipus instanceof Array) {
                    arrayntipus.sort(function (a, b) {
                        var menys = parseInt(a.split(": ")[1]);
                        var més = parseInt(b.split(": ")[1]);
                        return menys - més;
                    });
                }
                return arrayntipus[arrayntipus.length - 1].split(": "[0])[0];

            }
            break;

        // Retorna el tipus1 més popular en els Pokémons.
        case "bigTipus1":
            {
                let arrayntipus = [];
                arraytipus.forEach(function (tipus) {
                    if (!tipuspreguntats.includes(tipus)) {
                        let numTipus = 0;
                        pokemons.forEach(function (pokemon) { if (pokemon.type1 == tipus) numTipus++; })
                        arrayntipus.push(tipus + ": " + numTipus);
                    }
                });

                if (arrayntipus instanceof Array) {
                    arrayntipus.sort(function (a, b) {
                        var menys = parseInt(a.split(": ")[1]);
                        var més = parseInt(b.split(": ")[1]);
                        return menys - més;
                    });
                }
                return arrayntipus[arrayntipus.length - 1].split(": "[0])[0];
            }
            break;

        // Retorna el tipus2 més popular en els Pokémons.
        case "bigTipus2":
            {
                let arrayntipus = [];
                arraytipus.forEach(function (tipus) {
                    if (!tipuspreguntats.includes(tipus)) {
                        let numTipus = 0;
                        pokemons.forEach(function (pokemon) { if (pokemon.type2 == tipus) numTipus++; })
                        arrayntipus.push(tipus + ": " + numTipus);
                    }
                });

                if (arrayntipus instanceof Array) {
                    arrayntipus.sort(function (a, b) {
                        var menys = parseInt(a.split(": ")[1]);
                        var més = parseInt(b.split(": ")[1]);
                        return menys - més;
                    });
                }
                return arrayntipus[arrayntipus.length - 1].split(": "[0])[0];
            }
            break;

        // Retorna el counter que tenen la majoria de pokémons
        case "bigCounter":
            let arraycounters = [];
            arraytipus.forEach(function (tipus) {
                if (!counterspreguntats.includes(tipus)) {
                    let nCounter = 0;
                    pokemons.forEach(function (pokemon) { if (pokemon["against_" + tipus] > 1) nCounter++; })
                    arraycounters.push(tipus + ": " + nCounter);
                }
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

        // Retorna sempre el pokémon del pes mig.
        case "mWeightPokemon":
            pokemons.sort(function (a, b) {
                return a.weight_kg - b.weight_kg;
            })
            return pokemons[Math.floor(pokemons.length / 2)];
            break;

        //Només hi ha una generació
        case "gentrobada":
            generation = pokemons[0].generation;
            return pokemons.every(function (pokemon) { return pokemon.generation === generation; });
            break;

        //Només hi ha un tipus1
        case "tipus1trobat":
            tipus = pokemons[0].type1;
            return pokemons.every(function (pokemon) { return pokemon.type1 === tipus; });
            break;

        //Només hi ha un tipus2
        case "tipus2trobat":
            tipus = pokemons[0].type2;
            return pokemons.every(function (pokemon) { return pokemon.type2 === tipus; });
            break;
    }
}

//S'eliminen els pokémons que no coincideixen amb la resposta de l'usuari
function updatePokemons(param, si, data) {
    console.log(param, si, data);
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
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.defense) >= parseInt(pokemon.sp_defense); });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.defense) <= parseInt(pokemon.sp_defense); });
            }
            break;
        case "mesatacf":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.attack) >= parseInt(pokemon.sp_attack); });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.attack) <= parseInt(pokemon.sp_attack); });
            }
            break;
        case "counter":
            counterspreguntats.push(data);
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon["against_" + data]) > 1 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon["against_" + data]) <= 1 });
            }
            break;
        case "pesames":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return parseFloat(pokemon.weight_kg) > parseFloat((data.weight_kg) - 3) });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return parseFloat(pokemon.weight_kg) < parseFloat((data.weight_kg) + 3) });
            }
            break;
        case "alturahumana":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.height_m >= 1.2 && pokemon.height_m <= 2 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.height_m < 1.4 || pokemon.height_m > 1.8 });
            }
            break;
        case "rapid":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.speed > 50 });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.speed < 80 });
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
            tipuspreguntats.push(data);
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.type1 == data || pokemon.type2 == data });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return pokemon.type1 != data & pokemon.type2 != data });
            }
            break;
        case "gen":
            if (si) {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.generation) == data });
            } else {
                pokemons = pokemons.filter(function (pokemon) { return parseInt(pokemon.generation) != data });
            }
            break;
        case "descripcio":
            if (si) {
                pokemons = [pokemons[0]];
            } else {
                pokemons.shift();
            }
            break;
        default:
            console.log("Paràmatre no vàlid");
            break;
    }
    if (pokemons.length == 1) {
        document.getElementById("progress").style.width = "100%";
        document.getElementById("progress").style.background = "url(src/img/correct_bg.gif) no-repeat";
        document.getElementById("progress").style.backgroundSize = "cover";
    } else {
        document.getElementById("progress").style.width = 100 - (100 / (801 / pokemons.length)) + "%";
    }
}

//Conceptes a preguntar.
var conceptes1 = ["2tipus", "lastgen", "counter", "pesames"];
var conceptes2 = ["alturahumana", "rapid", "facilcapturar"];
var conceptes3 = ["tipus", "gen", "counter", "pesames", "mesatacf", "mesdefensaf"];
var conceptes4 = ["tipus", "descripcio", "gen"];
var conceptesdescartats = ["moltavida", "bonatacf", "bonatace", "bonadefensaf", "bonadefensae",];
const respostes = document.getElementById("respostes");

function replay() {
    respostes.innerHTML = "";
    let button = document.createElement("button");
    button.textContent = "Tornar a jugar";
    respostes.appendChild(button);
    button.addEventListener("click", function () {
        location.reload();
    });
}

//Funció que classifica si s'ha d'enviar una nova pregunta i de quina array ha d'agafar la nova pregunta segons una serie de condicions.
function novapregunta() {
    var param = "";
    console.log(pokemons);
    if (pokemons.length > 1) {
        if (pokemons.length > 5 && conceptes3.length > 0) {
            if (conceptes1.length > 0) {
                param = conceptes1[Math.floor(Math.random() * conceptes1.length)];
                conceptes1 = conceptes1.filter(function (concepte) { return concepte !== param });
            } else if (conceptes2.length > 0) {
                param = conceptes2[Math.floor(Math.random() * conceptes2.length)];
                conceptes2 = conceptes2.filter(function (concepte) { return concepte !== param });
            } else if (conceptes3.length > 0) {
                param = conceptes3[Math.floor(Math.random() * conceptes3.length)];
                conceptes3 = conceptes3.filter(function (concepte) { return concepte !== param });
            }
            preguntar(param);
        } else {
            if (pokemons.length < 15) {
                if (getInfoPokemon("tipus1trobat") && getInfoPokemon("tipus2trobat")) {
                    console.log("Tipus trobat");
                    conceptes4 = conceptes4.filter(function (concepte) { return concepte !== "tipus" });
                }
                if (getInfoPokemon("gentrobada")) {
                    console.log("Tipus trobat");
                    conceptes4 = conceptes4.filter(function (concepte) { return concepte !== "gen" });
                }
                param = conceptes4[Math.floor(Math.random() * conceptes4.length)];
                preguntar(param);
            } else {
                enviarmsg("No has proporcionat suficient informacions per endevinar el teu pokémon!");
                replay();
            }
        }
    } else if (pokemons.length == 1) {
        enviarmsg("El teu pokémon és " + pokemons[0].name, "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + pokemons[0].pokedex_number.padStart(3, '0') + ".png");
        replay();
    } else {
        enviarmsg("Les teves respostes no coincideixen amb cap pokémon disponible, torna a començar o parla amb suport!");
        replay();
    }
}

//Funció per anar a baix del chat
function scrollChat() {
    document.getElementById('content').scrollTop = (document.getElementById('content').scrollHeight);
}
//Inserta un div simulant un missatge enviat per ash.
function enviarmsg(msgtext, source) {
    console.log(msgtext);
    console.log(source);
    let leftmsg = document.createElement("div");
    leftmsg.classList.add("msg-left");
    let msg = document.createElement("div");
    msg.classList.add("msg");
    leftmsg.appendChild(msg);

    if (source) {
        let img = document.createElement("img");
        img.src = source;
        msg.appendChild(img);
    }

    let text = document.createElement("p");
    msg.appendChild(text);
    document.getElementById("content").appendChild(leftmsg);
    //Efecte escriure
    let index = 0;
    let interval = setInterval(function () {
        if (index % 5 == 0) {
            scrollChat();
        }
        if (index < msgtext.length) {
            text.textContent += msgtext[index];
            index++;
        } else {
            scrollChat();
            clearInterval(interval);
        }
    }, 20);
}

function ans(resposta) {
    let leftmsg = document.createElement("div");
    leftmsg.classList.add("msg-right");

    let msg = document.createElement("div");
    msg.classList.add("msg");
    leftmsg.appendChild(msg);

    let text = document.createElement("p");
    text.textContent = resposta;
    msg.appendChild(text);
    document.getElementById("content").appendChild(leftmsg);
}

function preguntar(param) {
    data = "";
    var preguntespos = [];
    var preguntesneg = [];
    var positiu = Math.random() < 0.5;;
    switch (param) {
        case "2tipus":
            preguntespos = ["El teu pokémon té dos tipus?", "El teu pokémon té més d'un tipus?"];
            preguntesneg = ["El teu pokémon té només un tipus?", "El teu pokémon és d'un sol tipus?"];
            if (positiu) {
                enviarmsg(preguntespos[Math.floor(Math.random() * 2)]);
            } else {
                enviarmsg(preguntesneg[Math.floor(Math.random() * 2)]);
            }
            break;
        case "lastgen":
            preguntespos = ["El teu pokémon és de la generació 4 o superior?", "El teu pokémon pertany a una generació entre la 4 i la 7? Ambdues incloses."];
            preguntesneg = ["El teu pokémon és de la generació 3 o inferior?", "El teu pokémon pertany a les tres primeres generacions?"];
            if (positiu) {
                enviarmsg(preguntespos[Math.floor(Math.random() * 2)]);
            } else {
                enviarmsg(preguntesneg[Math.floor(Math.random() * 2)]);
            }
            break;
        case "mesdefensaf":
            preguntespos = ["El teu pokémon té més defensa física que especial?", "El teu pokémon té menys defensa especial que física?"];
            preguntesneg = ["El teu pokémon té més defensa especial que física?", "El teu pokémon té menys defensa física que especial?"];
            if (positiu) {
                enviarmsg(preguntespos[Math.floor(Math.random() * 2)]);
            } else {
                enviarmsg(preguntesneg[Math.floor(Math.random() * 2)]);
            }
            break;
        case "mesatacf":
            preguntespos = ["El teu pokémon té més atac físic que especial?", "El teu pokémon té menys atac especial que físic?"];
            preguntesneg = ["El teu pokémon té més atac especial que físic?", "El teu pokémon té menys atac físic que especial?"];
            if (positiu) {
                enviarmsg(preguntespos[Math.floor(Math.random() * 2)]);
            } else {
                enviarmsg(preguntesneg[Math.floor(Math.random() * 2)]);
            }
            break;
        case "counter":
            data = getInfoPokemon("bigCounter");
            preguntespos = ["Al teu pokémon li fan counter els pokémon de tipus " + data + "?", "El teu pokémon és débil contra els pokémon de tipus " + data + "?"];
            positiu = true;
            enviarmsg(preguntespos[Math.floor(Math.random() * 2)]);
            break;
        case "pesames":
            data = getInfoPokemon("mWeightPokemon");
            console.log(data);
            preguntespos = ["El teu pokémon pesa més que " + data.name + "?(" + data.weight_kg + " kg)", "El teu pokémon és més pesat que " + data.name + "?(" + data.weight_kg + " kg)"];
            preguntesneg = ["El teu pokémon pesa menys que " + data.name + "?(" + data.weight_kg + " kg)", "El teu pokémon és més lleuger que " + data.name + "?(" + data.weight_kg + " kg)"];
            if (positiu) {
                enviarmsg(preguntespos[Math.floor(Math.random() * 2)], "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + data.pokedex_number.padStart(3, '0') + ".png");
            } else {
                enviarmsg(preguntesneg[Math.floor(Math.random() * 2)], "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + data.pokedex_number.padStart(3, '0') + ".png");
            }
            break;
        case "alturahumana":
            preguntespos = ["El teu pokémon té una altura similar a un humà promig(1.2M-2M)?", "El teu pokémon és igual d'alt que un humà?(Entre 1.2 i 2 metres)"];
            positiu = true;
            enviarmsg(preguntespos[Math.floor(Math.random() * 2)]);
            break;
        case "rapid":
            preguntespos = ["El teu pokémon és ràpid?", "El teu pokémon corre considerablement?"];
            positiu = true;
            enviarmsg(preguntespos[Math.floor(Math.random() * 2)]);
            break;
        case "facilcapturar":
            preguntespos = ["El teu pokémon és relativament fàcil de capturar?", "Es captura fàcilment?"];
            positiu = true;
            enviarmsg(preguntespos[Math.floor(Math.random() * 2)]);
            break;
        case "moltavida":
            preguntespos = ["El teu pokémon té molta vida?", "El teu pokémon té una vida elevada?"];
            positiu = true;
            enviarmsg(preguntespos[Math.floor(Math.random() * 2)]);
            break;
        case "bonatacf":
            preguntespos = ["El teu pokémon té un bon atac físic?", "El teu pokémon té un atac físic elevat?"];
            positiu = true;
            enviarmsg(preguntespos[Math.floor(Math.random() * 2)]);
            break;
        case "bonatace":
            preguntespos = ["El teu pokémon té un bon atac especial?", "El teu pokémon té un atac especial elevat?"];
            positiu = true;
            enviarmsg(preguntespos[Math.floor(Math.random() * 2)]);
            break;
        case "bonadefensaf":
            preguntespos = ["El teu pokémon té una bona defensa física?", "El teu pokémon té una defensa física elevada?"];
            positiu = true;
            enviarmsg(preguntespos[Math.floor(Math.random() * 2)]);
            break;
        case "bonadefensae":
            preguntespos = ["El teu pokémon té una bona defensa especial?", "El teu pokémon té una defensa especial elevada?"];
            positiu = true;
            enviarmsg(preguntespos[Math.floor(Math.random() * 2)]);
            break;
        case "tipus":
            data = getInfoPokemon("bigTipus")
            if (getInfoPokemon("tipus1trobat")) {
                data = getInfoPokemon("bigTipus2")
            }
            if (getInfoPokemon("tipus2trobat")) {
                data = getInfoPokemon("bigTipus1")
            }
            positiu = true;
            enviarmsg("El teu pokémon és de tipus \"" + data + "\"?");
            break;
        case "gen":
            data = getInfoPokemon("bigGen")
            preguntespos = ["El teu pokémon és de la generació " + data + "?", "El teu pokémon pertany a la generació " + data + "?"];
            positiu = true;
            enviarmsg(preguntespos[Math.floor(Math.random() * 2)]);
            break;
        case "descripcio":
            positiu = true;
            enviarmsg("El teu pokémon s'el coneix com \"" + (pokemons[0].classfication).replace(" Pokémon", "") + "\"?");
            break;
        default:
            console.log("Paràmatre no vàlid");
            break;
    }

    respostes.innerHTML = "";
    const yesbutton = document.createElement("button");
    yesbutton.textContent = "Si";
    const idkbutton = document.createElement("button");
    idkbutton.textContent = "No ho sé";
    const nobutton = document.createElement("button");
    nobutton.textContent = "No";
    respostes.appendChild(yesbutton);
    respostes.appendChild(idkbutton);
    respostes.appendChild(nobutton);

    yesbutton.addEventListener("click", function () {
        updatePokemons(param, positiu, data);
        ans("Si");
        novapregunta();
    })
    nobutton.addEventListener("click", function () {
        updatePokemons(param, !positiu, data);
        ans("No");
        novapregunta();
    })
    idkbutton.addEventListener("click", function () {
        ans("No ho sé");
        novapregunta();
    })

}

//S'inicia el so
var audio = document.getElementById('audio');

var hasAudioStarted = false;
document.addEventListener("click", function () {
    if (!hasAudioStarted) {
        audio.play();
        hasAudioStarted = true;
    }
});

//Botó activar/desactivar so
document.getElementById('btnVolume').addEventListener('click', function () {
    if (audio.paused) {
        document.getElementById("iVolume").classList.remove("fa-volume-xmark");
        document.getElementById("iVolume").classList.add("fa-volume-high");
        audio.play();
    } else {
        document.getElementById("iVolume").classList.remove("fa-volume-high");
        document.getElementById("iVolume").classList.add("fa-volume-xmark");
        audio.pause();
    }

});

//S'inicia el programa de preguntes
novapregunta();
