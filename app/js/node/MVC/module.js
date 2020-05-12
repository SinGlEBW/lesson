/*
В Node тоже практикуется называеться вроде как модульность.
Передача файлов тут не работает import export который просто в js 
*/
let things = require('./controller');//модуль передан переменной

console.dir(things.obj.name);
