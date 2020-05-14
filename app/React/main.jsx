//ReactDOM.render(<h1>Привет</h1>, document.getElementById('box'))
/*
    В React есть компоненты, это блоки в блоках
    имя класса всегда с большой буквы иначе react неправильно выдаёт теги
    Ещё кстате class в таком случае будет отвечать за возвращаемый кусок кода. Например мы делаем header

*/

class MyClass extends React.Component {
    render() {//метод не от балды
        return (<h3> dsd {this.props.name}</h3>);//props это объект смотрящий за атрибутами невидимого тега класса
    }
}
ReactDOM.render(<MyClass />, document.getElementById('box'));

class HelloMessage extends React.Component {
    /*
        render не может мозвращать больше одного упакованого блока, такой вариант
        <div></div>
        <p></p>
        не сработает. Только один родительский блок, это значит нужно завернуть в один блок и вернуть
        <div>
            <div></div>
            <p></p>
        </div>
        
        поэтому что бы 
    */
    render() {
      return (
          <div>
            <h3>Hello {this.props.name}</h3>{/*одни фигурные скобки работают как 2 скобки в handlebarsЁ */}
            <p>Параграф</p>
          </div>
          
      );
    }
  }

  ReactDOM.render(
      <div class='dd'>
          <HelloMessage name="Вася" />,
          <HelloMessage name="Петя" />,
          <HelloMessage name="Жора" />,
      </div>,
    
    document.getElementById('box1')
  );

/*
    Как я понял в одном файле мы облагораживаем одну страницу.
    с помощью Handlebars может подкидывать такие страницы с сервера.
    Получаеться забота React создать структуру страницы посредством JS.
    Непосредственного вмещательства handlebarsa в страницу не может быть т.к. расширение другое.
    Handlebars как я понимаю это стророна сервера, React клиента. Есть
    похожие возможности.
*/







