let login = document.getElementById('login');

function logar() {
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    switch (password || email) {
        case "":
            return window.alert("Preencha todos os campos por gentieza.");
        case " ":
            return window.alert("Preencha todos os campos por gentieza.");
        case null:
            return window.alert("Preencha todos os campos por gentieza.");
        default:
            const corpo = {
                email: email,
                senha: password
            }
            const cabecalho = {
                method: "GET",
                body: JSON.stringify(corpo),
                headers: {
                    "content-type": "application/json"
                }
            }

            fetch("http://localhost:8080/login", cabecalho)
                .then(res => res.json())
                .then(token => {
                    window.alert("Login realizado com sucesso");
                    localStorage.setItem("login", token.token)
                    window.location = "../ListaPedidos/index.html";
                })
                .catch(err => alert("Impossivel autenticar!"));
    }
}