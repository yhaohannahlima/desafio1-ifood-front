let login = document.getElementById('login');

function logar() {
    const senha = document.getElementById("senha").value;
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
                console.log("tras o corpo " + corpo)

                // const cabecalho = {
                //     method: "POST",
                //     body: JSON.stringify(corpo),
                //     headers: {
                //         "content-type": "application/json"
                //     }
                // }

                fetch("http://localhost:8080/login", {
                        method: "POST",
                        body: JSON.stringify(corpo),
                        headers: {
                            "content-type": "application/json"
                        },
                    })
                    .then(res => res.json())
                    .then(token => {
                        // localStorage.setItem("login")
                        window.alert("Login realizado com sucesso");
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