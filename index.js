let values = [

];

const word = "Q";
const wordLength = word.length;
let tries = 5;
 
onload = () => {
    createBoard();
    let inputs = document.querySelectorAll("input");
    inputs.forEach(x => x.addEventListener("keyup", validateInputValue));
    inputs.forEach(x => x.addEventListener("keypress", confirmRow));
    inputs.forEach(x => x.addEventListener("keydown", verifyDelete));
}


const endGame = (win) => {
    let modal = document.getElementById('modal');
    let header = document.getElementById('encabezado-modal');

    if(win){
        header.innerHTML = "Ganaste!";
        header.style.color = "#77dd77";
    }
    
    modal.style.display = "flex";
}

// Verificar valores de los inputs //

const previousInputsResults = (previousInputs, newValues) => {
    let wordArr = Array.from(word.toLowerCase());
    let correctInputs = 0;
    for (let i = 0; i < wordLength; i++) {
        let input = previousInputs[i];
        input.classList.add("done");
        input.style.animationDelay = `${150 * (i)}ms`;
        let value = input.value.toLowerCase();
        if(wordArr[i] === value){
            input.classList.add("correct-input");
            correctInputs++;
            continue;
        }
        if(wordArr.some(x => x === value)){
            input.classList.add("neutral-input");
            continue;
        }

        input.classList.add("wrong-input");
    }

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

const createBoard = () => {
    let form = document.getElementById("word-form");
    for (let i = 0; i < tries; i++) {
        let row = document.createElement("fieldset");
        row.classList.add(`row`);
        row.id = `row${i}`;
        createInputs(row)
        form.appendChild(row);
    }
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