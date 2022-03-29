export function alerta(tipoAlerta, mensagem, redirecionamento, fechar) {
    const alerta = document.querySelector(tipoAlerta);

    alerta.classList.remove('hidden');

    alerta.textContent = mensagem;

    alerta.addEventListener('click', () => {
        alerta.classList.add('hidden');

        if(redirecionamento) {
            window.location.href = "../Entrar/index.html";
        }
    });

    if(fechar) {
        setTimeout(() => {
            alerta.classList.add('hidden');
        }, 5000);
    }
}
