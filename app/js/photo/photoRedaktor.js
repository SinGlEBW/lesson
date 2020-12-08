let imageWraper = document.querySelector(".middle-block__image-wraper");
let circle = document.querySelector(".middle-block__circle");
let circleItem = document.querySelector('.circle-item');
let position_L, position_R, position_Up, position_Down;
let objectEventMouseDown = {};

circle.style.marginLeft = localStorage.getItem('positionCircle-X');
circle.style.marginTop = localStorage.getItem('positionCircle-Y');

circle.onmousedown = action;
document.onmouseup = notActive;

async function action(Event) {

    objectEventMouseDown = await Event; //если таргет малый круг, то данные неправильно обрабатываются, поэтому ниже указал условие
    if (Event.target.id == "js-marker") {
        document.onmousemove = eventMouseMove;
    }

}

function notActive(Event) {
    document.onmousemove = null;
}

function eventMouseMove(Event) {
    Event.preventDefault(); //обязательно иначе события некорректно себя ведут
    //этот участок кода не работает если target в событии mousedown малый круг
    if (Event.buttons == 1 && Event.target.id == "js-marker") {

        position_L = Event.pageX - imageWraper.offsetLeft - objectEventMouseDown.offsetX;
        position_R = (imageWraper.offsetLeft + imageWraper.offsetWidth) - Event.pageX - (circle.offsetWidth - objectEventMouseDown.offsetX);
        position_Up = Event.pageY - imageWraper.offsetTop - objectEventMouseDown.offsetY;
        position_Down = (imageWraper.offsetTop + imageWraper.offsetHeight) - Event.pageY - (circle.offsetHeight - objectEventMouseDown.offsetY);

        if (position_L >= 0 && position_R >= 0) {
            localStorage.setItem('positionCircle-X', position_L + 'px');
            circle.style.marginLeft = position_L + "px";
        }

        if (position_Up >= 0 && position_Down >= 0) {
            localStorage.setItem('positionCircle-Y', position_Up + 'px');
            circle.style.marginTop = position_Up + "px";
        }

    }

}

/*----------Элемент на окружности--------------*/

imageWraper.onmousemove = move;


let xNull, yNull, xFirst, yFirst, radius, hypotenuse;

let resizeRadius;

let a, b, c;

function move(Event) {
    Event.preventDefault();
    //Центр большого круга 1я точка
    xNull = circle.getBoundingClientRect().left + circle.offsetWidth / 2; // отступ с лева до центра круга 
    yNull = circle.getBoundingClientRect().top + circle.offsetHeight / 2; // отступ с верху до центра круга
    //Ивент 2 точка относительно центра круга
    xFirst = Event.clientX - xNull; // отступ ивента от левого края wrap
    yFirst = Event.clientY - yNull; // отступ ивента сверху края wrap
    //Динамически изменяющаяся гипотенуза
    hypotenuse = Math.sqrt(Math.pow(xFirst, 2) + Math.pow(yFirst, 2)); // гипотенуза ивента от центра круга
    /*###--подготовка дочернего элемента--### */
    //Перемещение элемента в центр круга 
    

    //Установка радиуса кругу. можно найти радиус через деление круга / 2, ноя пошёл гипотенузой


    radius = Math.sqrt(Math.pow(circle.clientWidth, 2) + Math.pow(circle.offsetHeight, 2)) / 2;
    center = radius / 2; //помещение дочернего элемента в центр родителя

    resizeRadius = radius;
    //Корректировка положения малого круга
    radius = radius - circleItem.offsetWidth;


    if (Event.target.id == "js-active") {
        circleItem.style.left = center + radius * (xFirst / hypotenuse) + 'px';
        circleItem.style.top = center + radius * (yFirst / hypotenuse) + 'px';

    }





    if (Event.target.id == "js-resize" && Event.buttons == 1) {

        radius += hypotenuse - radius;



        if (!(circleItem.getBoundingClientRect().right == imageWraper.getBoundingClientRect().right) &&
            !(circleItem.getBoundingClientRect().left == imageWraper.getBoundingClientRect().left)
        ) {

        }


        console.dir(Event.clientX - objectEventMouseDown.clientX);
        // console.dir(Event.clientY - objectEventMouseDown.clientY);


        circleItem.style.left = center + radius * (xFirst / hypotenuse) + 'px'; //почти рабочие решения
        circleItem.style.top = center + radius * (yFirst / hypotenuse) + 'px';
        //   circle.style.width =   center +  radius + 'px';
        //   circle.style.height =  center + radius + 'px';

    }

}


b = new DOMRect(100, 100, 100, 100);
circleItem.getClientRects();
circle.getClientRects()


/*===Для определения угла нужно найти гипотенузу ивента которая изменяеться относительно центра круга===*/
/* пробую без Page найти отбросить всё до центра */
/*===Чтоб искать угол отклонения в 1ю очередь нужно что бы ивент воспринимал центр круга как нулевая точка,
 для этого нужно из ивента повычитать лишние расстояния до центра круга
 Но ивент по разному себя ведёт на разных таргетах возможно лучше использоваться page, а не offset */
//от края элемента - бордер - изменяемое значение по мере передвижения круга



/*
       offset - это полный размер елемента 
       client - это внутрений размер елемента
*/