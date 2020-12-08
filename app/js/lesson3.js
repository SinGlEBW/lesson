// СОБЫТИЯ  и обработчик
var wrapParent = document.getElementById("wrap");
wrapParent.firstElementChild.addEventListener("click",myFunction);//показывает undefined т.к. событие не активировано

function myFunction(){
	 if(wrapParent.firstElementChild.style.backgroundColor == ''){
	 	wrapParent.firstElementChild.style.backgroundColor = 'red';	
	 }	else {
	 	wrapParent.firstElementChild.style.backgroundColor = '';
	 }
}

console.log(wrapParent.appendChild(document.createElement("h2")));
console.log(document.body.innerHTML);//добавленные элементы отображаются в консоле




/*Цитата мудреца из интернета: Если ограничения и условия описываются как "коробка", 
  то хитрость в том что бы найти именно коробку... Не думайте о чем то глобальном - найдите коробку.
Что и описывает данный пример не поддающийся логике.
     wrapParent.firstElementChild.onclick = function () {
        if(this.style.backgroundColor)//this имееться ввиду объект на котором функция. Строка логически сокращена, полная запись (this.style.backgroundColor == '')
          this.style.backgroundColor = "";   
        else
           this.style.backgroundColor = "red";
      }
*/




var divItem = document.getElementById("item");

divItem.onmousemove = function (v) {
	divItem.innerHTML = v.pageX + ':' + v.pageY;
}

var button = document.getElementById('button');

// button.addEventListener('click', func);
// function func(event) {
// 	if (event.ctrlKey) {
// 		alert('нажат Ctrl');
// 	}
// 	if (event.altKey) {
// 		alert('нажат Alt');
// 	}
// 	if (event.shiftKey) {
// 		alert('нажат Shift');
// 	}
// }
function drop(ev){
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
}

function allowDrop(ev){
	ev.preventDefault();
}

function drag(ev){
	ev.dataTransfer.setData("text", ev.target.id);	
}
// console.dir(window);
//  //Вычисляемые имена свойств.
//  //1й пример
// var name = 'tegName';
// var a = {
//    // name: 'tegName', // такой вариант не работает для [name]
// 	[name]: 'ss'
// }
// //2й пример
// var i = 0;
// var b = {
// 	['foo' + ++i]: i, // foo конкатенирует (1+0): 0 
// 	['foo' + ++i]: i // foo (1+1): 2 . Вообщем по сути я должен догатываться к чему обращаться
// }
// //3й пример
// var param = '22size';
// var config = {
// 	[param]: 12,
// 	['mobile' + param.charAt(0).toUpperCase() + param.slice(1)]: 4
// }
// console.log(config.String(22)+size);



