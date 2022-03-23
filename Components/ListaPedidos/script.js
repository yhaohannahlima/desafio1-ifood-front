const listaPedidos = document.querySelector('div .lista-pedidos');
const linkApi = '';


//popular
const pedidos = [
    { id: 1, situacao: true }, { id: 2, situacao: false }, { id: 3, situacao: true },
    { id: 4, situacao: true }, { id: 5, situacao: true }, { id: 6, situacao: true },
    { id: 7, situacao: false }, { id: 8, situacao: false }, { id: 9, situacao: true },
    { id: 10, situacao: false }, { id: 11, situacao: false }, { id: 12, situacao: true }
];

inserirPedidos(pedidos); 
acessarListaDePedidosApi(linkApi)



//----------- FUNÇÕES
function inserirPedidos(pedidos) {
    if(pedidos.length === 0) {
        return;
    }

    pedidos.forEach((item, indice) => {
        novoPedido = document.createElement('button');
        novoPedidoClasse = novoPedido.classList.add("btn");
        novoPedidoClasse = novoPedido.classList.add("btn-pedido");

        listaPedidos.append(novoPedido);

        const pedido = document.querySelectorAll('.btn-pedido');
        pedido[indice].textContent = `Código do pedido: ${item.id}`;

        pedido[indice].addEventListener('click', () => {
            window.location.href = '../IniciarPedido/index.html';
        }); 
    });
}

function acessarListaDePedidosApi(linkApi) {
    fetch(linkApi).then(function(response) {
        if(!response.ok) {
            alerta = document.querySelector('.alert');
            alerta.classList.remove('hidden');

            alerta.textContent = "Não foi possível acessar a lista de pedidos!!!";

            alerta.addEventListener('click', () => {
                alerta.classList.add('hidden');
            });

            return;
        }

        const promiseBody = response.json();

        promiseBody.then((body) => {
            const listaPedidosAberto = [];

            body.results.forEach(item => {
                if (!item.situacao) {
                    return;
                }

                listaPedidosAberto.push(item);
            });

            inserirPedidos(listaPedidosAberto); 
        })
    });
}
