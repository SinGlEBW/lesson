import React, { Component } from "react";
import Header from './header.jsx'

export default class App extends Component {
  render() {
    return (
      <div className='conteiner'>
        <h1>{this.props.name}</h1> 
				{/* <Header name='Какой-то текст' />  */}
      </div>
    );
  }
}
// import Header from "./heder.jsx";

//Компонент - это тот шаблон который содержит html код, для дальнейшего рендеринга в ReactDOM
// function Welcome(props) {
//     return <h1>Привет, {props.name}</h1>
// }
// const element = <Welcome name = 'Алиса' />//такая конструкция в виде тега передаёться в ReactDOM.render в JSX

// console.dir(React);
/*----------------------------------------------------------------------------- */
/* Создали маленький компонент и зарендерили его передав имя */


/*------------------------------------------------------------------------------ */
/* Мало того что мы создали другой компонент, мы может подключить другой кусок шаблона-компонента и зарендерить 
   его в другой тег, передав ему параметры через новый компонент через свойства 

    Как я понял в одном файле мы облагораживаем одну страницу.
    с помощью Handlebars может подкидывать такие страницы с сервера.
    Получаеться забота React создать структуру страницы посредством JS.
    Непосредственного вмещательства handlebarsa в страницу не может быть т.к. расширение другое.
    Handlebars как я понимаю это стророна сервера, React клиента. Есть
    похожие возможности.
*/

/*-----------------------------------------------------------------------------*/

/*
    Как я понял есть методы и свойства которые не распознаются но работают.
    JSX формат можно писать и JS файле
*/
/*
    в копилку знаний. стрелочные функции как и bind лучше не использовать в событиях т.к. при обращении к ним они создают новые функции,
    и видимо не очищают память.
    this.method.bind(this) в событии не вариант, присваивать же такую конструкцию в constriction это создавать по сути ещё одну копию метода,
    как по мне рационально просто создать метод безымянной функции и вызвать bind
*/
/*
    Скажем так в невидимые теги классов то бишь Компонентов нельзя обернуть теги. Так что идея рендерить в body
    по структуре не получиться. Как минимум будет рендер в body с последующей обёрткой div в которую и будут
    складываться компоненты  
*/
/*
    Странно работает event. При просмотре события нет никакой информации, но если обратиться к методам то 
    информация есть.
*/
