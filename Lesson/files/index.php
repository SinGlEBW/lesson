<?php
/*При отправке файла на сервер через форму, $_FILES авоматически создаёт массив название массива Которое было указаннов input*/
if(isset($_FILES['image'])){
    $errors = Array();
    $file_name = $_FILES['image']['name'];
    $file_size = $_FILES['image']['size'];
    $file_tmp = $_FILES['image']['tmp_name'];//появляетья и пропадат в папке temp. происходит всё быстро
    $file_type = $_FILES['image']['type'];
    $formatImage = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);//тот же результат что и выше.
    $expensions = array('jpeg', 'jpg', 'png');
    
    
    /*
    strtolower() - преобразует строку в нижний регистр 
    end(arr) - Устанавливает внутренний указатель массива на его последний элемент
    explode(separator, arr) - разбивает строку и возвращает массив из слов. что-то типо метода Arr.split в js. split в php тоже есть.
    Вместо манипуляцйи "разделить строку на массив по сепаратору '.' и потом искать последний массив" можно воспользоваться функцией ниже
    
    pathinfo ( string $path [, int $options = PATHINFO_DIRNAME | PATHINFO_BASENAME | PATHINFO_EXTENSION | PATHINFO_FILENAME ] )
    pathinfo() возвращает информацию о path в виде ассоциативного массива или строки, в зависимости от options.
    */
    if(!in_array($formatImage, $expensions)){
        $errors[] = "Файл не соответсвует формату";
    }
   
    if($file_size > 2097152){
         $errors[] = "Файл не должен превышать 2 мб";   }
   
    if(empty($errors)){
        
      //  move_uploaded_file($file_tmp, 'D:/'.$file_name); //без функции файлы не придут из временного хранилища
        /*т.к. сервер отправляет файл во временное пространство файл нужно преместить в какую то папку, за это отвечает
          функция перемещает файл в новое место move_uploaded_file(временная деректива, куда кидать в постоянную дерективу) */
        echo "Success";
    }else{
        print $errors[0];
//print отличаеться от echo тем что в echo можно использовать и кокатенацию и перечислением выводы строк. В print только конкатенацию
    }    
}
/*---Полезные функции---*/
/*
rename(oldName, newName) - переменовывает файл
copy(путь изменяемого файла, путь и название будущего файла) - Копирует файл.copy('files.php', 'file-box.php')
unlink() - Удаляет файл
in_array("значение", [мас. значений]) - проверяет существует ли значение в массиве.
array_key_exists() - проверяет присутствует ли указыный ключ в массиве.
array_search() - ищет значение в массиве и возвращает ключ
*/

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
 <body><!--В случае изменения местоположения файлов можно задать динамическое изменение пути к файлу используя супер глобальную переменную $_SERVER с её массивом -->
    <form action="<?= $_SERVER["REQUEST_URI"];?>" method="POST" enctype="multipart/form-data">
    <!--multiple и size работают в теге select. сколько бы не было в селекте строк multiple список раскрывает, а size устанавливает ограничение
         multiple - даёт возможность выбирать за раз несколько файлов. size - устатавливает какое ко-во за раз можно выбрать -->
        <input type="file" name="image" multiple="multiple" size="3">
        <input type="submit">
    </form>
    <?if(!empty($_FILES)):?>
         <ul><!--Просто вывел информацию FILES -->
            <?foreach($_FILES['image'] as $key => $value):?>
                <li><span><?="$key: "?></span><?=$value?></li>  
            <?endforeach?>
        </<input>
        <?endif?>
        

<??>


</body>
</html>



<?php


/*
writer, read
w - откроет или создаёт файл для записи, всё удаляет, ставит курсор в начало для записи
w+ - тоже самое добавлено чтени/запись
a - Открывает только для записи ставит курсор в конец
a+ - тоже самое добавлено чтение/запись
r - открывает только для чтения
r+ - чтение/запись
x - создаёт новый файл только для записи
x+ - для чтения/запись
доп параметр ко 2му аргументу
t - позволяет принимать в файл управляющие символы такие как: \n \t
b - запрещает

Пример: fopen('название.txt', 'at') - просто открывает файл и возвращет его.
fwrite($file, 'какая-то запись'); - непосредственная запись
fread($file, кол-во байт) - функция для чтения. русский текст 2 байта за символ. Без 2го параметра прочитает строку
fgets($file, кол-во байт) - русский текст вообще 3 байта за символ
feof($file) - проверяет где стоит курсор. Если курсор в конце то возвращает true файл значит прочитан. Можно цикл проверять (!feof($file))
fseek($file, номер куда установить); устанавливает курсор 
str_replace('\n','<br>',$text); - удобней чем. nl2br() - если в файле есть /n/r то функция вернёт текст с тегами <br> - эт х не работает.

file_put_contents('файл', 'что сохранить', [доп опцииы]) - заменяет fopen fwrite fclose.Пишет данные в файл
file_get_contents() - выводит текст из файла, но всё одной строкой, не очень удобно.
file() - Читает содержимое файла и помещает его в массив. Удобней разбирать чем file_get_contents()
file_exists() - проверяет существует ли файл
opendir() - открывает папку по директории.
filesize() - показывает размер файла
rename() - переменовывает файл
unlink() - удаляет файл
*/


$file = fopen('People.txt', 'rt');
//$text = fread($file, 8536);
$str = str_replace('\n','<br>',$text);

fclose($file);

$op = pathinfo(__DIR__."\index.php", PATHINFO_DIRNAME);
$fd = opendir($op);
var_dump(is_resource($fd));
?>

<?php 



/*настледование - механизм языка позволяющий описать новый класс на основе уже существующено 
                  родительского класса*/
//echo"
//<!-- Если нужно работать с файлом как с объектом, а не строкой то нужно переложить ответственность с метода пост на $_FILES-->
//<!-- для этого указывается в форме enctype='multipart/form-data', post становиться просто проводником для получения данных в $_FILES-->
//
//<form  enctype='multipart/form-data' action='oop.php' method='post'>
//
//<!-- можно до кучи передать через post невидимую форму данных и с ней взаимодействовать через $_POST-->
//<!-- но она должна быть установлена раньше формы загрузки файлов-->
//
//    <input type='hidden' name='forPpost' value='херня'>  
//    <input type='file'   name='forPfiles'  >
//    
//    <input type='submit' value='Отправить файл'>
//</form>";

//var_dump($_POST);echo '<br>';
//print_r($_FILES);
//echo '<br>'.$file=$_FILES["forPfiles"]["neme"];

?>