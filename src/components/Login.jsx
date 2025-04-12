import React, { useState } from "react";
import axios from "axios";
import API from "./api";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error_message || "Login failed");
    }
  }
  return (
    <div className="login-container">
      <div className="heading">
        <h2>URL Shortener: Login</h2>
      </div>
      <div className="url-animation">
        <p className="typing">
          https://averyverylonglink.com/that-goes-on-and-on →
          <strong>short.ly/xyz123</strong>
        </p>
      </div>
      <form onSubmit={handleLogin} className="form">
        <div className="form-components">
          <label>
            <p>Email:</p>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-components">
          <label>
            <p>Password:</p>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="form-components">
          <button type="submit">Login</button>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
export default Login;
