
import React from 'react';
// import 


// component for square
function Square(props) {

  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );

};


// component for board
class Board extends React.Component {

  render() {
    let currentSquares = [];
    // build the squares
    for(let i = 0; i < this.props.squares.length; i++) {
      currentSquares.push(<Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />);
    }

    return (
      <div>

        <div className="board-row">
          {currentSquares[0]}
          {currentSquares[1]}
          {currentSquares[2]}
        </div>
        <div className="board-row">
          {currentSquares[3]}
          {currentSquares[4]}
          {currentSquares[5]}
        </div>
        <div className="board-row">
          {currentSquares[6]}
          {currentSquares[7]}
          {currentSquares[8]}
        </div>

      </div>
    );
  };

};


// component for game
class Game extends React.Component {

  constructor(props) {

    super();

    // hold state for squares, and who's turn it is next
    this.state = {
      history : [{
          squares : Array(9).fill(null),
      }],  
      xIsNext : true,
      stepNumber : 0,
    };

  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if(calculateWinner(squares) || squares[i]) {
      return;
    } else {

      squares[i] = this.state.xIsNext ? 'X' : 'O';

      this.setState({
        history : history.concat([{
          squares : squares
        }]),
        xIsNext : !this.state.xIsNext,
        stepNumber : this.state.stepNumber + 1,
      });
    }

  }

  jumpTo(step) {

    this.setState({
      xIsNext : (step % 2) ? false : true,
      stepNumber : step,
    });

  }

  render() {
    let history = this.state.history;
    let current = history[this.state.stepNumber];
    let winner = calculateWinner(current.squares);

    let status;
    if(winner) {
      status = 'Winner is: ' + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((move, step) => {

      const desc = step ?
        'Move #' + step :
        'Game Start';

      return (
          <li key={step}>
            <a href="#" onClick={() => this.jumpTo(step)}>{desc}</a>
          </li>
      );

    });

    return (

      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares} 
            onClick={(i) => this.handleClick(i)} 
          />
        </div>

        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>  
      </div>

    );
  };

};


export default Game;


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
