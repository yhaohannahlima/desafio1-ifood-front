const listaPedidos = document.querySelector('div .lista-pedidos');
const linkApi = ''; // adicionar link da api (http://localhost:8080/pedidos/abertos/)


//lista fake
const pedidos = [
    { codigoPedido: 1, situacao: "em aberto", cliente: "Josefin Faria" },
    { codigoPedido: 2, situacao: "finalizado", cliente: "Alberto Damagio" },
    { codigoPedido: 3, situacao: "em aberto", cliente: "Kenedy Triton" },
    { codigoPedido: 4, situacao: "em aberto", cliente: "Leandro Donato" },
    { codigoPedido: 5, situacao: "em aberto", cliente: "Merida Spoletto" },
    { codigoPedido: 6, situacao: "em aberto", cliente: "Nina Albuquerque" },
    { codigoPedido: 7, situacao: "finalizado", cliente: "Pietro Ferguncio" },
    { codigoPedido: 8, situacao: "finalizado", cliente: "Cora Coralina" },
    { codigoPedido: 9, situacao: "em aberto", cliente: "Fernando Pessoa" },
    { codigoPedido: 10, situacao: "finalizado", cliente: "Rubem Alves" },
    { codigoPedido: 11, situacao: "finalizado", cliente: "Jose Saraiva" },
    { codigoPedido: 12, situacao: "em aberto", cliente: "Dado Diamantrio" }
];

inserirPedidos(pedidos); // deve ser retirado quando a API estiver fucnionando
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
        pedido[indice].textContent = `Código do pedido: ${item.codigoPedido}`; // mudar para codigoPedido

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