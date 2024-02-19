import React, { useEffect, useState } from "react";
import "./todo.css";
import { TodoList } from "./todo-list";
import { DB, STORE_NAME } from "./db/db";
import { TodoDao } from "./db/todo-dao";

export function Todo() {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);
  // State to store the new task input
  const [newTask, setNewTask] = useState("");

  // Function to handle adding a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObj = { text: newTask, completed: false };

      handleAddTodo(newTaskObj);
    }
  };

  // Function to handle deleting a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Function to handle marking a task as completed
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTodo = async (todo) => {
    const todoDB = await new TodoDao().add(todo);
    // console.log("the overall result",  [...tasks, todoDB]);
    setTasks([...tasks, todoDB]);
    setNewTask("");
  };

  useEffect(() => {
    const load = async () => {
      const todos = await new TodoDao().getAll();
      setTasks(todos);
    };
    load();
  }, []);

  return (
    <div className="todo-container">
      <h1>
        <span>Todo</span> List
      </h1>
      <div className="todo-input-div">
        <input
          type="text"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <TodoList
        deleteTask={deleteTask}
        tasks={tasks}
        toggleTaskCompletion={toggleTaskCompletion}
      />
    </div>
  );
}
