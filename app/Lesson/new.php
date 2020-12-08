<?php
/* header для того чтобы убрать ошибки CORS */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
$dsd = 24;


echo json_encode($_SERVER);
// print_r($_SERVER);

//print_r(getallheaders()); //функция содержит заголовки полученые от клиента. Можно найти в переменной $_SERVER
// print_r($_SERVER);
// print_r($_FILES);

/* header(string, replase, http_replase_code);
 1. Принимает строку заголовка
 2. Если заголовки однотипные, то можно установить false для того что бы заголовки не заменялись, а добавлялись
 3. Принудительно можно задать код ответа от сервера если header не пустой(от 100 - 5** ) */
// header("Location: http://www.example.com/"); /* Перенаправление браузера */
/*Зачем нужно передавать заголовки. Заголовки передаються как параметры для сервера, в свою очередь сервер отправляет эти запросы браузеру,
  что бы браузер правильно отображал информацию которую от него требуют */
// /* Убедиться, что код ниже не выполнится после перенаправления .*/
// exit;



?>