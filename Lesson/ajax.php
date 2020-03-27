<?php
session_start();
  header('Content-Type: application/json');//удобен тем чтоб не использовать echo pre
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
  header('Access-Control-Allow-Credentials: true');

/*Для GET запросов можно добавлять теги, чтобы этого пользователи не могли делать
 есть 2 функции: 
strip_tags() - удаляет теги, но не вырезает одинарные кавычки
htmlspecialchars() - экранирует теги, но не экранирует одинарные кавычки
mysqli_escape_string();//экранирует спец символы, чтоб нельзя было воздействовать менять SQL запрос
mysqli_real_escape_string(); //требует 1м параметром соединение. Но лучше использовать подготовленые запросы
preg_quote - Экранирует символы регулярных выражений. типо \$ \? \| и т.д
PDO::quote — Заключает строку в кавычки для использования в запросе
fetch_array() - присылает по 2 массива и ассоциативным и нумерным.
fetch_assoc() - присылает ассоциативным массивом
хеширование паролей:
password_hash(пароль, PASSWORD_DEFAULT) - 2й параметр это соль, которую добавляет фукнция к паролю
password_verify(введённый пароль, хеш пароля); - если норм то true 
*/ 
/*----Покдключение к БД------ */
$mySqlUser = 'root';
$mySqlPass = '';
$serverDomain = $_SERVER['SERVER_ADDR'];
$db = 'test_bd';

$mysqli = new mysqli($serverDomain, $mySqlUser, $mySqlPass, $db);

if(mysqli_connect_error()){
      echo 'Нет соединения с базой данных';
      exit();   }

$loginReg = mysqli_real_escape_string($mysqli, trim($_POST['loginReg']));
$passReg = mysqli_real_escape_string($mysqli, trim($_POST['passReg']));
$emailReg = mysqli_real_escape_string($mysqli, trim($_POST['emailReg']));
$loginEnter = mysqli_real_escape_string($mysqli, trim($_POST['loginEnter']));
$passEnter = mysqli_real_escape_string($mysqli, trim($_POST['passEnter']));
$dataTime = date('d.m.Y H:i:s');

if($_POST['form'] == 'formReg'){
  if($loginReg == '' || $passReg == '' || $emailReg == ''){
      echo 'Введите все поля! '.$loginReg.'  '.$passReg. '  '.$emailReg.PHP_EOL;
  }else if(!filter_var($emailReg, FILTER_VALIDATE_EMAIL)){
        echo 'Введите корректный адресс электронной почты';
  }else{
      echo $loginReg.'  '.$passReg.'  '.$emailReg;
      $hashPass = password_hash($passReg, PASSWORD_DEFAULT);
      $request = "INSERT INTO `user` (`login`, `password`,`email`) VALUES ('".$loginReg."', '".$hashPass."','".$emailReg."')";//в SQL нельзя добавлять переменную, так что приходиться делать конкатенацию
      $userTable = $mysqli->query($request);
      $mysqli->close();
      //file_put_contents('apps.txt', "$dataTime $emailReg $passReg $loginReg \n",FILE_APPEND);
    // echo 1;
  }
}else if($_POST['form'] == 'formEnter'){
  
  
   if($loginEnter == '' || $passEnter == ''){
      echo 'Введите все поля! '.PHP_EOL;
   }else{  
      $request = "SELECT * FROM `user` WHERE `login`='$loginEnter'";
      $userTable = $mysqli->query($request);
      $user = $userTable->fetch_object();
     if(password_verify($passEnter, $user->password)){
        $_SESSION['name'] = $loginEnter;
        $_SESSION['online'] = true;      
      }else{
        echo 'Неверный логин или пароль';  }

      $mysqli->close(); 
   } 
      
}  
print_r($_SESSION);

//   }
    //file_put_contents('apps.txt', "$dataTime $emailReg $passEnter $loginEnter \n",FILE_APPEND);
    // echo 1;
  
