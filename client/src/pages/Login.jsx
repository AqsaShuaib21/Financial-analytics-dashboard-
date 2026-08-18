import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const endpoint = isLogin ? "/auth/login" : "/auth/register";
    try {
      const response = await API.post(endpoint, formData);
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "something went wrong .Please try again.",
      );
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f3f4f6",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          background: "#b5b1b1",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "24px",
            color: "#1f2937",
          }}
        >
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        {error && (
          <p
            style={{
              color: "#dc2626",
              backgroundColor: "#fee2e2",
              padding: "10px",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {!isLogin && (
            <input
              type="text"
              placeholder="full name"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              style={{
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #8eb0e3",
                fontsize: "16px",
              }}
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #8eb0e3",
              fontsize: "16px",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #8eb0e3",
              fontsize: "16px",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              borderRadius: "5px",
              border: "none",
              background: "#2563eb",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "6px",
              cursor: "pointer",
            }}
          >
            {isLogin ? "signIn" : "sign up"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontsize: "14px",
            color: "#4b5563",
          }}
        >
          {isLogin ? "don't have an account ?" : "already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: "#2563eb", cursor: "pointer", fontWeight: "bold" }}
          >
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
}
export default Login;
