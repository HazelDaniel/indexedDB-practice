import React, { useEffect, useState } from "react";
import "./todo.css";
import { TodoList } from "./todo-list";
import { DB, STORE_NAME } from "./db/db";
import { TodoDao } from "./db/todo-dao";
import { TodoLabels } from "./todo-labels";

export function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [labels, setLabels] = useState([]);
  const [activeLabel, setActiveLabel] = useState(1);

  const addTask = () => {
    if (newTask.trim() === "") return;
    let newTaskObj;
    let taskText = newTask.trim();
    if (newTask.includes("#")) {
      if (taskText.length <= 1) {
        setNewTask("");
        return;
      }

      let [text, label] = newTask.split("#");
      text = text.trim();
      label = label.trim().toUpperCase();
      newTaskObj = { text, label, completed: false };
    } else {
      newTaskObj = { text: taskText, completed: false };
    }

    handleAddTodo(newTaskObj);
  };

  const deleteTask = (taskId) => {
    handleDeleteTodo(taskId)
      .then((todos) => {
        setTasks(todos);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const toggleTaskCompletion = async (task) => {
    const DAO = new TodoDao();
    task = { ...task, completed: !task.completed };

    const resultID = await DAO.update(task);
    const todo = await DAO.get(resultID);

    setTasks(tasks.map((task) => (task.id === resultID ? todo : task)));
  };

  const handleAddTodo = async (todo) => {
    if (activeLabel && typeof activeLabel === "string") {
      const todoDB = await new TodoDao().add(todo, activeLabel);
      let newTasks = tasks.filter((task) => task.label === activeLabel);
      if (todoDB.label === activeLabel)
        setTasks([...newTasks, todoDB]);
      setNewTask("");
      return;
    }
    const todoDB = await new TodoDao().add(todo);
    setTasks([...tasks, todoDB]);
    setNewTask("");
  };

  const handleDeleteTodo = async (id) => {
    try {
      const DAO = new TodoDao();
      await DAO.delete(id);
      const res = await DAO.getAll();
      return res;
    } catch (err) {
      alert(err.message);
      return [];
    }
  };

  useEffect(() => {
    if (activeLabel && typeof activeLabel !== "string") return;

    const DAO = new TodoDao();
    (async () => {
      if (activeLabel) {
        const todos = await DAO.getAll(activeLabel);
        setTasks(todos);
      } else {
        const todos = await DAO.getAll();
        setTasks(todos);
      }
    })();
  }, [activeLabel]);

  useEffect(() => {
    const fetchLabels = async () => {
      const DAO = new TodoDao();
      const labels = await DAO.getLabels();

      setLabels(labels);
    };
    fetchLabels();
  }, [tasks.length]);

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
      <TodoLabels
        labels={labels}
        activeLabel={activeLabel}
        setActiveLabel={setActiveLabel}
      />
      <TodoList
        deleteTask={deleteTask}
        tasks={tasks}
        toggleTaskCompletion={toggleTaskCompletion}
      />
    </div>
  );
}
