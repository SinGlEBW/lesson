export default 'Вася';
let dd = 11
// import React, { Component } from 'react'
// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       flags: false
//     };
//   }

//   method() {
//     this.setState(state => ({
//       flags: !state.flags
//     }));
//   }
//   render() {
//     return (
//       <div>
//         <input id="check" type="checkbox" onChange={this.method.bind(this)} />
//         <p>Чекбокс {this.state.flags ? "выбран" : "не выбран"}</p>
//       </div>
//     );
//   }
// }


// console.dir(React);

// /*----------------------------------------------------------------------------- */
// /* Создали маленький компонент и зарендерили его передав имя */
// class MyClass extends React.Component {

//     render() {//метод не от балды
//         return (
//             <h2>#Имя: "{this.props.name}"</h2>
//         )
//     }
// }
// ReactDOM.render(
//     <MyClass name='Алиса'/>, 

//     document.getElementById('box')
//     );
// /*------------------------------------------------------------------------------ */
// /* Мало того что мы создали другой компонент, мы может подключить другой кусок шаблона-компонента и зарендерить 
//    его в другой тег, передав ему параметры через новый компонент через свойства */
// class HelloMessage extends React.Component {
  
//     render() {
//       return (
//           <div>
//             <MyClass name={this.props.name}/>
//             <h3>Hello {this.props.name}</h3>{/*одни фигурные скобки работают как 2 скобки в handlebarsЁ */}
//             <h4>Параграф</h4>
//           </div>
          
//       );
//     }
//   }

//   ReactDOM.render(
//       <div class='dd'>
//           <HelloMessage name="Вася" /><hr/>
//           <HelloMessage name="Петя" /><hr/>
//           <HelloMessage name="Жора" /><hr/>
//       </div>,
    
//     document.getElementById('box1')
//   );

// /*
//     Как я понял в одном файле мы облагораживаем одну страницу.
//     с помощью Handlebars может подкидывать такие страницы с сервера.
//     Получаеться забота React создать структуру страницы посредством JS.
//     Непосредственного вмещательства handlebarsa в страницу не может быть т.к. расширение другое.
//     Handlebars как я понимаю это стророна сервера, React клиента. Есть
//     похожие возможности.
// */
// /***********События*********** */
// let text1 = 'В продаже появились сковородки с электронным антипригарным покрытием: когда еда начинает подгорать, у вас автоматически отключается интернет.'
// let text2 = 'Хорошо бы, если бы на экзамене присутствовали продавцы-консультанты. Сидишь такой, приуныл, а он тут как тут: Вам подсказать что-нибудь?'
// let text3 = 'Молодая парочка гуляет по парку. Ни мороженого, ни воды, ни цветов в продаже нет. Висит объявление "Не сорить, не плевать. Штраф 10 рублей" Парень девушке: Плюй, я угощаю...'
// class Footer extends React.Component{
//     myMethod(){
//         alert('Абра кадабра #1')
//     }
//     myMethod1(){
//         alert('Абра кадабра #2')
//     }
//     myMethod2(){
//         alert('Абра кадабра #3')
//     }
//     render(){
        
//         return (
//         <div className='footer__item'>
//             <HelloMessage name={this.props.name}/>
//             <h5>{this.props.name}</h5>
//             <p>{this.props.text}</p>
//             <a href={this.props.link}>Сылка</a>
//             <p>
//             <button onClick={this.props.click}>Кнопка</button>{/*Как менять методы*/}
//             </p>
//             <div>{this.props.children}</div>
//         </div>
//         )
//     }
// }
// ReactDOM.render(
//     <div>
//         <Footer name='Анекдот 1' text={text1} link='http://google.com' click={Footer.prototype.myMethod}/>
//         <Footer name='Анекдот 2' text={text2} link='http://yandex.ru' click={Footer.prototype.myMethod1}/>
//         <Footer name='Анекдот 3' text={text3} link='http://ya.ru' click={Footer.prototype.myMethod2}>Можно заносить текст. Обратиться к нему через props.children</Footer>
//     </div>,
//     document.querySelector('footer')
    
// )
// /*
//     Какие плюсы подключения компонентов в компоненты, ну это то что код уже написаный просто можно копировать, для 
//     этого нужно хорошо понимать струкутру html. имеющийся код просто добавляеться к новому это понятно.
//     Какие дела обстоят с передачей параметров. Ну 1е это увеличиваеться число пробсов(свойств), 2е можно запутаться в
//     этих свойствах. Каждый подключеный компонент может иметь теже имена атрибутов, а уж что туда попадёт будет зависеть от того какие параметры
//     я передаю через ReactDOM которые будут добавляться исходя из надобности.
// */
// /*####----Отслеживание состояний----######## */

// class Input extends React.Component{
//     constructor(props){
//         super(props)
       
//     }
//     state = {messege: localStorage.getItem('messege') || 'не выбран'}
//     method = function({target}){
        
//         let ch = (target.checked) ? 'выбран' : 'не выбран';
//         this.setState({messege: ch})
        
//         localStorage.setItem('messege', ch)
//         localStorage.setItem('check', target.checked)
       
//     }
    
//     render(){
//         console.dir(this);
//         return (
//             <div>
//                 <input type="checkbox" onChange={this.method} defaultChecked={localStorage.getItem('check')}/>
//                 <p>Чекбокс {this.state.flags}</p>
//             </div> 
//         )
//     } 
// }
// Input.defaultProps = {
//     ff: 'ddfdf',
//     ggg: 'fgf'
// }
// ReactDOM.render(
//     <Input name='Евгений Ваганович'>Какой-то текст</Input>,
//     document.querySelector('form')
// )

/*-----------------------------------------------------------------------------*/

/*
    Как я понял есть методы и свойства которые не распознаються но работают.
    JSX формат можно писать и JS файле
*/
/*
    в копилку знаний. стрелочные функции как и bind лучше не использовать в событиях т.к. при обращении к ним они создают новые функции,
    и видимо не очищают память.
    this.method.bind(this) в событии не вариант, присваивать же такую конструкцию в constriction это создавать по сути ещё одну копию метода,
    как по мне рационально просто создать метод безымяной функции и вызвать bind
*/
/*
    Скажем так в нивидимые теги классов тобишь Компонентов нельзя обернуть теги. Так что идея рендерить в body
    по структуре не получиться. Как минимум будет рендер в body с последующей обёрткой div в которую и будут
    складываться компоненты  
*/
/*
    Странно работает event. При просмотре события нет никакой информации, но если обратиться к методам то 
    информация есть.
*/

