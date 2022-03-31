import { alerta } from "../util.js";
import { defineUrlBase as urlBase } from "../util.js";
import { parseJwt } from "../util.js";

const login = document.querySelector('button');
const urlLogin = `${urlBase()}/login`;

const tokenInvalidoString = localStorage.getItem("token-invalido");
const tokenInvalido = JSON.parse(tokenInvalidoString);

localStorage.removeItem("token");
localStorage.removeItem("idEntregador");
login.addEventListener(('click'), () => {
    logar();
});

async function logar() {
    const senha = document.getElementById("senha").value;
    const email = document.getElementById("email").value;
    switch (senha || email) {
        case "":
            alerta(".alert-danger", "Problema com credenciais do usuário!");
            break;
        case " ":
            alerta(".alert-danger", "Problema com credenciais do usuário!");
            break;
        case null:
            alerta(".alert-danger", "Problema com credenciais do usuário!");
            break;
        case undefined:
            alerta(".alert-danger", "Problema com credenciais do usuário!");
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
                            alerta(".alert-danger", "Erro ao tentar entrar! Verifique suas credenciais.");
                            break;
                        case 409:
                            alerta(".alert-danger", "Erro ao tentar entrar! Verifique suas credenciais.");
                            break;
                        case 400:
                            alerta(".alert-danger", "Erro ao tentar entrar! Verifique suas credenciais.");
                            break;
                        case 401:
                            alerta(".alert-danger", "Erro ao tentar entrar! Verifique suas credenciais.");
                            break;
                        case 405:
                            alerta(".alert-danger", "Erro ao tentar entrar! Verifique suas credenciais.");
                            break;
                        case 200:
                            resposta.json()
                                .then((dadosResposta) => {
                                    if (tokenInvalido === true) {
                                        localStorage.removeItem("token-invalido");
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
                alerta('.alert-danger', 'Erro ao conectar! Por favor, tente novamente mais tarde.');
            }
    }
};

function setToken(dadosResposta, caminho) {
    const idEntregador = parseJwt(dadosResposta);
    localStorage.setItem("token", dadosResposta);
    localStorage.setItem("idEntregador", idEntregador.sub);
    window.location.href = caminho;
}

