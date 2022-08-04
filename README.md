# Aplicación
Se desarrollo una aplicación web que es una versión modificada del famoso juego Wordle, agregando la posibilidad
de jugar multiples partidas en un mismo día, guardarlas y cargarlas. 

# Juego
* Las palabras se obtienen al azar de un JSON existente en la aplicación.
* Para iniciar el juego hay que ingresar un nombre de usuario.
* Se realizan verificaciones por fila para determinar si los inputs ingresados son correctos.
* En caso de repetir la misma letra en todos los campos que existe únicamente en uno, se considerará una sola vez.
* En caso de haber ingresado los valores correctos o perder, se guardará la partida en el LocalStorage.
* En caso de querer guardar la partida, se almacenarán los valores actuales en el LocalStorage para después retomarla con los mismos datos.
* Si el jugador gana la partida, según determinado algoritmo se le asignará un puntaje que podrá consultar en el menú de partidas.
* En el menú de partidas se permite realizar distintos sortings tocando los encabezados.

# Contacto
La ventana de contacto permite a través de determinadas verificaciones para cada campo, 
abrir la herramienta de envío de emails predeterminada del sistema operativo con la 
información de los campos.

# Tecnologias
HTML, CSS, Javascript

# Repositorio
https://github.com/fedeargfyron/Juego

# Pages
https://fedeargfyron.github.io/Juego/

