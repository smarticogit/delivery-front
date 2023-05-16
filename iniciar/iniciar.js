async function detalharPedido() {
    const response = await fetch(`http://localhost:8080/pedidos/${pedidoId}`, {
        method: "GET",
        headers: {
            "Authorization": token
        }
    })
    if (response.status !== 200) {
        console.log('Erro ao buscar pedido');
    }
    if (response.ok) {
        let pedido = await response.json();

        const divDados = document.createElement('div');
        divDados.classList.add('dados');

        const pRes = document.createElement('p');
        const pCliente = document.createElement('p');
        const pEnd = document.createElement('p');
        const pStatus = document.createElement('p');
        const divPedidos = document.querySelector('.pedidos');

        clienteLat = parseFloat(pedido.cliente.latitude);
        clienteLong = parseFloat(pedido.cliente.longitude);

        pRes.textContent = 'Restaurante: ' + pedido.nomeRestaurante;
        pCliente.textContent = 'Cliente: ' + pedido.cliente.nome;
        pEnd.textContent = 'Endereço: ' + pedido.cliente.endereco;
        const status = pedido.status === 'aguardando_entregador' ? 'Aguardando Entregador' : pedido.status;
        pStatus.textContent = 'Status: ' + status;
        divDados.append(pRes, pCliente, pEnd, pStatus);
        divPedidos.append(divDados);
    }
};

function obterLocalizacao() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function (posicao) {
            lat = posicao.coords.latitude;
            long = posicao.coords.longitude;
            lat1 = posicao.coords.latitude;
            long1 = posicao.coords.longitude;
            initMap(lat, long);
            carregarDistancia(lat, long);
        }, function (error) {
            console.log(error.message);
        })
    }
};

async function initMap(a, b) {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "poi",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "transit",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [{ "color": "#f20707" }]
            }
        ],
        disableDefaultUI: true
    });
    directionsRenderer.setMap(map);
    directionsService.route({
        origin: { lat: a, lng: b },
        destination: { lat: clienteLat, lng: clienteLong },
        travelMode: google.maps.TravelMode.DRIVING
    }).then(response => {
        directionsRenderer.setDirections(response);
    }).catch(erro => {
        console.log(erro.message);
    });
};

function carregarDistancia(lat, long) {

    origin1 = new google.maps.LatLng(lat, long);
    origin2 = new google.maps.LatLng(clienteLat, clienteLong);
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [origin1],
            destinations: [origin2],
            travelMode: 'DRIVING',
        }, callback);

    async function callback(response) {
        document.querySelector('.distancia').textContent = await response.rows[0].elements[0].distance.text;
        document.querySelector('.tempo').textContent = await response.rows[0].elements[0].duration.text;
    }
};

async function init() {
    await detalharPedido();
    obterLocalizacao();
};

function pageLoad() {
    const btnIniciar = document.querySelector('.iniciar');
    const btnVoltar = document.querySelector('.voltar');

    btnVoltar.addEventListener('click', event => {
        localStorage.removeItem('pedido');
        window.location.href = "http://127.0.0.1:5500/pedidos/pedidos.html";
    });

    btnIniciar.addEventListener('click', async event => {
        const response = await fetch(`http://localhost:8080/pedidos/${pedidoId}/entregador/${entregadorId}`, {
            method: "PUT",
            headers: {
                "Authorization": token,
            }
        })
        if (response.status !== 201) {
            console.log("Erro ao atribuir entregador");
        }
        setTimeout(() => {
            window.location.href = "http://127.0.0.1:5500/detalhes/detalhes.html";
        }, 1000);
    });
    init();
};

const pedidoId = localStorage.getItem('pedido');
const entregadorId = localStorage.getItem('entregador');
const token = localStorage.getItem('token');

let lat = 0;
let long = 0;
let lat1 = 0;
let long1 = 0;
let clienteLat;
let clienteLong;
let pedido;

window.onload = pageLoad;