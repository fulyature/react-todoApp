import React, { useState } from "react";
import { data } from "../helper/data";
const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([...data]);

  const handleAdd = () => {
    const newTodo = {
      val: inputValue,
      id: todos.length,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };
  //   console.log(inputValue);

  const tamamlanmisGorev = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  return (
    <div className="container">
      <div className="todo-app">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter new todo..."
        />
        <button onClick={handleAdd}>ToDo Add</button>
      </div>
      <div className="todo-wrapper">
        {todos.map((item, index) => (
          <>
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
              <button
                onClick={() =>
                  setTodos((prev) => prev.filter((a) => a.id !== item.id))
                }
              >
                Delete
              </button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
