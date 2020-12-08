//*Экземпляры класса называются на англ. INSTANCE (инстансы)  */

/*НЕМНОГО О ФУНКЦИЯХ. Функции бывают Именованные и не именованные. И разница между ними заключается в том что именованные функции 
  создаются интерпретатором раньше, чем не именованные. Такие функции называются declaration, а не именованные expression. 
  Есть ещё вид функций Named Function Expression(именованное функциональное выражение) это функция имеет имя и присваивается переменной. 
	Смысл в том что имя доступно только в самой функции что позволяет вызывать саму себя в теле функции (сделать рекурсию).*/
	
//Function declaration
function sum (a, b){
	return a + b;	}

//Function expression
let sum1 = function(a, b){
	return a + b;	}

//Named Function Expression - основное имя можно использовать в рекурсии
let func = function sum(a, b){
	return a + b;	}

//Создание простых объектов
let o1 = {
	name:"Robert",
	age: 37,
}

let o2 = {
	name:"Villiam",
	age: 38,
}
//код повторяется
//Создание объекта через конструктор
/*Если дать имя функции, то все созданные экземпляры будут ссылаться на это имя и конструктору дополнительно 
	присвоится имя, если же не дать имя то имя будет переменной в которую передали функцию */
	
let PersonFunc = function () {/*функция конструктор, а значит можно создавать экзкмпляр*/ }

let obj1 = new PersonFunc();//new может создать из функции (с конкструктором) объект(typeof object)
	obj1.name = "Jack";//Ручное заполнение нулевого уровня для этого экземпляра obj1
	obj1.age = 31;
	obj1.city = "NewYork";

let obj2 = new PersonFunc();//Пустой шаблон равносильно созданию каждый раз нового объекта
	obj2.name = "James";
	obj2.age = 35;
	obj2.city = "Texas";

function Foo (){
	this.a = 1
	this.b = 2
}

let f1 = new Foo()
//добавлять на 0 уровень можно только через экземпляр, т.к. мы видим его пространство на этом уровне
f1.c = 3;//положили на 0 уровень
f1.constructor.m = 3;//тупо закинули в конструктор 2й уровень и ни кто так не делает

console.dir(new Foo());// создание нового экземпляра {a: 1, b: 2}
console.dir(f1);//{a: 1, b: 2, c: 3}
f1.constructor.prototype.d = 4;//добавили в общий ящик. Новые экземпляры будут иметь доступ (наследовать) к d: 4  
Foo.prototype.e = 5;//обращение к тому же полю через конструктор
/*
	ВАЖНО. обычные объекты типа {...} наследуются от главного объекта по DOM дереву.
	Они не имеют своего объекта prototype и не могут что-то класть в наследованный от главного
	объекта. Если положить в constructor, то новые объекты будут на наследовать эти данные.
	Так что на вопрос: Чем отличается обычная функция от функции классовой или конструктора
	это наличием своего объекта prototype 
*/

/*-----------------------------------------------------------------------------------*/
//ВОПРОС: чем отличается объект созданый через функцию-конструктор и обычное создание объекта. 
/*1. Если же оставить функцию-конструктор пустой, то ничем, кроме установленного имени конструктора от которого
	  оздаются объекты, ну и присутствие дополнительного особого метода constructor который создан 
	  для работы с функцией-конструктором как с шаблоном(для удобства).
	  Заполнять придёться каждый раз, что обычный объект, что объект созданый пустым конструктором 
	  Если объетов много то придёться копировать, что создаёт много повторяющегося кода */

/*	Итог: Создать экземпляр(тип объект) может та функция которая имеет дополнительно constructor
	Проще говоря функции ES5 могут создавать объект, ES6 расчитан на работу с классами(которые по сути яввяются функциями)*/

/*ВОПРОС: Для чего создан конструктор.

	Конструктор создан для получения аргументов получения аргументов в функцию, и манипулировать в функции этими даными.
	Можно вернуть какие то даные в переменную через return, а можно положить даные в объект через this, 
	ну а объект создать через new. При обращение к даным через объект, this получает ссылку объекта, заменяя тем самым объект*/

//Использование конструктора по назначению. 1 раз создал и клепай объекты по его подобию

