export function alerta(tipoAlerta, mensagem, redirecionamento, fechar, parametroTela) {
    const alerta = document.querySelector(tipoAlerta);

    alerta.classList.remove('hidden');

    alerta.textContent = mensagem;

    alerta.addEventListener('click', () => {
        alerta.classList.add('hidden');

        if(redirecionamento) {
            window.location.href = "../Entrar/index.html";

            if (parametroTela) {
                localStorage.setItem('token expirado','true');
            }

        }
    });

    if(fechar) {
        setTimeout(() => {
            alerta.classList.add('hidden');
        }, 5000);
    }
}

export function defineUrlBase() {
    return 'http://localhost:8080';
}