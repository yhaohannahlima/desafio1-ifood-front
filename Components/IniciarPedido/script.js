const listaPedidos = document.querySelector('div .lista-pedidos');
const linkApi = 'http://localhost:8080/pedidos/abertos/'; // adicionar link da api (http://localhost:8080/pedidos/abertos/)


//lista fake
const pedidos = [
    { id: 1, situacao: "em aberto", cliente: "Josefin Faria" }
];

// inserirPedidos(pedidos); // deve ser retirado quando a API estiver fucnionando
acessarListaDePedidosDoBancoDeDados(linkApi);

//----------- FUNÇÕES
function inserirPedido(pedido) {
    if (pedido.length === 0) {
        return;
    }

    pedido.forEach((item, indice) => {
        novoPedido = document.createElement('.tela-tefone');
        novoPedidoClasse = novoPedido.classList.add("btn");
        novoPedidoClasse = novoPedido.classList.add("btn-pedido");

        listaPedidos.append(novoPedido);

        const pedido = document.querySelectorAll('.btn-pedido');
        pedido[indice].textContent = `Código do pedido: ${item.id}`; // mudar para codigoPedido

        pedido[indice].addEventListener('click', () => {
            window.location.href = '../ConfirmarCancelar/index.html'; // mudar para IniciarPedido
            localStorage.setItem('Dados do pedido', JSON.stringify(pedido[indice]));
        });
    });
}

function acessarListaDePedidosDoBancoDeDados(linkApi) {
    fetch(linkApi).then(function(response) {
        if (!response.ok) {
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
                if (item.situacao != "em aberto") {
                    return;
                }

                listaPedidosAberto.push(item);
            });

            inserirPedidos(listaPedidosAberto);

            // localStorage.setItem('Lista de Pedidos', listaPedidosAberto);
        })
    });
}