"use client";

import { useDrag, useDrop } from "react-dnd";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Todo {
  id: number;
  text: string;
  status: "to-do" | "in-progress" | "done";
}

const TODOS: Todo[] = [
  { id: 1, text: "buy milk", status: "to-do" },
  { id: 2, text: "wash bike", status: "in-progress" },
  { id: 3, text: "do the budget", status: "done" },
  { id: 4, text: "call jane", status: "to-do" },
];

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>(TODOS);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <div className="todo-list">
          <h2>To Do</h2>
          <TodoList
            status="to-do"
            todoList={todoList}
            setTodoList={setTodoList}
          />
        </div>
        <div className="todo-list">
          <h2>In Progress</h2>
          <TodoList
            status="in-progress"
            todoList={todoList}
            setTodoList={setTodoList}
          />
        </div>
        <div className="todo-list">
          <h2>Done</h2>
          <TodoList
            status="done"
            todoList={todoList}
            setTodoList={setTodoList}
          />
        </div>
      </div>
    </DndProvider>
  );
}

interface TodoListProps {
  status: Todo["status"];
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function TodoList({ status, todoList, setTodoList }: TodoListProps) {
  const todos = todoList.filter((todo) => todo.status === status);
  
  const [, drop] = useDrop({
    accept: "todo",
    drop: (item: { id: number }) => {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === item.id ? { ...todo, status } : todo
        )
      );
    },
  });

  return (
    <div ref={drop} className="todo-list">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </div>
  );
}

interface TodoProps {
  todo: Todo;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function Todo({ todo, setTodoList }: TodoProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "todo",
    item: { id: todo.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div 
      ref={drag} 
      className="todo"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {todo.text}
    </div>
  );
}
