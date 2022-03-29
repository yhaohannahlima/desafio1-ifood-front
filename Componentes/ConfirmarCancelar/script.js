import { alerta } from "../util.js";

const pedido = document.querySelector('div .pagina-pedidos');
const nomeCliente = document.querySelector('div .cliente');

const pedidoString = localStorage.getItem('Dados do pedido');
const pedidoObj = JSON.parse(pedidoString);

const urlBase = 'http://localhost:8080';


// lista fake de pontos
const listaDePontosFake = [
    { latitude: -27.593438702513563, longitude: -48.56158550833867, tempo: new Date() },
    { latitude: -27.59196379398398, longitude: -48.56136653609618, tempo: new Date() },
    { latitude: -27.5915756568625, longitude: -48.560085548477566, tempo: new Date() },
    { latitude: -27.591265146175957, longitude: -48.56134463887192, tempo: new Date() },
    // { latitude: -27.593244636735445, longitude: -48.56258183204204, tempo: new Date() },
    // { latitude: -27.59356484508511, longitude: -48.564169380800145, tempo: new Date() },
    // { latitude: -27.594127633251347, longitude: -48.56708171162537, tempo: new Date() },
    // { latitude: -27.59463219949575, longitude: -48.569359022947346, tempo: new Date() },
    // { latitude: -27.59292442745049, longitude: -48.57116554394794, tempo: new Date() },
    // { latitude: -27.59410822681095, longitude: -48.569906453553585, tempo: new Date() },
    // { latitude: -27.59614588429443, longitude: -48.56918384515334, tempo: new Date() },
    { latitude: -27.594835965974582, longitude: -48.56801234365599, tempo: new Date() }
];

//ponto final fake
const pontoAtual = [];
const pontoFinalFake = listaDePontosFake[listaDePontosFake.length - 1];

const intervalo = 3000;
let i = 0; // retirar após a integração com a API

const intervalID = window.setInterval(() => {
    if (pontoAtual.length === 1) {
        pontoAtual.pop();
        pontoAtual.push(listaDePontosFake[i]); // retirar após a integração com a API
        marcarPontoDeGeolocalizacaoDaListaFake(pontoAtual); // retirar após a integração com a API
        i++;
    }

    // // retirar após a integração com a Api
    // if (i < 12) {
    //     i++;
    // } else {
    //     i = 0;
    // }
}, intervalo);


preencherInformacoesPedido();
concluirPedido();
cancelarPedido();

//---------- FUNÇÕES
function preencherInformacoesPedido() {
    pedido.textContent = `Pedido #${pedidoObj.codigoPedido}`;
    nomeCliente.textContent = `Cliente: ${pedidoObj.cliente.nome}`;
}

function marcarPontoDeGeolocalizacaoDaListaFake(ponto) {
    ponto[0].tempo = Date.now(); // retirar após a integração com a API

    if (ponto[0].latitude === pontoFinalFake.latitude && ponto[0].longitude === pontoFinalFake.longitude) {
        enviarPontoDeGeolocalizacaoParaApiContinuamente(ponto);
        clearInterval(intervalID); //retirar
        return;
    }
    enviarPontoDeGeolocalizacaoParaApiContinuamente(ponto);
}

async function enviarPontoDeGeolocalizacaoParaApiContinuamente(ponto) {
    const latitude = ponto[0].latitude; //colocar o ponto real
    const longitude = ponto[0].longitude; //colocar o ponto real
    const tempo = ponto[0].tempo; //colocar o ponto real

    if (!pedidoObj.codigoPedido || !latitude || !longitude || !tempo) {
        return;
    }

    try {
        const dadosDoPedido = {
            latitude: latitude,
            longitude: longitude,
            tempo: tempo,
            pedido: {
                codigoPedido: pedidoObj.codigoPedido
            }
        }

        await fetch(`${urlBase}/rastreamento`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dadosDoPedido)
        }).then((response) => {
            if (response.status === 200) { // modificar para guardar os dados que não foram enviados
                return;
            } else {
                alerta(".alert-warning", "Sua localização não está sendo enviada!!!"); // colocar mensagem da API
                return;
            }
        });

    } catch (error) {
        return alerta(".alert-danger", error.message); // colocar mensagem da API
    }
}

async function enviarUltimoDadoAoConcluir(tipoDeFinalizacao) {
    try {
        const idPedido = pedidoObj.codigoPedido;
        const idEntregador = {
            idEntregador: pedidoObj.entregador.codigoEntregador
        };

        await fetch(`${urlBase}${tipoDeFinalizacao}${idPedido}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(idEntregador)

        }).then((response) => {
            if (response.status === 200) {
                window.location.href = "../ListaPedidos/index.html";
                localStorage.removeItem('Dados do pedido');
            } else {
                return alerta(".alert-warning", "Não foi possível finalizar o pedido!!!"); // colocar mensagem da API
            }
        });

    } catch (error) {
        return alerta(".alert-danger", error.message); // colocar mensagem da API
    }
}


function concluirPedido() {
    const botaoConcluirPedido = document.querySelector('.btn-concluir');
    const tipoDeFinalizacao = '/pedidos/finalizar/';

    botaoConcluirPedido.addEventListener('click', () => {
        enviarPontoDeGeolocalizacaoParaApiContinuamente(pontoAtual);
        clearInterval(intervalID);

        enviarUltimoDadoAoConcluir(tipoDeFinalizacao);
        return;
    });
}

function cancelarPedido() {
    const botaoCancelarPedido = document.querySelector('.btn-cancelar');
    const tipoDeFinalizacao = '/pedidos/cancelar/';

    botaoCancelarPedido.addEventListener('click', () => {
        enviarPontoDeGeolocalizacaoParaApiContinuamente(pontoAtual);
        clearInterval(intervalID);

        enviarUltimoDadoAoConcluir(tipoDeFinalizacao);
        return;
    });
}


