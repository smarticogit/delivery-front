const body = document.querySelector('body');
const token = localStorage.getItem('token');
const btnSair = document.querySelector('.sair');
const cadastrar = document.querySelector(".cadastrar");

listarPedidos();
let lista;
async function listarPedidos() {
    const promise = await fetch('http://localhost:8080/pedidos/status/aguardando_entregador')
    lista = await promise.json();

    lista.forEach(pedido => {
        const div = document.createElement('div');
        div.classList.add('center');
        const nome = document.createElement('button');
        nome.classList.add('btnpedido');
        const icone = document.createElement('img');
        icone.classList.add('icone');

        nome.setAttribute("id", pedido.id);
        nome.textContent = pedido.nomeRestaurante;
        icone.src = '../src/restaurante.png';

        nome.append(icone);
        div.append(nome);
        body.append(div);

        pedido = document.querySelector('button');

        nome.addEventListener('click', event => {
            localStorage.setItem('pedido', nome.id);
            const entregadorId = localStorage.getItem('entregador');
            proximaPagina();
        })
    })
};

btnSair.addEventListener('click', event => {
    localStorage.clear();
    window.location.href = "http://127.0.0.1:5500/index.html";
});

function proximaPagina() {
    setTimeout(() => {
        window.location.href = "http://127.0.0.1:5500/iniciar/iniciar.html";
    }, 1500);
};

cadastrar.addEventListener('click', () => {
    window.location.href = "http://127.0.0.1:5500/pedidos/cadastrar.html";
})







