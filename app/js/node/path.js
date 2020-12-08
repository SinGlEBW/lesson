
let path = require('path');//модуль работает с путями
/*
Половину методов беспонтовых.
console.dir(path.basename(__filename));//передали полный путь, получили название файла

console.dir(path.dirname(__filename));//очередной высер. когда есть __dirname
console.dir(__dirname);
console.dir(path.extname(__filename));//получаю рассирение файла
console.dir(path.parse(__filename));//парсит путь на куски в итоге на выходе объект
console.dir(path.join(__dirname,'papka','index.html'));//метод склеивает строки, формируя нужный нам путь. можно так 'papka/index.html'. сомнительный метод
path.normalize(__filename) - то же что и __filename
path.relative(1й путь, 2й путь) - каждая часть схожево начала пути заключаеться в символ ../
path.resolve("parentPapka","myFile"); - Определяет полный путь и может склеить так же как join, 
//Далее модуль FileSystem
Есть методы асинхронные и синхронные. В node.js лучше использовать асинхроннае поэтому
методы с пометкой Sync лучше не использовать
*/
let p = path.parse(__filename);//парсит путь на части
let f = path.format(p);//собирает объект парса воедино, можно самому собрать объект парса

path.isAbsolute(__dirname)//проверяет является ли путь абсолютным 
let pp = path.resolve(__filename, "papka");
console.dir(pp);

/*
    Разбор синтаксиса внутреннего кода node js. Пока точно не уверен на каком фреймворке вроде как React.
    basename(p: string, ext?: string): string; - ? это не обязательный параметр, : после скобки это то что выводит функция.
    interface содерждит то что должно вывестись при обращении к каким то методам
*/
//console.dir(path.parse(__filename));