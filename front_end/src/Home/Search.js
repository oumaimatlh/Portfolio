import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './search.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';

import LogoAnimation from './logoanimation';
import LoginAdministrateur from '../Portfolio/Admin/LoginAdministrateur';
import LoginProfesseurs from '../Portfolio/Prof/loginprofesseur';

export default function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalStep, setModalStep] = useState('choose');
  const [inputValue, setInputValue] = useState('');
  const [professeurs, setProfesseurs] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const backToChoose = () => setModalStep('choose');

  useEffect(() => {
    axios.get('http://localhost:8000/api/home/professeurs')
      .then((res) => setProfesseurs(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
      if (navbar) {
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 40);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = inputValue.toLowerCase();
    const matches = professeurs.filter((p) => {
      const nom = p.nom?.toLowerCase() || '';
      const prenom = p.prenom?.toLowerCase() || '';
      return `${nom} ${prenom}` === search || nom === search;
    });

    if (matches.length === 1) {
      dispatch({ type: 'Search', payload: matches[0] });
      navigate(`/professeur/${matches[0].nom}`);
    } else if (matches.length > 1) {
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      alert('Aucun professeur trouvé.');
    }
  };

  const handleSelectSuggestion = (prof) => {
    const fullName = `${prof.nom ?? ''} ${prof.prenom ?? ''}`.trim();
    setInputValue(fullName);
    setShowSuggestions(false);
    dispatch({ type: 'Search', payload: prof });
    navigate(`/professeur/${prof.nom}`);
  };


  useEffect(() => {
    if (inputValue.trim()) {
      const search = inputValue.toLowerCase();
      const filtered = professeurs.filter((prof) => {
        const nom = prof.nom?.toLowerCase() || '';
        const prenom = prof.prenom?.toLowerCase() || '';
        const domaine = prof.domaine?.toLowerCase() || '';
        return `${nom} ${prenom}`.includes(search) || nom.includes(search) || prenom.includes(search) || domaine.includes(search);
      });
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, professeurs]);

  return (
    <div className="page-home">
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src="home.png" alt="Logo 1" className="navbar-logo" />
            <img src="l.png" alt="Logo 2" className="navbar-logo1" />
          </div>
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="d-none d-lg-flex align-items-center ms-auto">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={() => {
                    setModalStep('choose');
                    const modal = new bootstrap.Modal(document.getElementById('connexionModal'));
                    modal.show();
                  }}
                >
                  Connexion
                </button>
              </li>
            </ul>
          </div>
          <div className="offcanvas offcanvas-start custom-offcanvas d-lg-none" tabIndex="-1" id="offcanvasNavbar">
            <div className="offcanvas-body">
              <button
                className="nav-link custom-btn"
                onClick={() => {
                  setModalStep('choose');
                  const modal = new bootstrap.Modal(document.getElementById('connexionModal'));
                  modal.show();
                }}
              >
                Connexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
  className="modal fade"
  id="connexionModal"
  tabIndex="-1"
  aria-labelledby="connexionModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div
      className="modal-content border-0 shadow-lg p-4 rounded-4"
      style={{
        backdropFilter: "blur(16px)",
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(245, 245, 245, 0.85))",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 20px 60px rgba(31, 57, 90, 0.25)"
      }}
    >
      <div className="modal-header border-0 position-relative">
        <h5 className="modal-title fw-bold w-100 text-center " id="connexionModalLabel">
          🔐 Connexion à votre espace
        </h5>
        <button
          type="button"
          className="btn-close position-absolute end-0 top-0 m-3"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={backToChoose}
        ></button>
      </div>
      <div className="modal-body text-center d-flex flex-column align-items-center">
        {modalStep === 'choose' && (
          <>
   <p className="text-muted mb-4 fs-6">Veuillez sélectionner votre rôle :</p>

          <button
            className="btn btn-gradient-primary rounded-pill fw-semibold mb-3 px-4 py-2 hover-scale modal-role-button"
            onClick={() => setModalStep('admin')}
          >
            👩‍💼 Administrateur
          </button>

          <button
            className="btn btn-gradient-success rounded-pill fw-semibold px-4 py-2 hover-scale modal-role-button"
            onClick={() => setModalStep('prof')}
          >
            👨‍🏫 Professeur
          </button>

          
        
        {/* Ajouter ici le contenu pour 'admin' ou 'prof' */}

                </>
              )}
              {modalStep === 'admin' && (
                <>
                  <LoginAdministrateur />
                  <button className="btn btn-light mt-5" onClick={backToChoose}>↩ Retour</button>
                </>
              )}
              {modalStep === 'prof' && (
                <>
                  <LoginProfesseurs />
                  <button className="btn btn-light mt-5 " onClick={backToChoose}>↩ Retour</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="main-content">
        <div className="left-section">
          <div className="header-content">
            <h1 className="portal-title">Portail des Professeurs | Faculté des Sciences Oujda</h1>
            <p className="portal-description">
              Une mine d'or pour étudiants, chercheurs et partenaires : explorez les profils complets 
              de nos enseignants, leurs projets innovants et leurs contributions scientifiques !
            </p>
            <form onSubmit={handleSearch}>
              <div className="search-group">
                <input
                  type="text"
                  className="form-control"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ex : Talhaoui Oumaima , Biologie…"
                  onFocus={() => inputValue.length > 0 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                <button type="submit" className="btn-search">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 
                      3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1z
                      M12 6.5a5.5 5.5 0 1 1-11 
                      0 5.5 5.5 0 0 1 11 0"/>
                  </svg>
                </button>
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions.map(prof => (
                      <li key={prof._id} className="suggestion-item" onMouseDown={() => handleSelectSuggestion(prof)}>
                        <div className="professor-info">
                          <span className="professor-name">{prof.nom} {prof.prenom}</span>
                          <span className="professor-details">{prof.domaine || 'Domaine non spécifié'}</span>
                        </div>
                        {prof.departement && <span className="department-badge">{prof.departement}</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="right-section">
          <LogoAnimation />
        </div>
      </main>

      <div className="footer-wave">
        <svg viewBox="0 0 120 28" preserveAspectRatio="none">
          <path d="M0,0 C30,20 90,0 120,18 L120,28 L0,28 Z" />
        </svg>
      </div>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-address">
            <p>
              <strong>Adresse :</strong><br />
              Faculté des Sciences<br />
              BV Mohammed VI – BP 717<br />
              Oujda 60000, Maroc
            </p>
            <p>
              <strong>Tél. :</strong> +212 536 500 601/2<br />
              <strong>Fax :</strong> +212 536 500 603
            </p>
          </div>
          <div className="footer-rights">
            <p>
              Tous droits réservés <a href="https://ump.ma" target="_blank" rel="noopener noreferrer">ump.ma</a> – © 2025
            </p>
          </div>
          <div className="footer-social">
              <a href="https://www.youtube.com/channel/UC2o68Tevz-C2pgH_1DweH6w" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="https://www.facebook.com/fso.ump.ma/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.facebook.com/fso.ump.ma/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <i className="bi bi-twitter"></i>
              </a>
          </div>

        </div>
      </footer>
    </div>
  );
}
