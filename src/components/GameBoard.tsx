import { useState, useEffect } from "react";

interface GameBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
  currentPlayer: string;
  winner: string | null;
  winningLine: number[] | null;
}

const GameBoard = ({
  board,
  onCellClick,
  currentPlayer,
  winner,
  winningLine,
}: GameBoardProps) => {
  const [blinkingCells, setBlinkingCells] = useState<number[]>([]);

  useEffect(() => {
    if (winningLine) {
      setBlinkingCells(winningLine);
      const timer = setTimeout(() => {
        setBlinkingCells([]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [winningLine]);

  return (
    <div className="grid grid-cols-3 gap-1 p-4 retro-border rounded-lg">
      {board.map((cell, index) => (
        <div
          key={index}
          className={`retro-cell ${cell ? cell.toLowerCase() : ""} ${
            blinkingCells.includes(index) ? "blink retro-glow" : ""
          } ${winner ? "cursor-not-allowed" : ""}`}
          onClick={() => !winner && !cell && onCellClick(index)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
