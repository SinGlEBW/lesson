<?php
/*----О переменных----*/
/* ---Типы переменых: string, int, float, double, Array, boolean, resource--- */
define('mlg', 13, false);

/*функция создаёт обычные константы. 1 имя 2 значение 3 чувствительность к регистру 


$name = "age";
$int = 26;

echo gettype("14");

echo $$name; //2й $ расматривает $name как подставляеться к значению $ + age = $age. php ищт эту переменную
echo ($int + '14');//echo может определить тип сложить их.Названные переменные $int, $str играют большую роль
/*
Области видимости переменных.
 В PHP требуеться указывать global для глобальных переменных использующих внутри функции.
*/

$per = 15;
$per1 = &$per;//php имеет понятие передать ссылку, а не само значение. Манипулируя значением по ссылке измениться и оригинал
$per1 = 2;

echo $per;



  $globPerem = 15;
  
  function myFumc(){
      global $globPerem;
      $locPerem = 17;
      echo "<br>".$globPerem;
      return $locPerem;
  }
  echo "<br>".myFumc();

/*Помимо Глобальной видимости и Локальной существуют переменные которые находятся в Супер Глобальной области
  Одни из этих переменных: 
  $_POST, $_GET, $_SERVER, $_GLOBALS, $_COOKIE, $_SESSION, $_FILES, $_REQUEST, $_ENV */

 
  /*----------О массивах-------- */
$arr = [];
$arr1 = Array();
/*Использовать Ассоциативные массивы можно в обоих случаях */
$arr1 = Array("key1"=>"value1", "key2"=>"value2");

echo "<br>";
echo $arr1["key1"];
$arr2 = Array("key1"=>"value1", "key2"=>Array("key1.1"=>"value1.1","key1.2"=>"value1.2"));
echo "<br>";
echo $arr2["key2"]["key1.1"];//можно посмотреть масив в масиве. Двумерный массив. Для трёхмерного массива нужно 3 индекса и т.д.
echo "<br>";
print_r($arr2);





?>