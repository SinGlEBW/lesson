<?php
namespace ns_Class;

class Person{
    const MY_CONST = 168;
    public function __construct($name = '', $age = ''){  
        $this->name = $name;
        $this->age = $age;
    }
    public function getConst(){
        return self::MY_CONST;
    }
}
?>