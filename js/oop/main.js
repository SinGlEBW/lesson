/* Существует 3 вида контекста. Глобальный, контекст выполнения функции и контекст выполнения функции eval.
    this это сущность которая отвечает за контекст. К какому контексту она привязана за то и отвечает.
*/
person = {
    name: "Вася",
    family: "Пупкин",
    age: 26
}

function sayHello(){
    console.dir(`Привет ${this.name} ${this.family} ${this.age}`); //привязали контекст 

}

//sayHello.call(person);//передали конткст


// это обычная функция которая возвращает объект со своим контекстом.
/* this в функции должен быть привязан к контексту поэтому это один из вариантов сохранить контекст у объекта */
function sayHello1(name, family, age){
    person1 = {
        name: name,
        family: family,
        age: age,
        myMethod(){
           // console.dir(`Привет ${person1.name} ${person1.family}`);//можно так
            console.dir(`Привет ${this.name} ${this.family}`); //контекст привязан к объекту, у функции другой контекст
        }
    }
    return person1; 
}



let per = sayHello1("Елизавета", "Степановна", 26);//new роли не играет т.к. объект возвращаеться и так
//per.myMethod();



//Что бы такую дичь не городить с хранением объекта и его возвратом придумали конструктор
function sayHello2(name, family, age){
    this.name = name,
    this.family = family,
    this.age = age,
    this.myMethod = () => {
        console.dir(`Привет ${this.name} ${this.family} ${this.age}`); 
    }    
    console.dir(this);//window
}

sayHello2.prototype.car = "Лада Приора"; 
//sayHello2()//так контекст window

/*
Закидывает в proto. Через prototype добавляеться функционал для функции конструктора, а значит все созданые 
экземпляры автоматически получают доступ к этим свойствам и методам. 
ВАЖНО. Почему и зачем. Предположим есть куча экземпляров со своими методами, при чём метод один и тотже.
        Зачем плодить лишний раз метод если можно поместить один метод в общее место и пользоваться смогут все если
        понадобить. Это серъёздно экономит память. 
*/

/*
Обращаясь через экземпляр контекст всегда будет принадлежать ему.
*/
function sayHello3(name, family, age){
/*ВАЖНО. Глядя на такую функцию я должен знать что на выхлопе должен быть объект и ни каких return в такой функции
         не должно быть иначе объект не вернётся. */
//Это свойства и методы для экземпляра.
    this.name = name,
    this.family = family,
    this.age = age
    this.methodConstruct = function(){
        console.dir(`Привет ${this.name} ${this.family} ${this.age}`);
    }
//Это свойства и методы для функции конструктора
//статические свойства и методы. Также публичные. Методы и свойства принадлежат непосредственно конструктору
    sayHello3.cout = 0; 
    sayHello3.staticMethodFunc = () =>{
        return sayHello3.cout = 3;
    }

    methodForInstances3 = ()=>{
        console.dir(`Привет ${this.name} ${this.family} ${this.age}`);
       
    };
/*
Это просто функция которая приватная и может делать абра кадабру получив значения и потом что-то с нис сделать. Доступа нет к такой функции
this она так же не знает. Вообщем может выполнять определённую логику при инстанцировании экземпляра.
*/
    // function fff(){
    //     return console.dir(`Привет ${this.name} ${this.family} ${this.age}`);
    // }
    // fff()
};

sayHello3.prototype.myMethod = function () {  console.dir(`Привет ${this.name} ${this.family} ${this.age}`);  }

/*
функции с ключевым словом function имеют вкладку prototype. помещая туда методы, как сами функции так и созданые
экземпляры будут иметь к ним доступ. Экземпляры через вкладку __proto__ во вкладке Object на одном уровне с constructor.
Сама же функция будет ссылаться непосредственно на вкладку prototype. 
Статичные методы конструктора, экземпляр может получить через вкладку constructor.
Методы и свойства можно увидеть после вызова или инстанцирование экземпляра. 
а методы и свойства экземпляра после его создания.
*/

let pers3 = new sayHello3('Вася', 'Пупкин', 35);
console.dir(sayHello3);
console.dir(pers3);


