import { alerta } from "../util.js";

const listaPedidos = document.querySelector('div .lista-pedidos');

const linkApi = 'http://localhost:8080/pedidos/abertos';

acessarListaDePedidosDoBancoDeDados(linkApi);

async function acessarListaDePedidosDoBancoDeDados(linkApi) {
    await fetch(linkApi).then(function (response) {
        if (!response.ok) {
            alerta(".alert-danger", "Não foi possível acessar a lista de pedidos!!!"); // colocar mensagem da API

            return;
        }

        try {
            const promiseBody = response.json();

            promiseBody.then((body) => {
                body.forEach((item, indice) => {
                    if (item.statusPedido != "aberto") {
                        return;
                    }

                    if (indice === (body.length - 1)) {
                        const carregando = document.querySelector('.spinner-border');
                        const carregandoTexto = document.querySelector('.carregando-texto');

                        carregando.style.display = 'none';
                        carregandoTexto.style.display = 'none';
                        return;
                    }

                    const novoPedido = document.createElement('button');
                    novoPedido.classList.add("btn");
                    novoPedido.classList.add("btn-pedido");

                    listaPedidos.append(novoPedido);

                    const pedido = document.querySelectorAll('.btn-pedido');
                    pedido[indice].textContent = `Código do pedido: ${item.codigoPedido}`;

                    pedido[indice].addEventListener('click', () => {
                        window.location.href = '../ConfirmarCancelar/index.html'; // mudar para IniciarPedido
                        localStorage.setItem('Dados do pedido', JSON.stringify(pedidos[indice]));
                    });

                    // localStorage.setItem('Lista de Pedidos', listaPedidosAberto);
                });
            });
        } catch (error) {
            return alerta(".alert-danger", error.message); // colocar mensagem da API
        }
    });
};