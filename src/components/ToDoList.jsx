import React, { useEffect, useState } from "react";
import { data } from "../helper/data";
import { v4 as uuidv4 } from "uuid";
const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([...data]);

  // Verileri localStorage'dan al ve state'e set et
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (storedTodos.length === 0) {
      setTodos([...data]);
    } else {
      setTodos(storedTodos);
    }
  }, []);

  // Todos state değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    const newTodo = {
      val: inputValue,
      // id: todos.length,
      // id:new Date().getTime(),
      id: uuidv4(),
      completed: false,
    };
    console.log(newTodo);

    setTodos([...todos, newTodo]);
    setInputValue("");
  };
  //   console.log(inputValue);
  useEffect(() => {
    if (todos.length > 0) {
      try {
        localStorage.setItem("todos", JSON.stringify(todos));
        console.log("LocalStorage'a kaydedildi: ", todos);
      } catch (error) {
        console.error("LocalStorage yazma hatası: ", error);
      }
    }
  }, [todos]);
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
            <button
              onClick={() =>
                setTodos((prev) => prev.filter((a) => a.id !== item.id))
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
