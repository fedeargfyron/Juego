//Dictionary con las validaciones de campos

const fieldsValidations = {
    "nombre": (value) => !value && 'Debe tener nombre',
    "email": (value) => !value.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/) && 'Email invalido',
    "comentarios": (value) => value.length <= 5 && 'La longitud de los comentarios debe ser de 5 caracteres mínimo'
}

const removeLabel = (e) => {
    let label = document.getElementById(`lbl${e.target.id}`);
    label.classList.add("invisible");
}

const sendContact = (e) => {
    e.preventDefault();

    let inputs = [...document.getElementsByClassName("field")];
    let error;
    inputs.forEach(x => {
        let message = fieldsValidations[x.id](x.value);
        if(message){
            let label = document.getElementById(`lbl${x.id}`);
            label.classList.remove("invisible");
            label.innerHTML = message;
            error = true;
        }
    });
    
    if(error)
        return;

    window.open(`mailto:federicoarron15@gmail.com?subject=Consulta de ${nombre}&body=${comentarios}`);
}

onload = () => {
    document.getElementById("contact-form").addEventListener("submit", sendContact);
    let inputs = [...document.getElementsByClassName("field")];
    inputs.forEach(x => x.addEventListener("focus", removeLabel));
    document.getElementById("arrow-exit").addEventListener("click", () => window.location = "index.html");
}
