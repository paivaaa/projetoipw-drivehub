document.addEventListener("DOMContentLoaded", () => {
  // Função para obter os detalhes do carro a partir da URL
  function getDetalhesCarro() {
    let params = new URLSearchParams(window.location.search);
    let carro = {};
    for (const [key, value] of params.entries()) {
      // Se a chave for 'imgs', converte a string numa array
      if (key === 'imgs') {
        carro[key] = value.split(',');  
      } else {
        carro[key] = value;
      }
    }
    return carro;
  }



// Função para exibir os detalhes do carro
  function anuncioCarro() {
    let carro = getDetalhesCarro();
    let detalhesCarro = document.getElementById("main-carro");
    if (detalhesCarro) {
      detalhesCarro.innerHTML = `
        <div class="carro-detalhes">
          <div class="carro-imagem">
            <button id="btn-arrow" onclick="anterior()"><img src="/assets/leftarrow.svg" alt=""></button> 
            <img id="foto" src="${carro.imgs ? carro.imgs[0] : ''}" alt="${carro.marca} ${carro.modelo}">
            <button id="btn-arrow" onclick="seguinte()"><img src="/assets/rightarrow.svg" alt=""></button>
          </div>
          <div class="carro-texto">
            <h3>${carro.marca} ${carro.modelo} ${carro.submodelo}</h3>
            <div class="detalhes-texto">
              <p>${carro.combustivel} · </p>
              <p>${carro.ano} · </p>
              <p>${carro.km} km · </p>
              <p>${carro.potencia} cv</p>
            </div>
            <div class="preco">
              <h4>${carro.preco}</h4>
              <p>EUR</p>
            </div>
            <div class="contactos">
              <div class="vendedor">
                <div class="vendedor-detalhe">
                  <img src="/assets/check-shield.svg" alt="icon">
                  <p>Profissional</p>
                </div>
                <div class="vendedor-detalhe">
                  <img src="/assets/user.svg" alt="icon">
                  <p>${carro.vendedor}</p>
                </div>
              </div>
              <button class="btn-contacto"><img src="/assets/envelope.svg" alt="">Contactar Vendedor</button>
              <button class="btn-telefone"><img src="/assets/phone.svg" alt="">Ver telefone</button>
            </div>
          </div>
        </div>`;

      // Código carrosel de imagens
      let indice = 0;
      let imgs = carro.imgs || [];

      function anterior() {
        indice--;
        if (indice < 0) {
          indice = imgs.length - 1;
        }
        mostrar();
      }

      function seguinte() {
        indice++;
        if (indice == imgs.length) {
          indice = 0;
        }
        mostrar();
      }

      function mostrar() {
        const fotoElement = document.getElementById("foto");
        if (fotoElement) {
          fotoElement.src = imgs[indice];
        }
      }

      window.anterior = anterior;
      window.seguinte = seguinte;
    }
}

// Função para exibir detalhes adicionais do carro
function carroDetalhes() {
  let carro = getDetalhesCarro();
  let detalhesCarro = document.getElementById("detalhes-carro");
  if (detalhesCarro) {
    detalhesCarro.innerHTML = ` <h2>Detalhes do Carro</h2>
                                  <div class="detalhes">
                                      <div class="coluna-detalhes">
                                          <p>Marca</p>
                                          <p>Modelo</p>
                                          <p>Versão</p>
                                          <p>Ano</p>
                                          <p>Quilómetros</p>
                                          <p>Potência</p>
                                      </div>
                                      <div class="coluna-detalhesCarro">
                                          <p>${carro.marca}</p>
                                          <p>${carro.modelo}</p>
                                          <p>${carro.submodelo}</p>
                                          <p>${carro.ano}</p>
                                          <p>${carro.km} km</p>
                                          <p>${carro.potencia} cv</p>
                                      </div> 
                                      <div class="coluna-detalhes">
                                          <p>Segmento</p>
                                          <p>Caixa</p>
                                          <p>Combustível</p>
                                          <p>Nº de Portas</p>
                                          <p>Cor</p>
                                          <p>Condição</p>
                                      </div>
                                      <div class="coluna-detalhesCarro">
                                          <p>${carro.segmento}</p>
                                          <p>${carro.caixa}</p>
                                          <p>${carro.combustivel}</p>
                                          <p>${carro.portas}</p>
                                          <p>${carro.cor}</p>
                                          <p>${carro.condicao}</p>
                                      </div>
                                  </div>`;
  }
}
  
  // Exibir os detalhes do carro e anúncios após a página carregar
  anuncioCarro();
  carroDetalhes();
  anunciosDestaque();
});
