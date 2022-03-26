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
    { latitude: -27.593244636735445, longitude: -48.56258183204204, tempo: new Date() },
    { latitude: -27.59356484508511, longitude: -48.564169380800145, tempo: new Date() },
    { latitude: -27.594127633251347, longitude: -48.56708171162537, tempo: new Date() },
    { latitude: -27.59463219949575, longitude: -48.569359022947346, tempo: new Date() },
    { latitude: -27.59292442745049, longitude: -48.57116554394794, tempo: new Date() },
    { latitude: -27.59410822681095, longitude: -48.569906453553585, tempo: new Date() },
    { latitude: -27.59614588429443, longitude: -48.56918384515334, tempo: new Date() },
    { latitude: -27.594835965974582, longitude: -48.56801234365599, tempo: new Date() }
];

//ponto final fake
const pontoFinalFake = listaDePontosFake[listaDePontosFake.length - 1];

const intervalo = 3000;
let i = 0; // retirar após a integração com a API

const intervalID = window.setInterval(() => {
    const pontoFake = listaDePontosFake[i]; // retirar após a integração com a API

    marcarPontoDeGeolocalizacaoDaListaFake(pontoFake); // retirar após a integração com a API

    // // retirar após a integração com a Api
    // if (i < 12) {
    //     i++;
    // } else {
    //     i = 0;
    // }
    i++;
}, intervalo);


preencherInformacoesPedido();
concluirPedido();
cancelarPedido();

//---------- FUNÇÕES
function preencherInformacoesPedido() {
    pedido.textContent = `Pedido #${pedidoObj.codigoPedido}`; 
    nomeCliente.textContent = `Cliente: ${pedidoObj.cliente}`;
}

function marcarPontoDeGeolocalizacaoDaListaFake(ponto) {
    ponto.tempo = Date.now(); // retirar após a integração com a API

    if (ponto.latitude === pontoFinalFake.latitude && ponto.longitude === pontoFinalFake.longitude) {
        enviarPontoDeGeolocalizacaoParaApiContinuamente(ponto);
        clearInterval(intervalID);
        return;
    }
    enviarPontoDeGeolocalizacaoParaApiContinuamente(ponto);
}

async function enviarPontoDeGeolocalizacaoParaApiContinuamente(pontoFake) {
    const latitude = pontoFake.latitude; //colocar o ponto real
    const longitude = pontoFake.longitude; //colocar o ponto real
    const tempo = pontoFake.tempo; //colocar o ponto real

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
                alerta(".alert-warning", "Sua localização não está sendo enviada!!!");
                return;
            }
        });

    } catch (error) {
        return alerta(".alert-danger", error.message);
    }
}

async function enviarUltimoDadoAoConcluir() {
    try {
        const idPedido = pedidoObj.codigoPedido;

        await fetch(`${urlBase}/pedidos/finalizar/${idPedido}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(idPedido)

        }).then((response) => {
            console.log(response) //------------------------------------PAREI AQUI
            if (response.status === "201") {
                window.location.href = "../ListaPedidos/index.html";
                localStorage.clear();
            } else {
                return alerta(".alert-warning", "Não foi possível finalizar o pedido!!!");
            }
        });

    } catch (error) {
        return alerta(".alert-danger", error.message);
    }
}


function concluirPedido() {
    const botaoConcluirPedido = document.querySelector('.btn-concluir');

    botaoConcluirPedido.addEventListener('click', () => {
        enviarPontoDeGeolocalizacaoParaApiContinuamente();
        clearInterval(intervalID);

        enviarUltimoDadoAoConcluir();
        return;
    })
}

function cancelarPedido() {
    const botaoCancelarPedido = document.querySelector('.btn-cancelar');

    botaoCancelarPedido.addEventListener('click', () => {
        enviarPontoDeGeolocalizacaoParaApiContinuamente();
        clearInterval(intervalID);

        enviarUltimoDadoAoConcluir();
        return;
    })
}


//-------------------------------------------------------
function alerta(tipoAlerta, mensagem) {
    const alerta = document.querySelector(tipoAlerta);
    
    alerta.classList.remove('hidden');

    alerta.textContent = mensagem;

    alerta.addEventListener('click', () => {
        alerta.classList.add('hidden');
    });

    setTimeout(() => { 
        alerta.classList.add('hidden');
    }, intervalo - 2000);
}