import { alerta } from "../util.js";
// import jsonwebTokenService from 'jsonwebtoken';
// import jwt_decode from "jwt-decode";

const login = document.querySelector('button');
const urlLogin = "http://localhost:8080/login";

login.addEventListener(('click'), () => {
    logar();
});

async function logar() {
    const senha = document.getElementById("senha").value;
    const email = document.getElementById("email").value;
    switch (senha || email) {
        case "":
            alerta(".alert-danger", "Usuário e/ou senha incorretos!");
            break;
        case " ":
            alerta(".alert-danger", "Usuário e/ou senha incorretos!");
            break;
        case null:
            alerta(".alert-danger", "Usuário e/ou senha incorretos!");
            break;
        case undefined:
            alerta(".alert-danger", "Usuário e/ou senha incorretos!");
            break;
        default:
            try {
                await fetch(urlLogin, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        senha: senha
                    })
                }).then((resposta) => {
                    if (resposta.status === 200) {
                        resposta.json()
                            .then((dadosResposta) => {
                                localStorage.setItem("dadosResposta", dadosResposta.token);
                                window.location.href = '../ListaPedidos/index.html'
                            })
                    } else {
                        alerta(".alert-danger", "Usuário e/ou senha incorretos!")
                        return;
                    }
                })
            } catch (error) {
                alerta(".alert-danger", "Erro ao conectar!");
            }
    }
};