import React from 'react';
import Fetch from 'react-fetch'
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class DropdownRow extends React.Component {


  render() {
    let row = this.props.isActive ? <ListGroupItem active>{this.props.resultText}</ListGroupItem> : <ListGroupItem >{this.props.resultText}</ListGroupItem>;
    
    return (row);
  }

}

class DropdownComponent extends React.Component {

  // receives 'results' in props, as well as currentIndex...
  render() {
    let rows = [];
    var isActive = false;

    // build the rows
    this.props.results.forEach((result, index) => {

      isActive = this.props.currentIndex === index;
      rows.push(<DropdownRow isActive={isActive} resultText={result.city}/>);

    });

    return (
      <ListGroup>
      {rows}
      </ListGroup>
    );

  }


};

class SearchTextComponent extends React.Component {

  constructor(props) {
    super(props);

    this.handleKeyup = this.handleKeyup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleKeyup(event) {
    let eventKey = event.key;
    let searchText = event.target.value;
    this.props.keyupEventHandler(eventKey, searchText);
  }

  handleChange(event) {
    let eventKey = event.key;
    let searchText = event.target.value;
    this.props.keyupEventHandler(eventKey, searchText);
  }

  render() {
    let text = this.props.searchText;
    return (
      <FormControl type="text" value={text} onKeyUp={this.handleKeyup} onChange={this.handleChange}  />
    );
  };

};

class AutoCompleteComponent extends React.Component{

  constructor(props) {

    // TODO: find out what this does..also find out how to pass stuff to props, if required
    super(props);
    // props are passed when component is initialized by parent
    // prop is hintLimit and toDO searchUrl

    // this is a React model concept
    this.state = {
      // hintLimit : 5,
      // searchUrl : "",
      searchText : "",
      results : [],
      currentIndex : -1,
    };

    // TODO: may need to set bindings here on event callbacks
    this.keyupEventHandler = this.keyupEventHandler.bind(this);
  }

  keyupEventHandler(eventKey, searchText) {

    let currentIndex = this.state.currentIndex;

    switch(eventKey) {

      case 'ArrowUp' :
        if(currentIndex >= 0) {
          this.setState({currentIndex : currentIndex - 1});
        } else {
          this.setState({currentIndex : this.state.results.length-1});
        }
        break;
      case 'ArrowDown' :
        if(currentIndex < this.state.results.length - 1) {
          this.setState({currentIndex : currentIndex + 1});
        } else {
          this.setState({currentIndex : -1 });
        }
        break;
      default:
        // check if input has changed
        // TODO: Figure out how to get value of SearchTextComponent
        if(this.state.searchText !== searchText) {
          // Submit form via jQuery/AJAX
          // replaces spaces with encoded since it's GET request
          let encodedSearchText = searchText.replace(' ', '%20');
          fetch('http://localhost:3000/listings?city_like=' + encodedSearchText)
          .then(result=>result.json())
          .then(items=>this.setState({results : items, searchText : searchText, currentIndex : -1}));
          
        }

    }

  }

  // "if you dont use something in render, it shouldnt be in the state"
  render() {
    //TODO: make this false result generic 
    let searchText = this.state.currentIndex === -1 ? this.state.searchText : this.state.results[this.state.currentIndex].city;

    return (

      <FormGroup >
        <Col xs={12}>
          <Col xs={3}>
            <ControlLabel>Enter Search Text:</ControlLabel>
          </Col>
          <Col xs={4}>
            <SearchTextComponent searchText={searchText} keyupEventHandler={this.keyupEventHandler} />

            <DropdownComponent results={this.state.results} currentIndex={this.state.currentIndex} /> 
          </Col>
        </Col>
      </FormGroup>

    );


  }

}

export default AutoCompleteComponent;