"use client";

import { useState, useEffect } from "react";

type TodoList = {
  id: number;
  done: boolean;
  content: string;
};

function getTodoListStorage() {
  const storage = localStorage.getItem("todoList");
  if (storage) {
    return JSON.parse(storage);
  }
  setTodoListStorage([]);
  return [];
}

function setTodoListStorage(todoList: TodoList[]) {
  const content = JSON.stringify(todoList);
  localStorage.setItem("todoList", content);
}

export default function Home() {
  const [todoList, setTodoList] = useState<TodoList[]>([]);
  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    setTodoList(getTodoListStorage());
  }, []);

  useEffect(() => {
    setTodoListStorage(todoList);
  }, [todoList]);

  const toggleItem = (index: number) => {
    const newTodoList = [...todoList];
    newTodoList[index].done = !newTodoList[index].done;
    setTodoList(newTodoList);
  };

  const todoTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };
  const submitTodoText = () => {
    if (todoText === "") {
      return;
    }
    const newTodoList = [
      ...todoList,
      {
        id: todoList.length,
        done: false,
        content: todoText,
      },
    ];
    setTodoList(newTodoList);
    setTodoText("");
  };

  return (
    <div>
      <h1>Todo List App</h1>
      <input
        type="todo"
        id="todo"
        name="q"
        placeholder="New Todo..."
        onChange={todoTextChange}
      />
      <button type="button" onClick={submitTodoText}>
        Add
      </button>

      {todoList.map((todo, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleItem(index)}
          />
          <span>{todo.content}</span>
        </div>
      ))}
    </div>
  );
}
