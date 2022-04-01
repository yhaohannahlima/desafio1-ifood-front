import { alerta, sairAplicacao } from "../util.js";
import { defineUrlBase as urlBase } from "../util.js";
import { carregandoVisivel } from "../util.js";
import { carregandoEscondido } from "../util.js";

window.setInterval(() => {
    window.location.reload();
}, 60000);


const listaPedidos = document.querySelector('div .lista-pedidos');
const logout = document.querySelector('.logout');

acessarListaDePedidosDoBancoDeDados();

async function acessarListaDePedidosDoBancoDeDados() {
    localStorage.removeItem('Dados do pedido');

    const carregando = document.querySelector('.carregar');
    carregandoVisivel(carregando);

    try {
        await fetch(`${urlBase()}/pedidos/abertos`, {
            method: 'GET',
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
                'content-type': 'application/json'
            }

        }).then(function(response) {
            switch (response.status) {
                case 401:
                    carregandoEscondido(carregando);
                    alerta(".alert-danger",
                        "Você não tem autorização para acessar esse recurso! CLIQUE AQUI.",
                        true);
                    break;

                case 200:
                    const promiseBody = response.json();
                    promiseBody.then((promessaCorpo) => {
                        if (promessaCorpo.length === 0) {
                            carregandoEscondido(carregando);

                            const pedidosEntregues = document.querySelector(".pedidos-entregues");
                            pedidosEntregues.classList.remove("hidden");
                            return;
                        }


                        const body = promessaCorpo.sort((a, b) => a.codigoPedido - b.codigoPedido);

                        body.forEach((item, indice) => {
                            const novoPedido = document.createElement('button');
                            novoPedido.classList.add("btn");
                            novoPedido.classList.add("btn-pedido");

                            listaPedidos.append(novoPedido);

                            const pedido = document.querySelectorAll('.btn-pedido');
                            pedido[indice].textContent = `Código do pedido: ${item.codigoPedido}`;

                            pedido[indice].addEventListener('click', () => {
                                window.location.href = '../../componentes/iniciarpedido/index.html';
                                localStorage.setItem('Dados do pedido', JSON.stringify(body[indice]));
                            });

                            if (indice === (body.length - 1)) {
                                carregandoEscondido(carregando);
                                return;
                            }
                        });
                    });
                    break;

                default:
                    carregandoVisivel(carregando);
                    return;
            }
        });

    } catch (error) {
        return alerta("Erro ao conectar!");
    }
};