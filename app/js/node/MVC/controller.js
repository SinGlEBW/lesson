let myFunc = function(){
    console.dir("Привет");
}
module.exports = myFunc;//передал тупо функцию. переменная в другом файле как функция

//module.exports - это объект поэтому можно накидать ему свойств и методов для передачи в другой файл
let myFunc2 = function(){
    console.dir("Hello");
}
let age = 15;
let obj = {name: "Вася"};
//теперь ещё и как объект. Так мы кучку всего передали
module.exports.myFunc2 = myFunc2;
module.exports.age = age;
module.exports.obj = obj;




