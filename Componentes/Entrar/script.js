import { alerta, tokenExpirado } from "../util.js";
import { defineUrlBase as urlBase } from "../util.js";
import { parseJwt } from "../util.js";

const login = document.querySelector('button');
const urlLogin = `${urlBase()}/login`;

const tokenInvalidoString = localStorage.getItem("token-invalido");
const tokenInvalido = JSON.parse(tokenInvalidoString);

// const paginaConfirmarString = localStorage.getItem("pagina-confirmar");
// const paginaConfirmarBoolean = JSON.parse(paginaConfirmarString);

localStorage.removeItem("token");
localStorage.removeItem("idEntregador");
login.addEventListener(('click'), () => {
    logar();
    // localStorage.removeItem("token-expirado");
});

async function logar() {
    const senha = document.getElementById("senha").value;
    const email = document.getElementById("email").value;
    switch (senha || email) {
        case "":
            alerta(".alert-warning", "Usuário e/ou senha incorretos!");
            break;
        case " ":
            alerta(".alert-warning", "Usuário e/ou senha incorretos!");
            break;
        case null:
            alerta(".alert-warning", "Usuário e/ou senha incorretos!");
            break;
        case undefined:
            alerta(".alert-warning", "Usuário e/ou senha incorretos!");
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
                    switch (resposta.status) {
                        case 404:
                            alerta(".alert-warning", resposta.error.mensagem);
                            break;
                        case 409:
                            alerta(".alert-warning", resposta.error.mensagem);
                            break;
                        case 400:
                            alerta(".alert-warning", resposta.error.mensagem);
                            break;
                        case 401:
                            alerta(".alert-warning", `Não autorizado. ${resposta.error.mensagem}`);
                            break;
                        case 405:
                            alerta(".alert-warning", resposta.error.mensagem);
                            break;
                        case 200:
                            resposta.json()
                                .then((dadosResposta) => {
                                    if (tokenInvalido === true) {
                                        localStorage.removeItem("token-invalido");
                                        // localStorage.removeItem("pagina-confirmar");
                                        setToken(dadosResposta.token, '../ConfirmarCancelar/index.html');
                                    } else {
                                        setToken(dadosResposta.token, '../ListaPedidos/index.html');
                                    }
                                })
                        default:
                            return;
                    }
                })
            } catch (error) {
                alerta(`.alert-danger`, `Erro ao conectar! ${error.mensagem}`);
            }
    }
};

function setToken(dadosResposta, caminho) {
    const idEntregador = parseJwt(dadosResposta);
    localStorage.setItem("token", dadosResposta);
    localStorage.setItem("idEntregador", idEntregador.sub);
    window.location.href = caminho;
}

