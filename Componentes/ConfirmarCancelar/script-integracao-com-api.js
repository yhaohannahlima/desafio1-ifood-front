import { alerta } from "../util.js";
import { defineUrlBase as urlBase } from "../util.js";
import { carregandoVisivel } from "../util.js";
import { carregandoEscondido } from "../util.js";
import { tokenExpirado } from "../util.js";

window.setInterval(() => {
    window.location.reload();
}, 60000);

window.setInterval(() => {
    tokenExpirado(localStorage.getItem('token'));
}, 10000);

if (localStorage.getItem('token-expirado')) {
    window.location.href = '../Entrar/index.html'; 
} else {
    const pedido = document.querySelector('div .pagina-pedidos');
    const nomeCliente = document.querySelector('div .cliente');

    const pedidoString = localStorage.getItem('Dados do pedido');
    const pedidoObj = JSON.parse(pedidoString);

    let idWatch;
    const pontoAtual = [];
    const intervalo = 2000;

    const carregando = document.querySelector('.carregar');
    carregandoVisivel(carregando);

    preencherInformacoesPedido();
    concluirPedido();
    cancelarPedido();

    const intervalID = window.setInterval(() => {
        getLocation();

        if (pontoAtual.length !== 0) {
            carregandoEscondido(carregando);

            const imagemMoto = document.querySelector('.pedido-carregado');
            imagemMoto.classList.remove('hidden');

            const botoesConcluirCancelar = document.querySelector('.btn-concluir-cancela');
            botoesConcluirCancelar.classList.remove('hidden');

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
            (erro) => posicaoError(erro),
            { enableHighAccuracy: true }
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
            return alerta(".alert-danger", error.mensagem);
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
            return alerta(".alert-danger", error.mensagem);
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
}