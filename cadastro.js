const btn = document.querySelector(".btnEntrar");
const form = document.querySelector(".formLogin");
const email = document.querySelector(".email");
const senha = document.querySelector(".senha");
const nome = document.querySelector(".nome");
const msglogin = document.querySelector(".msglogin");

form.addEventListener('submit', function (event) {
    event.preventDefault();
    logar();
    limpar();
});


async function logar() {

    const dados = {
        nome: nome.value,
        email: email.value,
        senha: senha.value
    }

    const response = await fetch("http://localhost:8080/entregadores", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })

    if (response.status !== 201) {
        msglogin.textContent = "Dados inválidos";
    } else if (response.status === 201){
        msglogin.textContent = "Sucesso!";

        setTimeout(() => {
            window.location.href = "http://localhost:5500/index.html";
        }, 2000);
    } else {
        msglogin.textContent = "Erro do Servidor!";

    }
};

function limpar() {
    email.value = "",
        senha.value = "",
        nome.value = ""
};

