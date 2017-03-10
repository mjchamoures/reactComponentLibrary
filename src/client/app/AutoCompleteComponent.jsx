import React from 'react';
import Fetch from 'react-fetch'

class DropdownRow extends React.Component {


  render() {
    //TODO: figure out how to add a class based on active or not
    let cssClass = "list-group-item";
    cssClass = cssClass + (this.props.isActive === true ? " Active" : "");
    return (

      <li class={cssClass}>{this.props.resultText}</li>

    );

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
      rows.push(<DropdownRow class="list-group" isActive={isActive} resultText={result.city}/>);

    });

    return (
      <ul>
      {rows}
      </ul>
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
      <input type="text" value={text} onKeyUp={this.handleKeyup} onChange={this.handleChange}  />
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

    let searchText = this.state.currentIndex === -1 ? this.state.searchText : this.props.listings[this.state.currentIndex];

    return (

      <div>
        Enter Search Text:
        <SearchTextComponent searchText={searchText} keyupEventHandler={this.keyupEventHandler} />

        <DropdownComponent results={this.state.results} currentIndex={this.state.currentIndex} /> 
      
      </div>

    );


  }

}

export default AutoCompleteComponent;