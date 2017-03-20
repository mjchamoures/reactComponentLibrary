import React from 'react';
import AwesomeComponent from './AwesomeComponent.jsx';
import AutoCompleteComponent from './AutoCompleteComponent.jsx';
import TicTacToeGameComponent from './TicTacToeGameComponent.jsx';
import StarRatingComponent from './StarRatingComponent.jsx';
import InputWithLabelComponent from './coreComponents/InputWithLabelComponent.jsx';
import ButtonComponent from './coreComponents/ButtonComponent.jsx';
import TexasHoldEmComponent from './TexasHoldEmComponent.jsx';
import {render} from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <p> Hello React! </p>
          <AwesomeComponent />
          <AutoCompleteComponent />
        </div>

        <div>
          <TicTacToeGameComponent />
        </div>

        <div>
          <StarRatingComponent numStars={5} numFilled={2} name={"Fun Level"}/>
        </div>

        <div>
          <TexasHoldEmComponent />
        </div>  
        
        <div>
          <InputWithLabelComponent
            label = {"Enter City:"}
            name={"city"}
            inputColWidth={9}
            placeholder={"eg. San Francisco"}
            onChange={() => {console.log("hey")}}
          />
        </div>
        <div>
          <ButtonComponent
            size={"sm"}
            type={"primary"}
            onClick={() => {console.log("you clicked me")}}
            disabled={false}
            text={"Primary"}
          />
          <ButtonComponent
            size={"sm"}
            type={"default"}
            onClick={() => {console.log("you clicked me")}}
            disabled={false}
            text={"Default"}
          />
          <ButtonComponent
            size={"sm"}
            onClick={() => {console.log("you clicked me")}}
            disabled={false}
            text={"Default 2"}
          />
          <ButtonComponent
            size={"md"}
            type={"warning"}
            onClick={() => {console.log("you clicked me")}}
            disabled={false}
            text={"Warning Medium"}
          />
        </div>
      </div>
    );
  }
}

var LISTINGS =  [
  {
    "id" : 1,
    "type" : "House",
    "city" : "San Clemente",
    "price" : 100.0
  },
  {
    "id" : 2,
    "type" : "House",
    "city" : "San Francisco",
    "price" : 50.0
  },
  {
    "id" : 3,
    "type" : "House",
    "city" : "San Luis Obispo",
    "price" : 100.0
  },
  {
    "id" : 4,
    "type" : "House",
    "city" : "Santa Ana",
    "price" : 100.0
  },
  {
    "id" : 5,
    "type" : "House",
    "city" : "Santorini",
    "price" : 100.0
  },
  {
    "id" : 6,
    "type" : "House",
    "city" : "New Jerky",
    "price" : 100.0
  },
  {
    "id" : 7,
    "type" : "APT",
    "city" : "New jersey",
    "price" : 100.0
  },
  {
    "id" : 8,
    "type" : "House",
    "city" : "Newport",
    "price" : 100.0
  },
  {
    "id" : 9,
    "type" : "House",
    "city" : "Newton",
    "price" : 100.0
  }
];  

render(<App/>, document.getElementById('app'));
