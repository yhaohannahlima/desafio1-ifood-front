function logar() {
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    switch (password || email) {
        case "":
            return window.alert("Preencha todos os campos por gentieza.");
        case " ":
            return window.alert("Preencha todos os campos por gentieza.");
        case null:
            return window.alert("Preencha todos os campos por gentieza.");
        default:
            try {
                window.alert("Login realizado com sucesso");
                window.location = "/teste_acesso.html";
            } catch (error) {
                error.message;
            }
    }
}