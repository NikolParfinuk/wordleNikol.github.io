//Variables y constantes
let intentos = 6;
const letrascantidad = 5
let palabra= "";
const BUTTON = document.getElementById('guess-button')
const MENSAJEP = document.getElementById('mensajep')
const ERROR = document.getElementById('error')
ERROR.style.display = "none";
const url = "https://random-word-api.herokuapp.com/word?length=5&&lang=es";
//obtenemos la palabra de la api
fetch(url)
    .then(response => response.json())
    .then(response => {
        console.log("la palabra es: ", response);
        //palabra en mayuscula y remueve el acento de la palabra
        palabra = response[0].toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    })
    .catch(err => {
        console.error("Error al obtener la palabra:", err);
        let diccionario = ["RISAS", "ARENA", "TIGRE", "CABLE", "SILLA"]
        palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
    });

// Usamos el evento para cuando se haga click
BUTTON.addEventListener('click', intentar)


// toma lo ingresado por el usuario y si este es correcto va al juego
function intentar() {
    const INTENTO = leerIntento();
    if (INTENTO.length == letrascantidad) {
        ERROR.style.display = 'none'
        juegoAhorcado(INTENTO);
    }
    else {
        ERROR.style.display = 'block'
    }
    //que se borre la palabra anterior
    const BOX = document.getElementById("guess-input");
    BOX.value = ""
}

// Controla la grilla de letras
function grillaLetras(intento) {
    const GRID = document.getElementById('grid')
    const ROW = document.createElement('div')
    ROW.className = 'row';
    let quedaaux = intentos;
    for (let i in intento) {
        const SPAN = document.createElement('span')
        SPAN.className = 'letter'
        if (intento[i] == palabra[i]) {
            SPAN.innerHTML = intento[i]
            SPAN.style.backgroundColor = '#a3ffac';
        }
        else if (palabra.includes(intento[i])) {
            SPAN.innerHTML = intento[i]
            SPAN.style.backgroundColor = "#ffe180";
        }
        else {
            SPAN.innerHTML = intento[i]
            SPAN.style.backgroundColor = '#d3d3d3';
        }
        ROW.appendChild(SPAN)

        MENSAJEP.style.display = 'block'
        MENSAJEP.innerHTML = "Quedaron " + (intentos - 1) + " intentos de 6"
    }
    GRID.appendChild(ROW)

}
//Controla si haz ganado o no 
function juegoAhorcado(intento) {
    if (intento == palabra) {
        grillaLetras(intento);
        terminar('Felicidades!! haz ganado!!')
        intentos -= 1;//cada vez que lo intentas te quedan menos intentos 

    }
    else {
        grillaLetras(intento);
        intentos -= 1;
        if (intentos == 0) {
            terminar('Haz perdido...')
            MENSAJEP.style.display = 'block'
            MENSAJEP.innerHTML = "La palabra es: " + palabra

        }
    }
}

function terminar(mensaje) {
    let INTENTO = document.getElementById("guess-input");
    //hace que ya no puedas seguir ingresando nada o haciendo click
    INTENTO.disabled = true;
    BUTTON.disabled = true;
    let contenedor = document.getElementById('intentos');
    contenedor.innerHTML = mensaje

}
// toma lo ingresado y pone todas las letras en mayusculas
function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}
