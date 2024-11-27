document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio do formulário padrão
    procurarCarros();
  });

function procurarCarros() {
  fetch("/data/dados_carros.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Não foi possível carregar o arquivo JSON");
      }
      return response.json();
    })
    .then((data) => {
      const carrosFiltrados = filtrarCarros(data);
      mostrarResultados(carrosFiltrados);
    })
    .catch((error) => {
      console.error("Ocorreu um erro:", error);
    });
}

function filtrarCarros(data) {
  let carrosNovos = document.getElementById("carros_novos").checked;
  let carrosUsados = document.getElementById("carros_usados").checked;
  let marca = document.getElementById("marca").value.trim().toLowerCase();
  let modelo = document.getElementById("modelo").value.trim().toLowerCase();

  return data.filter((carro) => {
    // Verifica se o carro é novo ou usado de acordo com os checkboxes
    let novo = carro.condicao.toLowerCase() === "novo";
    let usado = carro.condicao.toLowerCase() === "usado";

    // Verifica se o combustível é elétrico ou híbrido
    let eletricoHibirdo =
    carro.combustivel.toLowerCase().includes("elétrico") ||
    carro.combustivel.toLowerCase().includes("híbrido");

    if ((carrosNovos && novo) || (carrosUsados && usado)) {
      // Verifica se a marca e o modelo correspondem aos critérios de pesquisa
      return (
        eletricoHibirdo &&
        carro.marca.toLowerCase().includes(marca) &&
        carro.modelo.toLowerCase().includes(modelo)
      );
    }
    return false;
  });
}

function mostrarResultados(carrosFiltrados) {
  // Armazena os resultados da pesquisa na sessionStorage para acessar na próxima página
  sessionStorage.setItem("searchResults", JSON.stringify(carrosFiltrados));

  // Redireciona o usuário para a nova página HTML
  window.location.href = "pesquisa-eletricos.html";
}
