import { useState, useCallback } from "react";

interface GameMove {
  player: string;
  position: number;
  timestamp: number;
}

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

export const useTicTacToe = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [draws, setDraws] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium",
  );
  const [history, setHistory] = useState<GameMove[]>([]);

  const checkWinner = useCallback((board: (string | null)[]) => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: combination };
      }
    }
    return { winner: null, line: null };
  }, []);

  const getAvailableMoves = (board: (string | null)[]) => {
    return board
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null) as number[];
  };

  const minimax = (
    board: (string | null)[],
    depth: number,
    isMaximizing: boolean,
    alpha = -Infinity,
    beta = Infinity,
  ): number => {
    const { winner } = checkWinner(board);

    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (getAvailableMoves(board).length === 0) return 0;

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const move of getAvailableMoves(board)) {
        const newBoard = [...board];
        newBoard[move] = "O";
        const evaluation = minimax(newBoard, depth + 1, false, alpha, beta);
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of getAvailableMoves(board)) {
        const newBoard = [...board];
        newBoard[move] = "X";
        const evaluation = minimax(newBoard, depth + 1, true, alpha, beta);
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  };

  const getComputerMove = (board: (string | null)[]): number => {
    const availableMoves = getAvailableMoves(board);

    if (difficulty === "easy") {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    if (difficulty === "medium") {
      if (Math.random() < 0.3) {
        return availableMoves[
          Math.floor(Math.random() * availableMoves.length)
        ];
      }
    }

    // Hard difficulty or medium with 70% chance
    let bestMove = availableMoves[0];
    let bestValue = -Infinity;

    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = "O";
      const moveValue = minimax(newBoard, 0, false);

      if (moveValue > bestValue) {
        bestValue = moveValue;
        bestMove = move;
      }
    }

    return bestMove;
  };

  const makeMove = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newHistory = [
      ...history,
      { player: currentPlayer, position: index, timestamp: Date.now() },
    ];
    setHistory(newHistory);

    const { winner: gameWinner, line } = checkWinner(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      setWinningLine(line);
      if (gameWinner === "X") {
        setPlayerScore((prev) => prev + 1);
      } else {
        setComputerScore((prev) => prev + 1);
      }
    } else if (getAvailableMoves(newBoard).length === 0) {
      setWinner("draw");
      setDraws((prev) => prev + 1);
    } else if (currentPlayer === "X") {
      setCurrentPlayer("O");
      // Computer move will be made in useEffect
    }
  };

  const makeComputerMove = () => {
    if (currentPlayer === "O" && !winner) {
      setTimeout(() => {
        const computerMove = getComputerMove(board);
        const newBoard = [...board];
        newBoard[computerMove] = "O";
        setBoard(newBoard);

        const newHistory = [
          ...history,
          { player: "O", position: computerMove, timestamp: Date.now() },
        ];
        setHistory(newHistory);

        const { winner: gameWinner, line } = checkWinner(newBoard);

        if (gameWinner) {
          setWinner(gameWinner);
          setWinningLine(line);
          if (gameWinner === "O") {
            setComputerScore((prev) => prev + 1);
          }
        } else if (getAvailableMoves(newBoard).length === 0) {
          setWinner("draw");
          setDraws((prev) => prev + 1);
        } else {
          setCurrentPlayer("X");
        }
      }, 500);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setWinningLine(null);
  };

  const resetScore = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setDraws(0);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    board,
    currentPlayer,
    winner,
    winningLine,
    playerScore,
    computerScore,
    draws,
    difficulty,
    history,
    makeMove,
    makeComputerMove,
    resetGame,
    resetScore,
    setDifficulty,
    clearHistory,
  };
};
