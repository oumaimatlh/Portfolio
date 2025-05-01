import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Authentification_Professeurs } from '../../store/Data';
import * as bootstrap from 'bootstrap';
import './loginprofesseur.css';

export default function LoginProfesseurs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { prof, isCompleted, message: storeMessage } = useSelector(s => s.profauth);


  const [code, setCode] = useState('');
  const [pwd, setPwd] = useState('');
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const loginSuccess = (prof, token, is_completed) => ({
    type: 'LOGIN_SUCCESS',
    payload: { prof, token, is_completed }
  });

  const loginFailure = (msg) => ({
    type: 'LOGIN_FAILURE',
    payload: msg
  });

  const validate = () => {
    const e = {};
    if (!code.trim()) e.code = 'Code requis';
    else if (code.length !== 5) e.code = 'Exactement 5 caractères';
    if (!pwd.trim()) e.pwd = 'Mot de passe requis';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await Authentification_Professeurs(code, pwd);
      localStorage.setItem('authToken', res.token);

      dispatch(loginSuccess(res.user, res.token, res.is_completed));
    } catch {
      dispatch(loginFailure("Code ou mot de passe incorrect"));
    }
  };

  useEffect(() => {
    if (prof) {
      const modalEl = document.getElementById('connexionModal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) {
        modal.hide();
      }
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }

      // ✅ Rediriger selon isCompleted
      if (isCompleted === 0) {
        navigate('/professeur/completer-profil');

      } else {
        navigate('/professeur/portfolio');
   
      }
    }
  }, [prof, isCompleted, navigate]);

  return (
    <div className="login-prof-wrapper">
      <div className="login-prof-card p-4">
        <h2 className="text-center mb-4">Connexion Professeur</h2>
        <form onSubmit={handleSubmit}>
          {/* === Code d’authentification === */}
          <div className="mb-3">
            <label className="form-label">Code d'authentification *</label>
            <div className="input-group">
              <span className="input-group-text">🔑</span>
              <input
                type="text"
                className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                placeholder="Ex. A1234"
                value={code}
                onChange={e => setCode(e.target.value)}
                maxLength={5}
                autoComplete="off"
              />
            </div>
            {errors.code && (
              <div className="invalid-feedback d-block">{errors.code}</div>
            )}
          </div>

          {/* === Mot de passe === */}
          <div className="mb-3">
            <label className="form-label">Mot de passe *</label>
            <div className="input-group">
              <span className="input-group-text">🔒</span>
              <input
                type={show ? 'text' : 'password'}
                className={`form-control ${errors.pwd ? 'is-invalid' : ''}`}
                placeholder="********"
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="btn toggle-eye-btn"
                onClick={() => setShow(!show)}
                tabIndex={-1}
              >
                {show ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.pwd && (
              <div className="invalid-feedback d-block">{errors.pwd}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Se connecter
          </button>

          {storeMessage && (
            <div className="alert alert-danger text-center mt-3">
              {storeMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
