<?php
//header('Content-Type: application/json');
//Команда установки куки
 setcookie("myCookie", '417555', time() + 60*60*2);
//Команда считывания куки
 $_COOKIE["myCookie"];
var_dump($_SERVER);

?>