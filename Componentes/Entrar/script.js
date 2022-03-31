import { alerta } from "../util.js";

const login = document.querySelector('button');
const urlBase = 'http://localhost:8080';
const urlLogin = `${urlBase}/login`;

const tokenExpiradoString = localStorage.getItem("token expirado");
const tokenExpirado = JSON.parse(tokenExpiradoString);

localStorage.removeItem("token");
localStorage.removeItem("idEntregador");

window.onload = () => {
    login.addEventListener(('click'), () => {
        logar();
    });
}


function logar() {

    let email = document.querySelector(".email-classe").value;
    let senha = document.querySelector(".senha-classe").value;
    let emailTratado = email.trim();

    if (emailTratado !== null && senha !== null) {
        email = emailTratado;
        senha = senha;
    } else {
        alerta(".alert-danger", "Usuário e/ou senha incorretos!");
    }

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
                fetch(urlLogin, {
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
                            alerta(".alert-warning", resposta.error.message);
                            break;
                        case 409:
                            alerta(".alert-warning", resposta.error.message);
                            break;
                        case 400:
                            alerta(".alert-warning", resposta.error.message);
                            break;
                        case 401:
                            alerta(".alert-warning", `Não autorizado. ${resposta.error.message}`);
                            break;
                        case 405:
                            alerta(".alert-warning", resposta.error.message);
                            break;
                        case 200:
                            resposta.json()
                                .then((dadosResposta) => {
                                    if (tokenExpirado === true) {
                                        localStorage.removeItem("token expirado");
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
                alerta(`.alert-danger`, `Erro ao conectar! ${error.message}`);
            }
    }
};

function setToken(dadosResposta, caminho) {
    const idEntregador = parseJwt(dadosResposta);
    localStorage.setItem("token", dadosResposta);
    localStorage.setItem("idEntregador", idEntregador.sub);
    window.location.href = caminho;
}

// fonte : https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

let olhoFechado = document.querySelector('.olhoFechado');
let olhoAberto = document.querySelector('.olhoAberto');
olhoFechado.addEventListener(('click'), () => {
    mostrar();
});

olhoAberto.addEventListener(('click'), () => {
    fechar();
})

function fechar() {
    let senha = document.querySelector(".senha-classe");
    if (senha.getAttribute('type') == 'text') {
        senha.setAttribute('type', 'password');
        senha.setAttribute('placeholder', '**************')
        olhoAberto.classList.add('hidden');
        olhoFechado.classList.remove('hidden');
    }
}

function mostrar() {
    let senha = document.querySelector(".senha-classe");

    if (senha.getAttribute('type') == 'password') {
        senha.setAttribute('type', 'text')
        senha.setAttribute('placeholder', '')
        olhoFechado.classList.add('hidden');
        olhoAberto.classList.remove('hidden');
    }
}