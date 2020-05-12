let nameInput = document.querySelector('#name');
let passInput = document.querySelector('#password');
let button = document.querySelector('#button1');
let spanInfo1 = document.querySelector('#info1');
let spanInfo2 = document.querySelector('#info2');
let infoServer = document.querySelector('#responseServer');

/*Как предавать в addEventListener параметр, если требуется*/

button.addEventListener('click', Ajax()); //добавить вызов и в неё передать функцию


nameInput.addEventListener('input', loginEnter);
passInput.addEventListener('input', passEnter);

function Ajax(callback){
    let func = callback || function(data){};/*Так работают заглушки. Если ничего не передано в переменную аа - то выбереться 2е значение */
    console.dir(dd);
        /*функция отработает 1 раз получит callback который мы засунем в функцию которая возвращается слушателю события. При событии 
        слушатель добавляет скобки функции Ajax()() -  эти скобки передаются как вызов в возвращаемую функцию т.к. function(){}() - это вызов
        При добавлении скобок добавляеться ещё параметр Event. т.к. функция в функции можно сделать замыкание.
        Замыкание это когда передаваемый аргумент 1й функции передаёться сразу же в возвращаемую функцию. Передать через аргумент 2й функции не получиться */
    return function(Event){
            /* */
            func();
    }
}
/*Данные полученые с сервера приходят строкой что бы получить данные в виде массива нужно парсить в массив */
