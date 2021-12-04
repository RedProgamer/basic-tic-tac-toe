import React from "react";
import { useState } from "react/cjs/react.development";
import Square from "./Square";
import calculateWinner from "./Logic";
import './styles.css';


function Board() {

    const [State, setState] = useState({
        squares: Array(9).fill(null),
        isNext: true,
    });

    console.log(State.squares);

    const handleClicker = i => {
        const new_squares = State.squares.slice();
        
        if(calculateWinner(new_squares) || new_squares[i]) {
            return;
        }

        new_squares[i] = State.isNext ? 'X' : 'O';
        setState({squares: new_squares, isNext: !State.isNext});
    }

    const renderSquare = (i) => {
      return <Square value={State.squares[i]} onClick={() => { handleClicker(i) }}/>;
    }

    const winner = calculateWinner(State.squares);
    let status;

    if (winner) {
        status = 'Winner: ' + winner;
    }else if(State.squares.includes(null)) {
        status = 'Next player: ' + (State.isNext ? 'X' : 'O');
    }else {
        status = 'Draw!';
    }
    
    return (
        <div className="wrapper">
            <div className="status"><span className='current-player'>{status}</span></div>
            <div className="grid">
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
        </div>
    );
}

export default Board;
