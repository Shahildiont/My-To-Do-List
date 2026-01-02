import React from "react";

function TodoApp({ todos, setTodos, text, setText, addTodo, toggleTodo, deleteTodo, saveToFile }) {

  return (
    <div className="app">
      <h1>React To-Do</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Enter task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <div id="box">
        <ul>
          <li className="header-row">
            <span>Status</span>
            <span>Task</span>
            <span>Delete</span>
          </li>
          {todos.map((t) => (
            <li className="spf" key={t.id}>
              <span>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTodo(t.id)}
                />
              </span>
              <span
                style={{
                  textDecoration: t.completed ? "line-through" : "",
                }}
              >
                {t.text}
              </span>
              <span>
                <button onClick={() => deleteTodo(t.id)}>❌</button>
              </span>
            </li>
          ))}
        </ul>
        {todos.length > 0 && (
          <button
            className="save"
            onClick={() => saveToFile(todos)}
          >
            📥
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoApp;