let d = require('gulp');//функция израздела node.js в браузере она не работает
/*
Немного неожиданый результат я нахожусь в ебанях в корне каталога, а то что я достаю находиться
в папке node_modules. Видимо node самостоятельно ищем по папкам не приходиться передавать путь

Что бы боле менее иметь представлние о структуре объектов можно воспользоваться терминалом
node название файла

require -  так же может подключать разные файлы в моём проекте. Для подключения файлов той же папке
требуеться указывать ./ если выйти на уровень выше ../
Node.js это серверная платформа, работает на движке Google Chrome – V8, умеет компилировать JavaScript код в машинный код.
Это не фреймворк, и не библиотека, это среда выполнения JavaScript
*/

//console.log(__filename);

/*
При большом желании можно самоу создать модуль и положить в папку node_module.
Но пока мне это не интересно.

Каждый модуль это отдельная функция. В js нет таких функция как require поэтому происходит следующее
*/
(function(exports, require, module, __dirname, __filename){

})

/*
Помимо того что можем устанавливать отдельно модули или создавать свои,
в node есть встроеные модули
*/