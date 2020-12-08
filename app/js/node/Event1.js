const http = require('http');
const fs = require('fs');
const path = require('path');

let filePath = path.join(__dirname, '../../');
/*
req (Запрос) - 9 cобытия ['close','data','end','error','pause','redable','resume'] - с класса Readable, 
                         ['aborted','close']-не уверен, но в док написано
res (Ответ) - 6 событий ['close','drain','error','finish','pipe','unpipe'] - с класса Writable, 

рассмотрю которые понимаю

*/

let arrPage = ['about', 'news', 'lk', 'status'];//массив возможных страниц
let type;
let server = http.createServer((req,res) => {

    let pathURL = path.parse(req.url);//парс запроса пользователя для дальнейшего стравнения с массивом страниц
    let page = (pathPage) => {
        let _pathPage = path.parse(pathPage);//парс пути файла для дальнейшего обращения к свойствам объекта
        
        let objType = {
            '.ico': 'image/x-icon',
            '.html': 'text/html; charset=utf8;',
            '.js': 'text/javascript;', 
            '.css': 'text/css'
        };
        
        type = objType[_pathPage.ext];
        
        fs.createReadStream(pathPage).pipe(res);
    }
    //data отрабатывает при отправлении POST запроса или при получении данных
    // req.on('data', (chink) => {
    //     console.dir(Buffer.from(chink).toString());
    //     console.dir(chink.toString('UTF8'));
    // })
    // fs.createReadStream('./test/gg.txt').on('data', (chunk) => {
    //     console.dir(chunk.toString());
    // })

    res.on('finish', () => {//отрабатывает после всех законченых действий
        console.dir('Все манипуляции завершены'); 
    })
    res.on('end', () => {//отрабатывает после понструкции res.end()
    console.dir('Ответ отправлен');
    })
    res.on('close', () => {//т.к. помимо метода res.end существуют другие методы закрытия, этот метод более универсальный
        console.dir('Закрыто соединение'); 
    })
    res.on('error', () => {//при ответе, незнаю что должно произойти чтоб спровоцировать ошибку
        console.dir('Ошибка при ответе'); 
    })

    req.on('aborted', () => {//при запросе если соединение прервано
        console.dir('Соединение прервано'); 
    })
    req.on('error', () => {//тоже самое и при запросе. при манипуляции с файлами тоже есть такой Эвент там всё ясно.
        console.dir('Ошибка при запросе'); 
    })

    if(req.url === '/' || req.url === '/index.html'){
        page(`${filePath}index.html`)
    }else 
    if(req.url.endsWith('css')){
        page('../../css/lesson1.css')
    }else 
    if(req.url.endsWith('js')){ 
        page('../../main.js')
    }else 
    if(req.url.endsWith('ico')){
        page('../../img/favicon.ico') 
    }else
    if(arrPage.includes(pathURL.name)){
        page(`../../${pathURL.name}.html`)
    }else{
      
        //console.dir(url.parse(req.url));
        // console.dir(new url.URL(req.url));
        page('../../404.html')
    }
   
    res.writeHead(200, {
        'Content-Type': type
    })
}).listen(3000)
