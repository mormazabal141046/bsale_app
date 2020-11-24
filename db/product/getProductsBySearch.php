<?php
include("../db_conection.php");
header("Content-Type: text/html;charset=UTF-8");
$data = json_decode(file_get_contents('php://input'), true);

// Se obtiene el valor del input de busqueda para aplicar el criterio a la query en bdd..
$add_query = "";
if($data['search'] != ""){
    $add_query=  "WHERE c.name LIKE '%".$data['search']."%' OR p.name LIKE '%".$data['search']."%'";
}
$query = "SELECT p.*, c.id AS id_category, c.name AS category FROM category c INNER JOIN product p ON (c.id = p.category)".$add_query;
$mysql = mysqli_query($conection,$query)  or die (mysqli_error());

$json = array();
 while($row = mysqli_fetch_object($mysql)){
     $json[] = $row;
}
// var_dump($json);
echo json_encode($json);

$mysql->close();

?>