import { alerta } from "../util.js";
import { defineUrlBase as urlBase } from "../util.js";

const pedido = document.querySelector('div .pagina-pedidos');
const nomeCliente = document.querySelector('div .cliente');

const pedidoString = localStorage.getItem('Dados do pedido');
const pedidoObj = JSON.parse(pedidoString);

// TESTES INDOOR
const listaDePontosFake = [
    { latitude: -27.593438702513563, longitude: -48.56158550833867, tempo: new Date() },
    { latitude: -27.59196379398398, longitude: -48.56136653609618, tempo: new Date() },
    { latitude: -27.5915756568625, longitude: -48.560085548477566, tempo: new Date() },
    { latitude: -27.591265146175957, longitude: -48.56134463887192, tempo: new Date() },
    { latitude: -27.593244636735445, longitude: -48.56258183204204, tempo: new Date() },
    { latitude: -27.59356484508511, longitude: -48.564169380800145, tempo: new Date() },
    { latitude: -27.594127633251347, longitude: -48.56708171162537, tempo: new Date() },
    { latitude: -27.59463219949575, longitude: -48.569359022947346, tempo: new Date() },
    { latitude: -27.59292442745049, longitude: -48.57116554394794, tempo: new Date() },
    { latitude: -27.59410822681095, longitude: -48.569906453553585, tempo: new Date() },
    { latitude: -27.59614588429443, longitude: -48.56918384515334, tempo: new Date() },
    { latitude: -27.594835965974582, longitude: -48.56801234365599, tempo: new Date() }
];


const pontoAtual = [];
const pontoFinalFake = listaDePontosFake[listaDePontosFake.length - 1];

const intervalo = 3000;
let i = 0; 

const intervalID = window.setInterval(() => {
    if (pontoAtual.length === 1) {
        pontoAtual.pop();
        pontoAtual.push(listaDePontosFake[i]); 
        marcarPontoDeGeolocalizacaoDaListaFake(pontoAtual); 
        i++;
    }
}, intervalo);


preencherInformacoesPedido();
concluirPedido();
cancelarPedido();


function preencherInformacoesPedido() {
    pedido.textContent = `Pedido #${pedidoObj.codigoPedido}`;
    nomeCliente.textContent = `Cliente: ${pedidoObj.cliente.nome}`;
}

function marcarPontoDeGeolocalizacaoDaListaFake(ponto) {
    ponto[0].tempo = Date.now(); 

    if (ponto[0].latitude === pontoFinalFake.latitude && ponto[0].longitude === pontoFinalFake.longitude) {
        enviarPontoDeGeolocalizacaoParaApiContinuamente(ponto);
        clearInterval(intervalID); 
        return;
    }
    enviarPontoDeGeolocalizacaoParaApiContinuamente(ponto);
}

async function enviarPontoDeGeolocalizacaoParaApiContinuamente(ponto) {
    const latitude = ponto[0].latitude; 
    const longitude = ponto[0].longitude; 
    const tempo = ponto[0].tempo; 

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

        await fetch(`${urlBase()}/rastreamento`, {
            method: 'POST',
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(dadosDoPedido)
        }).then((response) => {
            switch (response.status) {
                case 401:
                    alerta(".alert-danger",
                        "Você não tem autorização para acessar esse recurso! CLIQUE AQUI.",
                        true, false, true);
                    break;

                case 201:
                    break;

                default:
                    return;
            }
        });

    } catch (error) {
        return alerta(".alert-danger", 'Erro ao conectar!');
    }
}

async function enviarUltimoDadoAoConcluir(tipoDeFinalizacao) {
    try {
        const idPedido = pedidoObj.codigoPedido;
        const idEntregador = parseInt(localStorage.getItem('idEntregador'));

        await fetch(`${urlBase()}${tipoDeFinalizacao}${idPedido}`, {
            method: 'PUT',
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ idEntregador })

        }).then((response) => {
            switch (response.status) {
                case 401:
                    alerta(".alert-danger",
                        "Você não tem autorização para acessar esse recurso! CLIQUE AQUI.",
                        true, false, true);
                    break;

                case 200:
                    window.location.href = "../ListaPedidos/index.html";
                    break;

                default:
                    return;
            }
        });

    } catch (error) {
        return alerta(".alert-danger", 'Erro ao conectar!'); 
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