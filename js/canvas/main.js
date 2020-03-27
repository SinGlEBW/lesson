let canvas = document.querySelector("#ctx1");
//можно передать расзмер в js
// canvas.height = 300;
// canvas.width = 300;
let context = canvas.getContext('2d');

console.dir(context); //не зависимо где происходит вызов, context хранит последнюю информацию о рисовании

let image = new Image();
let screen = image.src = "https://cdn4.iconfinder.com/data/icons/unigrid-flat-basic/90/019_056_ghost_games_pacman-512.png";

// image.onload = function () {
//     let dd = context.drawImage(image, 0, 0, 100, 100);
// }  
/* --Параметры для рисования указываются до отрисовки рисунка */

context.fillStyle = '#456'; //заливка
context.fillRect(30, 150, 50, 50); //рисует прямоугольники. Перевод "Заполнять прямоугольник"
context.beginPath();

context.fillStyle = '#923';
context.fillRect(40, 160, 50, 50); //ещё есит rect(40, 160, 50, 50). что его создать нужно указать fill
context.beginPath();

context.fillStyle = '#234';
context.fillRect(50, 170, 50, 50);
context.beginPath();

context.clearRect(30, 150, 30, 30); //вырезает прямоугольник, делая его прозрачным на canvas

context.strokeStyle = '#575757'; //заливка линий. бордер тоже линия
context.lineWidth = 10; //ширина линии
/* Толщина линии, установленая на контуре прямоугольника, делиться пополам между внутреней частью и внешней
   поэтому может показаться непонятное поведение бордера в прямоугольнике */
context.strokeRect(20, 20, 50, 50); //2й тип прямоугольника. Пустой.Можно 
context.beginPath()

context.lineWidth = 1;
context.strokeStyle = '#890';
context.strokeRect(0, 250, 50, 40);
context.beginPath(); //метод указывает что действие над рисунком закончены и нужно сбросить координаты

//####---Линии и дуги--####
/*--линия имеет начало и конец-- */
/*
Рисование происходит последовательно линия за линией. closePath прерывает этот путь и начальной точкой становиться
или новая или старая moveTo координата
*/
context.moveTo(1000, 30); //начало точки рисования
context.lineTo(900, 200); //ведёт линию от точки moveTo до указаной точки в lineTo
context.lineTo(1100, 200);
context.closePath(); //завершив последовательность рисования, точки начала и конца смыкаються 

context.moveTo(1150, 10);
context.lineTo(1050, 114)
//--цвета цказываются до вызова stroke
context.fillStyle = "tomato"; //красит заливку
context.strokeStyle = 'teal'; //красит линию
context.lineWidth = 5;

context.stroke(); //метод активирует рисование линии
context.fill(); //метод активирует заливку, если есть что заливать.
context.beginPath();

context.moveTo(700, 30);
context.lineTo(800, 30);
context.lineTo(800, 200);
context.lineWidth = 30;
context.lineCap = 'square'; //стиль видимой части начала и конца отрезка. butt | round | square
context.lineJoin = 'miter'; //стиль соединения линий между собой. miter | round | bevel
context.miterLimit = 3;
/*
каждый угол имеет какой-то градус и толщину. эта толщина умеет значение. Уменьшая miterLimit
добиваемся среза как bevel. Тонкой настройки нет просто срезаеться сначала самый острый.
Последним срезаеться самый тупой угол.
*/
context.closePath();
context.stroke();
context.beginPath();
//рисование окружности arc x/y это центр окружности


context.arc(50, 110, 25, 0, Math.PI * 2);
context.fillStyle = '#345';
context.fill();
context.beginPath();

/*
(Math.PI / 180) * 360 = 3.14 / 180 = 0.017 * 360 = 6.28 радиан. Вообщем можно указать просто 2*PI.
Такая формула просто делает сдвиг в радианах, но контролируем этот поворот в градусах т.к. человеку удобней ориентироваться в градусах
В программировании углы измеряються в радианах. Круг 360 градусов или 6.28(2*PI) радиан.
6.28 / 360 = угол состоящий из маленькой доли радиан в 1 градусе.
3.14 / 180 высчитываеться просто из половины круга, а не с целого.
360 / 6.28 = получаем угол 57.32 градусов в 1 радиане 
*/

