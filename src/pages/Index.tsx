import { useEffect } from "react";
import GameBoard from "@/components/GameBoard";
import ScoreBoard from "@/components/ScoreBoard";
import DifficultySelector from "@/components/DifficultySelector";
import GameHistory from "@/components/GameHistory";
import { useTicTacToe } from "@/hooks/useTicTacToe";
import { BeamsBackground } from "@/components/ui/beams-background";

const Index = () => {
  const {
    board,
    currentPlayer,
    winner,
    winningLine,
    blinkingCells,
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
  } = useTicTacToe();

  useEffect(() => {
    makeComputerMove();
  }, [currentPlayer]);

  const getStatusMessage = () => {
    if (winner === "draw") return "НИЧЬЯ!";
    if (winner === "X") return "ВЫ ВЫИГРАЛИ!";
    if (winner === "O") return "КОМПЬЮТЕР ВЫИГРАЛ!";
    if (currentPlayer === "X") return "ВАШ ХОД";
    return "ХОД КОМПЬЮТЕРА...";
  };

  return (
    <BeamsBackground intensity="subtle">
      <div className="min-h-screen retro-container p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="retro-title text-4xl mb-2">TIC-TAC-TOE</h1>
            <div className="text-sm text-orange-400">RETRO ARCADE EDITION</div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Panel */}
            <div className="space-y-4">
              <ScoreBoard
                playerScore={playerScore}
                computerScore={computerScore}
                draws={draws}
              />
              <DifficultySelector
                difficulty={difficulty}
                onDifficultyChange={setDifficulty}
              />
            </div>

            {/* Game Board */}
            <div className="flex flex-col items-center">
              <GameBoard
                board={board}
                onCellClick={makeMove}
                currentPlayer={currentPlayer}
                winner={winner}
                winningLine={winningLine}
                blinkingCells={blinkingCells}
              />

              <div className="retro-border rounded-lg p-4 mt-4 mb-4 text-center">
                <div className="retro-title text-xl mb-2">
                  {getStatusMessage()}
                </div>
                {currentPlayer === "X" && !winner && (
                  <div className="text-orange-300 text-sm">Выберите клетку</div>
                )}
              </div>

              <div className="flex gap-4">
                <button className="retro-button" onClick={resetGame}>
                  НОВАЯ ИГРА
                </button>
                <button className="retro-button" onClick={resetScore}>
                  СБРОС СЧЁТА
                </button>
              </div>
            </div>

            {/* Right Panel */}
            <div>
              <GameHistory history={history} onClearHistory={clearHistory} />

              <div className="retro-border rounded-lg p-4 text-center">
                <h3 className="retro-title text-lg mb-2">УПРАВЛЕНИЕ</h3>
                <div className="text-xs text-orange-400 space-y-1">
                  <div>Х - ИГРОК</div>
                  <div>О - КОМПЬЮТЕР</div>
                  <div>КЛИКАЙТЕ ПО КЛЕТКАМ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BeamsBackground>
  );
};

export default Index;
