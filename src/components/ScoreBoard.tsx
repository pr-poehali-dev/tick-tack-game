interface ScoreBoardProps {
  playerScore: number;
  computerScore: number;
  draws: number;
}

const ScoreBoard = ({ playerScore, computerScore, draws }: ScoreBoardProps) => {
  return (
    <div className="retro-border rounded-lg p-4 mb-4">
      <h3 className="retro-title text-lg mb-3 text-center">СЧЁТ</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="retro-score text-xl">{playerScore}</div>
          <div className="text-sm text-green-400">ИГРОК</div>
        </div>
        <div>
          <div className="retro-score text-xl">{draws}</div>
          <div className="text-sm text-green-400">НИЧЬЯ</div>
        </div>
        <div>
          <div className="retro-score text-xl">{computerScore}</div>
          <div className="text-sm text-green-400">КОМПЬЮТЕР</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
