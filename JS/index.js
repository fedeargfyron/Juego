let scoredGames;

const sortScoresModal = (e) => {
    scoredGames.sort((a, b) => sortFunctions[e.target.id](a, b));
    let table = document.getElementById("scores-table");
    const header = table.firstChild;
    table.innerHTML = '';
    table.appendChild(header);
    setTableRows(table);
}

let getFormattedDate = (date) => {
    let x = date.split(' ');
    let split1 = x[0].split('-');
    let split2 = x[1].split(':');
    return new Date(split1[2], split1[1], split1[0], split2[0], split2[1], '00');
}

//logica de sortings para la grilla de juegos

let sortFunctions = {
    id: (a, b) => a.id - b.id,
    user: (a, b) => {
        var x = a.user.toLowerCase();
        var y = b.user.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    },
    score: (a, b) => b.score - a.score,
    date: (a, b) => {
        let dateA = getFormattedDate(a.date);
        let dateB = getFormattedDate(b.date);
        return dateB - dateA;
    },
    time: (a, b) => {
        let now = new Date();
        let x = new Date(now.getFullYear(), now.getMonth(), now.getDate(), a.hour, a.min, a.sec);
        let y = new Date(now.getFullYear(), now.getMonth(), now.getDate(), b.hour, b.min, b.sec);
        return x - y;
    }
}

//Creación de las filas para la tabla de juegos terminados.

const setTableRows = (table) => {
    scoredGames.forEach(x => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${x.id}</td>
            <td>${x.user.toUpperCase()}</td>
            <td>${x.date}</td>
            <td>${x.hour}:${x.min}:${x.sec}</td>
            <td>${x.score}</td>`;
        row.id = x.id;

        x.win ? row.classList.add("win") : row.classList.add("lose");
        row.addEventListener("click", loadGame);
        table.appendChild(row);
    });
}

//Creación de la tabla de juegos terminados.

const loadScoresTable = () => {
    document.getElementById("scores-modal").classList.remove("invisible");
    let table = document.getElementById("scores-table");
    table.innerHTML = '';

    scoredGames = JSON.parse(localStorage.getItem("games"), '[]').filter(x => x.completed);
    let header = document.createElement("tr");
    header.innerHTML = `
            <th id="id">Id</th>
            <th id="user">Usuario</th>
            <th id="date">Fecha</th>
            <th id="time">Tiempo</th>
            <th id="score">Puntaje</th>`;
    table.appendChild(header);
    table.querySelectorAll("th").forEach(x => x.addEventListener("click", sortScoresModal));
    setTableRows(table);
}

//Creación de la tabla de juegos para cargar.

const loadGamesTable = () => {
    document.getElementById("load-modal").classList.remove("invisible");
    let table = document.getElementById("loadGames-table");
    table.innerHTML = "";
    let games = JSON.parse(localStorage.getItem("games"), '[]').filter(x => x.completed === false);
    let header = document.createElement("tr");
    header.innerHTML = `
            <th>Id</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Tiempo</th>`;
    table.appendChild(header);

    games.forEach(x => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${x.id}</td>
            <td>${x.user.toUpperCase()}</td>
            <td>${x.date}</td>
            <td>${x.hour}:${x.min}:${x.sec}</td>`;
        row.id = x.id;
        row.addEventListener("click", loadGame);
        table.appendChild(row);
    });
}

const exitScoresModal = () => {
    document.getElementById("scores-modal").classList.add("invisible");
}

const exitLoadModal = () => {
    document.getElementById("load-modal").classList.add("invisible");
}

const newGame = () => {
    localStorage.removeItem("loadedGame");
    window.location = "game.html";
}

const loadGame = (e) => {
    let id = e.target.parentElement.id;
    localStorage.setItem("loadedGame", id);
    window.location = "game.html";
}

onload = () => {
    document.getElementById("newGameBtn").addEventListener("click", newGame);
    document.getElementById("loadGameBtn").addEventListener("click", loadGamesTable);
    document.getElementById("modal-exit").addEventListener("click", exitLoadModal);
    document.getElementById("scores-exit").addEventListener("click", exitScoresModal);
    document.getElementById("contactBtn").addEventListener("click", () => window.location = 'contact.html');
    document.getElementById("projectBtn").addEventListener("click", () => window.open('https://github.com/fedeargfyron/Juego', '_blank').focus());
    document.getElementById("trophyIcon").addEventListener("click", loadScoresTable);
}