import React from "react";
import Display from "./components/Display";
import Button from "./components/Button";
import Equation from "./components/Equation";
import layout from "./layout.json";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.prefixEquation = new Equation('');
    this.state = {
      equation: '',
      value: 0
    };
    this.layout = layout;
    this.appWidth = layout.columns * (layout.buttonWidth + layout.buttonMargin * 2);
    this.handleEqualsClick = this.handleEqualsClick.bind(this);
  }

  handleEqualsClick() {
    this.setState({
      value: this.prefixEquation.setEquation(this.state.equation).evaluate().getValue()
    });
  }

  render() {
    return (
      <div className="calculator" style = {{
          width : this.appWidth,
          padding : this.layout.buttonMargin
        }}>
        <Display 
          equation={this.state.equation} 
          value={this.state.value} 
          style = {{
            width : this.appWidth - (this.layout.buttonMargin * 2),
            height : this.layout.lineHeight * this.layout.fontSize * 2,
            fontSize : this.layout.fontSize * 1.3,
            borderRadius : this.layout.borderRadius,
            border : '2px solid grey',
            padding : '5px',
            boxSizing : 'border-box',
            margin : `${this.layout.buttonMargin}px auto`
          }}
          />
        {this.layout.buttons.map((span, index) => {
          return (
            <Button
              className = "button"
              key = {index + "_" + span}
              content={span} 
              style={{
                lineHeight: this.layout.lineHeight,
                margin: this.layout.buttonMargin,
                width: this.layout.buttonWidth,
                fontSize: this.layout.fontSize,
                borderRadius: this.layout.borderRadius
              }} 
              onClick={() => {
                if (span === "=") {
                  this.handleEqualsClick();
                  return;
                }
                else if (span === "AC") {
                  this.setState({
                    equation : '',
                    value : 0
                  });
                  return;
                }
                let peek = this.state.equation.charAt(this.state.equation.length - 1);
                if (isNaN(span) && isNaN(peek) && span !== '(' && span !== ')' && peek !== '(' && peek !== ')') 
                  return;
                this.setState({
                  equation : this.state.equation + span
                });
              }}
            />
          )
        })}
      </div>
    );
  }
}

export default App;
