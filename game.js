let values = [

];

let word;
let wordLength;
let tries = 5;
let interval;
let seconds = '00',
    minutes = '00',
    hours = '00';

onload = async () => {
    await createBoard();
    let inputs = document.getElementById("word-form").querySelectorAll("input");
    inputs.forEach(x => {
        x.addEventListener("keyup", validateInputValue);
        x.addEventListener("keypress", confirmRow);
        x.addEventListener("keydown", verifyDelete);
    });

    document.getElementById("modal-form").addEventListener("submit", validarNombre)
}

const endGame = (win) => {
    let modal = document.getElementById('modal');
    let header = document.getElementById('encabezado-modal');
    document.getElementById("palabra").innerHTML = `Palabra: ${word}`
    if(win){
        header.innerHTML = "Ganaste!";
        modal.classList.add("win");
    }
   
    modal.style.display = "flex";
    clearInterval(interval);
}

const cronometro = () => {
    seconds ++

    if (seconds < 10) seconds = `0${seconds}`

    if (seconds > 59) {
      seconds = '00'
      minutes ++

      if (minutes < 10) minutes = `0${minutes}`
    }

    if (minutes > 59) {
      minutes = '00'
      hours ++
      
      if (hours < 10) hours = `0${hours}`
    }

    document.getElementById("cronometro").innerHTML = `${hours}:${minutes}:${seconds}`
}

const validarNombre = (e) => {
    e.preventDefault();
    let inputName = document.getElementById("nameInput");
    localStorage.setItem("Name", inputName);

    document.getElementById("modal-name").classList.add("invisible");
    document.getElementById("cronometro").classList.remove("invisible");
    interval = setInterval(cronometro, 1000);
}

// Verificar valores de los inputs //

const previousInputsResults = (previousInputs, newValues) => {
    let wordArr = Array.from(word.toLowerCase());
    let includesArr = [];
    let correctArr = [];
    previousInputs.forEach((x, index) => {
        if(!wordArr.includes(x.value)){
            return;
        }
 
        if(wordArr.filter(w => w == x.value) > includesArr.filter(w => w == x.value)){
            includesArr.push(x.value);
        }
 
        if(wordArr[index] == x.value){
            correctArr.push(x.value);
        }
    })
 
    correctArr.forEach(x => {
        let index = includesArr.indexOf(x);
        includesArr.splice(index, 1);
    })
 
    let correctInputs = 0;
    previousInputs.forEach((input, i) => {
        input.classList.add("done");
        input.style.animationDelay = `${150 * (i)}ms`;
        let value = input.value.toLowerCase();
        if(wordArr[i] == value){
            input.classList.add("correct-input");
            let index = correctArr.indexOf(value);
            correctArr.splice(index, 1);
            correctInputs++;
            return;
        }
 
        if(includesArr.some(x => x === value)){
            input.classList.add("neutral-input");
            let index = includesArr.indexOf(value);
            includesArr.splice(index, 1);
            return;
        }
 
        input.classList.add("wrong-input");
    })
 
    if(correctInputs === wordLength){
        return endGame(true);
    }
 
    tries--;
    if(tries === 0){
        return endGame();
    }
 
    values.push(newValues);
    nextRowHandler();
}
 
// Habilitar nueva fila //
 
const nextRowHandler = () => {
    let row = document.getElementById(`row${values.length}`);
    let inputs = [...row.getElementsByTagName("input")];
    inputs.forEach(x => x.disabled = false);
    inputs[0].focus();
}
 
// Validar que la fila tenga valores en todos sus inputs //
 
const confirmRow = (e) => {
    if(e.key !== "Enter")
        return;
 
    let row = document.getElementById(`row${values.length}`);
    let inputs = [...row.getElementsByTagName("input")];
    let newValues = inputs.map(x => x.value);
    if(newValues.some(x => !x)){
        return;
    }
    inputs.forEach(x => x.disabled = true);
 
    previousInputsResults(inputs, newValues);
}
 
const tryFocusInput = (sibling) => {
    if(!sibling)
        return;
 
    if (sibling.tagName.toLowerCase() === "input"){
        sibling.focus();
        sibling.value = "";
        sibling.classList.remove("bounce");
    }
}
 
// En caso de usar la tecla de borrado pasar al valor anterior //
 
const verifyDelete = (e) => {
    if(e.keyCode !== 8)
        return;
   
    let target = e.target;
    target.classList.remove("bounce");
    if(target.value.length === 1)
        return;
 
    tryFocusInput(target.previousElementSibling);
}
 
// Validar input enfocado y pasar al siguiente si tiene valor //
 
const validateInputValue = (e) => {
    let target = e.target;
 
    if(target.value.length !== 1)
        return;
   
    target.classList.add("bounce");
    tryFocusInput(target.nextElementSibling);
}


// Creación de tablero //

const createBoard = async () => {
    word = await getPalabra();
    wordLength = word.length;
    if(wordLength > 5)
        tries++;
    
    let form = document.getElementById("word-form");
    for (let i = 0; i < tries; i++) {
        let row = document.createElement("fieldset");
        row.classList.add('row');
        row.id = `row${i}`;
        createInputs(row)
        form.appendChild(row);
    }

    document.getElementsByTagName("input")[0].focus();
}

const createInputs = (row) => {
    for (let i = 0; i < wordLength; i++) {
        let input = document.createElement("input");
        input.maxLength = 1;
        if(row.id !== "row0"){
            input.disabled = true;
        }
        
        row.appendChild(input);
    }
}

const getPalabra = async () => {
    const url = "https://palabras-aleatorias-public-api.herokuapp.com/random";
    let response = await makeRequest("GET", url);
    return response.body.Word;
}

const makeRequest = async (method, url) => {
    return await fetch(url, { method: method})
        .then(response => response.json())
        .catch(error => console.log(error));
}