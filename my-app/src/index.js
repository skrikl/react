import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Компонент Square
class Square extends React.Component {
    // Метод render компонента Square
    render() {
      return (
        <button
            className="square"
            {/*При клике на компонент обращаемся к props этого компонента, в котором лежит property с именем onClick,
                которое передал сюда компонент Board и в котором хранится объект handleClick(i)*/}
            onClick={() => {this.props.onClick()} }
        >
          {this.props.value}
        </button>
      );
    }
  }
// Метод Board.render создает:
// div.обертку
//          --див.статус
//          --дивы.строкаИгровойДоски
//                  --элементы строки игровой доски
//                          Элемент создается вызовом метода renderSquare самого компонента Board через this
  class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }
    // Передаем в компонент Square два props: value и onClick.
    // Их можно будет вызывать как Square.props.value и Square.props.onClick
    // Или, в контексте Square, их можн вызывать как this.props.value и this.props.onClick
    renderSquare(i) {
      return <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
      />;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
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
  