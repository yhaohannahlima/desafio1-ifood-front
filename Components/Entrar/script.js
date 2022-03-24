let login = document.getElementById('login');

export function logar() {
    const senha = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    switch (senha || email) {
        case "":
            return window.alert("Preencha todos os campos por gentieza.");
        case " ":
            return window.alert("Preencha todos os campos por gentieza.");
        case null:
            return window.alert("Preencha todos os campos por gentieza.");
        default:
            try {
                if (email === "entregador@entrega.com" && senha === "1234") {
                    window.alert("Login realizado com sucesso");
                    window.location.href = "../ListaPedidos/index.html";
                    // const corpo = {
                    //     email: email,
                    //     senha: senha
                    // }

                    // const cabecalho = {
                    //     // method: "POST",
                    //     body: JSON.stringify(corpo),
                    //     headers: {
                    //         "content-type": "application/json"
                    //     }
                    // }

                    // fetch("http://localhost:8080/login")
                    //     .then(res => res.json())
                    //     .then(token => {
                    //             window.alert("Login realizado com sucesso");
                    // localStorage.setItem("login", token.token)
                    //     window.location = "../ListaPedidos/index.html";
                    // })
                    // .catch(err => alert("Impossivel autenticar!"));
                } else {
                    return window.alert("Dados incorretos.")
                }
            } catch (error) {
                return window.alert("Verifique as informações e tente novamente.")
            }
    }
}