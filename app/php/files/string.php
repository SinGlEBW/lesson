<?php
/*
Иногда приходиться работать с текстом формата ini, csv, json
*/

parse_ini_file('text.ini');

/*-------------CSV файлы--------------*/
$file = fopen('text.csv', 'rt') || die( "Ошибка");
for($i = 0; $data = fgetcsv($file, 1000, ';'); $i++){
    $num = count($data);
    var_dump("Строка номер $i (полей: $num): ");
    for($j = 0; $j < $num; $j++){
        var_dump("[$j]: $data[$j]");
    }
}
fclose($file);

$bufer = file_get_contents('text.json');

json_encode('в JSON');
//json_last_error();//возвращает результат преобразования

/**-------Некоторая проверка JSON файла--------- */
$jsonError = 'Неизвестная ошибка';
switch(json_last_error()){
    case JSON_ERROR_NONE: $jsonError = ''; break;
    case JSON_ERROR_DEPTH: $jsonError = 'Достигнута максимальная глубина стека'; break;
    case JSON_ERROR_STATE_MISMATCH: $jsonError = 'Некорректные разделы или некорректный режим'; break;
    case JSON_ERROR_CTRL_CHAR: $jsonError = 'Некорректный управляющий символ'; break;
    case JSON_ERROR_SYNTAX: $jsonError = 'Синтаксическая ошибка'; break;
    case JSON_ERROR_UTF8: $jsonError = 'Неккоректные символы UTF-8 ошибка'; break;
}
if($jsonError == ''){
    echo json_decode($bufer);
}


?>