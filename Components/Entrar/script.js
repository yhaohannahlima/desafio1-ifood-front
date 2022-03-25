const login = document.getElementById('login');
const urlLogin = "http://localhost:8080/login";


async function logar() {
    const senha = document.getElementById("senha");
    const email = document.getElementById("email");

    console.log(senha.value + "\n " + email.value);
    switch (senha || email) {
        case "":
            hidden("Dados incompletos");
            break;
        case " ":
            hidden("Usuario e/ou senha incorretos.");
            break;
        case null:
            hidden("Usuario e/ou senha incorretos.");
            break;
        case undefined:
            hidden("Usuario e/ou senha incorretos.");
        case !senha || !email:
            hidden("Usuario e/ou senha incorretos.");
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
                    console.log(response);

                    if (response.status === 200) {
                        window.location.href = "../ListaPedidos/index.html"
                    } else {
                        hidden("Usuario e/ou senha incorretos!");
                    }
                })
            } catch (error) {
                hidden("Erro ao conectar");
            }
    }
}

// function eventoDeClick() {
//     login.addEventListener(('click'), () => {})
// }
const hidden = (messangem) => {
        const alerta = document.querySelector('.alert');
        alerta.classList.remove('hidden');

        alerta.textContent = messangem;

        alerta.addEventListener('click', () => {
            alerta.classList.add('hidden');
        });
    }
    // fetch(urlLogin, {
    //         method: "POST",
    //         body: JSON.stringify({
    //             email: email,
    //             senha: senha
    //         }),
    //         headers: {
    //             "Accept": "200 OK",
    //             "Accept": "application/json",
    //             "content-type": "application/json"
    //         }
    //     })
    //     .then((response) => { response.json() })
    //     .then(response => {
    //         window.alert("Login realizado com sucesso");
    //         window.location = "../../Components/ListaPedidos/index.html";
    //     })
    // .then(res => res.json()) 
    // .then(token => {
    // localStorage.setItem("login")
    // window.alert("Login realizado com sucesso");
    // window.location = "../../Components/ListaPedidos/index.html";
    // })