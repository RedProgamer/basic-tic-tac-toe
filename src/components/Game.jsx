import { useState } from 'react';
import Board from './Board';
import calculateWinner from './Logic';
import './styles.css';

function Game() {
    const [history, setHistory] = useState({
        history: [{
            squares: Array(9).fill(null)
        }],
        stepNumber: 0,
        isNext: true,
    });

    const histories = history.history.slice(0, history.stepNumber + 1);
    const current = histories[histories.length - 1];
    const winner = calculateWinner(current.squares);
    let status;

    if(winner) {
        status = 'Winner : ' + winner;
    }else {
        status = 'Next Player : ' + (history.isNext ? 'X' : 'O');
    }

    function jumpTo(step) {
        setHistory(prevState => ({
            ...prevState,
            stepNumber: step,
            isNext: (step % 2 ) === 0 
        }));
    }

    const moves = histories.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => {jumpTo(move)}}>{desc}</button>
            </li>
        );
    });

    function handleClick(i) {
        const histories = history.history;
        const current = histories[histories.length - 1];
        const squares = current.squares.slice();
        
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        
        squares[i] = history.isNext ? 'X' : 'O';
        console.log(squares);
        console.log(history);
        
        setHistory({
            history: histories.concat([{
                squares: squares,
            }]),
            stepNumber: histories.length,
            isNext: !history.isNext,
        });
    }

    return (
        <div className="wrapper">
            <div className="status">{status}</div>
            <div className="game-grid">
                <Board squares={current.squares} onClick={(i) => { handleClick(i) }} />
            </div>
            <div className="game-info">
            <ol className="button">{moves}</ol>
            </div>
      </div>
    );
}

export default Game;