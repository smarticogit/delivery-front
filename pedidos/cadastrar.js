const produto = document.querySelector('.produto');
import showToast from '../toast/toast.js';
const btn = document.querySelector('button');
const token = localStorage.getItem('token');
let empresaSelecionada;
let empresasCadastradas;

let dados = {
    nomeRestaurante: "",
    produto: '',
    status: "aguardando_entregador",
    idEntregador: localStorage.getItem('entregador'),
    idCliente: ''
}


async function getClientes() {
    try {
        const response = await fetch('http://localhost:8080/clientes');
        empresasCadastradas = await response.json();

        preencherEmpresas();
    } catch (error) {
        console.error('Erro:', error);
    }
}

function preencherEmpresas() {
    const container = document.querySelector(".empresas");

    empresasCadastradas.forEach(empresa => {
        const radio = document.createElement("input");

        radio.type = "radio";
        radio.name = "empresa";
        radio.value = empresa.id;

        const label = document.createElement("label");
        label.textContent = empresa.nome;

        const br = document.createElement("br");

        container.appendChild(radio);
        container.appendChild(label);
        container.appendChild(br);
    });

    const radios = document.querySelectorAll(".empresas input[type='radio']");

    radios.forEach(radio => {
        radio.addEventListener("change", function () {
            if (radio.checked) {
                empresaSelecionada = {
                    nome: radio.nextSibling.textContent,
                    id: radio.value
                };
            } else {
                console.log('Deu ruim');
            }
        });
    });
}

btn.addEventListener('click', async event => {
    event.preventDefault();

    dados = {
        nomeRestaurante: empresaSelecionada.nome,
        produto: produto.value,
        status: "aguardando_entregador",
        idEntregador: localStorage.getItem('entregador'),
        idCliente: empresaSelecionada.id
    }

    console.log(dados);

    const response = await fetch("http://localhost:8080/pedidos", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(dados)
    })

    // if (!empresaSelecionada || empresaSelecionada.nome === undefined) {
    //     showToast("Selecione um restaurante", "error");
    // } else {
    //     cadastrarPedido();
    // }
});


window.onload = getClientes();

