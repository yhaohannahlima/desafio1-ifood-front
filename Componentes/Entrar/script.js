import { alerta } from "../componentes/util.js";
import { defineUrlBase as urlBase } from "../util.js";
import { parseJwt } from "../componentes/util.js";

const login = document.querySelector('button');
const urlLogin = `${urlBase()}/login`;

const tokenInvalidoString = localStorage.getItem("token-invalido");
const tokenInvalido = JSON.parse(tokenInvalidoString);

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
                                        setToken(dadosResposta.token, '../componentes/confirmarcancelar/index.html');
                                    } else {
                                        setToken(dadosResposta.token, '../componentes/listapedidos/index.html');
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
