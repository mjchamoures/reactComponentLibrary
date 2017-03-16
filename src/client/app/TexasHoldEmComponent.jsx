import React from 'react';



// child component for card
function Card(props) {

  return (

    <div style={props.style}>{props.card[1]} of {props.card[0]}</div>

  );

};


// child component for hand
class CardHand extends React.Component {

  render() {

    let cards = [];

    for(let i = 0; i < this.props.cards.length; i++) {
      // currentCard will be a 2 element array with suit then value
      let currentCard = this.props.cards[i].split(':'); 

      const divStyle = {
        color: (currentCard[0] === 'Club' || currentCard[0] === 'Spade') ? 'black' : 'red',
        backgroundColor: 'white',
        width: '150px',
        margin: '20px',
        height: '200px',
        display: 'inline-block',
        padding: '10px',
        textAlign: 'right',
      };

      cards.push(<Card key={i} card={currentCard} style={divStyle} />)
    }


    return (
      <div>
        {cards}
      </div>  
    );

  }

};


// parent game component to be exported
class TexasHoldEmComponent extends React.Component {

  constructor() {
    super();

    this.state = {
      cardDeck : [],
      currentCards : [],
    };
  }

  handleDealClick() {

    let currentCardDeck = this.state.cardDeck.slice();
    
    // if the deck doesn't have enough cards for a full hand, reshuffle whole deck before picking 5 new ones
    if(currentCardDeck.length < this.props.handSize) {
      // reshuffle deck
      currentCardDeck = this.getFreshDeck();      
    } 

    const newCards = currentCardDeck.slice(0, this.props.handSize);

    const remainingCards = this.state.cardDeck.slice(this.props.handSize-1, this.state.cardDeck.length);
    
    this.setState({
      cardDeck : remainingCards,
      currentCards : newCards,
    });
  }

  render() {

    const divStyle = {
      backgroundColor : 'green',
      height: '400px',
      width: '75%',
    }  

    return (

      <div style={divStyle}>
        <button onClick={() => this.handleDealClick()}>Deal Cards</button>
        <CardHand cards={this.state.currentCards} />  
      </div>

    );
  }

  //helper function
  getFreshDeck() {

    let suits = ['Spade', 'Club', 'Heart', 'Diamond'];
    let values = ['1', '2', '3', '4', '5','6','7','8','9','10','Jack', 'Queen', 'King', 'Ace'];

    let cards = [];

    // build the basic card deck
    values.forEach((value, index) => {
      suits.forEach((suit, index) => {
        cards.push(suit + ':' + value);
      });
    });

    // shuffle now
    return this.shuffleArray(cards);
  }

  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
  shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  }

}


export default TexasHoldEmComponent;
