//import { alerta } from "../util.js";

//const urlBase = 'http://localhost:8080';
//const linkApi = `${urlBase}/pedidos/aceitar/${pedidos.id}`; // adicionar link da api (http://localhost:8080/pedidos/abertos/)
//const pontoInicial = [];
//let idWatch;
const pedidoString = localStorage.getItem('Dados do pedido');
const pedidoObj = JSON.parse(pedidoString);
const idPedido = Number(pedidoObj.codigoPedido);
const latitudePedido = Number(pedidoObj.cliente.latitude);
const longitude = Number(pedidoObj.cliente.longitude);
const pontoInicialPedido = Number(pedidoObj.listaRastreio[0])
const idEntregadorSrting = localStorage.getItem('idEntregador');
const idEntregador = JSON.parse(idEntregadorSrting);
const iniciarCorrida = document.querySelector('button .btn-iniciar');

const pedidoNaTela = document.querySelector('div .card_pedido"');
pedidoNaTela.textContent = `Pedido: ${pedidoObj.cliente.codigoCliente}`
const nomeCliente = document.querySelector('div card_cliente');
nomeCliente.textContent = `Cliente: ${pedidoObj.cliente.nome}`;


iniciarCorrida.addEventListener(('click'), () => {
    funcaoClicks();
});

function funcaoClicks() {
    console.log(pedidoObj);
    console.log("Clicou");
}