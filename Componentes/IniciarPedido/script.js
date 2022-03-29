import { alerta } from "../util.js";

const urlBase = 'http://localhost:8080';
const token = localStorage.getItem('token');
const pedidoString = localStorage.getItem('Dados do pedido');
const pedidoObj = JSON.parse(pedidoString);
const idPedido = pedidoObj.codigoPedido;
const idEntregador = localStorage.getItem('idEntregador');
const iniciarCorrida = document.querySelector('button');

const linkApi = `${urlBase}/pedidos/aceitar/${idPedido}`; // adicionar link da api (http://localhost:8080/pedidos/abertos/)
const pedidoNaTela = document.querySelector('div .card_pedido');
pedidoNaTela.textContent = `Pedido: #${pedidoObj.codigoPedido}`;
const nomeCliente = document.querySelector('div .card_cliente');
nomeCliente.textContent = `Cliente: ${pedidoObj.cliente.nome}`;


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
                    alerta(".alert-warning", "Problemas no servdor.");
                    break;
                case 409:
                    alerta(".alert-warning", "Pedido finalizado.");
                    break;
                case 400:
                    alerta(".alert-warning", "Erro de aplicação.");
                    break;
                case 401:
                    alerta(".alert-warning", "Pedido não autorizado.");
                    break;
                default:
                    window.location.href = '../ConfirmarCancelar/index.html'
                    return;
            }
        });
    } catch (error) {
        alerta(".alert-danger", "Problemas com o pedido.")
        return;
    }
}