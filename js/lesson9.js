//Геторы - Сеторы
// var p1 = document.querySelector('#idP');
// p1.setAttribute('class','bb ccc');//добавляет любые атрибуты 
// p1.classList.add('ss');//добавляет только классы. Если classList указать раньше setAttribute создавая при этом обоими способами классы, то setAttribute перезапишет classList
// console.log(p1.getAttribute("class"));//getAttribute получает значения нужного атрибута
// console.log(p1);


/*Функция генератор*/

// console.dir(function*(){});

// console.dir([2].join());


// document.querySelector('#r1').oninput = cssGenerator;
// function cssGenerator(){
//     console.dir(this.value);
// }
let arr = [1,22,31,1,5,1,2,3,5,7,8,10];
let set = new Set().add(arr);
set.add(['hello',11])



let ff = set.values();

let v = arr.sort();
console.dir(v);




/*####----Немного о import, export---#####*/

/*
   Прежде чем использвать эту технологию чтобы браузеры понимали что выводить, нужно указать в 
   подключении скрипта атрибут type="module"
   При написании большого кол-ва кода иногда проще всего держать эти куски в разных файлах.
   Большие куски кода порадили использование технологии MVC - Model View Controller.
   
*/


/*
   Способы передачи классов.
*/

// class A{
//    //...
// }
// class A{
//     //...
// }
// export {A,B};
// //можно переменовать
// export {A as AA,B as BB};
// //часто используют без фигурных скобок, но с добавлением default
// export default A;
// /* 
// Не совсем понял почему. что-то связано с тем что модули (файл с кодом) стараються делать так что б один файл отвечал за одно
// решение и смысл отпадает передавать лишние классы которых не сути не должно быть в этом файле. 1 файл - одна задача.
// */ 
// //в файле в ктором будет происходить подуключение 
// import { AA, BB } from "lesson9";

// //так же можно переменовать импортированые файлы, но на кой это надо хз
// import { AA as A, BB as B } from "module";//обратно переменовали
// //можно импортировать все export'ы в виде объекта указав * и добавив имя для обращения
// import * as numbers from "местоположение";
// //

