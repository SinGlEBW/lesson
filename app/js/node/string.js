const {StringDecoder} = require('string_decoder');//шляпа
const decoder = new StringDecoder('UTF8');
const url = require('url');//можно чего нибудь слепить 

const querystring = require('querystring');

const buf = Buffer.from('A:B=C:D');
str = buf.toString()


/*
console.dir(decoder.write(buf));//бестолковый высер
console.dir(decoder.end(buf));//хз толко разница непонятно, всё равно высер
console.dir(buf.toString('UTF8'));//альтернатива самого же буфера
*/
let separator = "=";//Default '&', это разделяет участи в которых содержиться ключ и значение
let eq = ':';// Default: '=', это разделяет эту пару на ключ и значение
let o = querystring.parse(str,separator,eq);
console.dir(o.A);
/*
Вроде как указано то что нет наследования и строка получившиеся методом toString не будет 
работать с parse именно querystring/ вроде работает
Ещё как parse так и stringify принимает последним параметром объект options Доп параметры к кодирования и декодированию
*/
let stroka = querystring.stringify(o,separator,eq)
console.dir(stroka);
/*------Работа с url ----------------------------*/

//console.dir(url);

let jsURL = new URL('http://localhost:3000/?login=SinGlE&pass=17');//из-за Symbol(context) я так понимаю эт и даёт доступ через экземпляр
/*
    В этом объекте обратиться можем не ко всему. до query просто так не достучаться.
    Видимо видимо настроен доступ к некоторым свойствам через Symbol свойство.
    чтобы получать доступ п параметрам URLSearchParams нужно обращаться к searchParams через
    экземпляр
*/

//resolve(к чему, чего) стыковать
let url1 = url.resolve('/one/two/three', 'four');         // '/one/two/four'
let url2 = url.resolve('http://example.com/', 'one');    // 'http://example.com/one'
let url3 = url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'
console.dir(url1);
console.dir(url2);
console.dir(url3);
//console.dir(jsURL.searchParams);

//можно собрать адресс досконально таким образом
let url4 = url.format({
    protocol: 'https',
    hostname: 'example.com',
    port: 3000,
    pathname: '/some/path',
    query: {
      page: 1,
      format: 'json'
    }
  });
console.dir(url4);
let urlObject = new url.URL(url4);
console.dir(urlObject.searchParams.flags);

let i = 0;
let arr = ['вася', 19, 'петя', 40, 'елена', 35, 'юлия', 30, 'жора', 25];

/*
  #########-----работа с POST запросами
*/









/*
{
    вася: 19,
    петя: 40,
    елена: 35,
    юлия: 30,
    жора: 25
}
*/