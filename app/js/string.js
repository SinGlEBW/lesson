str.replase()
/*Немного о регулярном выражении. 
Есть такое понятие Модификаторы шаблонов- это ключи которые устанавливаются после замого выражения
 / рег выраж. / - после слэша могут указываться клоючи
 Это все что используются в js
g  - глобальное поиск
i -  игнорировать регистр
m  - сопоставление по нескольким строкам */

/*Используется для сопоставления строке регулярного выражения и для замены совпавшей 
  подстроки на новую подстроку. */
  let str = "Во поле берёза стояла, выпила 100 грамм и упала";
  let arrSplit = arrJoin.split('1 ');//так же принимает регулярные выражения / вырыжение / 
  console.log(arrSplit);console.dir('');

//   Разбивает объект String на массив строк, разделёных указанной строкой на подстроки.

/*Метод slice режет строку и возвращает этот кусок. Принимает 2 индекса: откуда и до куда вернуть кусок массива */
var removedItem = arrString.splice(0, 2); // так можно удалить элемент. Не задавая элементы можно сделать копию массива


str.trim() // обрезает пробелы в начале и в конце строки
let string = str.match(); // принимает регулярное выражение отфильтровывая ненужный хлам и помещает найденное в массив