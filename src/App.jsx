import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState(""); 

  
  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  function saveToFile(todos) {
  const content = todos.map(t => `${t.completed ? "[x]" : "[ ]"} ${t.text}`).join("\n");
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = "todos.txt";
  a.click();
  URL.revokeObjectURL(url);
  }

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
            <span >Status</span>
            <span >Task</span>
            <span >Delete</span>
          </li>
          {todos.map((t) => (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTodo(t.id)}
              />
              <span style={{ textDecoration: t.completed ? "line-through" : "" }}>
                {t.text}
              </span>
              <button onClick={() => deleteTodo(t.id)}>❌</button>
            </li>
          ))}
          {todos.length > 0 && (
            <button class="save" onClick={() => saveToFile(todos)}>Download Tasks</button>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;