/*ОТСТУПЛЕНИЕ. Объект создаёться ИМЕНЕМ функции только тогда, когда функция не присвоена переменной. 
	Функция это конструктор. Имя функции или имя переменой играют роль названия класса, от которого создан объект. 
	Неименованная функция будет иметь имя той переменной к которой она присвоена. 
	Имена служат для понимания, от какого конструктора или класса создан объект*/
let PersonFun1 = function (name, age, city) {
 	this.name = name;
 	this.age = age;	
 	this.city = city;		}


let object1 = new PersonFun1("Daniel", 30, "NewYork");
	console.log(object1);//просматривая переменную с конструктором всегда увидим структуру кода функции

let object2 = new PersonFun1("Mitchel", 33, "California"); //Преимущество заполненого шаблона, обращение через constructor
	console.log(object2);

/*  Разницы в консоле никакой, но разница в коде появлятсья когда нужно создать больше одного объекта

/*-----------------------------------------------------------------------------------*/
/*ВОПРОС: 
 1.Есть ли разница между созданием метода в объекте и за его пределами
 2.Что если добавить метод обычному объекту и попробовать им пользоваться как функцией конструктором*/ 

let o3 = {
	method1:function (name, age, city){
	this.name = name; 
	this.age = age;
	this.city = city;
	},
	method2(){},//ES6 
	method4 = () => {},
	method3: () => {}//ES6 все новые способы вызова функций не имеют prototype и constructor. всё равно теряется this.даже если
	//его передать через bind
}

o3.method11 = function (name, age, city){//в разделе method отсутствует имя. Можно задать имя, оно появиться. Метод созданый вне объекта без имени через dir остаёться anonymous
	this.name = name; 
	this.age = age;
	this.city = city;
};
o3.method12 = () => {}//ES6 вне объекта стрелочная функция

console.log(o3);
/*Разницы в создании методов в объекте и вне его практически отсутствует. Отличия лишь в имени в свойстве "name": 
  Неименованные методы созданые в не объекта не имеют имени и при обращение непосредственно к ним через dir указываеться anonymous, 
  в то время как созданые в объекте, даже именованные имеют имя*/
 

/*ВОПРОС: Чем отличаеться метод от функции
	Ни чем, это и есть функция, просто она создана в каком-то объекте для выполнения задач этого объекта, поэтому принято называть такую функцию методом*/

//ВОПРОС: Как работать с прототипом
function myFunc1(){};// функция - на борту конструктор(тобишь функция конструктор)
let o_myFunc1 = new myFunc1();// объект созданый конструктором на борту тоже заимел constructor + может иметь методы добавленые в prototype
let oob = {};// обычный объект
myFunc1.prototype.myConstructor = function(){};//добавление своего метода в prototype, для дальнейшего использования на экземплярах
console.dir(myFunc1);
console.dir(o_myFunc1);
console.dir(oob);


/*И так. Функции наследуют __proto__(f) функций, которые наследуют от объектов. Так же на верхнем уровне
  выведена вкладка prototype которая может пополняться пользователем, это как вкладка полезных методов, обратившись к которым можно 
  через экземпляры объектов создаными этой функцией. В этой вкладке уже есть один метод по умолчанию constructor и опять же ссылка 
  указывающая на вкладку  __Object__ с его набором параметров. Это немного запутывает, но структура наследования не сткрыта и устроена так, что
  наследование происходит сверху вниз.*/

/*------------------------------------------------------------------------------------------*/

//ВОПРОС: Как работать с классами

/*Класс по функционалу похож на функцию - конструктор. Всё так же имеется prototype и его можно пополнять. 
  constructor теперь находится с пометкой class (название класса). Это означает что constructor вынесен в свм class
  поэтому класс создаётся без скобок () которые по факту и есть функционал конструктора, теперь они внутри класса с конструктором
  */

/*Немного о классах. Класс не видать в Глобальной ветке он занимает в [[Scope]] отдельный раздел Script к которому имеют доступ каждая созданная функция 
  будь это ES5 или ES6. */
class ss {
	constructor(ddd, ccc){}
}

class ff extends ss{
	constructor(ddd, ccc){}
}


/*Что даёт наследование extends. Ну родительский класс наследует __proto__: function, а дочерние сначала, родителя с его набором 
  методов в объекте prototype, а потом __proto__: function*/
function a(){};

ss.prototype.method_name2 = function(argument){};
a.prototype.method_name = function(argument){};
console.dir(ss);
console.dir(ff);

console.dir(a);
