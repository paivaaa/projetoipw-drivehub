<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "carros";

try {
    $conn = new mysqli($servername, $username, $password, $database);
    // Verificar conexão
    if ($conn->connect_error) {
        throw new Exception("Falha na conexão: " . $conn->connect_error);
    }

    // Executar consulta SQL para selecionar todos os dados da tabela "carros" usando instrução preparada
    $sql = "SELECT * FROM carros";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    // Verificar se a consulta retornou resultados
    if ($result->num_rows > 0) {
        // Array para armazenar os resultados
        $data = array();

        // Converter resultados em formato JSON
        while($row = $result->fetch_assoc()) {
            $row["imgs"]=explode(";", $row["img"]);
            unset($row["img"]);
            $data[] = $row;
        }

        
        // Imprimir os dados antes de converter para JSON 
        echo "Dados recuperados da consulta SQL:";
        echo "<pre>";
        print_r($data);
        echo "</pre>";

        // Converter array em JSON
        $json_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);


        // Escrever JSON para um arquivo
        if (file_put_contents('dados_carros.json', $json_data) === false) {
            throw new Exception("Erro ao escrever arquivo JSON");
        }

        echo "Dados exportados para o arquivo dados_carros.json com sucesso!";
    } else {
        echo "0 resultados encontrados";
    }
} catch (Exception $e) {
    echo "Erro: " . $e->getMessage();
} finally {
    // Fechar conexão com o banco de dados
    if (isset($conn)) {
        $conn->close();
    }
}
?>
