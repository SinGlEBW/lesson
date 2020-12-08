import React, { Component } from "react";
import Navigation from "./nav.jsx";

export default class Header extends Component {
  render() {
    
    return (
      <div>
        <h3>Hello {this.props.name}</h3>{/*одни фигурные скобки работают как 2 скобки в handlebarsЁ */}
        <h4>Параграф</h4>
				<nav class='dd'>
					<ul>
						<Navigation name="Главная" /><hr/>
         		<Navigation name="Скачать" /><hr/>
          	<Navigation name="Информация" /><hr/>
					</ul>
         </nav>
      </div>
    )
  }
}
