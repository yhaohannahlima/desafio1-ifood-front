const listaPedidos = document.querySelector('div .lista-pedidos');
const linkApi = ''; // adicionar link da api (http://localhost:8080/pedidos/abertos/)


//lista fake
const pedidos = [
    { id: 1, situacao: "em aberto", cliente: "Josefin Faria" },
    { id: 2, situacao: "finalizado", cliente: "Alberto Damagio" },
    { id: 3, situacao: "em aberto", cliente: "Kenedy Triton" },
    { id: 4, situacao: "em aberto", cliente: "Leandro Donato" },
    { id: 5, situacao: "em aberto", cliente: "Merida Spoletto" },
    { id: 6, situacao: "em aberto", cliente: "Nina Albuquerque" },
    { id: 7, situacao: "finalizado", cliente: "Pietro Ferguncio" },
    { id: 8, situacao: "finalizado", cliente: "Cora Coralina" },
    { id: 9, situacao: "em aberto", cliente: "Fernando Pessoa" },
    { id: 10, situacao: "finalizado", cliente: "Rubem Alves" },
    { id: 11, situacao: "finalizado", cliente: "Jose Saraiva" },
    { id: 12, situacao: "em aberto", cliente: "Dado Diamantrio" }
];

inserirPedidos(pedidos); // retirar
acessarListaDePedidosDoBancoDeDados(linkApi);

//----------- FUNÇÕES
function inserirPedidos(pedidos) {
    if (pedidos.length === 0) {
        return;
    }

    pedidos.forEach((item, indice) => {
        novoPedido = document.createElement('button');
        novoPedidoClasse = novoPedido.classList.add("btn");
        novoPedidoClasse = novoPedido.classList.add("btn-pedido");

        listaPedidos.append(novoPedido);

        const pedido = document.querySelectorAll('.btn-pedido');
        pedido[indice].textContent = `Código do pedido: ${item.id}`; // mudar para codigoPedido

        pedido[indice].addEventListener('click', () => {
            window.location.href = '../ConfirmarCancelar/index.html'; // mudar para IniciarPedido
            localStorage.setItem('Dados do pedido', JSON.stringify(pedidos[indice]));
        });
    });
}

function acessarListaDePedidosDoBancoDeDados(linkApi) {
    fetch(linkApi).then(function (response) {
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