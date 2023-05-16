const form = document.querySelector(".formLogin");
const email = document.querySelector(".email");
const senha = document.querySelector(".senha");
import showToast from './toast/toast.js';

async function logar(dadosLogin) {
    const response = await fetch("http://localhost:8080/entregadores/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosLogin)
    });

    if (response.status !== 200) {
        showToast("Dados inválidos", 'error')
    }
    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("entregador", data.id);
        localStorage.setItem("urlEntregador", data.urlImage);
        localStorage.setItem("nomeEntregador", data.nome);
        rodar();
    }
};

function rodar() {
    showToast("Login efetuado com Sucesso!", 'ok');
    setTimeout(() => {
        window.location.href = "http://127.0.0.1:5500/pedidos/pedidos.html";
    }, 1000);
};

function limpar() {
    email.value = ""
    senha.value = ""
};

form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (email.value === '' || senha.value === '') {
        showToast("Dados inválidos", 'error')
    } else {
        const dados = {
            email: email.value,
            senha: senha.value
        }
        logar(dados);
        limpar();
    }
});
