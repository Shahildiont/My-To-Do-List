import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav.jsx";
import About from "./About";
import Tips from "./Tips.jsx";

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
    const content = todos
      .map(
        (t) =>
          `${t.completed ? "✔️ Completed =>" : "❌ Not Completed =>"} ${t.text}`
      )
      .join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "todos.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Router>
      <div className="app-container">
        <Nav />

        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
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
                          <input
                            type="checkbox"
                            checked={t.completed}
                            onChange={() => toggleTodo(t.id)}
                          />
                          <span
                            style={{
                              textDecoration: t.completed ? "line-through" : "",
                            }}
                          >
                            {t.text}
                          </span>
                          <button onClick={() => deleteTodo(t.id)}>❌</button>
                        </li>
                      ))}
                      {todos.length > 0 && (
                        <button
                          className="save"
                          onClick={() => saveToFile(todos)}
                        >
                          Download Tasks
                        </button>
                      )}
                    </ul>
                  </div>
                </div>
              }
            />
            <Route path="/About" element={<About />} />
            <Route path="/Tips" element={<Tips />} />
          </Routes>
        </div>

        <footer>
          <p>🌊 Stay productive & enjoy the waves of life 🌊</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
