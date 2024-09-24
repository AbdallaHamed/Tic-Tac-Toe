import Square from "./Square";


let winningIndexes = [];

export default function Board({ xIsNext, squares, onPlay }) {
    const boardIndexes = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    const boardMap = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]];
    let row, column;

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        // boardIndexes.forEach((arr, rowIndex) => {
        //     const columnIndex = arr.findIndex(item => item === 4);
        //     if (item !== -1) {
        //         row = rowIndex + 1;
        //         column = columnIndex + 1;
        //         return ('Row: ' + (i + 1), 'Column: ' + (columnIndex + 1));
        //     }
        // })
        onPlay(nextSquares, boardMap[i]);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <div className="status">{status}</div>
            {boardIndexes.map((row, i) =>
                <div key={i} className="board-row">
                    {row.map((index) => <Square key={index} highlight={winningIndexes.includes(index)} value={squares[index]} onSquareClick={() => handleClick(index)} />)}
                </div>
            )}
        </>
    );
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
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            winningIndexes = [a, b, c];
            return squares[a];
        }
    }
    return null;
}