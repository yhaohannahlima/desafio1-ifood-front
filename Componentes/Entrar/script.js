import { alerta } from "../util.js";
const login = document.getElementById('login');
const urlLogin = "http://localhost:8080/login";
async function logar() {
    const senha = document.getElementById("senha").value;
    const email = document.getElementById("email").value;
    switch (senha || email) {
        case "":
            alerta("Usuário e/ou senha incorretos!");
            break;
        case " ":
            alerta("Usuário e/ou senha incorretos!");
            break;
        case null:
            alerta("Usuário e/ou senha incorretos!");
            break;
        case undefined:
            alerta("Usuário e/ou senha incorretos!");
            break;
        default:
            try {
                const res = await fetch(urlLogin, {
                    method: "POST",
                    headers: {
                        // "Accept": "application/json",



                        "content-type": "application/json"
                    }
                    // body: JSON.stringify({
                    //     email: email,
                    //     senha: senha
                    // })
                });
                const response = await res.status;
                if (response.status !== 200) {
                    alerta("Usuário e/ou senha incorretos!");
                    return;
                }
                const administradorToken = await response.json();
                if (administradorToken.erro != null) {
                    alerta("Usuário e/ou senha incorretos!");
                    return;
                }
                localStorage.setItem("login", administradorToken.login);

            } catch (error) {
                alerta(error.message + " Erro ao conectar!");
            }
    }
};

const alerta = (mensagem) => {
        const alerta = document.querySelector('.alert');
        alerta.classList.remove('hidden');
        alerta.textContent = mensagem;
        alerta.addEventListener('click', () => {
            alerta.classList.add('hidden');
        });
    }
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
    // .then((response) => {
    //     if (response.status !== 200) {
    //         alerta("Usuário e/ou senha incorretos!");
    //         return;
    //     } else {
    //         return response.json
    //     }
    // })
    // .then(token => {
    //     localStorage.setItem("token", token.token);
    //     window.alert("Login realizado com sucesso");
    //     window.location.href = '../ListaPedidos/index.html';
    // })