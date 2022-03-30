export function alerta(tipoAlerta, mensagem) {
    const alerta = document.querySelector(tipoAlerta);

    alerta.classList.remove('hidden');

    alerta.textContent = mensagem;

    alerta.addEventListener('click', () => {
        alerta.classList.add('hidden');
    });

    setTimeout(() => {
        alerta.classList.add('hidden');
    }, 1000);
}

export function sairAplicacao() {
    window.location.href = `/Componentes/Entrar/index.html`
}