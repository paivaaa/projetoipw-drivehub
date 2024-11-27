document.addEventListener("DOMContentLoaded", () => {
  contarCarrosUsados();
});

document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita o envio do formulário padrão
  procurarCarros();
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
          const numCarrosUsados = data.filter(carro => carro.condicao.toLowerCase() === "usado").length;
          document.querySelector(".numAnuncio").textContent = `${numCarrosUsados} Anúncios encontrados`;
      })
      .catch((error) => {
          console.error("Ocorreu um erro:", error);
      });
}

function procurarCarros() {
  fetch("/data/dados_carros.json")
      .then((response) => {
          if (!response.ok) {
              throw new Error("Não foi possível carregar o arquivo JSON");
          }
          return response.json();
      })
      .then((data) => {
          let carrosFiltrados = filtrarCarros(data);
          mostrarResultados(carrosFiltrados);
      })
      .catch((error) => {
          console.error("Ocorreu um erro:", error);
      });
}

function filtrarCarros(data) {
  // Obter valores do formulário
  let marca = document.getElementById("marca").value;
  let modelo = document.getElementById("modelo").value.toLowerCase();
  let precoMaximo = document.getElementById("preco").value;
  let ano = document.getElementById("ano").value;
  let combustivel = document.getElementById("combustivel").value.toLowerCase();
  let segmento = document.getElementById("segmento").value;

  // Filtrar os carros com base nos critérios
  return data.filter(carro => {
      let Carrousado = carro.condicao.toLowerCase() === "usado";
      if (Carrousado) {
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

// Função para redirecionar para anuncio.html com os detalhes do carro
function carregarAnuncio(carro) {
    var url = new URL("anuncio.html", window.location.origin);
    Object.keys(carro).forEach((key) => url.searchParams.append(key, carro[key]));
    window.location.href = url;
}

function mostrarResultados(carrosFiltrados) {
  // Armazena os resultados da pesquisa na sessionStorage para acessar na próxima página
  sessionStorage.setItem("searchResults", JSON.stringify(carrosFiltrados));

  // Redireciona o usuário para a nova página HTML
  window.location.href = "pesquisa-carros.html";
}

