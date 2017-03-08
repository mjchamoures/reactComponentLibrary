import React from 'react';
import AwesomeComponent from './AwesomeComponent.jsx';
import {render} from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <p> Hello React! </p>
        <AwesomeComponent />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));

