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
   Прежде чем использовать эту технологию чтобы браузеры понимали что выводить, нужно указать в 
   подключении скрипта атрибут type="module"
   При написании большого кол-ва кода иногда проще всего держать эти куски в разных файлах.
   Большие куски кода породили использование технологии MVC - Model View Controller.
    
   указав default, при импорте из этого файла мы можем произвольно указывать получаемое имя.
   как я понимаю мы не можем указать одно имя на всех, поэтому 1 файл один default
*/


/*
   Способы передачи классов.
*/

class A{
   //...
}
class A{
    //...
}
export {A,B};
//можно переименовать
export {A as AA,B as BB};
//часто используют без фигурных скобок, но с добавлением default
export default A; 
/* 
default даёт возможность не привязываться к имени экспортируемого файла. При подключении можно указывать
любое имя. В файле можно только один раз указать default
*/ 
//в файле в котором будет происходить подключение 
import { AA, BB } from "lesson9";
//получение именованного и не именованно экспорта из файла
import {default as Chat, SignupForm } from './Chat';
//аналог 
import Chat, { SignupForm } from './Chat';
//так же можно переименовать импортированные файлы, но на кой это надо хз
import { AA as A, BB as B } from "module";//обратно переименовали
//можно импортировать все export'ы в виде объекта указав * и добавив имя для обращения
import * as numbers from "местоположение";
//так же работает и для export
export {sayHi as hi, sayBye as bye};
//ещё способ export'a по default
export {sayHi as default};//аналог export default sayHi
//Реэкспорт. позволяет импортировать что-то и тут же экспортировать, возможно под другим именем
export { sayHi } from './say.js'; // import из say.js метод sayHi и тут же export
//import дефолтного значения из /user.js, переименуем его в User и экспортируем и
//конкретно таких синтаксисов может быть много в отличие обычного export default User
export {default as User} from './user.js'; 

/*
   Пример. Структура сайта
   auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
   Идея в том, что внешние разработчики, которые будут использовать наш пакет, 
   не должны разбираться с его внутренней структурой, рыться в файлах внутри нашего
   пакета. Всё, что нужно, мы экспортируем в auth/index.js, а остальное скрываем от 
   любопытных взглядов.
   import {login, logout} from 'auth/index.js'

// 📁 auth/index.js

// импортировать login/logout и тут же экспортировать
import {login, logout} from './helpers.js';
export {login, logout};

// импортировать экспорт по умолчанию как User и тут же экспортировать
import User from './user.js';
export {User};
...
Теперь пользователи нашего пакета могут писать import {login} from "auth/index.js".

Запись export ... from ...– это просто более короткий вариант такого импорта-экспорта:
*/

/*

   Отличие ES6 модульной системы от NodeJS
   В ES6 через export присваивается ссылка передаваемых сущностей на объект [[Exports]],
   в NodeJS присваивается копия сущности в свойства modules.export.свойство
*/

