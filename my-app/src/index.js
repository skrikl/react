import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
// Метод Board.render создает:
// div.обертку
//          --див.статус
//          --дивы.строкаИгровойДоски
//                  --элементы строки игровой доски
//                          Элемент создается вызовом метода renderSquare самого компонента Board через this
  class Board extends React.Component {
    // Передаем в компонент Square два props: value и onClick.
    // Их можно будет вызывать как Square.props.value и Square.props.onClick
    // Или, в контексте Square, их можн вызывать как this.props.value и this.props.onClick
    renderSquare(i) {
      return <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
      />;
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
  
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        };
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const currentHistoryElement = history[history.length - 1];
        const squares = currentHistoryElement.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
      jumpTo(step) {
          this.setState({
              stepNumber: step,
              xIsNext: (step % 2) === 0,
          });
      }
      render() {
        const history = this.state.history;
        const currentHistoryElement = history[this.state.stepNumber];
        const winner = calculateWinner(currentHistoryElement.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move#' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
          });

        let status;
        if (winner) {
            status = "Winner is: " + winner;
        } else {
            status = "Next player is: " + (this.state.xIsNext ? "X" : "O");
        }
          return (
              <div className="game">
                  <div className="game-board">
                      <Board
                        squares={currentHistoryElement.squares}
                        onClick={(i) => this.handleClick(i)}/>
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
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

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