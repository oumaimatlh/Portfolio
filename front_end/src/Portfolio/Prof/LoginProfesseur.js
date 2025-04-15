// src/Portfolio/LoginProfesseur.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const LoginProfesseur = () => {
  const [Code_authentification, setCode_authentification] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        Code_authentification,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.professeur });
    } catch (err) {
      alert("Erreur de connexion !");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f5f5f0" }} // beige clair
    >
      <div
        className="p-5 rounded shadow-sm"
        style={{
          backgroundColor: "#fffdf9", // blanc cassé
          width: "100%",
          maxWidth: "400px",
          border: "1px solid #e0dccc",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "#4a4a4a" }}>
          Connexion Professeur
        </h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="code" className="form-label" style={{ color: "#5c5c5c" }}>
              Code d'authentification
            </label>
            <input
              type="text"
              className="form-control"
              id="code"
              value={Code_authentification}
              onChange={(e) => setCode_authentification(e.target.value)}
              placeholder="Entrez votre code"
              required
              style={{ backgroundColor: "#fdfcf7", borderColor: "#ddd" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ color: "#5c5c5c" }}>
              Mot de passe
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
              style={{ backgroundColor: "#fdfcf7", borderColor: "#ddd" }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#d9bfa3", // beige foncé
              color: "#fff",
              fontWeight: "bold",
              border: "none",
            }}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginProfesseur;
