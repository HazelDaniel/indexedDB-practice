import { memo } from "react";

export const TodoList = memo(function TodoList({
  tasks,
  toggleTaskCompletion,
  deleteTask,
}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
            onClick={() => toggleTaskCompletion(task)}
          >
            {task.text}
          </span>
          {task.label ? <sub className={task.label}>{task.label}</sub> : null}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
});
