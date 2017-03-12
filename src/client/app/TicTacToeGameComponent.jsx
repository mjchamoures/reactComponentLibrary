import React from 'react';
import Fetch from 'react-fetch';  



function Square(props) {
    
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );

}

class Board extends React.Component {
  
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }
  render() {
 
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class TicTacToeGameComponent extends React.Component {

  constructor() {
    super();
    
    this.state = {
      history : [{
        squares : Array(9).fill(null),
      }],
      xIsNext : true,
      stepNumber : 0,
    };
  }
  
  handleClick(i) {
    // var history = this.state.history.slice(0, this.state.stepNumber + 1);
    const history = this.state.history;
    const current = history[history.length - 1];
    // We call .slice() to copy the squares array instead of mutating the existing array
    const squares = current.squares.slice();
    
    // return early and ignore the click if someone has already won the game or if a square is already filled:
    if(calculateWinner(squares) || squares[i]) {
      return;
    } else {
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history : history.concat([{
          squares : squares
        }]),
        xIsNext : !this.state.xIsNext,
        stepNumber :  history.length
      });
    }
  }
  
  jumpTo(step) {
    // set xIsNext to true if the index of the move number is an even number.
    this.setState({
      stepNumber : step,
      xIsNext : (step % 2) ? false : true,
    });
    
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    
    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    
    // step is val, move is index
    const moves = history.map((step, move) => {
      
      const desc = move ? 
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });
    
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares} 
            onClick={(i) => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

export default TicTacToeGameComponent;

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

