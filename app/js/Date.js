let date = new Date();
console.dir(date);

/*
    Немного о дате. Что значит эпоха UNIX  1 января 1970 года 00:00:00 GMT,
    как это вообще понимать и почему я это должен знать.
    При обращении new Date() мы получаем локальное время, оно по некоторым причинам может даже не совпадать
    для этого его можно отстроить, я пока не в даюсь в подробности.
    Но если я хочу пердавать в Date какое то значение в миллисекундах и получить из этого 
    дату, вот тут то я и должен ориентироваться от 1 января 1970 года 00:00:00 + то что
    я собираюсь добавить в милисекундах.
*/

let date1 = new Date();
console.dir(new Intl.DateTimeFormat().format(date1));//преобразует в формат dd.mm.yyyy

let date = new Date();
date.getTime();//число миллисекунд, прошедших с 1 января 1970 года
date.getSeconds();//секунды
date.getMinutes();//минуты
date.getDay();//номер дня в неделе. Неделя в js c 0(воскресенье) до 6(суббота).
date.getDate();//день как положено
date.getMonth();//месяц 0(январь) - 11(декабрь)
date.getFullYear();//год
//есть набор set методов для установки значений
console.dir(new Intl.DateTimeFormat('de-DE', {}).format(date));
/*
locales параметр в DateTimeFormat
'ru' -  26.8.2020 с использованием options среда, 26 августа 2020 г.
'de-DE' - формат такой же как и русский. При использовании options всё ра немецком
'en-US'	-	8/26/2020 В американском английском
'en-GB'	-	26/08/2020 В британском английском
'ko-KR'	-	2020. 8. 26. В корейском 
'ar-EG'	-	٢٦‏/٨‏/٢٠٢٠ В большинстве арабо-говорящих стран

не обязательный options. значение по умолчанию. year, month и day = "numeric".

weekday - дней недели. значения "narrow", "short" и "long".
era - эра. значения "narrow", "short" и "long".
year - лет. значения "numeric" и "2-digit".
month - месяцев. значения "numeric", "2-digit", "narrow", "short" и "long".
day - дней. значения "numeric" и "2-digit".
hour - часов. значения "numeric" и "2-digit".
minute - минут. значения "numeric" и "2-digit".
second - секунд. значения "numeric" и "2-digit".
timeZoneName - названия часовых поясов. значения "short" и "long".
*/
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
console.dir(new Intl.DateTimeFormat('Ru', options).format(date));


// let t0 = performance.now();
// console.log(makeHash('Peter'));  // Плохая идея так проводить результаты выполнения функций за время! Нужно минимум console.log
// let t1 = performance.now();
// console.log('Took', (t1 - t0).toFixed(4), 'milliseconds');//хватит одного. выше значение нужно передать

 