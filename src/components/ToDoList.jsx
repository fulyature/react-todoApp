import React, { useState } from "react";

const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    const newTodo = {
      val: inputValue,
      id: todos.length,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };
  //   console.log(inputValue);

  return (
    <div>
      <div className="todo-app">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleAdd}>ToDo Add</button>
      </div>
      <div>
        {todos.map((item) => (
          <div key={item.id}>
            <p>{item.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
