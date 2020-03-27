let EventEmitter = require('events');
/*
Как я понимаю можно вешать события на разные действия. 
Все объекты, генерирующие события, являются экземплярами класса EventEmitter
Процесс события повешанья события отличаеться.
Создаёться сначала экземпляр события, потом обращаемся к методу on что бы событие создать. 1й пар. название, 2й пар. функция которая должна отработать
можно как сделал я.

let x = new EventEmitter().on('myEvent', function(a1){
    console.dir(a1);//сылаеться на экземпляр как положено, но при стрелочной функции он теряется
});
//emit 1 - название имента, 2 - передача аргументов в функцию моего ивента
x.emit('myEvent', {fff: 33});// вызывает это событие/ по ка не совсем понятно чем отличаеться ивент от обычной функции
*/
//(function name(){console.dir(33);})()
//раз ивент класс то можно наследоваться

class A extends EventEmitter{//наследуем методы. Кстате в консоле метод on чё-то не видать
    methodCreate(nameEvent, callback){//очередной дебильный пример владилена
        this.on(nameEvent, callback)
    }
    methodCall(nameEvent, param){
        this.emit(nameEvent, param)
    }
}
/*
Логика такая. Прикидываем что у нас в классе есть метод отвеающий за создание пачки событий,
подготавливаем такие методы.
1й создаёт ивент, 2й вызывает и передаёт параметры
*/
/*
    Вообще класс наследует эвент, а значит и объекты наследуют.
*/
let pp = new A();
pp.on('car', (model)=>{
    console.dir(model);
});
pp.emit('car','BMW');

/*
    Есть старый способ передать эвент конструктору т.к. классов небыло
*/

let util = require('util');
function Car(model){
    this.model = model;
}
util.inherits(Car, EventEmitter);//Конструтор и ивент

let germany = new Car('BMW');
console.dir(germany);
germany.on('speed',(speed)=>{
console.dir(speed);
});
germany.emit('speed', '250 km');




// pp.methodCreate('myEvent', (a1)=>{
//     console.dir(a1);
// });

// pp.methodCall('myEvent', {ddt: 'Осень'});

