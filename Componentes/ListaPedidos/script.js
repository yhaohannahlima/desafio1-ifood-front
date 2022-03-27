const listaPedidos = document.querySelector('div .lista-pedidos');
const linkApi = ''; // adicionar link da api (http://localhost:8080/pedidos/abertos/)


//lista fake
const pedidos = [
    { codigoPedido: 1, dataPedido: new Date(), situacao: "em aberto", cliente: "Josefin Faria", codigoEntregador: 12 },
    { codigoPedido: 2, dataPedido: new Date(), situacao: "finalizado", cliente: "Alberto Damagio", codigoEntregador: 3 },
    { codigoPedido: 3, dataPedido: new Date(), situacao: "em aberto", cliente: "Kenedy Triton", codigoEntregador: 10 },
    { codigoPedido: 4, dataPedido: new Date(), situacao: "em aberto", cliente: "Leandro Donato", codigoEntregador: 9 },
    { codigoPedido: 5, dataPedido: new Date(), situacao: "em aberto", cliente: "Merida Spoletto", codigoEntregador: 8 },
    { codigoPedido: 6, dataPedido: new Date(), situacao: "em aberto", cliente: "Nina Albuquerque", codigoEntregador: 7 },
    { codigoPedido: 7, dataPedido: new Date(), situacao: "finalizado", cliente: "Pietro Ferguncio", codigoEntregador: 6 },
    { codigoPedido: 8, dataPedido: new Date(), situacao: "finalizado", cliente: "Cora Coralina", codigoEntregador: 5 },
    { codigoPedido: 9, dataPedido: new Date(), situacao: "em aberto", cliente: "Fernando Pessoa", codigoEntregador: 4 },
    { codigoPedido: 10, dataPedido: new Date(), situacao: "finalizado", cliente: "Rubem Alves", codigoEntregador: 11 },
    { codigoPedido: 11, dataPedido: new Date(), situacao: "finalizado", cliente: "Jose Saraiva", codigoEntregador: 2 },
    { codigoPedido: 12, dataPedido: new Date(), situacao: "em aberto", cliente: "Dado Diamantrio", codigoEntregador: 1 }
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
