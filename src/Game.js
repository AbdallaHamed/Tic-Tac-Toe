import { useState } from "react";
import Board from "./Board";


export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [currentPosition, setCurrentPosition] = useState([]);
    const [isSortingASC, setIsSortingASC] = useState(true);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares, position) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setCurrentPosition(position);
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = `Go to move #${move} (row: ${currentPosition[0]}, Column: ${currentPosition[1]})`;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                {move === currentMove ?
                    <>You are at move #{move}</>
                    : <button onClick={() => setCurrentMove(move)}>{description}</button>
                }
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <button onClick={() => setIsSortingASC(!isSortingASC)}>
                    {isSortingASC ? 'Sort descending' : 'Sort ascending'}
                </button>
                <ol>{isSortingASC ? moves : moves.slice().reverse()}</ol>
            </div>
        </div>
    );
}
