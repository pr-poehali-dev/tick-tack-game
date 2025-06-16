interface DifficultySelectorProps {
  difficulty: "easy" | "medium" | "hard";
  onDifficultyChange: (difficulty: "easy" | "medium" | "hard") => void;
}

const DifficultySelector = ({
  difficulty,
  onDifficultyChange,
}: DifficultySelectorProps) => {
  const difficulties = [
    { value: "easy", label: "ЛЕГКО" },
    { value: "medium", label: "СРЕДНЕ" },
    { value: "hard", label: "СЛОЖНО" },
  ] as const;

  return (
    <div className="retro-border rounded-lg p-4 mb-4">
      <h3 className="retro-title text-lg mb-3 text-center">СЛОЖНОСТЬ</h3>
      <div className="flex gap-2 justify-center">
        {difficulties.map(({ value, label }) => (
          <button
            key={value}
            className={`retro-button text-sm px-3 py-2 ${
              difficulty === value ? "bg-green-500 text-black" : ""
            }`}
            onClick={() => onDifficultyChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;
