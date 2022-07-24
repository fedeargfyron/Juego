let d = new Date();
let date = `${d.getDate()}-${(d.getMonth()+1)}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
let game = {
    user: localStorage.getItem("Name"),
    values: [],
    word: "",
    wordLength: 0,
    tries: 5,
    sec: '00',
    min: '00',
    hour: '00',
    completed: false,
    win: false,
    date: date,
    id: null
}

let interval;

onload = async () => {
    await createBoard();
    
    let inputs = document.getElementById("word-form").querySelectorAll("input");
    inputs.forEach(x => {
        x.addEventListener("keyup", validateInputValue);
        x.addEventListener("keypress", confirmRow);
        x.addEventListener("keydown", verifyDelete);
    });

    document.getElementById("modal-form").addEventListener("submit", validarNombre);
    document.getElementById("guardarBtn").addEventListener("click", saveGame);

    document.getElementById("cronometro").innerHTML = `${game.hour}:${game.min}:${game.sec}`;
    console.log(game);
}

const startTimer = (cronometrar) => {
    document.getElementById("modal-name").classList.add("invisible");
    document.getElementById("cronometro").classList.remove("invisible");
    interval = setInterval(cronometrar, 1000);
}

const loadGame = (loadedGame) => {
    startTimer(cronometro);
    game = JSON.parse(localStorage.getItem("games")).filter(x => x.id == loadedGame)[0];
    game.tries = 5;
}

const fillValuesFromGame = () => {
    for (let i = 0; i < game.values.length; i++) {
        let row = document.getElementById(`row${i}`);
        let inputs = [...row.getElementsByTagName("input")];
        
        inputs.forEach((x, index) => {
            x.value = game.values[i][index];
        });
        paintInputs(inputs);
        game.tries--;
    }

    if(game.tries === 0){
        return endGame(game.win);
    }
    nextRowHandler();
}

const endGame = (win) => {
    let modal = document.getElementById('modal');
    let header = document.getElementById('encabezado-modal');
    document.getElementById("palabra").innerHTML = `Palabra: ${game.word}`
    if(win){
        header.innerHTML = "Ganaste!";
        modal.classList.add("win");
    }
   
    game.completed = true;
    game.win = win;
    modal.style.display = "flex";
    clearInterval(interval);
}

const saveGame = () => {
    let games = JSON.parse(localStorage.getItem("games") || "[]");
    if(game.id){
        games = games.map(x => x.id == game.id ? game : x);
    }
    else{
        game.id = games.length + 1;
        games.push(game);
    }
    localStorage.setItem("games", JSON.stringify(games));
    window.location = "index.html";
}

const cronometro = () => {
    game.sec ++

    if (game.sec < 10) game.sec = `0${game.sec}`

    if (game.sec > 59) {
        game.sec = '00'
        game.min ++

        if (game.min < 10) game.min = `0${game.min}`
    }

    if (game.min > 59) {
        game.min = '00'
        game.hour ++
      
        if (game.hour < 10) game.hour = `0${game.hour}`
    }

    document.getElementById("cronometro").innerHTML = `${game.hour}:${game.min}:${game.sec}`
}

const validarNombre = (e) => {
    e.preventDefault();
    let inputName = document.getElementById("nameInput");
    localStorage.setItem("Name", inputName.value);

    startTimer(cronometro);
    document.getElementById("word-form").getElementsByTagName("input")[0].focus();
}

// Verificar valores de los inputs //

const paintInputs = (inputs) => {
    let wordArr = Array.from(game.word.toLowerCase());
    let includesArr = [];
    let correctArr = [];
    inputs.forEach((x, index) => {
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
    inputs.forEach((input, i) => {
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
    return correctInputs;
}

const previousInputsResults = (previousInputs, newValues) => {
    let correctInputs = paintInputs(previousInputs);
    game.values.push(newValues);

    if(correctInputs === game.wordLength){
        return endGame(true);
    }
 
    game.tries--;
    if(game.tries === 0){
        return endGame();
    }
 
    nextRowHandler();
}
 
// Habilitar nueva fila //
 
const nextRowHandler = () => {
    let row = document.getElementById(`row${game.values.length}`);
    let inputs = [...row.getElementsByTagName("input")];
    inputs.forEach(x => x.disabled = false);
    inputs[0].focus();
}
 
// Validar que la fila tenga valores en todos sus inputs //
 
const confirmRow = (e) => {
    if(e.key !== "Enter")
        return;
 
    let row = document.getElementById(`row${game.values.length}`);
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
    let loadedGame = localStorage.getItem("loadedGame");
    if(loadedGame){
        loadGame(loadedGame);
    }
    else{
        await getPalabra();
    }
    
    let form = document.getElementById("word-form");
    for (let i = 0; i < game.tries; i++) {
        let row = document.createElement("fieldset");
        row.classList.add('row');
        row.id = `row${i}`;
        createInputs(row)
        form.appendChild(row);
    }
    if(loadedGame){
        fillValuesFromGame();
    }
}

const createInputs = (row) => {
    for (let i = 0; i < game.wordLength; i++) {
        let input = document.createElement("input");
        input.maxLength = 1;
        if(row.id !== "row0"){
            input.disabled = true;
        }
        
        row.appendChild(input);
    }
}

const getPalabra = async () => {
    game.word = "Hola";
    game.wordLength = game.word.length;
    /*
    const url = "https://palabras-aleatorias-public-api.herokuapp.com/random";
    let response = await makeRequest("GET", url);
    game.word = response.body.Word;
    game.wordLength = game.word.length;
    */
}

const makeRequest = async (method, url) => {
    return await fetch(url, { method: method})
        .then(response => response.json())
        .catch(error => console.log(error));
}