// ✅ Complete_profil.js (React) - corrigé
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchGrades, fetchEquipes, updatePortfolio
} from '../../store/Data';
import './completeprofil.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';

export default function Complete_profil() {
  const navigate = useNavigate();
  const [modalStep, setModalStep] = useState('choose');

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    scopus: '',
    orcid: '',
    scholar: '',
    id_equipe: '',
    id_grade: '',
    photo: null,
  });

  const [grades, setGrades] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append('_method', 'PUT');

    try {
      await updatePortfolio(data);
      navigate("/professeur/portfolio");
    } catch (error) {
      console.error("Erreur d'enregistrement", error);
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [resGrades, resEquipes] = await Promise.all([
          fetchGrades(), fetchEquipes()
        ]);
        setGrades(resGrades.data);
        setEquipes(resEquipes.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);

  return (
     <div className="page-home">
          <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container-fluid d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img src="/home.png" alt="Logo 1" className="navbar-logo" />
                <img src="/l.png" alt="Logo 2" className="navbar-logo1" />
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
                      Déconnexion
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
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <main className='complete-profil-section'>
          <section className='hero-section position-relative overflow-hidden'>
  <div className="container position-relative z-2">
    <div className="hero-content bg-glassmorphism p-5 rounded-4">
      <div className="row align-items-center g-5">
        {/* Partie Texte */}
        <div className="col-lg-6 pe-lg-5">
          <div className="progress-steps mb-4">
            <div className="step completed"></div>
            <div className="step active"></div>
            <div className="step"></div>
          </div>
          
          <h1 className="display-4 fw-bold mb-4 text-gradient">
            <span className="animate-char">Construisez Votre Identité</span><br/>
            <span className="animate-char delay-1">Académique Unique</span>
          </h1>
          
          <p className="lead mb-4 opacity-75">
            Rejoignez notre communauté scientifique en complétant votre profil professionnel. 
            <span className="d-block mt-2">Accédez à des outils de recherche avancés et augmentez votre visibilité internationale.</span>
          </p>
          
          <div className="d-flex gap-3">
            <button className="btn btn-primary btn-hover-scale">
              <i className="fas fa-play-circle me-2"></i>Découvrir les avantages
            </button>
          </div>
        </div>

        {/* Partie Visuelle */}
        <div className="col-lg-6">
          <div className="hero-visual p-4 position-relative">
            <div className="floating-card card-1 bg-white">
              <i className="fas fa-certificate text-accent"></i>
              <span>Validation Expert</span>
            </div>
            <div className="floating-card card-2 bg-white">
              <i className="fas fa-network-wired text-accent"></i>
              <span>Réseau International</span>
            </div>
            <div className="main-illustration">
              <img 
                src="/scientist-profile.svg" 
                alt="Profil scientifique" 
                className="img-fluid floating-animation" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Éléments de décoration */}
  <div className="hero-bg-overlay"></div>
  <div className="particles-container"></div>
  <div className="gradient-blur-effect"></div>
</section>
  {/* Formulaire */}
  <section className='profil-form py-5'>
    <div className="container">
      <div className="form-wrapper bg-white rounded-4 shadow-lg overflow-hidden">
        <div className="row g-0">
          {/* Colonne Photo */}
          <div className="col-lg-4 photo-upload-section bg-light p-5 d-flex flex-column">
            <div className="upload-wrapper mb-4">
              <div className="profile-preview ratio ratio-1x1 mb-3">
                {formData.photo ? (
                  <img src={URL.createObjectURL(formData.photo)} className="rounded-circle" alt="Preview" />
                ) : (
                  <div className="placeholder-icon">
                    <i className="fas fa-user-circle fa-5x text-muted"></i>
                  </div>
                )}
              </div>
              <label className="btn btn-dark w-100 mb-3">
                <i className="fas fa-camera me-2"></i>
                {formData.photo ? 'Changer la photo' : 'Ajouter une photo'}
                <input 
                  type="file" 
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  hidden
                />
              </label>
              <small className="text-muted text-center d-block">
                Formats supportés : JPG, PNG, WEBP<br />
                Taille max : 5MB
              </small>
            </div>
          </div>

          {/* Colonne Formulaire */}
          <div className="col-lg-8 form-content-section p-5">
            <form onSubmit={handleSubmit}>
              {/* Section Informations */}
              <div className="form-section mb-5">
                <h3 className="section-title mb-4">
                  <i className="fas fa-user-graduate me-2 text-primary"></i>
                  Informations personnelles
                </h3>
                
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className={`form-control ${errors.nom && 'is-invalid'}`}
                        id="nom"
                        name="nom"
                        placeholder=" "
                        onChange={handleChange}
                      />
                      <label>Nom *</label>
                      {errors.nom && <div className="invalid-feedback">{errors.nom[0]}</div>}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className={`form-control ${errors.prenom && 'is-invalid'}`}
                        id="prenom"
                        name="prenom"
                        placeholder=" "
                        onChange={handleChange}
                      />
                      <label>Prénom *</label>
                      {errors.prenom && <div className="invalid-feedback">{errors.prenom[0]}</div>}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className={`form-control ${errors.email && 'is-invalid'}`}
                        id="email"
                        name="email"
                        placeholder=" "
                        onChange={handleChange}
                      />
                      <label>Email professionnel *</label>
                      {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="tel"
                        className={`form-control ${errors.telephone && 'is-invalid'}`}
                        id="telephone"
                        name="telephone"
                        placeholder=" "
                        onChange={handleChange}
                      />
                      <label>Téléphone</label>
                      {errors.telephone && <div className="invalid-feedback">{errors.telephone[0]}</div>}
                    </div>
                  </div>
                </div>
              </div>

            {/* Section Liens académiques */}
            <div className="form-section mb-5">
              <h3 className="section-title mb-4">
                <i className="fas fa-passport me-2 text-primary"></i>
                Identifiants de recherche
              </h3>

              <div className="row g-4">
                {/* ORCID */}
                <div className="col-12">
                  <div className="input-group">
                    <span className="input-group-text bg-orcid">
                      <i className="fab fa-orcid"></i>
                    </span>
                    <div className="form-floating flex-grow-1">
                      <input
                        type="url"
                        className={`form-control ${errors.orcid && 'is-invalid'}`}
                        id="orcid"
                        name="orcid"
                        placeholder="ORCID ID"
                        pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                        onChange={handleChange}
                      />
                      <label>ORCID ID (format: 0000-0000-0000-0000)</label>
                      {errors.orcid && <div className="invalid-feedback">{errors.orcid[0]}</div>}
                    </div>
                  </div>
                </div>

                {/* Scopus */}
                <div className="col-12">
                  <div className="input-group">
                    <span className="input-group-text bg-scopus">
                      <i className="fas fa-database"></i>
                    </span>
                    <div className="form-floating flex-grow-1">
                      <input
                        type="url"
                        className={`form-control ${errors.scopus && 'is-invalid'}`}
                        id="scopus"
                        name="scopus"
                        placeholder="Profil Scopus"
                        onChange={handleChange}
                      />
                      <label>Lien profil Scopus</label>
                      {errors.scopus && <div className="invalid-feedback">{errors.scopus[0]}</div>}
                    </div>
                  </div>
                </div>

                {/* Google Scholar */}
                <div className="col-12">
                  <div className="input-group">
                    <span className="input-group-text bg-scholar">
                      <i className="fab fa-google-scholar"></i>
                    </span>
                    <div className="form-floating flex-grow-1">
                      <input
                        type="url"
                        className={`form-control ${errors.scholar && 'is-invalid'}`}
                        id="scholar"
                        name="scholar"
                        placeholder="Profil Google Scholar"
                        onChange={handleChange}
                      />
                      <label>Lien Google Scholar</label>
                      {errors.scholar && <div className="invalid-feedback">{errors.scholar[0]}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

              {/* Section Affiliation */}
              <div className="form-section">
                <h3 className="section-title mb-4">
                  <i className="fas fa-users me-2 text-primary"></i>
                  Affiliation institutionnelle
                </h3>

                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select
                        className={`form-select ${errors.id_equipe && 'is-invalid'}`}
                        id="id_equipe"
                        name="id_equipe"
                        onChange={handleChange}
                      >
                        <option value="">Choisir une équipe...</option>
                        {equipes.map(equipe => (
                          <option key={equipe.id} value={equipe.id}>{equipe.nom}</option>
                        ))}
                      </select>
                      <label>Équipe de recherche *</label>
                      {errors.id_equipe && <div className="invalid-feedback">{errors.id_equipe[0]}</div>}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <select
                        className={`form-select ${errors.id_grade && 'is-invalid'}`}
                        id="id_grade"
                        name="id_grade"
                        onChange={handleChange}
                      >
                        <option value="">Choisir un grade...</option>
                        {grades.map(grade => (
                          <option key={grade.id} value={grade.id}>{grade.nom}</option>
                        ))}
                      </select>
                      <label>Grade universitaire *</label>
                      {errors.id_grade && <div className="invalid-feedback">{errors.id_grade[0]}</div>}
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100 mt-5">
                <i className="fas fa-check-circle me-2"></i>
                Finaliser mon profil
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
    </div>
  );
}
