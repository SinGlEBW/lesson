<?php 

 require_once __DIR__. '/../vendor/autoload.php';
// \RedBeanPHP\R::setup();
class_alias('\RedBeanPHP\R', '\R');
//код запоминает данные и подключаеться к базе только тогда когда идёт непосредственно работа с БД
R::setup( 'mysql:host=localhost;dbname=test_bd','root', '' ); //для подключения mysql или mariaDB
/*проверка подключения к БД методом testConnection. странно но это не функции и die() и exit() одинаковы.
exit() перешёл в PHP из С, а die() из Perl

if(!R::testConnection()){
    exit('No DB Connection');}
    echo 'ok';



//R::freeze(true);//режим заморозки автоматического сохранения store

//CREATE - создание в БД
/*
//R - это объект класса RedBeanPHP
//dispense принимает один аргумент - это название таблицы. не принимает snake_case и camelCase
$User = R::dispense('user');//принимает аргумент в нижнем регистре.dispense это и есть bean(бин)
$User->name='Petrucho';
$User->age=27;//переменная $User создана чтоб не писать такой код R::dispense('user')->op=24;
$User->country='Italiya';
//
R::store($User);//сохраняет бин. R::dispense('user')->op=24; такой код возможен, до store не его сохраняет
//после сохранения таблицы методом store таблица создаёться и даже если закоментировать код,
//то таблица в БД никуда не денется. Любые изменения лишь пополняют базу. Что бы что то удалять
//нужно использовать команды.
//$User->type_id = 3;
//Если создать поле $User->type_id в стиле snake_case id, то redBean в БД присвоит полю значение 
//индексов. Ничего кроме циф он не примет 
*/
//READ
/*
$User = R::load('user',1);//принимает 2 аргумента. название таблицы и id которое нужно загрузить
function damp($n){   
одна функция print_r($perem); выведет коряво текст, поэтому её лучше обернуть в тег <pre>
так как код стал громозким и постоянно его везде тыкать неудобно, создал под него функцию чтоб
использовать маленький кусок кода для вызова массива
echo '<pre>';
print_r($n);
echo'</pre>'; 
}
 
$User->age=27;//переменная $User создана чтоб не писать такой код R::dispense('user')->op=24;
$User->country='Раша';
 
раз объект $User содержит масив данных под 1ым id, присвоеных таблицой 'user'
то можно сконвертировать его в массив с помощью export()
damp($User);

foreach($User as $x){ echo $x;  }как видно объект содержит пачку данныx
хз как эта херня работает, но походу просто обращаюсь к exporn() там массив.
ну раз массив, то присваиваю своей же переменной. Я полагаю там этот масив
отдельным телом и лежит, никаой конвертации непроисходит, как говорит Хауди
echo по этому адресу $User->export() видит массив, но не может его описать,
описывает print_r() передал своей же переменной чтобне писать print_r(User->export());
Оказываеться удобно когда всякую херню можно закидывать в переменные что бы 
в конечном итоге не закидывать большой код в аргументы. Можно даже массивы закидывать
в аггумент

$User=$User->export();//такая конструкция если в $User 1 бин. то есть не установлен R::loadAll
//опять смотрю дамп.
echo '<pre>';
damp($User);//теперь он лишён полной информации
echo '</pre>';

*/

//$Users = R::loadAll('user',Array);//loadall принимает массив ID для загрузки всех
/*функция метод ::find(); может принять 3 аргумента. 
1.Название таблицы (обязательный)
2.по каким критериям искать или отсеивать 
3.Наш бинд. Указывается если во 2м аргументе нет конктетики $pages = R::find('user','age>?', $Users);
*/
$e='Раша';
$pages = R::findAll('user','age>24 order by age');//find загружает именно бины
function damp($user){
echo "<pre>";
print_r($user);
echo "<\pre>";      }



//$aBeans = R::exportAll($pages); //экспорт всех бинов в отдкльный массив

//damp($pages); //чёт не особо нужная иформация
//damp($aBeans);//самое то или






 function tablDamp($damp){ ?>

    <table border='0' width='300px'>
        <tr>
            <td>Имя</td>
            <td align='right'>Возраст</td>
            <td align='right'>id</td>
            <td align='right'>Страна</td>
        </tr>
    </table>

     <?foreach($damp as $users):?>
   
        <table border='0'  width='300px'>
            <tr>
                <td><?=$users->name;?></td>
                <td align='right'><?=$users->age;?></td>
                <td width='40px' align='right'><?=$users->id;?></td>
                <td width='90px' align='right'><?=$users->country;?></td>
            </tr>
        </table>
     <?endforeach;
 }?>


<?tablDamp($pages);?>



