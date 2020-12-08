let s = require('./express/express')
const mysql = require('mysql');
/*
let connection = mysql.createConnection({//одно соединение через которые делаем запросы
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'test_bd',
    timezone: 'UTC',

});

connection.query('SELECT * FROM user WHERE login = ?', ['Sin'])
connection.end();
*/
let user = {
    full_name: 'Sin15',
    login: 'SinGlEBW14',
    email: 'sdd@mail.ru',
    password: 'fdf',
    avatar: '',
    age: 27,
    gender: 'M',
    country: 'kkk',
    date: `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`
}

/*
connection.connect((err) => console.dir(err));

connection.query('SELECT * FROM user WHERE login = ?', ['SinGlEBW'], (err, data, infoColumn) => {
    console.dir(data);
    console.dir(1);
})

 connection.end()
 


let Query  = connection.query('SELECT * FROM user WHERE login = Sin334')
Query.on('result', function(){
    console.dir(arguments);
})
*/


/*-----####---Вариант с Pool---####------*/

let pool = mysql.createPool({//много соединений
    connectionLimit : 4,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'test_bd',
    timezone: 'UTC',

});


pool.getConnection(async(err, connection) => {

    await connection.query("SELECT * FROM user WHERE login = ?", ['SinGlEBW'], (err, result) => {
        console.dir(result);  
    })
    await connection.query("SELECT * FROM user WHERE login = ?", ['SinGlEBW1'], (err, result) => {
        console.dir(result);    
    })
    await connection.query("SELECT * FROM user WHERE login = ?", ['SinGlEBW2'], (err, result) => {
        console.dir(result);  
    })
    connection.release();

})


/*
pool.query("SELECT * FROM user WHERE login = ?", ['Sin3'], (err, result) => {
    console.dir(result);
})
запросы
pool.query(...)
...

pool.end(); //pool закроет раньше чем будет совершен запрос. А следить нужно.
Я так понимаю пул не должен быть закрыт как обычное соединение, он сам контролирует этот процесс
*/
/*--#######------1й вариант------#######---- */

 
// connection.getConnection((err,pool) =>{
//     pool.query('SELECT * FROM user WHERE login = ?','Sin334', (err, result) => {
//         console.dir(result);
//     })
//     //pool.release();
// })


/*
    При обращении к БД нет гарантии что выполниться сначало 1й потом 2й запрос.
    При постоении к примеру запроса добавление потом получение это объекта может получиться
    ситуация когда происходит запрос получение того чего ещё нет. Поэтому используем 
    Promise
*/
/*
    connection.query('INSERT INTO user SET ?',user, (err,data,infoColumn) =>  {
        console.dir(data);  
    })
    connection.end();//не забывать закрывать соединение т.к. оно вроде как имеет ограниченое число подключений 
   
*/

/*
    connection.connect((err) => console.dir(err));

    connection.query('INSERT INTO user SET ?', user, (err,result,fields) =>  {
        console.dir(result);
    })
        
    connection.end();//не забывать закрывать соединение т.к. оно вроде как имеет ограниченое число подключений 
    
*/

//----------------------------------------------------------------------------------------
/*
    В запрос query можно 1м параметром передавать объект в котором можно посстроить запрос
    типа:
    {
        sql: 'SELECT * FROM `books` WHERE `author` = ?',
        timeout: 40000, // 40s
        values: ['David']
    }
    есть ещё пара значений, но я не вдавался в подробности они и ненужны.
    Значенеие можно как в объекте так и за его пределами. Это может быть массив, но эо не значит что
    query будет делать запросы по каждому элементу массива. Каждый элемент расчитан на 1 знак вопроса в 
    запросе. Как вопросы расположены в таком порядке и будут браться значения из массива
    'UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId], 
    Вообщем вариантов массиа предложить значение, хоть в 1м параметре черех ` ` строку.
    Передавать значения из вне нужно таким образом что бы не было SQL инекций
*/

/*  ДОП. ИНФОРМАЦИЯ.
    Вообщем и целом, когда подключений одновременных много лучше использовать POOL это будет быстрей,
    т.к. можно указывать количество каналов которые открыты и при подключении если канал будет свободным, 
    то подключение просто его займёт, что с экономит время на его создание. Если же каналы будут заняты, то 
    подключение автоматически его создаст.
    Как говорят в интернете то лучше использоваться pool соединение
 */