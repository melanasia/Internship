// a prop conceptually is the same as a param/arg, but exists only on the component
// props come in from the outside (exclusive of the component), state is PRIVATE (inclusive of the component). This means with state, you are looking at data that is inside the component itself.
// components are agnostic, meaning they don't know their environment
// component keeps its own enviroment (state)
// setState triggers a re-render
// components should not have state unless they NEED one
// GENERALLY: create a clone of something, then modify the clone in-place / mutate it
// re-usable components tend to not have state. They are handed things from the outside (square is handed things from board).

import React from 'react';

// class Square extends React.Component {
//     render() {
//       return (
//         <button className="square" 
//           style = {{height:'20px', width:'20px'}}
//           onClick={() => this.props.onClick()}>
//           {this.props.value}
//         </button>
//         // onClick function is fired, informing the board of the state change
//       );
//     }
// }
// Re-factored as a functional component:

const Square = (props) => {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
    // what goes inside vs outside of the <>?
  );
}

class Board extends React.Component {
  
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        // renderSquare passes in value as a prop to the Square component
        onClick={() => this.props.onClick(i)}
        // onClick function is defined here
      />
    );
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

history = [
  // Before first move
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // After first move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // After second move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares.Array(9).fill(null),
      }]
      xIsNext: true,
    }
  }

  handleClick(i){
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = this.state.squares.slice(); 
    // slice() creates a clone of squares
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'; 
    // fill the square with an X when clicked
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
    // changing the state from the original to the clone
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

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

// ========================================

export { Board }