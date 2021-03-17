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


