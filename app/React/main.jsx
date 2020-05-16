
//Компонент - это тот шаблон который содержит html код, для дальнейшего рендеринга в ReactDOM 
function Welcome(props) {
    return <h1>Привет, {props.name}</h1>
}
const element = <Welcome name = 'Алиса' />//такая конструкция в виде тега передаёться в ReactDOM.render в JSX 



/*----------------------------------------------------------------------------- */
/* Создали маленький компонент и зарендерили его передав имя */
class MyClass extends React.Component {

    render() {//метод не от балды
        return (
            <h2>#Имя: "{this.props.name}"</h2>
        )
    }
}
ReactDOM.render(
    <MyClass name='Алиса'/>, 

    document.getElementById('box')
    );
/*------------------------------------------------------------------------------ */
/* Мало того что мы создали другой компонент, мы может подключить другой кусок шаблона-компонента и зарендерить 
   его в другой тег, передав ему параметры через новый компонент через свойства */
class HelloMessage extends React.Component {
  
    render() {
      return (
          <div>
            <MyClass name={this.props.name}/>
            <h3>Hello {this.props.name}</h3>{/*одни фигурные скобки работают как 2 скобки в handlebarsЁ */}
            <h4>Параграф</h4>
          </div>
          
      );
    }
  }

  ReactDOM.render(
      <div class='dd'>
          <HelloMessage name="Вася" /><hr/>
          <HelloMessage name="Петя" /><hr/>
          <HelloMessage name="Жора" /><hr/>
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
/***********События*********** */
let text1 = 'В продаже появились сковородки с электронным антипригарным покрытием: когда еда начинает подгорать, у вас автоматически отключается интернет.'
let text2 = 'Хорошо бы, если бы на экзамене присутствовали продавцы-консультанты. Сидишь такой, приуныл, а он тут как тут: Вам подсказать что-нибудь?'
let text3 = 'Молодая парочка гуляет по парку. Ни мороженого, ни воды, ни цветов в продаже нет. Висит объявление "Не сорить, не плевать. Штраф 10 рублей" Парень девушке: Плюй, я угощаю...'
class Footer extends React.Component{
    myMethod(){
        alert('Абра кадабра #1')
    }
    myMethod1(){
        alert('Абра кадабра #2')
    }
    myMethod2(){
        alert('Абра кадабра #3')
    }
    render(){
        
        return (
        <div className='footer__item'>
            <HelloMessage name={this.props.name}/>
            <h5>{this.props.name}</h5>
            <p>{this.props.text}</p>
            <a href={this.props.link}>Сылка</a>
            <p>
            <button onClick={this.props.click}>Кнопка</button>{/*Как менять методы*/}
            </p>
            <div>{this.props.children}</div>
        </div>
        )
    }
}
ReactDOM.render(
    <div>
        <Footer name='Анекдот 1' text={text1} link='http://google.com' click={Footer.prototype.myMethod}/>
        <Footer name='Анекдот 2' text={text2} link='http://yandex.ru' click={Footer.prototype.myMethod1}/>
        <Footer name='Анекдот 3' text={text3} link='http://ya.ru' click={Footer.prototype.myMethod2}>Можно заносить текст. Обратиться к нему через props.children</Footer>
    </div>,
    document.querySelector('footer')
    
)
/*
    Какие плюсы подключения компонентов в компоненты, ну это то что код уже написаный просто можно копировать, для 
    этого нужно хорошо понимать струкутру html. имеющийся код просто добавляеться к новому это понятно.
    Какие дела обстоят с передачей параметров. Ну 1е это увеличиваеться число пробсов(свойств), 2е можно запутаться в
    этих свойствах. Каждый подключеный компонент может иметь теже имена атрибутов, а уж что туда попадёт будет зависеть от того какие параметры
    я передаю через ReactDOM которые будут добавляться исходя из надобности.
*/
/*####----Отслеживание состояний----######## */

class Input extends React.Component{
    constructor(props){
        super(props)
        this.method = this.method.bind(this)
        this.state = {checked: false}
    }
    method({target}){
        this.setState({checked:target.checked})
    }
    render(){
        let messege;
        
        if(this.state.checked)
            messege = 'выбран';
        else
            messege = 'не выбран';
        return (
            <div>
                <input id='check' type="checkbox" onChange={this.method}/>
                <p>Чекбокс {messege}</p>
            </div>
            
        )
    }
}

/*
    передача компоненту данных это уже можно сказать инициализация экземпляра класса
*/
ReactDOM.render(
    <Input name='df'>ff</Input>,
    document.querySelector('form')
)

let input = document.querySelector('button')
input.click(input.click.bind(input))


input.addEventListener('click', (event) =>{
    console.dir(this);
})


/*-----------------------------------------------------------------------------*/

/*
    Скажем так в нивидимые теги классов тобишь Компонентов нельзя обернуть теги. Так что идея рендерить в body
    по структуре не получиться. Как минимум будет рендер в body с последующей обёрткой div в которую и будут
    складываться компоненты  
*/
/*
    Странно работает event. При просмотре события нет никакой информации, но если обратиться к методам то 
    информация есть.
*/

