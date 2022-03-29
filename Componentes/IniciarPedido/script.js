//import { alerta } from "../util.js";

//const urlBase = 'http://localhost:8080';
//const linkApi = `${urlBase}/pedidos/aceitar/${pedidos.id}`; // adicionar link da api (http://localhost:8080/pedidos/abertos/)
//const pontoInicial = [];
//let idWatch;
const idPedido = Number(pedido);
const pedido = JSON.parse(localStorage.getItem('codigoPedido'));
const idEntregador = JSON.parse(localStorage.getItem('idEntregador'));
const iniciarCorrida = document.querySelector('button .btn-iniciar');

const pedidoNaTela = document.querySelector('div .card_pedido"');
pedidoNaTela.textContent = `Pedido: ${pedidos.cliente[0]}`
const nomeCliente = document.querySelector('div card_cliente');


iniciarCorrida.addEventListener(('click'), () => {
    funcaoClicks();
});

function funcaoClicks() {
    console.log(idPedido);
    console.log("Clicou");
}