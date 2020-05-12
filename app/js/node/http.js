/*-------- Создание WEB сервера на Node--------------------------------------------------------------*/
const http = require('http');
const fs = require('fs');
const path = require('path');
/*

1й вариант создания сервера.

http.createServer((request, response)=>{//сервер создан осталось его включить
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    if(request.url === '/'){//  / - это базовая страница. сюда хочу выводить
        fs.readFile(filePath, (err, content)=>{//обращаюсь по пути откуда хочу чидать данные. Читать можно страницу
            if(!err)
               response.end(content);//выводит в body принимает даже теги
        });
    }
    
    
}).listen(3000, ()=>{//слушатель работы сервера. порт 3000, callback информация о состоянии сервера
    console.dir("Server работает");
})

2й вариант создания сервера через слушателя


let server = http.createServer().on('request', (req,res) => {//кстате событие vscode не показывает
    console.dir(req);
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
    res.end('okay');//без завершаюзего запроса сервер не запуститься
}).listen(8081,'localhost')

*/


/*
Отличия между setHeader устанавливает только по одному заголовку, в то время как writeHeader за раз
может пачку сразу установить.
response.setHeader("Content-Length", body.length);
response.setHeader("Content-Type", "text/plain");
response.setHeader("Set-Cookie", "type=ninja");
response.status(200);

или
response.writeHead(200, {
    "Content-Length": body.length,
    "Content-Type": "text/plain",
    "Set-Cookie": "type=ninja"
});


X-Powered-By:  - указывает через чего происходит запрос
*/

/*
    Отдельные запросы строяться через request или get
*/

// let a = http.request()

// console.dir(a);

/*
    rawHeaders - хранит массив заголовков котороы передаються браузеру, помимо наших ещё и автоматически подкидывает.
    Записываеться это в Network во вкладке Request Headers 
    http.Agent - поддерживает очередь ожидающих запросов для данного хоста и порта
    
    #####--- В nodeJS есть готовые события
    'socket'

*/


/*
const keepAliveAgent = new http.Agent({ keepAlive: true });
console.dir(keepAliveAgent);



        [options]
    keepAlive (bool) - Держит сокеты, даже когда нет ожидающих запросов, чтобы не было необходимости восстановления TCP-соединения.Не путать с заголовком Connection: keep-alive
    keepAliveMsecs (Num) - При использовании keepAlive параметра указывает начальную задержку для пакетов TCP Keep-Alive. 
    maxSockets (Num) - Максимальное количество сокетов, разрешенное для каждого хоста. По умолчанию: Infinity - бесконечное число
    maxFreeSockets (Num) - Максимальное количество сокетов, оставляемых в открытом состоянии.
    timeout (Num) - Тайм-аут сокета в миллисекундах. Это установит тайм-аут при создании сокета.
    Или передать параметры через
    socket.connect()
*/

/*
   * http.request - возвращает объект ClientRequest. Если мы хотим поподробней настроить запрос
   * response возвращает объект IncomingMessage. Как то тупо но настраиваем заголовками ответ, а не запрос
   *  //ивенты относяться к элементам когда работаем через request. Некоторые ивенты могут повторяться
   *
   * Немного о понимании почему в док одно кол-во ивентов, а в итоге набралось куча.
   * res относиться к классу "Writable", 
   * req - объект IncomingMessage наследует класс "Readable" и всё это ведёт к объекту Stream. 
   *
   * 2 ивента 'close' 'aborted'.
   * Смысл в том из-за того что есть наследование разных классов отсюда и набираеться список Ивентов.
   * И в зависимости какой объект мы получили столько ивентов у нас и собралось
   * req (Запрос) - 9 cобытия ['close','data','end','error','pause','redable','resume'] - с класса Readable, 
   *                        ['aborted','close']-не уверен, но в док написано
     res (Ответ) - 6 событий ['close','drain','error','finish','pipe','unpipe'] - с класса Writable, 

                                  
    ClientRequest - События ['abort','connect','continue','information','response','socket','timeout','upgrade',-доументация| + по факту 'close','drain','error','finish','pipe','unpipe']
    Server - События ['close','connection','error','listening' --+ ,'checkContinue','checkExpectation','clientError','connect','request','upgrade']
    Process - События ['beforeExit','disconnect','exit','rejectionHandled','uncaughtException','uncaughtExceptionMonitor','unhandledRejection','warning','message',
    'newListener','removeListener','multipleResolves']
  
  
    Пока не всё понятно с request
*/


let options = {//некоторые параметры для запроса. Работает только в запросе с request или get. с createServer такой подход не работает
    hostname: 'localhost',
    port: 80,
    path: '/app/index.php',
    method: 'GET',
    maxSockets: 2,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;'
    }
    //auth: 'user:password' - Если требуеться
  };
