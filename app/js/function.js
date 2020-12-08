/* eslint-disable
	* Замыкание что это и в чём смысл? И так функция это тот инструмент который может выполнять кучу раз
	* одну и ту же задачу посредством вызова. Что мы можем вернуть?
	* - Примитивы, объекты с примитивами, функцию или объект методов. - это всё этап возвращения который мы описываем в самой функции
	* Предположим мы решили вернуть объект с методами при вызове нашей функции, что же они должны делать? Ну наверно мы хотим что бы 
	* они выполняли разную работу и раз мы в нашей функции определяем поведение каждой такой функции то 
	* можем:
	* 	а)описать поведение для каждого метода
	* 	б)мы можем взять поведение из вне и передать хоть каждому методу 
	* 		и нам не придётся писать одно и тоже.
	* Таким образом мы передав одно поведение, это поведение могут получить все методы посредством замыкания
*/
function copyMet(data){
	function f1(){
		console.dir(data);
	}
	function f2(){
		console.dir(data);
	}
	function f3(){
		console.dir(data);
	}
	return {
		met1: f1,
		met2: f2,
		met3: f3
	}
}
copyMet(2)//получили объект методов одним вызовом

function copyMet(data){
	return	function f1(){
		console.dir(data);
	}
}
copyMet(2)//
copyMet(3)//
copyMet(4)//
/*
	Какие у нас варианты? Мы можем получить кучу методов в объекте одним вызовом
	или совершать кучу вызовов для получения одного метода переопределяя на каждом вызове поведение
	Всё это зависит от того как реализован метод.

	Передавать в замыкание мы так же можем как примитивы так и объекты и функции.

	Что нас должно натолкнуть на мысль при создании таких функции?
	Необходимость подготовить много методов или один. И этот метод будет вызываться мной
	для определённых поправок, а результат возвращаемого метода (то есть cb)
	будет вызываться в любом другом месте. Методы должны быть предварительно продуманы
	Должны ли они что-то принимать или возвращать когда ими будут пользоваться. 

Пример может быть таким:
	Например мы уже знаем некую функцию которая что-то уже делает, но мы хотим 
	этот функционал использовать в своих методах, мы можем просто передать callback.
	
*/

function copyMet1(callback){
	function f1(param1){
		let data = callback();
		console.dir(param1 + data)
	}
	function f2(param1){
		let obj = callback(param1);
		console.dir(obj)
	}
	function f3(param1){
		let data = callback(param1.m1);
		console.dir(param1.m1 + data)
	}
	return {
		met1: f1,
		met2: f2,
		met3: f3
	}
}

let ob = copyMet1(l1);
ob.met1(4)
ob.met2(4)
ob.met3({m1: 16})

function l1 (p = 4){
	return p
}
/*
	Итого: нами передан функционал, а методы по разному описаны и возвращают разные результаты использовав
				 один и тот же функционал.
*/

function copyMet1(data){
	return function f1(ev){
		let { param1, param2 } = data;
		console.dir(param1 + param2 + ev)
	}
}

let newMet1 = copyMet1({param1: 4, param2: 8});
let newMet2 = copyMet1({param1: 5, param2: 6});
newMet1//где-то вызывается
newMet2//где-то вызывается







/*
В чём задумка создавать функцию которая возвращает другую функцию? Мы знаем что функция способна возвращать разные данные
много или методом при вызове которых будет чудо или один метод. На что рассчитывают возвращая функцию?
Нужно понимать что как первого уровня функция может вернуть объект методов, так и второго уровня и т.д в глубину
В первых примерах мы рассчитывали создать кучу методов которые в последствии кто-то дёргает и получает результаты
Но иногда требуется один функционал передать в определённое место где будет вызов с передачей параметров
и вот на том уровне нам то и понадобиться вернуть большой функционал 

function getMyThunk2 (data) {

	function f1 (dispatch) {
		let a1 = dispatch(data.m1)
		let a2 = dispatch(data.m2)
		let a3 = dispatch(data)
		return {
			dat1: a1,
			dat2: a2,
			dat3: a3,
			
		}
	}
	return f1
}

Из-за нового синтаксиса ES6 становиться визуально немного запутанней,


let getMyThunk3 = (data) => {

	return (dispatch) => {
		let a1 = dispatch(data.m1)
		let a2 = dispatch(data.m2)
		let a3 = dispatch(data)
		return {
			dat1: a1,
			dat2: a2,
			dat3: a3,
		}
	}
}

Можем напрямую в объект передать методы
let getMyThunk3 = (data) => {

	return (dispatch) => {
		return {
			dat1: dispatch(data.m1),
			dat2: dispatch(data.m2),
			dat3: dispatch(data),
		}
	}
}

ES6 предусматривает запись без return. Запись с одним возвращаемым данным или же с несколькими но перечислять и нужно оборачивать в ().
Последний из перечисленных будет подразумеваться возвращаемым. 
можно опустить тело функции{} и return. Когда возвращаем объект, что бы не было путаницы у компилятора с телом функции 
нужно оборачивать объект в (). Запись становиться. 

let getMyThunk2 = (data) => (dispatch) => ({
			dat1: dispatch(data.m1),
			dat2: dispatch(data.m2),
			dat3: dispatch(data),	
})

*/


//Передача контекста
let method = (...text) => {
	console.dir(this);//у стрелочной функции нет контекста
	console.dir(text);
}
function method1 (...text) {
	console.dir(this);
	console.dir(text);
}

method.apply(nameO, [14, 'st'])
method1.apply(nameO, [14, 'st'])


// такой вариант записи может иметь возможность смотреть на контекст this
let met = (text) => `log ${text}`;

let fp = new Proxy(met, {
   apply(target, thisArgs, argsArr) {
      console.dir(target);
  		console.dir(thisArgs);//переданный контекст
			console.dir(argsArr);
			console.dir(this);//здесь он своего объекта 
			
      return target(argsArr)
   },
});

console.dir(fp.apply(Obj,['tex',11]));//типа передали
// или по старинке всё в одной функции

function method1 (...text) {
console.dir(method1);
console.dir(this);
console.dir(text);
return `log ${text}`
}

console.dir(method1.apply(nameO, [14, 'st']));
/*
   Разница в том что использовав инструмент apply через proxy мы имеем как бы промежуточный функционал
   который связывает переданные данные и переданный таргет. Таким способом стрелочную функцию можно снабдить
   контекстом
*/
"Методы объекта Handler"
apply(target, thisArgs, argsArr)//
construct()//
defineProperty()//
deleteProperty()//
enumerate()//
get()//
getOwnPropertyDescriptor()//
getPrototypeOf()//
has()//
isExtensible()//
ownKeys()//
preventExtensions()//
set()//
setPrototypeOf()//

