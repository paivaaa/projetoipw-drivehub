document.addEventListener("DOMContentLoaded", () => {
    let searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio do formulário padrão

        let formData = new FormData(searchForm);
        let searchParams = new URLSearchParams(formData);

        procurarCarros(searchParams);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    contarCarrosUsados();
});

function contarCarrosUsados() {
    fetch("/data/dados_carros.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Não foi possível carregar o arquivo JSON");
            }
            return response.json();
        })
        .then((data) => {
            let numCarrosUsados = data.filter(carro => carro.condicao.toLowerCase() === "usado").length;
            document.querySelector(".numAnuncio").textContent = `${numCarrosUsados} Anúncios encontrados`;
        })
        .catch((error) => {
            console.error("Ocorreu um erro:", error);
        });
}

function procurarCarros(searchParams) {
    fetch("/data/dados_carros.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Não foi possível carregar o arquivo JSON");
            }
            return response.json();
        })
        .then((data) => {
            let carrosFiltrados = filtrarCarros(data, searchParams);
            mostrarResultados(carrosFiltrados);
        })
        .catch((error) => {
            console.error("Ocorreu um erro:", error);
        });
}

function filtrarCarros(data, searchParams) {
    // Obter valores do formulário
    let marca = searchParams.get("marca");
    let modelo = searchParams.get("modelo").toLowerCase();
    let precoMaximo = searchParams.get("preco");
    let ano = searchParams.get("ano");
    let combustivel = searchParams.get("combustivel").toLowerCase();
    let segmento = searchParams.get("segmento");

    // Filtrar os carros com base nos critérios
    return data.filter(carro => {
        let carroUsado = carro.condicao.toLowerCase() === "usado";
        if (carroUsado) {
            let marcaMatch = !marca || carro.marca === marca;
            let modeloMatch = !modelo || carro.modelo.toLowerCase().includes(modelo);
            let precoMatch = !precoMaximo || carro.preco <= parseFloat(precoMaximo);
            let anoMatch = !ano || carro.ano === parseInt(ano);
            let combustivelMatch = !combustivel || carro.combustivel.toLowerCase().includes(combustivel);
            let segmentoMatch = !segmento || carro.segmento === segmento;

            return marcaMatch && modeloMatch && precoMatch && anoMatch && combustivelMatch && segmentoMatch;
        }
        return false;
    });
}

function mostrarResultados(carrosFiltrados) {
    // Armazena os resultados da pesquisa na sessionStorage para acessar na próxima página
    sessionStorage.setItem("searchResults", JSON.stringify(carrosFiltrados));

    // Redireciona o usuário para a nova página HTML
    window.location.href = "pesquisa-carros.html";
}

document.addEventListener('DOMContentLoaded', function () {
    // Recupera os resultados da pesquisa da sessionStorage
    const procurarResultados = JSON.parse(sessionStorage.getItem('searchResults'));

    // Verifica se existem resultados da pesquisa
    if (procurarResultados && procurarResultados.length > 0) {
        // Exibe os resultados da pesquisa na página
        mostrarResultados(procurarResultados);
    } else {
        // Exibe uma mensagem indicando que não há resultados da pesquisa
        let semResultados = document.createElement('p');
        semResultados.textContent = 'Não foram encontrados resultados para a pesquisa.';
        document.getElementById('carros-container').appendChild(semResultados);
    }
});

function mostrarResultados(carrosFiltrados) {
    let carrosEletricos = document.getElementById('carros-container');
    carrosEletricos.innerHTML = ''; 

    carrosFiltrados.forEach(carro => {
        let carroElement = document.createElement('div');
        carroElement.classList.add('carro');
        carroElement.innerHTML = `
            <div class="carro-img">
                <img src="../${carro.imgs[0]}" alt="${carro.marca} ${carro.modelo}">
            </div>
            <div class="carro-txt">
                <h2>${carro.marca} ${carro.modelo} ${carro.submodelo}</h2>
                    <p>Combustível: ${carro.combustivel}</p>
                    <p>${carro.ano}</p>
                    <div class="preco"> 
                        <p>${carro.preco} <span>EUR</span></p>
                    </div>
            </div>`;

    carroElement.addEventListener('click', function() {
        carregarAnuncio(carro);
    });

carrosEletricos.appendChild(carroElement);
    });
}

// Função para redirecionar para anuncio.html com os detalhes do carro
function carregarAnuncio(carro) {
    let url = new URL('anuncio.html', window.location.origin);
    Object.keys(carro).forEach(key => url.searchParams.append(key, carro[key]));
    window.location.href = url;
}