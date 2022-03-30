import { alerta } from "../util.js";
import { defineUrlBase as urlBase } from "../util.js";

const listaPedidos = document.querySelector('div .lista-pedidos');

acessarListaDePedidosDoBancoDeDados();

async function acessarListaDePedidosDoBancoDeDados() {
    localStorage.removeItem('Dados do pedido');
    
    const carregando = document.querySelector('.carregar');
    carregando.classList.remove('hidden');

    try {
        await fetch(`${urlBase()}/pedidos/abertos`, { //authorization
            method: 'GET',
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
                'content-type': 'application/json'
            }

        }).then(function (response) {
            if (response.status === 200) {
                const promiseBody = response.json();

                promiseBody.then((promessaCorpo) => {
                    const body = promessaCorpo.sort((a, b) => a.codigoPedido - b.codigoPedido);

                    body.forEach((item, indice) => {
                        const novoPedido = document.createElement('button');
                        novoPedido.classList.add("btn");
                        novoPedido.classList.add("btn-pedido");

                        listaPedidos.append(novoPedido);

                        const pedido = document.querySelectorAll('.btn-pedido');
                        pedido[indice].textContent = `Código do pedido: ${item.codigoPedido}`;

                        pedido[indice].addEventListener('click', () => {
                            window.location.href = '../Iniciarpedido/index.html'; // mudar para IniciarPedido
                            localStorage.setItem('Dados do pedido', JSON.stringify(body[indice]));
                        });

                        if (indice === (body.length - 1)) {
                            carregando.classList.add('hidden');
                            return;
                        }
                    });
                });
            } else {
                if (response.status === 401) {
                    carregando.classList.add('hidden');

                    alerta(".alert-danger",
                        "Você não tem autorização para acessar esse recurso! CLIQUE AQUI.",
                        true);
                    return;
                }

                if (!response.ok) {
                    carregando.classList.add('hidden');

                    alerta(".alert-danger", "Não foi possível acessar a lista de pedidos!!!"); // colocar mensagem da API
                    return;
                }
            }
        });

    } catch (error) {
        return alerta(".alert-danger", error.message); // colocar mensagem da API
    }
};