<?php

print_r($p);
if(isset($_POST['submit'])){
    session_start(); //предоставляет возможность заполнять переменную $_SESSION для глобальной передачи. Без session_start(), $_SESSION как обычная переменная
//    session_unset(); //удаляет хранимую информацию в переменной.
    
//        $errors=array();

        if($_POST['logreg'] == '') {
            $_SESSION[]='Введите логин!';
        }

        if($_POST['passreg'] == '') {
            $_SESSION[]='Введите пароль!';
        }

        if($_POST['passreg'] != $_POST['repeat-passreg']) {
            $_SESSION[]='Повторный пароль введён не верно!';
        }
        if( empty($_SESSION)){
            require('oop.php');
            echo 'Успенский';
            //происходит регистрация
        }else{
            require('oop.php');
           
            print_r($_SESSION);
            echo '<br>'.$_SESSION[0];
            
        }
   
    
    
}

?>