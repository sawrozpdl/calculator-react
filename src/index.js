import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import Equation from './components/Equation';


document.getElementById('root').innerHTML = new Equation('20/5*2+2^2-3').evaluate().getValue();

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
