export function alerta(tipoAlerta, mensagem, redirecionamento, fechar, parametroTela) {
    const alerta = document.querySelector(tipoAlerta);

    alerta.classList.remove('hidden');

    alerta.textContent = mensagem;

    alerta.addEventListener('click', () => {
        alerta.classList.add('hidden');

        if (redirecionamento) {
            window.location.href = "../Entrar/index.html";

            if (parametroTela) {
                localStorage.setItem('token-invalido', 'true');
            }
        }
    });

    if (fechar) {
        setTimeout(() => {
            alerta.classList.add('hidden');
        }, 5000);
    }
}

export function defineUrlBase() {
    return 'http://localhost:8080';
}

export function carregandoVisivel(carregando) {
    carregando.classList.remove('hidden');
}

export function carregandoEscondido(carregando) {
    carregando.classList.add('hidden');
}

// fonte : https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
export function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

export function sairAplicacao() {
    window.location.href = `/Componentes/Entrar/index.html`
}