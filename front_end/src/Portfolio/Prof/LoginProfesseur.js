import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Authentification_Professeurs } from '../../store/Data';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export default function LoginProfesseurs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { prof, message: storeMessage } = useSelector(state => state.profauth);

  const [code_authentification, setCodeAuthentification] = useState('');
  const [mot_de_passe, setMotDePasse] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const loginSuccess = (prof, token) => ({
    type: "LOGIN_SUCCESS",
    payload: { prof, token }
  });

  const loginFailure = (message) => ({
    type: "LOGIN_FAILURE",
    payload: message
  });

  const validateForm = () => {
    const newErrors = {};
    if (!code_authentification.trim()) {
      newErrors.code_authentification = "Le code d'authentification est requis.";
    } else if (code_authentification.length !== 5) {
      newErrors.code_authentification = "Le code doit comporter exactement 5 caractères.";
    }

    if (!mot_de_passe.trim()) {
      newErrors.mot_de_passe = "Le mot de passe est requis.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSeConnecter = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await Authentification_Professeurs(code_authentification, mot_de_passe);
      localStorage.setItem('authToken', response.token);
      dispatch(loginSuccess(response.user, response.token));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(loginFailure("Code d'authentification ou mot de passe incorrect."));
      } else {
        dispatch(loginFailure("Erreur lors de la connexion."));
      }
    }
  };

  useEffect(() => {
    if (prof) {
      navigate('/accueil');
    }
  }, [prof, navigate]);

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="col-md-6 col-lg-5 bg-white p-4 rounded shadow">
        <h2 className="text-center mb-4 text-primary">Connexion Professeur</h2>

        <form onSubmit={handleSeConnecter}>
          {/* Code Authentification */}
          <div className="mb-3">
            <label className="form-label">Code d'authentification *</label>
            <input
              type="text"
              className={`form-control ${errors.code_authentification ? 'is-invalid' : ''}`}
              value={code_authentification}
              onChange={(e) => setCodeAuthentification(e.target.value)}
            />
            {errors.code_authentification && (
              <div className="invalid-feedback">{errors.code_authentification}</div>
            )}
          </div>

          {/* Mot de passe */}
          <div className="mb-3">
            <label className="form-label">Mot de passe *</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${errors.mot_de_passe ? 'is-invalid' : ''}`}
                value={mot_de_passe}
                onChange={(e) => setMotDePasse(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
              {errors.mot_de_passe && (
                <div className="invalid-feedback d-block">{errors.mot_de_passe}</div>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Se connecter</button>

          {storeMessage && (
            <div className="alert alert-danger text-center mt-3 ">
              {storeMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
