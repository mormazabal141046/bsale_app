<?php

//Conexion hacia base de datos.
$host ="mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com";
$db = "bsale_test";
$user ="bsale_test";
$pass="bsale_test";


$conection = mysqli_connect($host, $user, $pass, $db);
if (!$conection) {
  die('Error al Conectar ' . mysqli_error($con));
  echo "Error al Conectar";
}
$conection->set_charset("utf8");

?>