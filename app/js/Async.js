/*
Async - асинхронное исполнение функций, эти функции выполняют 2 действия. 
        1 выходят из основного потока последовательности выполнения кода и попадают в цикл Event loop. 
        2 Код в цикле Event loop выполняется так же последовательно.
        
Sync - синхронное исполнение, это значит пока не выполниться эта функция, приступать к выполнению другой компилятор
        не будет.

  
      Что бы понять Promise нужно думать о том что внутри класса promise непосредственно в callback 
      описывается какой-то код и если мы ходим этот код дополнить куском кода то просто вызываем res.
      Всё что в then это и есть тот участок который подцепиться. Каждый класс промис по сути может вызывать только
      1й блок then или catch. Что бы одним вызовом resolve можно было вызывать кусок за куском кода,
      то есть then за then'ом нужно возвращать then промис, тогда можно будет на следующем этапе его вызвать    
    
      Сам класс Promise показывает [[PromiseValue]]: что возвращает последний блок then. Обращение к этим данным 
      осуществляется через then. Так экземпляр не рассчитан на случаи где вызываются методы по событию автоматически
      да ещё и передаются аргументы.
    

        
Promise Принимает функцию (Функция исполнитель) которая отрабатывает при определении объекта. Эту функция принимает 2 параметра. Параметры это callback функции.
В Promise может отработать одна функция, та которая встречается 1й.
а уж какая функция должна отработать 1й и какие задачи будет выполнять эта функция будет зависит от программиста.
Обычно 1 параметр вызывают под положительный результат, а 2й под отрицательный. Если заглянуть в Promise, 
то 1й аргумент будет иметь статус "resolve", 2й "reject", без вызова функций статус "pending".
Нужно создавать условие какая функция должна отработать. После того как создали условие по которому та или иная функция вызовется, нужно передать прототип этим callback'ом.
then отвечает за передачу прототипов. Можно передавать через запятую и для 2го параметра который отвечает за статус reject.
Метод catch создан для передачи callback 2му аргументу, вообщем отвечает только за статус reject и ни как не связан с resolve.

    А что если мы ходим сделать несколько действий с положительным результатом?Хотим чтоб этот результат побывал не в одной функции передаваемой в then, а в нескольких?
    В Promise вызывается callback функции одна и мы по можем привязывать новые прототипы, через then.*/
/*resolve и reject встроены в js. Это сразу не заметно, но если попробовать вызвать callback в любой функции то она потребует от нас получить прототип 
  как только запустим функцию. Промис же не спрашивает. Это как заглушка. Мы передаём свой прототип, я так понимаю. */
/*Важно понимать: resolve и reject это всё условности. Смысл заключается в том, чтобы выполнять какие, то действия при отработке одно функции,
и другие действия при отработке другой функции И все обращения к Promise будут выполняться последовательно(то есть асинхронно).
Но что бы эта асинхронность была, то запросы нужно строить с одним обращением к объекту и передавать новый запрос из предыдущего then новому then.
Вот только передавать нужно Promise а не значение */
/*
var prom = new Promise(
    (f1, f2) => {
        var Random = Number((Math.random() * 100).toFixed(0));
        if (Random > 50) {
            f1(Random);
        } else {
            f2(Random);
        }

    });
    */
/*И так как мы уже знаем что reject и resolve это условности и по факту отрабатывает одна из функций, то мы можем
  иметь такую цель: На каждом запросе у нас есть по 2 ответа, выбран должен только один ответ */


// prom.then((int)=>{console.log(int + i1); return prom},
//           (int)=>{console.log(int + i2); return prom})
//     .then((int)=>{console.log(int + i3);},
//           (int)=>{console.log(int + i4);})

/*
prom.then((int) => {
        console.log(int);
        console.dir(prom);
        return prom
    })
    .then((int) => {
        console.log(int);
        return prom
    })
    .then((int) => {
        console.log(int);
        return prom
    })
    .catch((int) => {
        console.log('Ошибка');
    })
*/
/*В чём же смысл catch. Так как состояние Reject всё же подразумевает обработку ошибок, но мы использовали обработку ошибок просто для вывода числа.
  Что происходило с числами. Если возвращался статус resolve, то все then выполнялись с этим статусом друг за другом, если reject то происходило тоже самое.  
  То есть статус определяется единожды для всех обращений через then. 
  Я так понимаю что статус может меняться при каждом обращении. Указание каждому запросу своего обработчика ошибок не выводит из под контроля все запросы.
  Если их будет куча и где то в середине будет запрос с ошибкой, то в случает с обработкой на каждом этапе код продолжит работать, а в случае с catch
  код начнёт передвигаться по коду и будет искать обработку ошибок до самого конца.
  Указание каждому запросу своего обработчика даёт возможность обработать 
  Если всё же использовать reject как оповещение об ошибке, то можно указать единожды */


/*
    Чем отличается синхронный код от асинхронного. 
    Во 1х это путает людей т.к. понятие в жизни Синхронность это одновременно, а асинхронно последовательно как минимум.
    Это очередной раз кто-то объебался с названием ну да ладно.
    Синхронный код означает типа выполнение кода последовательно.
    Если бы этого не было, то при использовании каких либо функций мы не смогли бы корректно пользоваться результатами этих функций. 
    Выполнение дальше не продолжиться пока не будет выполнен предыдущий код скажем так. 

    Но в js код не жёстко привязан к последовательности он понимает когда можно параллельно запускать другой код. Здесь уже
    подключается Promise 
*/


