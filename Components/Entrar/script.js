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

                const corpo = {
                    email: email,
                    senha: senha
                }

                const cabecalho = {
                    method: "POST",
                    body: JSON.stringify(corpo),
                    headers: {
                        "content-type": "application/json"
                    }
                }

                fetch("http://localhost:8080/login", cabecalho)
                    .then(res => res.json())
                    .then(token => {
                        window.alert("Login realizado com sucesso");
                        localStorage.setItem("login")
                        window.location = "../ListaPedidos/index.html";
                    })
                    .catch(err => alert("Impossivel autenticar!"));
                return window.alert("Dados incorretos.")
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