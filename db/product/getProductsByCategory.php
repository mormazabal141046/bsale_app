<?php
include("../db_conection.php");
header("Content-Type: text/html;charset=UTF-8");
$data = json_decode(file_get_contents('php://input'), true);
$add_query = "";

if($data['id_category'] != 0){
    $add_query=  "WHERE c.id = ".$data['id_category'];
}

$query = "SELECT p.*, c.id AS id_category, c.name AS category FROM category c INNER JOIN product p ON (c.id = p.category)".$add_query;
$mysql = mysqli_query($conection,$query)  or die (mysqli_error());

// $mysql->data_seek(0);
$json = array();
 while($row = mysqli_fetch_object($mysql)){
     $json[] = $row;
}
// var_dump($json);
echo json_encode($json);

$mysql->close();

?>