/* Интересные эксперименты */
let arr = [20,21,22,23];

arr.forEach((item) => {
   console.dir(1);//отрабатывает
   setTimeout(() => console.dir(item), 2000);//создаётся в объекте window
})
// /*
//    Каждая итерация создаст в объекте window функцию setTimeout для каждого item'a
//    вывод будет через 2 секунды мгновенным для всех item, т.к. время запускается при
//    создании 
// */
/*
   Promise на борту имеет логику которая способна возвращать или resolve или reject. Что-то одно. Так что 
   где-то в недрах кода мы имеем return resolve или return reject
*/
let testPromise = new Promise((res, rej) => {
   res(1)
   rej(new Error('Ошибка'));
})
testPromise//Promise
.then((data) => {data = 14; return data} )//или вернуть промис testPromise
.then((data1) => {console.dir(data1)})
// и т.д
.catch((err) => {console.dir(err)})//в случае не предвиденной ошибки 
console.dir(testPromise);

/* В конструкторе Promise мы передали данные в resolve и создали 1 экземпляр. На этом работа конструктора закончена. 
   Данные уже находятся в экземпляре. Вызывая 1й then мы передаём callback через который мы ходим забрать из resolve данные.
   Вызывая 2й then мы ничего не получим т.к. что бы мы имели там данные нужно из 1го then передать сразу из параметра данные или
   передать тот же Promise к которому обращаемся, если хотим работать с изначальными данными.
   Такой способ даёт возможность нам получить только один кусок входных данных и как то их видоизменять и гонять из then к then.
   А нам нужно имитировать изменения данных в конструкторе. Т.к. мы воздействовать без дополнительных сил на конструктор не можем нам 
   нужно Promise обернуть функцией и передавать данные через замыкание. 
   (В чём же преимущество если мы может из глобального пространства сразу передать данные в resolve?)
*/

let arr1 = [15,16,17,18];

let funcPromise = function(arr){
   return new Promise((res, rej) => {
      console.dir(2);
      res(arr)
      rej(new Error('Ошибка'));
   })
}

funcPromise(arr1)
.then((data) => {console.dir(funcPromise(arr1)); return funcPromise('new Data')} )
.then((data1) => {console.dir(data1)})
// и т.д
.catch((err) => {console.dir(err)})//в случае не предвиденной ошибки 

/*
   Преимущество в том что на основе одной подготовленной функции мы можем передавать
   разные данные в конструктор создавая при каждом обращении к then новый экземпляр с 
   данными
*/

/*
ВАЖНО. При использовании Async Await нужно знать как минимум 3 вещи.
        1. Await не будет работать если она будет находиться ниже по уровню вложенности
        2. Async Await работают только с промисами
        3. так же Async Await не работают в цикле forEach
*/

let funcPromise1 = function(data){
    return new Promise((res) => setTimeout(() => res(data), 2000));      
 }
 
 async function m(arr){
   
    arr.forEach(async(item) => { 
       
       let res =  await funcPromise1(item);
       //через 2 секунды вывалит всё
       console.dir(res);
    })  
 }
 m([26,27,28,29])


//рабочий вариант. обычный for так же будет работать исправно
 let funcPromise2 = function(data){
    return new Promise((res) => setTimeout(() => res(data), 2000));      
 }
 
 async function m1(arr){
   
    for(let data of arr){ 
       
       let res = await funcPromise2(data);
       console.dir(res);//исправно.цикл длится 8 секунд
    } 
 }
 m1([26,27,28,29])


 let funcPromise3 = function(data){
    return new Promise((res, rej) => {
       setTimeout(() => res(data), 2000)
       setTimeout(() => rej(new Error('Ошибка')), 3000)
    });      
 }
 
 async function m3(arr){
 //   try {
 
       for(let data of arr){ 
          let res = await funcPromise3(data);  
          console.dir(res);
       } 
       return 'Цикл завершён!'
 //   } catch (error) {console.dir(error.message);}
      
   
   
 }
 m3([26,27,28,29])
 .then(console.dir)
 .catch(console.dir)
 
 
 /*
    При использовании async await нужно предусмотреть обработку ошибок. Т.к. 
    Можно использовать конструкцию try catch, но код такой разбухнет. 
    Далеко ходить не нужно async await возвращают Promise поэтому на функции 
    можно спокойно повесить обработку then и catch
 
    try catch как я слышал, работают в синхронном коде, в асинхронном этот функционал не работает
    try catch не будет обрабатывать код если предусмотрен такой случай как выполнение кода
    после совершённой ошибки. 
    Темой выше я писал, что Promise на каждом then имеют 2м параметром обработку ошибок
    При выполнении большого кода если где-то в середине будет ошибка то она обработается 
    и пойдёт код работать дальше
 
    но т.к. мы не обрабатываем одновременно несколько асинхронных ответвлений кода
    мы лишь обрабатываем один асинхронный участок кода(то есть код который не в общем потоке)
    как синхронный. 
 */


 /*
   ВАЖНО. Знаю что получить данные Promise можно через await, но это будет только внутри функции.
   возврат значения ни к чему не приведёт т.к. на входе async это значит что данные опять будут в Promise
 */

 let data = async () => {
    let b = await UserPromise;
    console.dir(b);//здесь получили данные
    return b
 }

 console.dir(data());//здесь снова Promise