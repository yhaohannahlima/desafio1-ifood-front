import { alerta } from "../util.js";

const urlBase = 'http://localhost:8080';
const linkApi = `${urlBase}/pedidos/aceitar/${idPedido}`; // adicionar link da api (http://localhost:8080/pedidos/abertos/)
//let idWatch;
const pedidoString = localStorage.getItem('Dados do pedido');
const pedidoObj = JSON.parse(pedidoString);
const idPedido = Number(pedidoObj.codigoPedido);
const latitudePedido = Number(pedidoObj.cliente.latitude);
const longitudePedido = Number(pedidoObj.cliente.longitude);
const pontoInicialPedido = Number(pedidoObj.listaRastreio[0])
const idEntregadorSrting = localStorage.getItem('idEntregador');
const idEntregador = JSON.parse(idEntregadorSrting);
const iniciarCorrida = document.querySelector('button .btn-iniciar');

const pedidoNaTela = document.querySelector('div .card_pedido"');
const nomeCliente = document.querySelector('div card_cliente');
console.log(`Quero ver o ${pedidoObj}`);
console.log("Clicou");
preencherInformacoesPedido();

function preencherInformacoesPedido() {
    pedidoNaTela.textContent = `Pedido: #${pedidoObj.codigoPedido}`;
    nomeCliente.textContent = `Cliente: ${pedidoObj.cliente.nome}`;
}


iniciarCorrida.addEventListener(('click'), () => {
    enviosDeDados();
});

function enviosDeDados() {
    if (!idPedido || !latitudePedido || !longitudePedido || !pontoInicialPedido) {
        alerta(".alert-danger", "Problemas no pedido.")
        return;
    }
    try {
        await fetch(`${linkApi}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                codigoPedido: idPedido
            })
        }).then((resposta) => {
            if (resposta.status === 200) { // modificar para guardar os dados que não foram enviados
                localStorage.setItem("idPedido", resposta.codigoPedido);
                window.location.href = '../ConfirmarCancelar/index.html'
                return;
            } else {
                alerta(".alert-warning", "Problemas com a conexão."); // colocar mensagem da API
                return;
            }
        });
    } catch (error) {
        alerta(".alert-danger", "Problemas com o pedido.")
        return;
    }
}