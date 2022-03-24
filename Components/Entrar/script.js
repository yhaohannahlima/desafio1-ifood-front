let login = document.getElementById('login');

function logar() {
    const senha = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    switch (senha && email) {
        case "":
            hidden();
            break;
        case " ":
            hidden();
            break;
        case null:
            hidden();
            break;
        default:
            try {
                // if (email === "entregador@entrega.com" && senha === "1234") {
                window.alert("Login realizado com sucesso");
                window.location.href = "../ListaPedidos/index.html";

                // const corpo = {
                //     email: email,
                //     senha: senha
                // }

                // const cabecalho = {
                //     // method: "POST",
                //     body: JSON.stringify(corpo),
                //     headers: {
                //         "content-type": "application/json"
                //     }
                // }

                // fetch("http://localhost:8080/login")
                //     .then(res => res.json())
                //     .then(token => {
                //             window.alert("Login realizado com sucesso");
                // localStorage.setItem("login", token.token)
                //     window.location = "../ListaPedidos/index.html";
                // })
                // .catch(err => alert("Impossivel autenticar!"));
                // } else {
                //     return window.alert("Dados incorretos.")
                // }
            } catch (error) {
                hidden();
            }
    }
}

const hidden = () => {
    alerta = document.querySelector('.alert');
    alerta.classList.remove('hidden');

    alerta.textContent = "Dados incorretos";

    alerta.addEventListener('click', () => {
        alerta.classList.add('hidden');
    });
}