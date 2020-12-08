const http = require('http');
const fs = require('fs');
const path = require('path');

const url = require('url');//получить query строку
const querystring = require('querystring');//распарсить её


let filePath = path.join(__dirname, '../../');

/*
 StringDecoder() неувидел преимущества т.к. буфур можно в строку
*/
/*-------------------Node JS--------------------------------*/

let arrPage = ['about', 'news', 'lk', 'status'];//массив возможных страниц

let type;
let server = http.createServer((req,res) => {

 
    let pathURL = path.parse(req.url);//парс запроса пользователя для дальнейшего стравнения с массивом страниц
    let page = (pathPage) => {
        let _pathPage = path.parse(pathPage);//парс пути файла для дальнейшего обращения к свойствам объекта
        console.dir(req.url);
        let objType = {
            '.ico': 'image/x-icon',
            '.html': 'text/html; charset=utf8;',
            '.js': 'text/javascript;', 
            '.css': 'text/css'
        };
        
        type = objType[_pathPage.ext];
        
        fs.createReadStream(pathPage).pipe(res);
    }
  
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
   
        page('../../404.html')
    }
    
//не решане проблема получения файлов на чистом JS. по всей видимости там полный геморой
    req.on('data', (chunk) => {
       //console.dir(`${chunk}`);
        let obj = querystring.parse(chunk.toString())//пока не понятно заче body-parser
        //console.dir(obj.login + ' ' + obj.password);
    })


    res.writeHead(200, {
        'Content-Type': type
    })
}).listen(3000)





     /*
        //на Node варианты получение параметров
        let paramUrl = url.parse(req.url);//query будет тупо строкой
        let objQyery1 = querystring.parse(paramUrl.query);//парсит строки по доп параметрам. Чтоб облегчить жизнь закинем просто строку параметров
        console.dir(objQyery1.pass);
        //вообщем не обошлось без подключения 2х модулей.
        //2й вариант, тож не очень то удобный
        console.dir(paramUrl); 
        let objURL = new URL(req.url, 'http://localhost:3000/');//Принимает только полную ссылку. как её получить пока хз
        let objQyery2 = objURL.searchParams;
        console.dir(objQyery2.get('login'));//getAll если много повторялся парпаметр с GET запросе
      */




//server.on('response', ())
/*
    Просто использование одного NodeJS не достаточно т.к. встречаемся с повторяющимя кодом.
    В php можно было это решить с помощью require раскидав отдельные куски по страницам. 
    В NodeJS это решаеться с помощью шаблонизаторов. Известные шаблонизаторы это "EJS" и "Handlebars"
*/
//  http.get('http://localhost:3000',(req) => {
//       req.on('data', (data) => {
//           console.dir(`${data}`);
//       })    
//  })
