const login = document.getElementById('login');
const urlLogin = "http://localhost:8080/login";
console.log("Entrou " + login, urlLogin);
async function logar() {
    const senha = document.getElementById("senha").value;
    const email = document.getElementById("email").value;
    console.log("antes do switch" + "\n" + senha + "\n" + email);
    switch (senha || email) {
        case "":
            hidden("Usuário e/ou senha incorretos!");
            break;
        case " ":
            hidden("Usuário e/ou senha incorretos!");
            break;
        case null:
            hidden("Usuário e/ou senha incorretos!");
            break;
        case undefined:
            hidden("Usuário e/ou senha incorretos!");
            break;
        default:
            try {
                await fetch(urlLogin, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        senha: senha
                    })
                }).then((response) => {
                    if (response.status === 200) {
                        window.location.href = '../ListaPedidos/index.html';
                    } else {
                        hidden("Usuário e/ou senha incorretos!");
                    }
                })
            } catch (error) {
                hidden("Erro ao conectar!");
            }
    }
};
const hidden = (mensagem) => {
    const alerta = document.querySelector('.alert');
    alerta.classList.remove('hidden');
    alerta.textContent = mensagem;
    alerta.addEventListener('click', () => {
        alerta.classList.add('hidden');
    });
}

// fetch("http://localhost:8080/login")
//     .then(res => res.json())
//     .then(token => {
//             window.alert("Login realizado com sucesso");
// localStorage.setItem("login", token.token)
//     window.location = "../ListaPedidos/index.html";
// })
// .catch(err => alert("Impossivel autenticar!"));
// } else {
//     return window.alert("Dados incorretos.")
// }