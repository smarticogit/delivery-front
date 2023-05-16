const btnCadastrar = document.querySelector('button');
const endereco = document.querySelector('.endereco');
const textArea = document.querySelector('textarea');
const divConfirm = document.querySelector('.confirm');
const btnSim = document.querySelector('.btnSim');
const cep = document.querySelector('.cep');
const logradouro = document.querySelector('.logradouro');
const bairro = document.querySelector('.bairro');
const cidade = document.querySelector('.cidade');
const numero = document.querySelector('.numero');
const nome = document.querySelector('.nome');


const geocoder = new google.maps.Geocoder();

cep.addEventListener('blur', async event => {
    event.preventDefault();

    if (cep.value !== "") {
        const response = await getAddressByCep(cep.value);

        if (response) {
            logradouro.value = response.logradouro;
            bairro.value = response.bairro;
            cidade.value = response.localidade;
        }
    }

    // divConfirm.removeAttribute('hidden')
    // coords.endereco = `${response.logradouro}, ${numero.value} - ${response.bairro} - ${response.cidade}`
    // textArea.textContent = coords.endereco
});

let coords = {
    nome: nome.value,
    endereco: "",
    latitude: "",
    longitude: ""
};

btnCadastrar.addEventListener('click', async (event) => {
    event.preventDefault();

    if (numero.value === "") {
        alert('O campo número é obrigatório')
    }

    const response = await getAddressByCep(cep.value);

    if (response) {
        divConfirm.removeAttribute('hidden')
        coords.endereco = `${response.logradouro}, ${numero.value} - ${response.bairro} - ${response.cidade}`
        textArea.textContent = coords.endereco
    } else {
        console.log("erro ao obter endereço por cep");
    }
});

async function registrar() {
    coords.nome = nome.value;
    console.log(coords);
    const response = await fetch("http://localhost:8080/clientes", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(coords)
    })
}

async function obterCoords() {

    geocoder.geocode({ address: coords.endereco }, function (results, status) {
        if (status === "OK") {
            coords.latitude = results[0].geometry.location.lat()
            coords.longitude = results[0].geometry.location.lng()
        } else {
            console.error("Erro ao geocodificar o endereço: " + status);
        }
    });
}

async function getAddressByCep(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
        throw new Error('CEP não encontrado');
    }
    return data;
}


btnSim.addEventListener('click', async (e) => {
    e.preventDefault()

    await obterCoords();

    setTimeout(() => {
        registrar();
    }, 1000);
})
