interface GameMove {
  player: string;
  position: number;
  timestamp: number;
}

interface GameHistoryProps {
  history: GameMove[];
  onClearHistory: () => void;
}

const GameHistory = ({ history, onClearHistory }: GameHistoryProps) => {
  const getPositionName = (position: number) => {
    const positions = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
    return positions[position];
  };

  return (
    <div className="retro-border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="retro-title text-lg">ИСТОРИЯ</h3>
        {history.length > 0 && (
          <button
            className="retro-button text-xs px-2 py-1"
            onClick={onClearHistory}
          >
            ОЧИСТИТЬ
          </button>
        )}
      </div>
      <div className="max-h-32 overflow-y-auto">
        {history.length === 0 ? (
          <div className="text-center text-green-400 text-sm">НЕТ ХОДОВ</div>
        ) : (
          <div className="space-y-1 text-sm">
            {history.slice(-10).map((move, index) => (
              <div key={index} className="flex justify-between">
                <span
                  className={
                    move.player === "X" ? "text-green-400" : "text-amber-400"
                  }
                >
                  {move.player}
                </span>
                <span className="text-green-300">
                  {getPositionName(move.position)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameHistory;
