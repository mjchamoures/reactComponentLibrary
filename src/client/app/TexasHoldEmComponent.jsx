import React from 'react';



// child component for card
function Card(props) {

  return (

    <div style={props.style}>{props.card[1]} of {props.card[0]}</div>

  );

};


// child component for a set of cards..could be a hand or could be etc/flop/river
class CardSet extends React.Component {

  render() {

    let cards = [];

    for(let i = 0; i < this.props.cards.length; i++) {
      // currentCard will be a 2 element array with suit then value
      let currentCard = this.props.cards[i].split(':'); 

      const divStyle = {
        color: (currentCard[0] === 'Club' || currentCard[0] === 'Spade') ? 'black' : 'red',
        backgroundColor: 'white',
        width: '75px',
        margin: '20px',
        height: '100px',
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


class Player extends React.Component {


  render() {
    let foldButtonStyle = {
      margin : "10px",
    };

    return (
      
      <div>
        <label>Player {this.props.name}</label>
        <button style={foldButtonStyle} onClick={() => this.props.onFoldClick()}>Fold</button>
        <CardSet cards={this.props.cards} />
      </div>

    );

  }


}; 




class Board extends React.Component {

  // no state for now...could add bets/winner later 
  

  getFlopTurnRiverLabel() {
    let label = "";

    switch(this.props.flopTurnRiverCards.length) {

      case 3 :
        label = "The Flop...";
        break;
      case 4 :
        label = "The Flop, the Turn...";
        break;
      case 5 :
        label = "The Flop, the Turn, and the RIVER!";
        break;
      default :
        label = "";
        break; 
    }

    return label;
  }

  render() {

    let players = [];

    for(let i = 0; i < this.props.playersCards.length; i++) {
      if(this.props.playersCards[i].length > 0) {
        players.push(<Player key={i} onFoldClick={() => this.props.onFoldClick(i)} name={i} cards={this.props.playersCards[i]} />);
      }
    }

    let divStyle = {
        margin: "10px",
    };

    let label = this.getFlopTurnRiverLabel();
  
    return (
      <div style={divStyle}>
        <div>
          <label>{label}</label>
          <CardSet cards={this.props.flopTurnRiverCards} />   
        </div>

        <div>
          {players}
        </div>
      </div>  
    );

  }

}


// Dealer component that handles the clicking of dealer button and calling back to parent if cards run out, or after each hand
class Dealer extends React.Component {

  render() {

    let divStyle = {
        margin: "10px",
    };

    return (
      <div style={divStyle}>
        <button onClick={() => this.props.onClick()}>Deal Cards</button>
      </div>
    );

  }

}



// parent component that handles new games, and the state of the cards/game
class TexasHoldEmComponent extends React.Component {

  constructor() {
    super();

    // props will include numPlayers

    let currentCardDeck = this.getFreshDeck();

    this.state = {
      cardDeck : currentCardDeck,
      playersCards : [],
      flopTurnRiverCards : [],
    };
  }

  handleDealClick() {

    // current state tracking
    let currentCardDeck = this.state.cardDeck.slice();
    let playersCards = this.state.playersCards.slice();
    let flopTurnRiverCards = this.state.flopTurnRiverCards.slice();

    // check if players cards have been dealt yet
    if(playersCards.length === 0) {
      // deal theirs...each player gets two cards for t holdem
      for(let i=0; i < 2; i++) {
        for(let j = 0; j < this.props.numPlayers; j++) {
          if(i === 0) {
            playersCards.push([]);
          }
          playersCards[j].push(currentCardDeck.pop());
        }
      }
    } else {

      switch(flopTurnRiverCards.length) {

        case 0 : 
          while(flopTurnRiverCards.length < 3) {
            flopTurnRiverCards.push(currentCardDeck.pop());
          }
          break;
        case 3 :
          while(flopTurnRiverCards.length < 4) {
            flopTurnRiverCards.push(currentCardDeck.pop());
          }
          break;
        case 4 :
          while(flopTurnRiverCards.length < 5) {
            flopTurnRiverCards.push(currentCardDeck.pop());
          }
          break;
        default :
          // this hand is over...disable deal button and declare winner or something
          break; 

      }

    }

    this.setState({
      cardDeck : currentCardDeck,
      playersCards : playersCards,
      flopTurnRiverCards : flopTurnRiverCards,
    });
  }

  handleNewGameClick() {
    // forcing a re-render to start over a new game
    this.setState({
      cardDeck : this.getFreshDeck(),
      playersCards : [],
      flopTurnRiverCards : [],
    });

  }

  handleFoldClick(playerNumber) {

    let playersCards= this.state.playersCards.slice();
    playersCards[playerNumber] = [];

    this.setState({
      playersCards : playersCards,
    });

  }

  render() {

    const boardDivStyle = {
      backgroundColor : 'green',
      height: '800px',
      width: '75%',
    };

    const newGameDivStyle = {
      margin : "10px",
    };

    return (

      <div style={boardDivStyle}>

        <div style={newGameDivStyle}>
          <button onClick={() => this.handleNewGameClick()}>New Game</button>
        </div>

        <Dealer 
          numPlayers={this.props.numPlayers} 
          onClick={() => this.handleDealClick()}
        />

        <Board 
          playersCards={this.state.playersCards} 
          flopTurnRiverCards={this.state.flopTurnRiverCards} 
          onFoldClick={(i) => this.handleFoldClick(i)}
        />

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
