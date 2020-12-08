/*eslint-disable */
/*
  Переменные окружения
  В nodejs есть глобальный объект process (доступный из любого места программы, как window в браузере),
  хранящий информацию о текущем процессе. У этого объекта есть свойство env — оно и дает доступ 
  к переменным окружения. Попробуйте запустить node в терминале и выполнить console.log(process.env):
*/

/*
  Но мы не можем сохранить такой код в git, иначе мы просто расскажем всему миру наш секретный ключ.
*/
const myAPIKey = 'ndsvn2g86nsb9hsg';
const url = 'https://externalapi.service.com/v1/query?key=' + myAPIKey;

const result = fetch(url);

/*
  Мы получаем наш секретный ключ из окружения.
*/
const myAPIKey = process.env.MYAPIKEY;
const url = 'https://externalapi.service.com/v1/query?key=' + myAPIKey;

const result = fetch(url);

node.env.NODE_ENV === 'production'// для определения режима сборки своего приложения.