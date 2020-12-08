Object.seal();
//Метод  позволяет «запечатать» объект, предотвратив добавление новых свойств. При этом существующие свойства можно менять.
Object.freeze();
//Метод «замораживает» объект, предотвращая изменение существующих свойств этого объекта или добавление новых свойств и значений в объект.
Object.assign(/*firstObject, secondObject, freeObject*/); //2й параметр копируется в 1й, 3й параметр объединяется с 1м объектом
//можно 1м параметром объявить пустой объект Object.assign возвращает значения, а можно передать какой-то объект в 1й параметр
//на 2й и 3й параметр его заполнят далее мы просто пользуемся объектом который передавали в 1й параметр.
//ВАЖНО примитивы копируются, а объекты передаются ссылками
//Оператор spread(...) делает тоже самое. Копирование так же не глубокое, копируются только примитивы
Object.entries(
  obj
); /*метод превращает список методов и свойств объекта в массив с массивами*/

Element.insertAdjacentHTML(position, text); //не перезаписывает теги при новом обращении как делает innerHTML
Element.insertAdjacentText(); //замена textContent
/*
position
DOMString - определяет позицию добавляемого элемента относительно элемента, вызвавшего метод. Должно соответствовать одному из следующих значений (чувствительно к регистру):
'beforebegin': до самого element (до открывающего тега).
'afterbegin': сразу после открывающего тега  element (перед первым потомком).
'beforeend': сразу перед закрывающим тегом element (после последнего потомка).
'afterend': после element (после закрывающего тега).
text
Строка, которая будет проанализирована как HTML или XML и вставлена в DOM дерево документа.
*/
/* Оператор spreed полноценно копирует в другой объект только примитивы, в объекте находящиеся объекты или объекты 
   типа Массив передаются ссылкой */

let a = {
  name: "Вася", //скопирует
  arr: [1, 4, 6], //передаст ссылку,
  boole: 11 === 12,//можно логику сроить в объекте
  o: {
    //передаст тоже ссылку
    name1: "Сёма",
    age: 15,
  },
};

let b = { ...a };
b.o.name1 = "Толя";
b.arr[0] = "Толя";

console.dir(b.o === a.o); //true

//можно заниматься ананизмом и копировать остальные объекты используя spreed

b.arr = [...a.arr];
b.o = { ...a.o }; //скопировали

//Можно и так, перезатирая свойства
b = {
  ...a, //общая - поверхностная копия
  arr: [14, 16], // указав свойство мы даём согласие на перезапись
  o: { ...a.o }, //здесь ... выполняют роль разворачивания. Указав свойство мы уже перезаписали свойство o
};
b.o.name1 = "петр";
console.dir(b.o === a.o); //теперь это копия поэтому false
//полное копирование объекта,кроме функций и типа Symbol. Они тупо не добавляются в новый объект
let c = JSON.parse(JSON.stringify(a));
/*
Возможно это очевидно, но не всегда бросается в глаза тот факт что создание свойства
в объекте можно производить через точку или же через синтаксис массива.
Разница в том что создав через синтаксис массива - имя свойства будет то что
содержится в переменной, а не имя переменной. 
Это полезно если мы находимся в цикле и мы каждую итерацию будем создавать разные
свойства которые будут попадать в переменную, а не одно и то же свойство
*/
let f = "r";
let d = {};
d[f] = 11;
console.dir(d);

let o = [
  {
    //0: {name: 'D', age: 19}
    name: "D",
    age: 19,
  },
  {
    //1: {name: 'V', age: 17}
    name: "V",
    age: 17,
  },
];
let a = [
  {
    //0: {name: 'F', age: 20} заменит на это
    name: "F",
    age: 20,
  },
];
/*
   Даже если массив передать объекту т.к. в массиве ключи это индексы, то и у объекта
   ключи будут индексы. Поэтому если пытаться копировать 2й массив или объект с теми же ключами,
   то будет замена, а не push.
*/
o = { ...o };
console.dir(a);

console.dir({ ...o, ...a });

let nameO = {
  id: 1,
  name: "Вася",
  message: "Привет",
  get: () => {
    return this.id; //не доступен
  },
  get met() {
    return this.id; //доступен
  },
};

console.dir(nameO.met);

/*
В обычном объекте в его методах нельзя обращаться через this к его свойствам, можно только через 
экземпляр, но зато можно спокойно обращаться в get и set ведь экземпляр может быть неизвестен 
т.к. создать его может кто-то другой. Вообще для обращения к свойствам через методы имеется класс,
который клепает те же экземпляры. get set это не методы а свойства, но в объекте это метод который может
выполнять и задавать поведение свойствам. Обращаться к таким свойствам нужно не напрямую, а через get
Ограничивать же напрямую доступ это через DefineProperty 
*/

//--Работа с объектами
let op = new Proxy(nameO, {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, value) {
    console.dir(prop);
    console.dir(value);
    console.dir(target);
    if (value < 0) throw new Error("Число не может быть меньше 0");
    else target[prop] = value;
  },
});

//---Работа с функциями new Proxy смотреть в файле function

/*
   Proxy это класс который работает над объектом и методами работает на стороне. 
   В место того что бы добавлять контролирующие get set методы-свойства в 
   объект мы имеем инструмент отдельно 
*/
