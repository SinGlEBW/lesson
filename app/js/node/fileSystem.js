/*eslint-disable*/
let fs = require('fs');//fs - FileSystem
let path = require('path');
let pathFile = path.join(__dirname, 'test', 'text.txt');

"####-----<{ Создание, удаление, просмотр - директорий, файлов }>-----####"
//работает относительно данного файла

// - СОЗДАТЬ ПАПКУ
fs.mkdir(path,{}, cb(err,path));
fs.mkdirSync(path);

// - УДАЛИТЬ ПАПКУ. Если не пуста, то не удалит
fs.rmdir(path, cd(err))
fs.rmdirSync(path, [option]);

// - УДАЛИТЬ ТОЛЬКО ФАЙЛЫ
fs.unlink(pathFile, cb());
fs.unlinkSync(pathFile);

// - ПРОЧИТАТЬ СОДЕРЖИМОЕ ПАПКИ
fs.readdir(path, cb(err, file))
fs.readdirSync(path);//<< файлы 

fs.statSync(pathFile);//<< объект с информацией о файле
fs.existsSync(path);//<< наличие файла. bool

"###---<{ РАБОТА С ФАЙЛОМ }>---###"
fs.open(pathFile, option, cb(err, fDescriptor))
fs.close(fDescriptor, cb(err))//закрывает файл
fs.opendir(path, cb(err, Dir))//открывает папку
//путь даже url
fs.write()//есть вероятность что не запишет
fs.writeFile(pathFile, data, option, cb(err));//пока не запишет не остановить
fs.writeFileSync(pathFile, data, option);//пока не запишет не остановить
fs.appendFile(filePath, data, cb(err));//добавляет к записи

fs.readFile(pathFile, option, cb(err, buffer))
fs.readFileSync(pathFile, option)//<< data

fs.rename(pathFile, path+newFile, cd(err))//переименовывает файл

/*
Flags
r+ — открыть файл для чтения и для записи. Курсор в начале. Перезатирает, пишет прямо по тексту изменяя его.
w - перезатирает. w+ тоже
w+ — открыть файл для чтения и для записи, установив указатель потока в начало файла. Если файл не существует — он создаётся.
a — открыть файл для записи, установив указатель потока в конец файла. Если файл не существует — он создаётся.
a+ — открыть файл для чтения и записи, установив указатель потока в конец файла. Если файл не существует — он создаётся.

*/

 fs.watch(fileName, option, cbEvent(nameEvent, filename));//следит за изменением имени файла или каталога
 fs.watchFile(fileName, option, cbEvent(nameEvent, filename))//работает медленно. Официально тормозной. Рекомендуют использовать watch
 /*
    [options] для watch
    {
          persistent: true[по ум.] - процесс слежения работает пока просматриваются файлы
          recursive: false - следует ли просматривать все под категории или только текущий каталог
          encoding: 'utf8'
    }
  cb
  1. nameEvent или 'rename' или 'change'
  2. filename - что за файл был изменён
*/


/*--------Потоки------------------------ 
Что такое потоки. Это чтение и запись данных частями. Имеет ряд преимуществ с 
буферной системой. 
- Меньшее использование памяти за счет чтения содержимого по частям;
- Для объемных файлов время между запросом и ответом существенно сокращается за счет того, что данные начинают поступать по частям, а не после полной загрузки;
- Возможность перенаправить данные в другой поток с помощью метода pipe()

    Существует метод который выводит текст постепенно, а не пытается вывести всё и сразу,
    это делает загрузку быстрей.Так же можно куда либо записывать по шагово.
    Это используется на сайтах выдавая пользователю информацию по кусочкам
*/
let writeableStream = fs.createWriteStream('./test/gg.txt');//поток записи
let readableStream = fs.createReadStream("hello.txt", "utf8");/*Поток чтения создастся если файл существует, поэтому создаём сначала записи */

//далее так читают данные из потока и записывают в поток
readableStream.on("data", function(chunk){
    writeableStream.write(chunk);
});
//так сокращённый вариант
let textRead = fs.createReadStream(pathFile, option).on('data', (e)=>{
    fs.createWriteStream('./test/gg.txt').write(e);
})

/*
    Можно записать проще. Из-за того что операции перемещения одного потока в другой слишком частые,
    то изобрели метод pipe который вызывается у объекта имеющего информацию нужную нам или точней сказать,
    у потока чтения и передаёт потку записи, который принимает в качестве аргумента
*/
//ещё короче запись. Создаёт только файл, каталог создать не может
let pi = textRead.pipe(fs.createWriteStream('./test/gg.txt'));//метод возвращает поток чтения






