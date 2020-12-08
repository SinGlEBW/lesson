let div = document.querySelector('#id');


let string = 'loginLink=Hello&passwordLink=Word';
let arr = string.split(/=|&/g);


let obj = {
  name: 'Alex',
  age: 21,
  city: 'NewYork',
  number: 15,
  [Symbol('foo')]: 'sikret',//такое свойство не изменить
  get _number(){  return this.number  },
  set _number(value){
    if(value > 0 && value <= 20)
      this.number = value 
    else{
      let strErr = (value < 0)? 'Меньше: 0' : 'Больше: 20';
      console.dir(strErr);
    } 
  },
  method(){}
}


Object.defineProperty(obj, '_number', {
  enumerable: false,//будет ли св-во перечисляемым
  configurable: false,//можно ли удалять c помощью delete, модифицировать св-во
  writable: false,//можно ли изменить значение
  value: 'Борис',//значение свойства
 
});
Object.defineProperty(obj, 'method', {
  enumerable: false,//будет ли св-во перечисляемым
  configurable: false,//можно ли удалять c помощью delete, модифицировать св-во
  writable: false,//можно ли изменить значение
  method(){},//значение свойства
 
});
Object.freeze(obj);
let dest = Object.getOwnPropertyDescriptor(obj, 'age')

console.dir(dest);