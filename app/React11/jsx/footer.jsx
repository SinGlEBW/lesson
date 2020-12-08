/***********События*********** */
let text1 =
  "В продаже появились сковородки с электронным антипригарным покрытием: когда еда начинает подгорать, у вас автоматически отключается интернет.";
let text2 =
  "Хорошо бы, если бы на экзамене присутствовали продавцы-консультанты. Сидишь такой, приуныл, а он тут как тут: Вам подсказать что-нибудь?";
let text3 =
  'Молодая парочка гуляет по парку. Ни мороженого, ни воды, ни цветов в продаже нет. Висит объявление "Не сорить, не плевать. Штраф 10 рублей" Парень девушке: Плюй, я угощаю...';
class Footer extends React.Component {
  myMethod() {
    alert("Абра кадабра #1");
  }
  myMethod1() {
    alert("Абра кадабра #2");
  }
  myMethod2() {
    alert("Абра кадабра #3");
  }
  render() {
    return (
      <div className="footer__item">
        <HelloMessage name={this.props.name} />
        <h5>{this.props.name}</h5>
        <p>{this.props.text}</p>
        <a href={this.props.link}>Сылка</a>
        <p>
          <button onClick={this.props.click}>Кнопка</button>
          {/*Как менять методы*/}
        </p>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
ReactDOM.render(
  <div>
    <Footer
      name="Анекдот 1"
      text={text1}
      link="http://google.com"
      click={Footer.prototype.myMethod}
    />
    <Footer
      name="Анекдот 2"
      text={text2}
      link="http://yandex.ru"
      click={Footer.prototype.myMethod1}
    />
    <Footer
      name="Анекдот 3"
      text={text3}
      link="http://ya.ru"
      click={Footer.prototype.myMethod2}
    >
      Можно заносить текст. Обратиться к нему через props.children
    </Footer>
  </div>,
  document.querySelector("footer")
);
/*
    Какие плюсы подключения компонентов в компоненты, ну это то что код уже написаный просто можно копировать, для 
    этого нужно хорошо понимать струкутру html. имеющийся код просто добавляеться к новому это понятно.
    Какие дела обстоят с передачей параметров. Ну 1е это увеличиваеться число пробсов(свойств), 2е можно запутаться в
    этих свойствах. Каждый подключеный компонент может иметь теже имена атрибутов, а уж что туда попадёт будет зависеть от того какие параметры
    я передаю через ReactDOM которые будут добавляться исходя из надобности.
*/
/*####----Отслеживание состояний----######## */

class Input extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { messege: localStorage.getItem("messege") || "не выбран" };
  method = function ({ target }) {
    let ch = target.checked ? "выбран" : "не выбран";
    this.setState({ messege: ch });

    localStorage.setItem("messege", ch);
    localStorage.setItem("check", target.checked);
  };

  render() {
    console.dir(this);
    return (
      <div>
        <input
          type="checkbox"
          onChange={this.method}
          defaultChecked={localStorage.getItem("check")}
        />
        <p>Чекбокс {this.state.flags}</p>
      </div>
    );
  }
}
Input.defaultProps = {
  ff: "ddfdf",
  ggg: "fgf",
};
ReactDOM.render(
  <Input name="Евгений Ваганович">Какой-то текст</Input>,
  document.querySelector("form")
);
