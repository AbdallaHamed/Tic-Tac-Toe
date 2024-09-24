export default function Square({ value, onSquareClick, highlight }) {
    return (
        <button className={"square " + (highlight && 'highlighted')} onClick={onSquareClick}>
            {value}
        </button>
    );
}