/*
  let req = http.request(options, (res) => {//возвращает IncomingMessage в котором так же присутствует объект ClientRequest
   
    //res.on('data', (chunk) => console.log(`${chunk}`));//chunk возвращает буфер. ES6 преобразует в строку
     
  });
 
 //req.write('rrrr');//Принимает буфур или строку, для отправки на сервер. Если часто использоват то в заголовку нужно указать Transfer-Encoding: 'chunked' 
 req.end();
*/
// закидываеться почему то в body сайта при использовании createServer

//  let reqGet = http.get(options, (res) => {
//      res.on('data', (data) => {
//          console.dir(`${data}`);
         
//      })
     
//     //console.dir(res);
//  });


/*################################################################################################ */
//   let string = "https://js-node.ru/site/article?id=25#http_class_http_clientrequest";//URL
//   let querystring = require('querystring');//модуль Query String - работа со строками

//   let par = querystring.parse(string,'/','?');//строка, по какому символу разделять, по какому символу разделять на ключ: значние
//   console.dir(par);

//   let str = querystring.stringify(par,'/','');//
//   console.dir(str);

/*################################################################################################ */

/*

let server = http.createServer((req,res)=>{//Возвращает объект Server
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
    console.dir(req);
    console.dir(req.url);//запросы которые пользователь вводит в поиск
    //res.end('okay');//после этой команды код не работает т.к. запрос отправлен.
    fs.createReadStream('./test/text.txt').pipe(res);//с помощью pipe можно вывести текст на страницу. pipe автоматически отправляет запрос
}).listen(55515,'localhost',(...err)=>{
    console.dir(err);
    //порт можно подбирать автоматически воспользовавшись server.address().port используя сам listen или событием listeining
    //console.dir( server.address().port);//я так понял типо мы теперь знаем порт и можем его использовать.
});

*/

/**
 * Не совсем понятно как это работает http.createServer() Возвращает объект Server, при это callback с параметром
 * request содержит объект IncomingMessage, который так же собержит свойство _server с объектом Server
 * 
 * IncomingMessage {
 *   _readableState: ReadableState {...} 
 *   socket: Socket {
 *      _readableState: ReadableState {...} 
 *      _events: {...}
 *      _writableState: WritableState {...}
 *      server: Server {...}
 *      _server: //накой то хуй 2й раз выводит с пометкой _ хотя идентичен
 *      parser: HTTPParser {...}
 *      _httpMessage: ServerResponse {...}
 *     ... свойства, так же Symbol объекты
 *   }
 *   connection: Socket {
 *      _readableState: ReadableState {...}
 *      _events: {...}
 *      _writableState: WritableState {...}
 *      server: Server {...}
 *      _server: Server {...}
 *      parser: HTTPParser {...}
 *      _httpMessage: ServerResponse {...}
 *     ... свойства, так же Symbol объекты
 *   }
 *   headers: {}
 *   rawHeaders: [] //массив заполнен ключ значение. Выводит информацию в браузер
 *   client: Socket { тут всё повторяеться }
 *   IncomingMessage {...}//выводиться снова этот объект
 * } 
 * потом снова IncomingMessage и всё повторяеться. Ебала какая-то с NodeJS многое по 2 раза страбатывает
 * 
 * параметр Responce собержит объектр ServerResponce
 * ServerResponse{
 *   _events: {...}
 *   socket: Socket{
 *       _readableState: ReadableState {...}  
 *       _events: {...}
 *       _writableState: WritableState {...} 
 *       server: Server {...}
 *       _server: Server {...}
 *       parser: HTTPParser {...}
 *       ... свойства и объекты Symbol
 *   }
 *  connection: Socket {
 *      ... тож самое
 *  }
 * ...
 * } 
 */


/*#########----Как вывводят страницы на NodeJS----########*/

http.createServer((req, res) => {
    let contentType;
    let ext = path.extname(req.url);

    let filePath = "/index.html";
   
    switch(ext){
        case'.css': filePath = req.url; contentType = 'text/css'; break;
        case'.js': filePath = req.url; contentType = 'text/js'; break;
        default: contentType = 'text/html'; break;
    }           
    // fs.readFile(`../..${filePath}`,(err,data) => {//прочитать нужно все
    //     if(err)
    //         console.dir(err);
    //     else{
    //         res.writeHead(200,{'Content-Type': contentType  })  
    //         res.end(data);
    //     }
    // })
  
    
    res.writeHead(200,{'Content-Type': contentType  }) 
    fs.createReadStream(`../..${filePath}`).pipe(res).on('error', (error) =>{
        res.end(error)
    });


}).listen(8081);


//url.endsWith('что в конце url')//можно проверить



