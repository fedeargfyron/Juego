onload = () => {
    document.getElementById("newGameBtn").addEventListener("click", newGame);
    document.getElementById("loadGameBtn").addEventListener("click", loadGamesTable);
    document.getElementById("modal-exit").addEventListener("click", exitModal);
    document.getElementById("contactBtn").addEventListener("click", () => window.location = 'contact.html');
}

const exitModal = () => {
    document.getElementById("load-modal").classList.add("invisible");
}

const newGame = () => {
    localStorage.removeItem("loadedGame");
    window.location = "game.html";
}

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

const loadGame = (e) => {
    let id = e.target.parentElement.id;
    localStorage.setItem("loadedGame", id);
    window.location = "game.html";
}