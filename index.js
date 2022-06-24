let values = [
 
];
 
const word = "Quesos";
const wordLength = word.length;
const tries = 6;
 
onload = () => {
    createBoard();
    let inputs = document.querySelectorAll("input");
    inputs.forEach(x => x.addEventListener("keyup", validateInput));
    inputs.forEach(x => x.addEventListener("keypress", validateRow));
}

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

    console.log(correctInputs);
    if(correctInputs === wordLength){
        return true;
    }
}

const successfulValidation = (previousInputs, newValues) => {
    let correct = previousInputsResults(previousInputs);
    if(correct){
        return alert("Ganaste!");
    }
    values.push(newValues);
    if(values.length === wordLength){
        return alert("Perdiste!");
    }
    let row = document.getElementById(`row${values.length}`);
    let inputs = [...row.getElementsByTagName("input")];
    inputs.forEach(x => x.disabled = false);
    inputs[0].focus();
}

const validateRow = (e) => {
    if(e.key !== "Enter")
        return;
 
    let row = document.getElementById(`row${values.length}`);
    let inputs = [...row.getElementsByTagName("input")];
    let newValues = inputs.map(x => x.value);
    if(newValues.some(x => !x)){
        return;
    }
    inputs.forEach(x => x.disabled = true);
    successfulValidation(inputs, newValues);
}
 
const validateInput = (e) => {
    let target = e.target;
    if(target.value.length == 1){
        let next = target.nextElementSibling;
        if(!next)
            return;
 
        if (next.tagName.toLowerCase() === "input")
            next.focus();
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
