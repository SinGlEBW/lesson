function $(item){
  return document.querySelector(item);
}

let nameInput = document.querySelectorAll('.Login');
let passInput = document.querySelectorAll('.Pass');
let emailInput = $('input[name="emailReg"]');
let spanInfo1 = document.querySelectorAll('.info1');
let spanInfo2 = document.querySelectorAll('.info2');
let spanInfo3 = $('#info3');
let infoServer = document.querySelectorAll('.responseServer');
let submitEnter = $('input[name="submitEnter"]');
/*############>>>>>>>>>>>>>>>>---Форма регистрации---<<<<<<<<<<<<<<<<<############ */
let formReg = document.querySelector('#formReg');
formReg.addEventListener('submit', Ajax('http://localhost/Lesson/ajax.php', answer1));//запрос - ответ. 
nameInput[0].maxLength = 15; 
passInput[0].maxLength = 16;
        //<<<<<-----Обработка ввода и майла------>>>>>//
let regExpForReplace = /[А-ЯЁ`'"\s\$]*/gi;
let regExpForReplaceMail = /^([^\W_-]+[\w\.]+)@(mail\.ru|gmail\.com|yandex\.ru)/gi;
let arrMail = null;
/*############>>>>>>>>>>>>>>>>---Форма входа---<<<<<<<<<<<<<<<<<############ */
let formEnter = document.querySelector('#formEnter');
formEnter.addEventListener('submit', Ajax('http://localhost/Lesson/ajax.php', answer1));
nameInput[1].maxLength = 15; 
passInput[1].maxLength = 16;

  /*##########>>>>>>>---События при нажатии---<<<<<<<########## */
 function Ajax(url, callback){ //функция отрабатывает сразу this относится к window.Возвращаемая функция имеет отношение к форме и this тоже к ней
 
   var f = callback || function (data) {};//заглушка на тот случай если функцию не передали.
    return function(Event){  
        Event.preventDefault();//отмена перезагрузки окна после нажатия на кнопку
        
        if(this.id == 'formReg'){//можно через Event.target.id       
          nameInput
            nameInput[0].addEventListener('input', inEnter);
            passInput[0].addEventListener('input', inEnter);
            emailInput.addEventListener('input', inEnter);    }
            arrMail = emailInput.value.match(regExpForReplaceMail);
            
        if(this.id == 'formEnter'){
            nameInput[1].addEventListener('input', inEnter);
            passInput[1].addEventListener('input', inEnter);  }
       
        if(nameInput[0].selectionStart >= 4 && passInput[0].selectionStart >= 6 && arrMail != null || 
           nameInput[1].selectionStart >= 4 && passInput[1].selectionStart >= 6){//Условие если строки не пустые. Пока что так. Чтоб не заполнять, а жать на кнопку.
              let body = new FormData(this);     
              body.append('form', this.id); 
              let xhr = new XMLHttpRequest(); 
              xhr.addEventListener('load', check);
              xhr.open('POST', url, true);
              //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');// строка нужна для правильного отправления POST запроса на сервер.Используя FormData строка не нужна
              xhr.send(body);
              function check(ev){   f(this.responseText, Event);   }//это так работает. callback f должен отработать посл того как сработает event загрузки данных с сервера        
                //возвращаю ответ. сделанно для удобства.Выбирать куда присваивать инфо при новоговом запросе, а не допиывать сюда код                    
        }
    }
 }
/*##########>>>>>>>---События при вводе---<<<<<<<########## */
console.dir(object);
function inEnter(Event){  

  /*---->>>>>>--Блокировка кирилицы и фильтрация майла--<<<<<<<---- */

  this.value = this.value.replace(regExpForReplace, '');
  arrMail = emailInput.value.match(regExpForReplaceMail);
 
/*---------->>>>>>--РЕГИСТРАЦИЯ--<<<<<<<----------- */
 
  if(this.form.id == 'formReg'){  

/*------->>>--Login--<<-----------*/ 

      if(nameInput[0].selectionStart < 4 && nameInput[0].selectionStart != 0){ 
          spanInfo1[0].innerHTML = "min 4: "+nameInput[0].selectionStart;
          spanInfo1[0].style.color = ''; 
      }else{  
          spanInfo1[0].innerHTML = (nameInput[0].selectionStart != 0) ? "Good: "+nameInput[0].selectionStart : '';//тернарное выражение
          spanInfo1[0].style.color = 'green';   } 

/*------->>>--Pass--<<-----------*/

      if(passInput[0].selectionStart < 6 && passInput[0].selectionStart !=0){ 
          spanInfo2[0].innerHTML = "min 6: "+passInput[0].selectionStart;
          spanInfo2[0].style.color = '';
      }else{  
          spanInfo2[0].innerHTML = (passInput[0].selectionStart != 0) ? "Good: "+passInput[0].selectionStart : ''; 
          spanInfo2[0].style.color = 'green';   }

/*------->>>--Mail--<<-----------*/

      if(arrMail != null && emailInput.value != ''){ 
          spanInfo3.innerHTML = "OK";
          spanInfo3.style.color = 'green'; 
      }else{  
          spanInfo3.innerHTML = (emailInput.value != '') ? "---" : '';
          spanInfo3.style.color = 'red';   } 

  }else{/*------------->>>>>>--ЛИЧНЫЙ КАБИНЕТ --<<<<<<<------------ */
     
/*------->>>--Login--<<-----------*/ 

      if(nameInput[1].selectionStart < 4 && nameInput[1].selectionStart != 0){ 
          spanInfo1[1].innerHTML = "min 4: "+nameInput[1].selectionStart;
          spanInfo1[1].style.color = ''; 
      }else{  
          spanInfo1[1].innerHTML = (nameInput[1].selectionStart != 0) ? "Good: "+nameInput[1].selectionStart : '';
          spanInfo1[1].style.color = 'green';   } 

/*------->>>--Pass--<<-----------*/ 

      if(passInput[1].selectionStart < 6 && passInput[1].selectionStart !=0){ 
          spanInfo2[1].innerHTML = "min 6: "+passInput[1].selectionStart;
          spanInfo2[1].style.color = '';
      }else{  
          spanInfo2[1].innerHTML = (passInput[1].selectionStart != 0) ? "Good: "+passInput[1].selectionStart : ''; 
          spanInfo2[1].style.color = 'green'; }
  }
}

function answer1 (data, Event){
    if(Event.target.id == 'formReg'){
      infoServer[0].innerHTML = data;
    }else{   
        console.dir(data);
        submitEnter.value = 'Выход';
        infoServer[1].innerHTML = data;
    }             
}
 


f


 ;
/*------------------------------------------------------------------------------ */

/*Из-за того что Event добавляет () мы вызываем вложенную в return функцию. т.к. передача имени функции в return или безымянной функции это одно и тоже,
  а вложенность возвращаемых функций вызывается добавлением скобок вызова основной функции.Чем глубже возвращаемые функции тем больше скобок
  Важно. Так как Event вызывает теперь не 1ю функцию, а вторую, то this этого объекта, на котором висит Event, относиться ко 2й функции а не к 1й */


/*Ajax - Asynchronous Javascript and XML это технология которая делает запросы на сервер в фоновом режиме
  Есть технология сокетов - но это позже нужно вкуривать. Сокет это открытый прямой канал, без постояных запрос-ответов. С сокетами работают на Node.js
  Как работает:
  JS - по пратаколы HTTP отсылает запрос на сервер, на сервере php вормирует новый запрос(тоесть что будет ответом) на сторону клиента */
/*Очередной раз подтвердилось, что длинными кодами не получиться нормально рабоотать. 
  вот это document.querySelector('#name').addEventListener('input', lengchLogin) - объект на который повесили собылите, так что нет смысла это добавлять в переменную,
  а нас потом нужен обект для обращения это   document.querySelector('#name') - вот объект*/

/*Задача:До нажатия на кнопку счётчик ввода не показывать, но ограничить. Логин до 10, Пароль до 11.
  При клике на кнопку, показать клиенту счётчик ввода если он ввёл меньше: Логин 4х, Пароль 6х 
  Счётчик с права инпут и динамически он должен изменяться. 
  При достижении логина более 4х и пароля более 6 прекращать показ счётчика, уменьшая счётчик должен появляться.
  Главная мысль что активация дальнейшего поведения счётчика должно активитьваться после нажатия на кнопку и ХОТЯМЫ 1М 
  символе. При нулевом вводе нажатие на кнопку не должно ничего провоцировать.
  
  если символов недостаточно. */


/*1. По Ajax можно обращаться на любой сервер. Вроде даже HTTPS не помогает
  2. Ajax не защищён т.к. функции лежат на стороне клиента*/



//disablet - отключает input, readOnly - прекращает изменения и ничего не сделать, но фокус выбрать можно
//Я так понимаю на свойства и методы полученые аргументом Event нельзя повлиять. Можно только воспользоваться.    
  //&nbsp - один пробел, &emsp -4пробела, но чёт не робит  

// function Ajax1(method, url, body = null){

//     return new Promise((resolve, reject) => {
//       let xhr = new XMLHttpRequest(); 
//       xhr.addEventListener('load', check);
//       xhr.open(method, url);
//       xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//       xhr.send(body);
//       function check(){
//         if(this.responseText != ''){
//         resolve(this.responseText); }
//         else{
//         reject(Error('С сервера ничего не пришло.'))  }  }

//     })}
 


/*Вариант 1.
Заполняется по принципу GET запроса.
let body = 'name='+ nameInput.value + '&pass=' + passInput.value + '&email=' + emailInput.value;
  
можно предварительно закодировать
 let Login = nameInput.value;
 let Pass = passInput.value;
 let Email = emailInput.value;
 let body = 'Login=' + encodeURIComponent(Login) + '&Pass=' + encodeURIComponent(Pass) + '&Email=' + encodeURIComponent(Email); 
xhr.send(body);

  Вариант 2
let body = new FormData(принимает форму) - это класс который создаёт объект для отправки формы на сервер
  можно форму не передавать а добавить отдельные inputы к объекту
       body.append("name", nameInput.value);
       body.append("pass", passInput.value);
       body.append("email", emailInput.value);
Важно: Заголовки передавать не нужно.

  Вариант 3







let search = new URLSearchParams() - объект для поиска данных*/


