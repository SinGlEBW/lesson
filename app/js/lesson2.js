/*странное поведение свойства element.ChildNodes Имея в документе div и два дочерних p элемента, запрашивая дочерние элементы, получаем массив 
(childNodes[1] - можно выборочно получать элементы)
с дополнительными промежуточными элементами в виде надписи TEXT которые не являются (текстом) контентом div и p. 
Пример 
	<div> 
	 [0] text   
		[1]<p>  [2]text</p>
		[3]<p>  [4]text</p>
	</div>  К томуже если попытаться присвоить текст к [0] массиву через innerHTML ничего не выйдет */
/*
После выбора родителя выбрать дочерние элементы можно несколькими способами: 
Перемещение в родителе
			Выбрать по id  или обращатья через родителя:
			childNodes[нужный узел]//получить все узлы
			firstChild - 1й дочерний узел(не забывает о непонятном явлении в массиве которого содержится надпись ТЕХТ)
			lastChild - последний элемент
			nextSibling - следующий дочерний элемент, сдвиг в +
			previousSibling - предыдущий дочерний элемент, сдвиг в -

			parentNode - получить родительский элемент(обращаться через дочерний элемент)
		 */


//ЗАДАНИЕ 1. Создать и добавить элемент 
	var parent = document.getElementById('wrap');//выбранный родитель
	var span1 = document.createElement("span"); //созданный элемент
		
	parent.insertBefore(span1, parent.firstChild);//какой то баг. установив parent.любая буква элемент добавиться в конец списка
// insertBefore принимает аргументы дочерних элементов. 
		 
	var h2 = document.createElement("h2");//ещё созданный элемент
	parent.appendChild(h2);//добавляет в конец списка к дочерним элементам
//	console.log(parent.childNodes);

//ЗАДАНИЕ 2. Добавить текст в созданный элемент 
		
	document.createTextNode("Страница 2");
	parent.childNodes[4].innerHTML = 'Страница2'; //чтобы не получать лишние текстовые узлы использовать children вместо childNodes
	parent.children[4].innerHTML = 'Страница4';//положил выше children[4] = childNodes[8]
//т.к.childNodes возвращает ещё и массив раздела "текст"(который не отображает текст если ему присвоить)
//то я решил отфильтровать по тегу p и помешать туда текст для вывода на экран
		function searchTagName(childNodes){
			for(var x = 0; x < childNodes.length; x++){
				if(childNodes[x].nodeName == childNodes[2].nodeName){
				console.log(childNodes[x]);
					
		}}}


/*Интересный факт: Объект NodeList — это коллекция узлов, возвращаемая такими 
	методами, как Node.childNodes и document.querySelectorAll и он не является массивом
	не смотря на то что имеет индексы. Но перебрать и закинуть в массив можно через forEach.NodeList*/


//Функция для проверки содержания объекта. Лучше использовать console.dir если нужно получить список методов 
		/*	function objectSandM(obj) {
					for(var key in obj){
						console.log(obj[key]);
					}}
	  */

//ЗАДАНИЕ 3. Клонирование и удаление объектов

/*перемещать по элементам можно так: 
	firstElementChild.firstElementChild   или
  children[0].children[1].children[0].children[0].children[1] и т.д.
  //НЕ ВСЕ ЭЛЕМЕНТЫ МОЖНО ИЗМЕНИТЬ В JS, но можно добавлять свойства и методы
  Все объекты содержат наследование в этом и заключаеться DOM
  document - содержит наследование: __proto__: HTMLDocument <- __proto__: Document <- __proto__: Node  <-  __proto__: EventTarget <- __proto__: Object
  document.body - __proto__: HTMLBodyElement <- __proto__: HTMLElement <- __proto__: Element <- __proto__: Node  <-  __proto__: EventTarget <- __proto__: Object
  
  Каждый тег содержит свой прототим __proto__: HTML(название тега)Element и далее HTMLElement -> Element -> Node -> EventTarget и на конец __proto__: Object
  методы и свойства общие у элементов.

  #text - текстовый узел имеет прототип __proto__: Text <- __proto__: CharacterData  <-  __proto__: Node и т.д.
  */

parent.appendChild(parent.children[6].cloneNode());//вставка клонировананного h1
parent.removeChild(parent.firstElementChild);//удаление span
parent.childNodes;//проверяю результат


// цикл чтоб не очищать по отдельности узлы текста-коментария. Если это действительно коментарий то узел будет иметь #coments, а не #text
for(var n = 0,nameTextComents = "#text"; n < parent.childNodes.length; n++){
	if(parent.childNodes[n].nodeName == nameTextComents){
			parent.childNodes[n].textContent = "";
	}}

//document.getElementById('wrap'); document.querySelector('#wrap'); - тоже самое
console.log(document.getElementById('wrap').childNodes);//console.log(document.querySelector('#wrap').childNodes); - тот же результат


/*Обращаясь к тегам через quverySelectorAll('span') можно встретиться с такой проблеммой
	что при добавлении какого либо тега в дальнейшем, quverySelector().length может не поменяться */

var parent1 = document.querySelector("#wrap");//Вызов родителя
var p1 = document.querySelector('#idP'); // Вызов дочернего (1й элемент можно было выбрать firstElementChild), а ещё т.к. мне нужен 2й элемент можно было children[1] вообщем способов куча.
var input = document.createElement('input');//создал input
input.setAttribute('type', 'password');//добавил атрибут 

parent1.insertBefore(input, p1.nextElementSibling); //добавил в родителе инпут перед 2м элементом parent.children[1] или id заранее присвоить 2му элементу

console.log(parent1);

p1.onclick = function(){
	if(input.disabled == true){
		input.disabled = false;
	}else{
		input.disabled = true;
	} }




