// Função para carregar os dados do arquivo JSON usando AJAX
function loadJSON(callback) {   
    fetch("data/dados_carros.json")
    .then(response => response.json())
    .then(data => callback(data));
}

// Função para redirecionar para anuncio.html com os detalhes do carro
function abrirAnuncio(carro) {
    // Cria um novo objeto URL para a página 'anuncio.html', usando a origem do site atual
    let url = new URL('anuncio.html', window.location.origin);
    // Itera sobre cada chave no objeto 'carro'
    Object.keys(carro).forEach(key => 
        // Adiciona cada par chave-valor do objeto 'carro' como parâmetros de consulta (query parameters) na URL
        url.searchParams.append(key, carro[key])
    );
    // Redireciona o navegador para a URL criada, com os parâmetros de consulta adicionados
    window.location.href = url;
}


// Função para exibir os anúncios na seção de anúncios
function mostrarAnuncios() {
    loadJSON(function(data) {
        // Filtrar apenas os carros com condição "Usado"
        let carrosUsados = data.filter(function(carro) {
            return carro.condicao === "Usado";
        });

        // Random e limitar a exibição a 5 carros
        let numItem = window.innerWidth<1400?4:5;
        let carrosAleatorios = carrosUsados.sort(function() { return 0.5 - Math.random() }).slice(0, numItem);

        // Exibir os carros aleatórios na seção de anúncios
        let anuncioBox = document.getElementById('anuncio-box');
        if (anuncioBox) { // Verifica se o elemento existe
            carrosAleatorios.forEach(function(carro) {
                var carroDiv = document.createElement('div');
                carroDiv.classList.add('carro');
                carroDiv.innerHTML = '<div class="carro-img">' +
                                        '<img src="' + carro.imgs[0] + '" alt="' + carro.marca + ' ' + carro.modelo + '">' +
                                    '</div>' +
                                    '<div class="carro-txt">' +
                                        '<h2>' + carro.marca + ' ' + carro.modelo + ' ' + carro.submodelo +'</h2>' +
                                        '<p>' + carro.ano + ' · ' + carro.km + ' km ·</p>' +
                                        '<p>' + carro.combustivel + ' · ' + carro.potencia + ' cv </p>' +
                                    '<div class="preco">' + 
                                        '<p>' + carro.preco + ' <span>EUR</span></p>' +
                                    '</div>' + '</div>';
                
                carroDiv.addEventListener('click', function() {
                    abrirAnuncio(carro);
                });
                
                anuncioBox.appendChild(carroDiv);
            });
        } else {
            console.error("Elemento '#anuncio-box' não encontrado.");
        }
    });
}

// Chamar a função para exibir os carros aleatórios quando a página carregar
window.onload = function() {
    mostrarAnuncios();
};
