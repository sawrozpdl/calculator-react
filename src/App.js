import React, { Component } from 'react';
import Display from './components/Display';
import Button from './components/Button';
import Equation from './components/Equation';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      equation : '',
      value : 0
    }
  }

  render() {
    return (
      <div className="calculator">
        hello from my calculator
      </div>
    );
  }
}

export default App;