/*####---Способы сделать круг---####*/

//Способ кругом без формул

context.arc(100, 110, 0, 0, 0);

context.strokeStyle = '#178';
context.lineCap = 'round';
context.lineWidth = 50;
context.stroke();
context.beginPath();
//Способ линией

context.moveTo(150, 110);
context.lineTo(150, 110);

context.strokeStyle = 'cyan';
context.lineWidth = 50;
context.lineCap = 'round';
context.stroke();
context.beginPath();
/*#######-----Кривые Безъе----########*/


context.moveTo(200, 30);

context.lineWidth = 10;
context.lineCap = 'butt';
context.quadraticCurveTo(350, 150, 500, 30);
context.lineJoin = 'miter';
context.miterLimit = 2;


context.lineTo(500, 100);
context.quadraticCurveTo(350, 220, 200, 100);
context.lineTo(200, 200);
context.quadraticCurveTo(350, 290, 500, 200);

context.bezierCurveTo(500, 60, 700, 60, 700, 200);

//context.closePath();
//context.fill();
context.stroke();
context.beginPath();


context.arc(500, 60, 7, 0, 2 * Math.PI);
context.arc(700, 60, 7, 0, 2 * Math.PI);
context.fill();
context.beginPath();

context.globalCompositeOperation = "xor";
context.globalAlpha = .7; //прозрачность


context.fillRect(860, 112, 70, 70);
context.moveTo(900, 100);

context.fillStyle = 'red';
context.fillRect(980, 122, 20, 30);
context.beginPath();

/*####---Текст и градиент----#####*/
context.font = '900 50px Helvetica'; //font-weigth, font-size, font-family. толщина не обязательна 
context.lineWidth = 5;
context.fillStyle = '#678';

let gradient = context.createLinearGradient(400, 300, 700, 300);
gradient.addColorStop("0", "blue");
gradient.addColorStop("1", "tomato");
context.strokeStyle = gradient;

context.globalCompositeOperation = 'xor';
//иногда требуеться воспользоваться свойством чтобы выровнять текст т.к центрирование просходит с левого верхнего угла
//context.textAlign='center';
context.strokeText("SinGlEBW", 460, 300);
context.fillText("SinGlEBW", 460, 300);





canvas.addEventListener('mousedown', (Event) => {
   
});

/*###--Немного о дополнительныйх свойствах---####*/

/*
Свойство globalCompositeOperation влияет на рисунки и его местоположения. 
Некоторые параметры этого свойства должны находиться в нутри одного рисунка чтобы применить свои 
свойства на это изображение. Неправильное расположение этого свойства может неправильно или совсем не отображать результат.
Для понимания начала и конца изображения, есть методы beginPath который указывает что действия над рисунком
закончены.

 "source-over" - по умолчанию. Элементы накладываються друг на друга в последовательном создании их
 "source-in" -  тот-же случай как в "destination-in" только цвет остаёться верхнего рисунка 
 "source-out" - непонятное поведение. последнее изображение остаётся
 "source-atop" - обрезает личнее накладываемого рисунка если он выходит за границу нижнего рисунка
 
 "destination-in" - При наложении изображений друг на друга св-во обрезает лишнее оставляя часть наложения и красит в цвет нижнего рисунка 
 "destination-out" - вырезает форму рисунка если он был наложен на другой рисунок
 "destination-over" - перемещает рисунок под изображение. Типо z-index: - 1

 "lighter" - рисунок так же остаёться под элементов добавляется смешавание цвета, что свособствует отображению нижнего рисунка на поверхности верхнего
 "copy" - очищает поток оставляя последний рисунок
 "xor" - меняет состояние.
 */
/*####----Анимации в html5----####
  ####----Свойство requestAnimationFrame----####
  
  
  вы
  */

//принимает функцию которая должна анимироваться. Метод будет наперёд подготавливать эту функцию. Типо заранее подготавливать кадр


//context.createLinearGradient(x1, y1, x2, y2);





