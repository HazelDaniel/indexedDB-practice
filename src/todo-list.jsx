import { memo } from "react";

export const TodoList = memo(
  function TodoList({ tasks, toggleTaskCompletion, deleteTask }) {
    console.log("list rendering");
    return (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }
);
