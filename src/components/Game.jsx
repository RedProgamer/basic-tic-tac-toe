import { useState } from 'react';
import Board from './Board';
import calculateWinner from './Logic';
import './styles.css';

function Game() {
    const [history, setHistory] = useState({
        history: [{
            squares: Array(9).fill(null)
        }],
        isNext: true,
    });

    const histories = history.history;
    const current = histories[history.history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;

    if(winner) {
        status = 'Winner : ' + winner;
    }else {
        status = 'Next Player : ' + (history.isNext ? 'X' : 'O');
    }

    function handleClick(i) {
        const histories = history.history;
        const current = histories[history.history.length - 1];
        const squares = current.squares.slice();

        console.log(squares);
        
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        
        squares[i] = history.isNext ? 'X' : 'O';
        
        setHistory({
          history: histories.concat([{
            squares: squares,
          }]),
          isNext: !history.isNext,
        });
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={(i) => { handleClick(i) }} />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
            </div>
      </div>
    );
}

export default Game;