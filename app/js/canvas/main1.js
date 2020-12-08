let canvas = document.querySelector("#ctx1");
let context = canvas.getContext('2d');
console.dir(context);
/*####---Кривая на canvas---####*/
context.moveTo(0, 330);
context.bezierCurveTo(840, 350, 780, 200, 1200, 200);
context.lineTo(1200, 350);
context.lineTo(0, 350);

let gradient = context.createLinearGradient(0, 350, 1200, 350);
gradient.addColorStop('0', 'tomato');
gradient.addColorStop('.3', 'blueviolet');
gradient.addColorStop('.45', 'deepskyblue');
gradient.addColorStop('1', 'blueviolet');

context.fillStyle = gradient;
context.lineCap = 'square';
context.lineWidth = 10;
context.strokeStyle = gradient;



context.stroke();
context.fill();
context.beginPath();

context.strokeStyle = 'indianred';

context.lineWidth = 5;
context.moveTo(50, 50);

context.arcTo(430, 150, 310, 160, 30); //делает дугу. можно этот трюк с помощью  
context.lineTo(140, 140);
context.arcTo(30, 120, 200, 330, 30);
context.lineTo(330, 260);


context.stroke();
context.beginPath();



function animation(a) {
    console.dir(a);
    let cansel = requestAnimationFrame(animation);
    if (a >= (canvas.width - 100)) {
        cancelAnimationFrame(cansel)
        return
    }
    context.moveTo(100, 100);
    context.lineTo(101 + a, 100);

    context.lineWidth = 10;

    // context.arc(a, 50, 1, 0, 2 * Math.PI);
    context.stroke();
}
context.beginPath();


/*-------Рисовалка-------*/

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mouseup', end);
document.addEventListener('keydown', key); //события клавиатуры вешаються на document.Для других элементов события клавишь предусмотрены для инпутов
let saveCoordinates = [];
let coords = [];

context.lineWidth = 4;
context.strokeStyle = 'black';
context.fillStyle = 'black';

context.lineCap = 'round';
context.lineJoin = 'bevel';

function start(Event) {

    context.moveTo(Event.offsetX, Event.offsetY);
    canvas.addEventListener('mousemove', draw);
}

function draw(Event) {

    saveCoordinates.push([Event.offsetX, Event.offsetY])

    context.lineTo(Event.offsetX, Event.offsetY);
    context.stroke();
    context.beginPath();
    context.moveTo(Event.offsetX, Event.offsetY);

}

function end(Event) {
    canvas.removeEventListener('mousemove', draw);
    saveCoordinates.push('beginPath')
    context.beginPath();
}

function key(Event) {

    if (Event.keyCode == "83") {

        let oldCoords = JSON.parse(localStorage.getItem('coords'));
        coords = (oldCoords) ? oldCoords.concat(saveCoordinates) : saveCoordinates;

        localStorage.setItem('coords', JSON.stringify(coords));
        console.dir("Сохранено");
    }

    if (Event.keyCode == "67") {


        context.clearRect(0, 0, canvas.width, canvas.height);
        localStorage.clear('coords');
        saveCoordinates = [];
        console.dir("Холст очищен");
    }

    if (Event.keyCode == "82") {
        saveCoordinates = [];
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.dir("Воспроизвожу...");
        coords = JSON.parse(localStorage.getItem('coords')) //парсит только stringify

        requestAnimationFrame(animation)
    }

}

function animation(a) {

    if (coords != null) {
        let arr = coords.shift();

        if (arr == undefined) {
            console.dir('функция остановлена');
            cancelAnimationFrame(animation)
            return
        }

        context.lineTo(arr[0], arr[1]);
        context.stroke();
        context.beginPath();
        context.moveTo(arr[0], arr[1]);
        requestAnimationFrame(animation)
    } else {
        console.dir("Изображение не было сохранено");
    }

}

