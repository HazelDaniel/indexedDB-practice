export const TodoLabels = ({ labels, activeLabel, setActiveLabel }) => {
  return (
    <div className="todo-label">
      {labels.map((label, key) => {
        return (
          <span
            key={key}
            className={`${activeLabel === label ? "active" : ""}`}
            onClick={() => {
              setActiveLabel(label);
            }}
          >
            {label}
          </span>
        );
      })}
      <span
        className="clear"
        onClick={() => {
          setActiveLabel(null);
        }}
      >
        clear
      </span>
    </div>
  );
};
