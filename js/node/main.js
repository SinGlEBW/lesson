let path = require('path');
let fs = require('fs');

/*-------- Создание WEB сервера на Node--------------------------------------------------------------*/

const http = require('http');

http.createServer((request, response)=>{//сервер создан осталось его включить
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    //как обычно оперитуют страницами на сервере.
    
    if(request.url === '/'){//  / - это базовая страница. сюда хочу выводить
        fs.readFile(filePath, (err, content)=>{//обращаюсь по пути откуда хочу чидать данные. Читать можно страницу
            if(!err)
               response.end(content);//собственно вывод
        });
    }
    
    
   
}).listen(3000, ()=>{//слушатель работы сервера. порт 3000, callback информация о состоянии сервера
    console.dir("Server работает");
})

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


*/











