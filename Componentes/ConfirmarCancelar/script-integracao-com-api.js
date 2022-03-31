import { alerta } from "../util.js";

const pedido = document.querySelector('div .pagina-pedidos');
const nomeCliente = document.querySelector('div .cliente');

const pedidoString = localStorage.getItem('Dados do pedido');
const pedidoObj = JSON.parse(pedidoString);

const urlBase = 'https://trackingifood.herokuapp.com';

let idWatch;
const pontoAtual = [];
const intervalo = 10000;

preencherInformacoesPedido();
concluirPedido();
cancelarPedido();

const intervalID = window.setInterval(() => {
    getLocation();

    if (pontoAtual.length !== 0) {
        enviarPontoDeGeolocalizacaoParaApiContinuamente(pontoAtual);
    }

}, intervalo);


//---------- FUNÇÕES
function preencherInformacoesPedido() {
    pedido.textContent = `Pedido #${pedidoObj.codigoPedido}`;
    nomeCliente.textContent = `Cliente: ${pedidoObj.cliente.nome}`;
}

function marcarPontoDeGeolocalizacao(position) {
    if (pontoAtual.length !== 0) {
        pontoAtual.pop();
    }

    pontoAtual.push({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        tempo: position.timestamp
    });
}

function posicaoError(erro) {
    alerta(".alert-warning", "Não foi possível acessar a sua localização!");
}

function getLocation() {
    idWatch = navigator.geolocation.watchPosition(
        (position) => marcarPontoDeGeolocalizacao(position),
        (erro) => posicaoError(erro), { enableHighAccuracy: true }
    );
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
            idPedido: pedidoObj.codigoPedido
        }

        await fetch(`${urlBase}/rastreamento`, { //authorization
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dadosDoPedido)
        }).then((response) => {
            if (response.status === 201) { // modificar para guardar os dados que não foram enviados
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
        navigator.geolocation.clearWatch(idWatch);
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
        navigator.geolocation.clearWatch(idWatch);
        clearInterval(intervalID);

        enviarUltimoDadoAoConcluir(tipoDeFinalizacao);
        return;
    });
}