<?php
include("../db_conection.php");
header("Content-Type: text/html;charset=UTF-8");

$query = "SELECT * FROM category";
$mysql = mysqli_query($conection,$query)  or die (mysqli_error());

$json = array();
while($row = mysqli_fetch_assoc($mysql)){
    $json[] = $row;
}
echo json_encode($json);
$mysql->close();

?>