import { useState } from "react";
import "./Login.css";

export default function Auth({
  onLogin = async () => {},
  onRegister = async () => {},
  isAuthenticated = false,
  user = null,
  onLogout = () => {},
}) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function getPasswordStrength(pwd) {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { label: "Weak", className: "weak" };
    if (score === 2) return { label: "Medium", className: "medium" };
    return { label: "Strong", className: "strong" };
  }

  const strength = getPasswordStrength(password);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password || (mode === "register" && (!name || !confirmPassword))) {
      setError("Please fill all required fields");
      return;
    }

    if (mode === "register" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (mode === "register" && strength.label === "Weak") {
      setError("Password is too weak");
      return;
    }

    try {
      setLoading(true);
      mode === "login"
        ? await onLogin({ email, password })
        : await onRegister({ name, email, password });
    } catch {
      setError("Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        {isAuthenticated ? (
          <div>
            <h2>Welcome, {user?.name || user?.email}!</h2>
            <p>You are logged in.</p>
            <p>Email: {user?.email}</p>
            <p>Name: {user?.name}</p>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <>
            <h2>{mode === "login" ? "Login" : "Register"}</h2>

            <form onSubmit={handleSubmit}>
              {mode === "register" && (
                <div className="field">
                  <label>Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              )}

              <div className="field">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="field">
                <label>Password</label>
                <div className="password-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" className="toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {mode === "register" && password && (
                  <div className={strength.className}>
                    Strength: {strength.label}
                  </div>
                )}
              </div>

              {mode === "register" && (
                <div className="field">
                  <label>Confirm Password</label>
                  <div className="password-wrap">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="button" className="toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              )}

              {error && <div className="error">{error}</div>}

              <button className="submit" disabled={loading}>
                {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
              </button>
            </form>

            <div className="switch">
              {mode === "login" ? "No account?" : "Already have an account?"}{" "}
              <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
                {mode === "login" ? "Register" : "Login"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
