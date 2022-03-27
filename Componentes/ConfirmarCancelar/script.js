const pedido = document.querySelector('div .pagina-pedidos');
const nomeCliente = document.querySelector('div .cliente');

const pedidoString = localStorage.getItem('Dados do pedido');
const pedidoObj = JSON.parse(pedidoString);


preencherInformacoesPedido();
concluirPedido();
cancelarPedido();

//---------- FUNÇÕES
function preencherInformacoesPedido() {
    pedido.textContent = `Pedido #${pedidoObj.id}`; //mudar apra codigoPedido
    nomeCliente.textContent = `Cliente: ${pedidoObj.cliente}`;

}

function concluirPedido() {
    const botaoConcluirPedido = document.querySelector('.btn-concluir');

    botaoConcluirPedido.addEventListener('click', () => {
        window.location.href = "../ListaPedidos/index.html";
        localStorage.clear();
    })
}

function cancelarPedido() {
    const botaoCancelarPedido = document.querySelector('.btn-cancelar');

    botaoCancelarPedido.addEventListener('click', () => {
        window.location.href = "../ListaPedidos/index.html";
        localStorage.clear();
    })
}