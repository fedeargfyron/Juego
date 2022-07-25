onload = () => {
    document.getElementById("newGameBtn").addEventListener("click", newGame)
    document.getElementById("loadGameBtn").addEventListener("click", loadGamesTable)
}

const newGame = () => {
    localStorage.removeItem("loadedGame");
    window.location = "game.html";
}

const loadGamesTable = () => {
    let table = document.getElementById("loadGames-table");
    table.innerHTML = "";
    let games = JSON.parse(localStorage.getItem("games"), '[]').filter(x => x.completed === false);

    games.forEach(x => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${x.id}</td>
            <td>${x.user}</td>
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