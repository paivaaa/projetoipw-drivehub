<?php
// Verifica se o método de requisição é POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtém os dados enviados pelo formulário
    $marca = $_POST['marca'];
    $modelo = $_POST['modelo'];
    $submodelo = $_POST['submodelo'];
    $preco = $_POST['preco'];
    $km = $_POST['km'];
    $segmento = $_POST['segmento'];
    $combustivel = $_POST['combustivel'];
    $portas = $_POST['portas'];
    $cor = $_POST['cor'];
    $ano = $_POST['ano'];
    $potencia = $_POST['potencia'];
    $caixa = $_POST['caixa'];
    $vendedor = $_POST['vendedor'];
    $telefone = $_POST['telefone'];
    $condicao = "Usado"; // Define a condição do carro como "Usado"

    // Define o diretório de destino para salvar as imagens
    $targetDir = "img/$marca/$modelo";
    $images = $_FILES['imagens']; // Obtém as imagens enviadas pelo formulário
    $imagePaths = []; // Inicializa um array para armazenar os caminhos das imagens

    // Verifica se o diretório de destino existe, se não, cria-o
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    // Itera sobre cada imagem enviada
    foreach ($images['name'] as $key => $imageName) {
        // Obtém a extensão do ficheiro
        $fileExtension = pathinfo($imageName, PATHINFO_EXTENSION);
        // Cria um novo nome de ficheiro baseado na marca, modelo e número da imagem
        $newFileName = $marca . $modelo  . ($key + 1) . '.' . $fileExtension;
        // Define o caminho completo do ficheiro de destino
        $targetFilePath = $targetDir . '/' . $newFileName;
        // Move o ficheiro para o diretório de destino
        if (move_uploaded_file($images['tmp_name'][$key], $targetFilePath)) {
            // Adiciona o caminho da imagem ao array de caminhos
            $imagePaths[] = $targetFilePath;
        }
    }

    // Concatena os caminhos das imagens em uma única string, separada por ponto e vírgula
    $imagePathsString = implode(";", $imagePaths);

    // Configurações da conexão com o banco de dados
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "carros";

    // Cria a conexão com o banco de dados
    $conn = new mysqli($servername, $username, $password, $database);

    // Verifica a conexão
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Monta a query SQL para inserir os dados no banco de dados
    $sql = "INSERT INTO carros (marca, modelo, submodelo, preco, km, segmento, combustivel, portas, cor, ano, potencia, condicao, caixa, vendedor, telefone, img)
    VALUES ('$marca', '$modelo', '$submodelo', '$preco', '$km', '$segmento', '$combustivel', '$portas', '$cor', '$ano', '$potencia', '$condicao', '$caixa', '$vendedor', '$telefone', '$imagePathsString')";

    // Executa a query e verifica se foi bem-sucedida
    if ($conn->query($sql) === TRUE) {
        echo "Novo registo criado com sucesso";
    } else {
        // Exibe um erro caso a query falhe
        echo "Erro: " . $sql . "<br>" . $conn->error;
    }

    // Fecha a conexão com o banco de dados
    $conn->close();
    // Exibe uma mensagem de sucesso
    echo "Carro adicionado com sucesso!";
}
?>
