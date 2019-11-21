import React from "react";
import "./Display.css";

class Display extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        equation : '',
        value : 0
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      equation : props.equation,
      value : props.value
    });
  }

  render() {
    return (<div className="display" style = {this.props.style}>
    <div className = "equation" style = {{height : '50%', overflow: 'hidden'}}>{this.state.equation}</div>
    <div className = "value" style = {{textAlign : 'right', overflow: 'hidden'}}>{this.state.value}</div>
    </div>);
  }
}

export default Display;
