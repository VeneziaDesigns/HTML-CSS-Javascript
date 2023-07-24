import {WORDS} from "./words.js";

//Variables generales
const NUMBER_OF_GUESSES = 6;
let guesses_remaining = NUMBER_OF_GUESSES;
let nextLetter = 0;
let currentGuess = [];
//Hace un random de la longitud de WORDS y lo redondea al numero mas cercano
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);

//iniciar el tablero
function initBoard(){
    let board = document.getElementById("game-board");

    for(let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div");
        row.className = "letter-row";

        for(let j = 0; j < 5; j++){
            let box = document.createElement("div");
            box.className = "letter-box";
            //Asociamos las cajas a las filas
            row.appendChild(box);
        }
        //Asociamos las filas al tablero
        board.appendChild(row);
    }
}

document.addEventListener("keyup", (e) => {
    if(guesses_remaining == 0){
        return;
    }
    // Mira donde estamos situados y borrara la letra y vuelve al espacio anterior
    let pressedKey = String(e.key);
    if (pressedKey == "Backspace" && nextLetter !== 0){
        deleteLetter();
        return;
    }
    //Comprueba la palabra
    if(pressedKey == "Enter"){
        checkGuess();
        return;
    }
    //Devuelve un Array y lo convierte en un String
    let found = pressedKey.match(/[a-z]/gi);
    if(!found || found.lenght > 1) {
        return;
    } else {
        insertLetter(pressedKey);
    }
});

function insertLetter(pressedKey){
    if(nextLetter === 5){
        return;
    }
    pressedKey = pressedKey.toLowerCase();
    let row = document.getElementsByClassName("letter-row")[6 - guesses_remaining];
    let box = row.children[nextLetter];
    animateCSS(box, "swing");
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    nextLetter += 1;
}

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[6 - guesses_remaining];
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    nextLetter -= 1;
    
}
function checkGuess() {
    let row = document.getElementsByClassName("letter-row")[6-guesses_remaining];
    let guessString = "";
    let rightGuess = Array.from("rightGuessString");

    //Compara los caracteres
    for (const val of currentGuess) {
        guessString = guessString + val;
    }

    if (guessString.length != 5) {
        //alert("No hay 5 letras");
        toastr.error("No hay 5 letras");
        return;
    }

    if (!WORDS.includes(guessString)) {
        //alert("La palabra no esta en la lista");
        toastr.error("La palabra no esta en la lista");
        return;
    }

    for (let i = 0; i < 5; i++) {
        let letterColor = "";
        let box = row.children[i];
        let letter = guessString[i];
        //letra en posicion correcta 
        let letterPosition = rightGuess.indexOf(currentGuess[i]);

        if (letterPosition === -1) {
            letterColor = "grey";
        } else {
            //ahora sabemos que la letra esta en la palabra
            //Si ademas los indices de las 2 variables
            //coinciden la letra esta en la misma posicion (posicion correcta.)
            if (currentGuess[i] === rightGuess[i]) {
                letterColor = "green";
            } else {
                letterColor = "yellow";
            }
        }
        let delay = 250*i;
        setTimeout(()=> {
            animateCSS(box, "heartBeat");
            box.style.backgroundColor = letterColor;
            shadeKeyboard(letter, letterColor);
        }, delay);
    }

    if (guessString === rightGuess) {
        //alert("Has acertado la palabra. Enhorabuena!!");
        toastr.success("Has acertado la palabra. Enhorabuena!!");
        guesses_remaining = 0;
        return;
    } else {
        guesses_remaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guesses_remaining === 0) {
            //alert("Ya no te quedan intentos. Fin de la partida");
            toastr.error("Ya no te quedan intentos. Fin de la partida");
            //alert("La palabra correcta era: ", rightGuessString);
            toastr.info("La palabra correcta era: ", rightGuessString);
        }
    }
}

function shadeKeyboard(letter, color) {
    for(const elem of document.getElementsByClassName("keyboard-button")) {
        if(elem.textContent == letter) {
            let oldColor = elem.style.backgroundColor;
            if(oldColor === "green") {
                return;
            } 
            if(oldColor === "yellow" && color !== "green") {
                return;
            }
            elem.style.backgroundColor = color;
            break;
        }
    }
}

document.getElementById("keyboard").addEventListener("click", (e) => {
    const target = e.target;
    if (!target.classList.contains("keyboard-button")) {
        return;
    }
    let key = target.textContent;
    if (key === "Del") {
        key = "Backspace";
    }
    document.dispatchEvent(new KeyboardEvent("keyup", {"key": key}));
});

//Promise. objeto que representa la eventual finalización, o fallo de una operación asíncrona, y su valor resultante
const animateCSS = (element, animation, prefix = "animate__") =>
    new Promise((resolve, reject)=> {
        const animationName = `${prefix}${animation}`;
        const node = element;
        node.style.setProperty("--animation-duration", "0.3s");

        node.classList.add(`${prefix}animated`, animationName);

        //Cuando la animacion finaliza, limpiamos las clases y resolvemos a promesa
        function handleAnimation(event) {
            event.stopPropagation();
            node.classList.add(`${prefix}animated`, animationName);
            resolve("Animacion finalizada");
        }
        node.addEventListener("animationend", handleAnimation, {once: true});
    });

initBoard();