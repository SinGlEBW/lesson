<?
/*#######---Класс для работы с бд---#######*/
class Request{
    private static function dbConnect(){
        $db = new PDO("mysql:host=localhost;dbname=test_bd;","root","");
        return $db;
    }

    public static function requestTable($table, $where="id > 0", $show = false){
        $data = self::dbConnect()->prepare("SELECT * FROM $table WHERE $where");
        $data ->execute();
        $result = $data->fetchAll(PDO::FETCH_ASSOC);
       
        if($show){
            return $data;
        }
        return $result;
    }  
}
/*#######---Улучшеный var_dump---#######*/
function console_dir($object){
    if(is_object($object)){
        $data = [
            'className'=>get_class($object),
            'classMetods'=>get_class_methods($object),
            'allProperty'=>get_class_vars(get_class($object)),
            'propertyInstance'=>get_object_vars($object)
        ];
        foreach($data as $key=>$value){?>
            <span style="margin: 0; font-family:monospace; font-weight:bold;"><?=$key?></span>
            <h4 style="margin: 0 20px; "><?var_dump($value);?></h4><? 
        } 
    }else{
        //echo 'Переменная не является объектом.';
        var_dump($object);
    } 
}

/*----------------------------------------------------------------------------------- */

$objRequest = new Request();
$user = $objRequest->requestTable("user","id > 0");

$arr1 = ["Audi","Golf","Volkswagen","Nissan"];
$arr2 = [3 =>"Mersedess","Peugeot","sdshdgh","Mazda"];

$a3 = array_map(function($value){
    return $value == "Golf";
},$arr1);

console_dir($a3);


function ConvertFilesStructure($input) {
    $output = [];
    foreach ($input as $key => $file) {
        $output[$key] = ConvertFilesStructureRecursive(
            $file['name'],
            $file['type'],
            $file['tmp_name'],
            $file['error'],
            $file['size']
        );
    }
    return $output;
}

function ConvertFilesStructureRecursive($name, $type, $tmp_name, $error, $size) {
    if (!is_array($name)) {
        return [
            'name'     => $name,
            'type'     => $type,
            'tmp_name' => $tmp_name,
            'error'    => $error,
            'size'     => $size,
        ];
        
    }
    $output = [];
    foreach ($name as $key => $_crap) {
        $output[$key] = ConvertFilesStructureRecursive(
            $name[$key],
            $type[$key],
            $tmp_name[$key],
            $error[$key],
            $size[$key]
        );
    }
    return $output;
}

console_dir(ConvertFilesStructure($_FILES));




$bb = new Request();
$bb3 = new Request();
var_dump($bb);
var_dump($bb3);
$user = $bb->requestTable('user',"id = 34");
console_dir($user);




//console_dir(get_resource_type(opendir(__DIR__)));



// for($i = 0; $i < count($_FILES['pictures']); $i++){
//     console_dir($_FILES['pictures']);
// }

// if ((!empty($_POST)))
//      header('Content-Type: application/json; charset=utf-8');
// $response = array();
// $response['status'] = 'bad';


// if (!empty($_FILES['file']['tmp_name'])){
// 	for($key=0;$key<count($_FILES['file']['tmp_name']);$key++){
// 		$upload_path = __DIR__ . "/upload/";
// 		$user_filename = $_FILES['file']['name'][$key];
// 		$userfile_basename = pathinfo($user_filename,PATHINFO_FILENAME );
// 		$userfile_extension = pathinfo($user_filename, PATHINFO_EXTENSION);
// 		$server_filename = $userfile_basename . "." . $userfile_extension;
// 		$server_filepath = $upload_path . $server_filename;
// 		$i = 0;
// 		while(file_exists($server_filepath)){
// 			$i++;
// 			$server_filepath = $upload_path .  $userfile_basename . "($i)." . $userfile_extension;
// 		}
// 		if (copy($_FILES['file']['tmp_name'][$key], $server_filepath)){
// 			$response['files'][] =  $server_filepath;
// 			$response['status'] = 'ok';
// 		}
// 	}
// }







/*
opendir() - когда файл откравает то файл станоситься типом resource 
get_class() - Возвращает имя класса, к которому принадлежит объект
is_resource() - являеться ли ресурсом
get_resource_type() - определяет что за ресурс
get_object_vars() - Возвращает свойства указанного объекта
get_class_vars() - Возвращает объявленные по умолчанию свойства класса
get_class_methods() - Возвращет методы класса
get_parent_class() - возвращает имя родительского класса
*/

/*
    Отличие классов PHP от JS в том что доступ к методам из экземпляра в php осуществляеться сразу через
    конкатенацию, в JS к статичным методам класса придёться обращаться через constructor
*/
?>

