import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState } from 'react'

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


function Square(props) {


    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );

}

function Board() {

    const [squares, setSquares] = useState([null, null, null, null, null, null, null, null, null])
    const [xIsNext, setTurn] = useState(true)

    function renderSquare(i) {
        return <Square
            value={squares[i]}
            onClick={() => handleClick(i)}
        />;
    }

    function handleClick(i) {

        const newSquares = squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        if (xIsNext) {
            newSquares[i] = "X";
            setTurn(false)
        }
        else {
            newSquares[i] = "O"
            setTurn(true)
        }
        setSquares(newSquares)
    }

    const winner = calculateWinner(squares)


    return (
        <div>
            <div className="status"> {winner ? "Winner:" + winner : xIsNext ? 'Next player: X' : "Next player: O"}</div>
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
    );
}


function Game() {

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


// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
