import { useState, useEffect } from "react";

interface GameBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
  currentPlayer: string;
  winner: string | null;
  winningLine: number[] | null;
  blinkingCells?: number[];
}

const GameBoard = ({
  board,
  onCellClick,
  currentPlayer,
  winner,
  winningLine,
  blinkingCells = [],
}: GameBoardProps) => {
  const [winningAnimation, setWinningAnimation] = useState<number[]>([]);

  useEffect(() => {
    if (winningLine) {
      setWinningAnimation(winningLine);
      const timer = setTimeout(() => {
        setWinningAnimation([]);
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
            winningAnimation.includes(index) ? "blink retro-glow" : ""
          } ${
            blinkingCells.includes(index) ? "fade-blink" : ""
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
