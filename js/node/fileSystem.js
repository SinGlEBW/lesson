let fs = require('fs');//fs - FileSystem
let filePath = path.join(__dirname, 'test', 'text.txt');
/*
fs.mkdir("test",(errs)=>{
    if(err)
    console.dir(err);
    else
    console.dir(stats);
});


создаёт папку. 1й пар. название папки. название может состоять из пути зависит от того где хотим создать папку относительно файла, 2й пар
callback. В callback я так понял много таких случаев в node.js где 1й арг. всегда отвечает за ошибку.
*/
//методы работаю немного иначе чем в php. ничего не возвращают я такт понял
// fs.open("test/t.txt","w+", (err,stat)=>{//тупо открывает файл
//     if(err)
//     console.dir(err);
//     else
//     console.dir(stat);
// })

/*
Вся так же самая херня как в php
r+ — открыть файл для чтения и для записи. Курсор в начале. Перезатирает, пишет прямо по тексту изменяя его.
w - перезатирает. w+ тоже
w+ — открыть файл для чтения и для записи, установив указатель потока в начало файла. Если файл не существует — он создаётся.
a — открыть файл для записи, установив указатель потока в конец файла. Если файл не существует — он создаётся.
a+ — открыть файл для чтения и записи, установив указатель потока в конец файла. Если файл не существует — он создаётся.
*/
let content = "Привет";
/*
//fs.writeFile(): записывает данные в файл. Похожий метод: fs.write().
fs.writeFile(filePath, content, {encoding: "UTF-8", flag: "a+"}, (err)=>{
    console.dir(err);
});
//есть аналог. Удобен тем что не нужно указывать доп параметры для добавления текста к имеющимуся
 fs.appendFile(filePath, "\nГригорий", (err)=>{
     console.dir(err);
 });

fs.readFile(filePath, "utf-8", (err, content)=>{ //получаем дынные Buffer. Есть такой объект Buffer он хранит строки и в нём еть методы
//можно так: 
    // let string = Buffer.from(content).toString();// высер
    //console.dir(content.toString());//боле менее способ
    console.dir(content);//проще utf-8 указать 
});
*/