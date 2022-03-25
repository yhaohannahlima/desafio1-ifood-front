const pedido = document.querySelector('div .card');

//popular
const pedidos = [
    { id: 1, situacao: true }
];

const hidden = () => {
    alerta = document.querySelector('.alert');
    alerta.classList.remove('hidden');

    alerta.textContent = "Dados incorretos";

    alerta.addEventListener('click', () => {
        alerta.classList.add('hidden');
    });
}