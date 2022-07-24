onload = () => {
    document.getElementById("newGameBtn").addEventListener("click", newGame)
    document.getElementById("loadGameBtn").addEventListener("click", loadGame)
}

const newGame = () => {
    localStorage.removeItem("loadedGame");
    window.location = "game.html";
}

const loadGame = () => {
    localStorage.setItem("loadedGame", 3);
    window.location = "game.html";
    //Id, Jugador, Fecha, Tiempo
}