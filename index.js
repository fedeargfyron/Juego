let values = [
 
];

const word = "Qe";
const wordLength = word.length;
const tries = 6;
 
onload = () => {
    createBoard();
    let inputs = document.querySelectorAll("input");
    inputs.forEach(x => x.addEventListener("keyup", validateInputValue));
    inputs.forEach(x => x.addEventListener("keypress", confirmRow));
}

// Verificar valores de los inputs //

const previousInputsResults = (previousInputs) => {
    let wordArr = Array.from(word.toLowerCase());
    let correctInputs = 0;
    for (let i = 0; i < wordLength; i++) {
        let input = previousInputs[i];
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
        return "Ganaste!";
    }

    if(values.length + 1 === tries){
        return "Perdiste!";
    }
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

    let message = previousInputsResults(inputs);
    if(message){
        return alert(message);
    }

    values.push(newValues);
    nextRowHandler();
}

// Validar input enfocado y pasar al siguiente si tiene valor //

const validateInputValue = (e) => {
    let target = e.target;
    if(target.value.length == 1){
        let next = target.nextElementSibling;
        if(!next)
            return;
 
        if (next.tagName.toLowerCase() === "input")
            next.focus();
    }
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