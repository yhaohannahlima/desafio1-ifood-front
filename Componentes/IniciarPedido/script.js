import { alerta, sairAplicacao } from "../util.js";

const urlBase = 'http://localhost:8080';
const token = localStorage.getItem('token');
const pedidoString = localStorage.getItem('Dados do pedido');
const pedidoObj = JSON.parse(pedidoString);
const idPedido = pedidoObj.codigoPedido;
const idEntregador = localStorage.getItem('idEntregador');
const iniciarCorrida = document.querySelector('button');
let logout = document.querySelector('.logout');
const tokenExpiradoString = localStorage.getItem("token expirado");
const tokenExpirado = JSON.parse(tokenExpiradoString);

const linkApi = `${urlBase}/pedidos/aceitar/${idPedido}`;
const pedidoNaTela = document.querySelector('div .card-pedido');
pedidoNaTela.textContent = `Pedido: #${pedidoObj.codigoPedido}`;
const nomeCliente = document.querySelector('div .card-cliente');
nomeCliente.textContent = `Cliente: ${pedidoObj.cliente.nome}`;

logout.addEventListener('click', () => {
    sairAplicacao();
})
iniciarCorrida.addEventListener(('click'), () => {
    enviosDeDados();
});

function enviosDeDados() {
    if (!idEntregador) {
        alerta(".alert-danger", "Problemas no pedido.")
        return;
    }
    try {
        fetch(`${linkApi}`, {
            method: 'PUT',
            headers: {
                'Authorization': token,
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                idEntregador: idEntregador
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
                    alerta(".alert-warning", resposta.error.message);
                    break;
                default:
                    if (tokenExpirado === true) {
                        localStorage.removeItem("token expirado");
                        window.location.href = '../Entrar/index.html';
                    } else {
                        window.location.href = '../ListaPedidos/index.html';
                        return;
                    }
            }
        });
    } catch (error) {
        alerta(`.alert-danger`, `Problemas com o pedido. ${error.message}`)
        return;
    }
}