/*
    И так что мы знаем. Функция конструктор требуеться для создания шаблона под дальнейшее создание
    экземпляров объекта. This на них сылаеться. Шаблон подразумеваеться свойства и методы одинакового характера.
    Методы хранят в prototype что бы не копировать методы от экземпляра к экземпляру. prototype хранит в дереве DOM Object
    Конструктор может имеметь собыственые свойства и методы.
Теперь о классах......
    Идея заключалась в том что бы убрать расброс методов и сделать единую конструкцию которую можно подготовить
    не вылезая за её пределы. Так же эту конструкцию можно наследовать что бы не писать кучу новых методов когда они есть.

    Для того что бы не плодить методы их засовывают в раздел prototype и кадрый экземпляр не имея лишнего барахла
    на борту может просто получать их по наследованию __proto__.
    В классах для этого используеться пространство за пределами constructor. Правда используя синтаксис ES6
    иначе методы всё с тем же успехом попадают в раздел экземпляра и копируються при каждом инстанцировании объекта.
    Старый способ "функция конструктор" - это и есть функция constructor в классе. Всё что работало там, работает так же и тут, но с дополнительным
    пространством за пределами этой функции. Всё что за пределами отвечает за вкладку prototype. Заноситься туда методы
    новым стандартом ES6. Если же использовать ES5 то методы работают как будто они в функции constructor записаны. 
    
    Статические свойства и методы класса записываются как и в старом способе в классе в функции конструктора,
    но есть и альтернативный способ, за пределами конструктора с указанием префикса static.
  */

class Person{
    constructor(name, family, age){
        this.name = name,
        this.family = family,
        this.age = age,
        //Такой подход добавления методов плодит нужный и ненужный методы каждому экземпляру.
        this.methodConstruct = function(){
            console.dir(`Привет ${this.name} ${this.family} ${this.age}`);
        },
        //страрый способ написания статических свойст и методов.
        Person.cout = 0,
        Person.staticMethodClass = () =>{
            return Person.cout = 3;
        }
        
     
    }
  
    //не смотря на то что указыние методов вынесены за пределы констаруктора, такой способ указания не правильный. Это ES5
    methodForInstances2 = function(){
        console.dir(`Привет ${this.name} ${this.family} ${this.age}`);
    }

    //правильный способ указыния метода для экземпляра. Метод переходит в prototype. Всё равно чтоб мы писали старым способом за конструктором
    methodForInstances3(){
        console.dir(`Привет ${this.name} ${this.family} ${this.age}`);
       
    }

    static staticMethodClass2(params) {
        
    }
   

}

Person.prototype.myMethod = function () {  console.dir(`Привет ${this.name} ${this.family} ${this.age}`);  }


let pers4 = new Person("Толик", "Анаболик", 40);

console.dir(Person);
console.dir(pers4);

/*
Класс подготавливает методы и свойства для экземпляра, поэтому не работает с функциями типа Function Declaration Statement - Обычные именованные функции.
После всех разъяснений показываю как правильно писать классы ES6....

Так же ключевой особенностью классов являеться использование get и set.
*/

class Car{
    constructor(model, color, year){
        this.model = model,
        this.color = color,
        this.year = year,
        Car.cout++
        Car.arrayModel.push(this.model)
    }
  
    methodForInstances(){
        console.dir(`Model: ${this.model} Color: ${this.color} Year: ${this.year}`);
       
    }
    methodColor(){  
        console.dir(this.color);
    }
    //не смотря на то что get добавляеться в prototype он всё равно добавляеться ещё и экземпляру
    get arrayCar(){
      //почитать про сеторы геторы
    }
    set arrayCar(item){

    }
    /*####---ствйства и методы класса---####*/
    static arrayModel = [];
    static cout = 0//свойство изменяем наверху при вызове конструктора таким образом создаётся счётчик
    static staticMethodClassCout() {
        console.dir(this.cout);
    }   
    static staticMethodClassArrayModel() {
        console.dir(this.arrayModel);
    }  
    methodColor(){  //метод можно переопределять. Если этого метода не будет поик будет в другом клааасе
        console.dir(`Цвет трактора ${this.color}`);
    }
}


let mazda = new Car("Mazda", "black", 2007);
let nisan = new Car("Nisan", "teal", 2010);
console.dir(Car);
console.dir(mazda);
let auto = Car.cout;


/*
Едем дальше. Наследование.
*/

class Tractors extends Car{
    constructor(name, color, year, organization){
        super(name, color, year), //из-за того что параметры конструктора класса схожи можно передать ему через super
        this.organization = organization
        Tractors.cout++
    }




    static cout;
}

let uMZ = new Tractors("ЮМЗ-6","green", 1988, "СельхозПромышленность")
/*
Можно использовать методы наследованного класса
Получать доступ к методам класса через экземпляр можно, просто указав путь через конструктор
*/
Tractors.staticMethodClassArrayModel();
uMZ.constructor.staticMethodClassArrayModel();
/*
Получать доступ к методам экземпляра через класс тоже можно, но придётся указывать к какому контексту привязать
*/
uMZ.methodColor() 
Tractors.prototype.methodColor.call(uMZ)

console.dir(Car);