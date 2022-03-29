import { alerta } from "../util.js";

const login = document.querySelector('button');
const urlLogin = "http://localhost:8080/login";
const tokenExpiradoString = localStorage.getItem("token expirado");
const tokenExpirado = JSON.parse(tokenExpiradoString);

localStorage.removeItem("token");
localStorage.removeItem("idEntregador");
localStorage.removeItem("Dados do pedido")
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
                                if (tokenExpirado === true) {
                                    const idEntregador = parseJwt(dadosResposta.token);
                                    localStorage.setItem("token", dadosResposta.token);
                                    localStorage.setItem("idEntregador", idEntregador.sub);
                                    window.location.href = '../ConfirmarCancelar/index.html';
                                } else {
                                    const idEntregador = parseJwt(dadosResposta.token);
                                    localStorage.setItem("token", dadosResposta.token);
                                    localStorage.setItem("idEntregador", idEntregador.sub);
                                    window.location.href = '../ListaPedidos/index.html';
                                }
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

// fonte : https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};