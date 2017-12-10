import React from 'react';
import { render } from 'react-dom';

import CounterComponent from './CounterComponent.jsx';

class App extends React.Component {
  render() {
    return [
      "Hello React!",
      <CounterComponent key="counter" />
    ];
  }
}

render(<App />, document.getElementById('app'));