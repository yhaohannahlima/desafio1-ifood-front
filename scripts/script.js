let login = document.getElementById('login');

function logar() {
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    email.contains("@")
    switch (password || email) {
        case "":
            return window.alert("Preencha todos os campos por gentieza.");
        case " ":
            return window.alert("Preencha todos os campos por gentieza.");
        case null:
            return window.alert("Preencha todos os campos por gentieza.");
        default:
            try {
                window.alert("Login realizado com sucesso");
                window.location = "/teste_acesso.html";
            } catch (error) {

                error.message;
            }
    }
}

function preencherTrekking(latitude, longitude) {
    let div = document.createElement('div');
    div.classList.add("box_latitude_longitude");

    let spanLatitude = document.createElement('span');
    spanLatitude.classList.add("latitude_longitude")
    spanLatitude.innerText = `LATITUDE: ${latitude}`

    let spanLongitude = document.createElement('span');
    spanLongitude.classList.add("latitude_longitude")
    spanLongitude.innerText = `LONGITUDE: ${longitude}`

    div.appendChild(spanLongitude)
    div.appendChild(spanLatitude)
    cardLatitudeLongitude.appendChild(div)
}