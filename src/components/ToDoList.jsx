import React, { useEffect, useState } from "react";
import { data } from "../helper/data";
import { v4 as uuidv4 } from "uuid";
const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([...data]);

  // Verileri localStorage'dan al ve state'e set et
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  const handleAdd = () => {
    const newTodo = {
      val: inputValue,
      // id: todos.length,
      // id:new Date().getTime(),
      id: uuidv4(), //  This is a unique ID creator library
      completed: false,
    };
    console.log(newTodo);
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);

    setInputValue("");
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((a) => a.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const tamamlanmisGorev = (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="container">
      <div className="todo-app">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter new todo..."
        />
        <button onClick={handleAdd} disabled={!inputValue.trim()}>
          ToDo Add
        </button>
      </div>
      <div className="todo-wrapper">
        {todos.map((item, index) => (
          <div
            className="gorev"
            key={item.id}
            onDoubleClick={() => tamamlanmisGorev(item.id)}
          >
            {`${index + 1}.`}
            <p
              style={{
                textDecoration: item.completed && "line-through",
                background: item.completed && "#83a60377",
              }}
            >
              {item.val}
            </p>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
