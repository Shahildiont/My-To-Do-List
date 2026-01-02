import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav.jsx";
import About from "./About";
import Tips from "./Tips.jsx";
import Auth from "./Login.jsx";
import TodoApp from "./TodoApp.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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
    const completedTasks = todos.filter(t => t.completed);
    const pendingTasks = todos.filter(t => !t.completed);

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assignments</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #6366f1;
            --secondary: #8b5cf6;
            --success: #10b981;
            --danger: #ef4444;
            --warning: #f59e0b;
            --dark: #1f2937;
            --light: #f9fafb;
            --border: #e5e7eb;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
            min-height: 100vh;
            padding: 20px;
            transition: background 0.3s ease;
        }

        body.dark {
            background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
            color: #e5e7eb;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
            overflow: hidden;
            animation: slideIn 0.6s ease-out;
        }

        body.dark .container {
            background: rgba(31, 41, 55, 0.95);
            color: #e5e7eb;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .header {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 30px 20px;
            text-align: center;
            position: relative;
        }

        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .theme-toggle {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255,255,255,0.2);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .theme-toggle:hover {
            background: rgba(255,255,255,0.3);
            transform: scale(1.1);
        }

        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 30px 20px;
            background: var(--light);
            border-bottom: 1px solid var(--border);
        }

        body.dark .summary {
            background: #374151;
            border-bottom-color: #4b5563;
        }

        .summary-card {
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            text-align: center;
            transition: transform 0.3s ease;
        }

        .summary-card:hover {
            transform: translateY(-5px);
        }

        body.dark .summary-card {
            background: #4b5563;
            color: #e5e7eb;
        }

        .summary-card .number {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 5px;
        }

        .summary-card .label {
            font-size: 1.1rem;
            color: #6b7280;
            font-weight: 500;
        }

        body.dark .summary-card .label {
            color: #9ca3af;
        }

        .section {
            margin: 30px 0;
        }

        .section-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0 20px 20px 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid var(--primary);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section.completed .section-title {
            border-bottom-color: var(--success);
        }

        .section.pending .section-title {
            border-bottom-color: var(--danger);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 0 20px 20px 20px;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        body.dark table {
            background: #4b5563;
        }

        th {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 18px 20px;
            text-align: left;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 0.9rem;
        }

        .section.completed th {
            background: linear-gradient(135deg, var(--success), #059669);
        }

        .section.pending th {
            background: linear-gradient(135deg, var(--danger), #dc2626);
        }

        td {
            padding: 18px 20px;
            border-bottom: 1px solid var(--border);
            transition: background 0.3s ease;
        }

        body.dark td {
            border-bottom-color: #6b7280;
        }

        tr:hover td {
            background: #f8fafc;
        }

        body.dark tr:hover td {
            background: #374151;
        }

        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 12px;
            border-radius: 25px;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .status-completed {
            background: linear-gradient(135deg, #dcfce7, #bbf7d0);
            color: #166534;
            border: 1px solid #86efac;
        }

        .status-pending {
            background: linear-gradient(135deg, #fef2f2, #fecaca);
            color: #991b1b;
            border: 1px solid #fca5a5;
        }

        .task-text {
            font-weight: 500;
            color: var(--dark);
        }

        body.dark .task-text {
            color: #e5e7eb;
        }

        .empty-state {
            text-align: center;
            padding: 40px 20px;
            color: #6b7280;
        }

        body.dark .empty-state {
            color: #9ca3af;
        }

        @media (max-width: 768px) {
            .container {
                margin: 10px;
            }
            .header h1 {
                font-size: 2rem;
            }
            .summary {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            th, td {
                padding: 12px 15px;
            }
            .section-title {
                font-size: 1.3rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1><i class="fas fa-tasks"></i> Assignments</h1>
            <button class="theme-toggle" onclick="toggleTheme()">
                <i class="fas fa-moon"></i>
            </button>
        </div>

        <div class="summary">
            <div class="summary-card">
                <div class="number">${todos.length}</div>
                <div class="label">Total Tasks</div>
            </div>
            <div class="summary-card">
                <div class="number">${completedTasks.length}</div>
                <div class="label">Completed</div>
            </div>
            <div class="summary-card">
                <div class="number">${pendingTasks.length}</div>
                <div class="label">Pending</div>
            </div>
        </div>

        ${completedTasks.length > 0 ? `
        <div class="section completed">
            <div class="section-title">
                <i class="fas fa-check-circle"></i>
                Completed Tasks
            </div>
            <table>
                <thead>
                    <tr>
                        <th><i class="fas fa-info-circle"></i> Status</th>
                        <th><i class="fas fa-list"></i> Task</th>
                    </tr>
                </thead>
                <tbody>
                    ${completedTasks.map(t => `
                    <tr>
                        <td><span class="status-badge status-completed"><i class="fas fa-check"></i> Completed</span></td>
                        <td class="task-text">${t.text}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        ` : '<div class="empty-state">No completed tasks yet! 🎉</div>'}

        ${pendingTasks.length > 0 ? `
        <div class="section pending">
            <div class="section-title">
                <i class="fas fa-clock"></i>
                Pending Tasks
            </div>
            <table>
                <thead>
                    <tr>
                        <th><i class="fas fa-info-circle"></i> Status</th>
                        <th><i class="fas fa-list"></i> Task</th>
                    </tr>
                </thead>
                <tbody>
                    ${pendingTasks.map(t => `
                    <tr>
                        <td><span class="status-badge status-pending"><i class="fas fa-exclamation-triangle"></i> Pending</span></td>
                        <td class="task-text">${t.text}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        ` : '<div class="empty-state">No pending tasks! 🎯</div>'}
    </div>

    <script>
        function toggleTheme() {
            document.body.classList.toggle('dark');
            const icon = document.querySelector('.theme-toggle i');
            if (document.body.classList.contains('dark')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-todos.html';
    a.click();
    URL.revokeObjectURL(url);
  }

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const handleLogout = () => {    localStorage.removeItem('token');    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Nav 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLogout={handleLogout} 
        />

        <div className="content">
          <Routes>
            <Route
              path="/"
              element={<TodoApp todos={todos} setTodos={setTodos} text={text} setText={setText} addTodo={addTodo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} saveToFile={saveToFile} />}
            />
            <Route 
              path="/todos" 
              element={<TodoApp />} 
            />
            <Route path="/About" element={<About />} />
            <Route path="/Tips" element={<Tips />} />
            <Route path="/login" element={<Auth onLogin={handleLogin} onRegister={handleRegister} isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />} />
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