//MYSQLI_STORE_RESULT – вернет буферизированный результат, значение по умолчанию
//MYSQLI_USE_RESULT – небуферизированный
  // $tableUser = $mysqli->query("SELECT * FROM `user`",MYSQLI_USE_RESULT);
  
  // $arrData = $tableUser->fetch_all();
  // echo $tableUser->field_count;//сколько колонок
  // echo $tableUser->num_rows;//кол-во строк. Работает после fetch_all  //mysqli_num_rows($tableUser);

  // print_r($arrData);
  // foreach($arrData as $d){
  //   ;// print_r($d[1].PHP_EOL); - получить все имена
  // }

  // $mysqli->close();




 /*-------------------------------------------------------------------- */


//Кстате если даже н
//это тип проверка регистрации
//   if($loginEnter == '' || $passEnter == '' || $emailReg == ''){
//         echo 'Введите все поля!';
//   }else if(!filter_var($emailReg, FILTER_VALIDATE_EMAIL)){
//         echo 'Введите корректный адресс электронной почты';
//   }else{
//       file_put_contents('apps.txt', '$dataTime $emailReg $passEnter $loginEnter \n', FILE_APPEND);
//       echo 1;
//   }

// echo "<br>";
// echo 'sad 123';
// echo "<br>";
// echo urlencode('sad fff  dsd');


// if ($mysqli->connect_error) {
//     echo "Не удалось подключиться к MySQL:";
// }
//Вариант 2.
// $opt = [//дополнительная опция для PDO
//       PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
//       PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
//       PDO::ATTR_EMULATE_PREPARES   => false,
//   ];

// //у PDO нет метода connect_error. PDO проверяется методом исключения. catch принимает (PDOException и переменную)
// try {
// $mysqli = new PDO("mysql:host=$serverDomain; nameRegDB=$db;", $mySqlUser, $mySqlPass, $opt);
//     //echo "норм";
// }
// catch(PDOException $e){
//       exit('Не удалось подключитсья к бд '. $e->getMessage());
// }

 //header('location: /block_reg.php'); перенаправление на другой адрес. Указываьть можно
  // echo '<pre>';
  // echo $dataSer;
  // echo '</pre>';

  /*Что бы передавать ассоциативные массивы с сервера придёться для начала его сконфигурировать в JSON формат.
   Обмен меджу клиентом и сервером осуществляеться строковым типом, но чтоб корректно преобразовать строку в объект в JS
   требуеться для начала подготовить строку эту строку. */
//  $dataServer = json_encode($_POST);
//   print_r($dataServer);

//print_r($_SERVER);
//var_export($_SERVER);


//empty(); -  true если пуста
//isset(); - true если переменная определена и даже если она пустая
 /*Если в JS не используеться класс new FromData()- то ключи для POST будут не имена интутов в HTML, а имена переданые в body */

//PHP_EOL - 100 пудов перенесёт строку на новую
// echo $loginEnter.PHP_EOL;//
// echo $passEnter.PHP_EOL;
// echo $emailReg.PHP_EOL;


/*Подключение к БД. */
/*try() catch() чем то похожи на then и catch в JS. В try(какой-то код) передаёться тот код который будет проверяться,
если будет ошибка будет срабатывать catch(какое-то условие).
! - отрицательное условие, если перед переменными.
:: оператор разрешения области видимости. Даёт возможность обращаться к методам и свойствам статического характера через имя коасса или экземпляр. 
Не тоже самое как . в JS,  точный аналог . это стрелка ->
Если есть наследование extends, то parent::назв метода - обращение к родительским плюшкам, self::к своим
mysqli()- класс функция способна подключаться только к myAdmin
PDO() - класс функция которая способна подключаться к многим базам данных 

Важно: Объект может быть похож на ассоциативный массив, также имея ключи и значения.
Доступ к свойствам через -> 
Если в документации у классов 
::$и название - то это свойство
:: без долара это метод*/

