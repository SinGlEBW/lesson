/*eslint-default */
/* Сервер не отличает запросы  Ajax от обычной формы поэтому указывают дополнительно свои заголовки*/
/* Разница GET от POST в том что GET передаёт запросы в URL, а POST телом запроса */
Кодировка urlencoded

/*
Браузер перечисляет форму как пары «имя=значение» через символ амперсанда &.
В GET запросе, итог query string выглядит так: /submit?name=Ivan&surname=Ivanov.
*/

в JavaScript есть функция encodeURIComponent для получения такой кодировки «вручную»:

/*
encodeURIComponent(' ') // %20
encodeURIComponent('/') // %2F
encodeURIComponent('В') // %D0%92
encodeURIComponent('Виктор') // %D0%92%D0%B8%D0%BA%D1%82%D0%BE%D1%80

ВАЖНО: Для GET доступна только urlencoded.

Кодировка urlencoded за счёт замены символов на %код может сильно «раздуть» общий объём пересылаемых данных. 
Поэтому для пересылки файлов используется другая кодировка: multipart/form-data.

В стандартных HTTP-формах для метода POST доступны три кодировки, задаваемые через атрибут enctype:

application/x-www-form-urlencoded
multipart/form-data
text/plain

*/