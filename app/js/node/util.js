/*eslint-disable*/
const util = require('util');
//Принимает async cb возвращает функцию подобие функций node js обрабатывает async 
util.callbackify(original);

 async function fn() {
    if(true) throw new Error('ошибка');
    else return 'hello world';
  }

fn()
.then((data) => {
  console.dir(data);
})
.catch((err) => {
  console.dir(err);
})
//---ИЛИ
const callbackFunction = util.callbackify(fn);

callbackFunction((err, result) => {
  console.dir(err);
  console.log(result);
});
/*
  Обычный способ получить данные через Promise. Может быть ситуация когда по верх есть функция тоже async
  тогда мы можем использовать await, но throw должен попасть в catch которого нет в конструкции async await
  Нужно ещё использовать Promise или try catch и добавлять async await в нужных местах если нет возможности 
  с использования чистых Promise это всё сделать что бы исправно всё работало.

  А можно закинуть асинхронную функцию в util.callbackify() и получить функцию которая принимает cb 
  в котором как положено в node js 1й аргумент ошибка 2й непосредственно результат. 

  Разница в том что при ошибке через Promise мы не попадаем попадаем в catch а тут мы под одним крылом обрабатываем
  2 параметра
*/
let a = {
  name: 'вася',
  family: 'пупкин',
  arr: [1,2,3,4],
  method(){},
 
}

console.dir(util.inspect.colors);
/*
  inspect превращает объект в строку и путём option можно настроить этот вывод. Так же включив color можно
  поработать с объектами  util.inspect.colors и util.inspect.styles
  вывода в консоли этого объекта

*/
//index[0]
/*
  31 - 37  color текста,
  41 - 47 bcg текста

*/
//index[1] все числа нужно разбираться. 
util.inspect.colors.red2 = [31, 35]
util.inspect.styles.number = 'red2'
let stringData = util.inspect(a,{colors: true,})//настройка отображения в консоли текста
console.dir(stringData);


let b = util.format( '%s символа s. Дата: %d этого месяца','вместо', 111);//как и в php функция printf. с русскими символами чёт не работает
console.dir(b);

