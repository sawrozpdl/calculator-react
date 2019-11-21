import React from "react";
import "./Button.css";

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="button" style = {this.props.style} onClick = {this.props.onClick}>
            <span>{this.props.content}</span>
        </div>
    );
  }
}

export default Button;
