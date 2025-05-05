// ✅ Complete_profil.js (React) - corrigé
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {
  fetchGrades, fetchEquipes, updatePortfolio,SeDeconnecter
} from '../../store/Data';
import './completeprofil.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';


export default function Complete_profil() {
 
  const navigate = useNavigate();
  const dispatch=useDispatch()
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

  const handleSubmit = async (e) => {
      e.preventDefault();
      // Validation manuelle
    const newErrors = {};
    
    // Vérifier les champs obligatoires
    if (!formData.nom.trim()) newErrors.nom = ["Le nom est obligatoire"];
    if (!formData.prenom.trim()) newErrors.prenom = ["Le prénom est obligatoire"];
    if (!formData.email.trim()) newErrors.email = ["L'email est obligatoire"];
    if (!formData.telephone.trim()) newErrors.telephone = ["Le téléphone est obligatoire"];
    if (!formData.id_equipe) newErrors.id_equipe = ["L'équipe est obligatoire"];
    if (!formData.id_grade) newErrors.id_grade = ["Le grade est obligatoire"];
    if (!formData.photo) newErrors.photo = ["La photo de profil est obligatoire"];

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
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
  const handleLogout = async () => {
    try {
      await SeDeconnecter();
      dispatch({ type: 'LOGOUT' }); // Reset du state Redux
      navigate('/');
    } catch (error) {
      navigate('/');
    }
  };

  

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
                  data-bs-toggle="modal"
                  data-bs-target="#logoutModal"
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
                data-bs-toggle="modal"
                data-bs-target="#logoutModal"
              >
                Déconnexion
              </button>
            </div>
          </div>
            </div>
          </nav>
            {/* Modale de déconnexion */}
      <div className="modal fade" id="logoutModal" tabIndex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="logoutModalLabel">Confirmation de déconnexion</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Êtes-vous sûr de vouloir vous déconnecter ?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn"style={{background:'rgb(63, 41, 0)' , color:'white'}}data-bs-dismiss="modal">Annuler</button>
              <button 
                type="button" 
                className="btn"
                style={{background:' #00253f' , color:'white'}}
                onClick={handleLogout}
                data-bs-dismiss="modal"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </div>
          <main className='complete-profil-section'>
          <section className='hero-section position-relative overflow-hidden'>
            <div className="container position-relative z-2">
              <div className="hero-content p-5 rounded-4">
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

   
        </div>  
        

        {/* Partie Visuelle */}
        <div className="col-lg-6">
          <div className="hero-visual p-4 position-relative">
          <div className="floating-card card-1">
              <i className="fas fa-chart-line  p-2" style={{color:"rgb(213, 228, 53)"}}></i>
              <span>Avancement Professionnel</span>
            </div>
            <div className="floating-card card-2 ">
            <img width="45" height="45" src="https://img.icons8.com/connect-color/100/globe.png" alt="globe"/>              <span>Influence Internationale</span>
            </div>
            {/* Partie Visuelle */}
          <div className="col-lg-6">
            <div className="hero-visual p-4 position-relative ">
              
              <div className="main-illustration">
                <img  
                  src="/men1.png" 
                  alt="Profil scientifique" 
                  className="img-fluid floating-animation " 
                 

                />
              </div>
            </div>
    
          </div>
          
          </div>
        </div>
        <div className="scroll-indicator text-center mt-5">
            <a href="#formulaire" className="scroll-arrow">
              <i className="fas fa-chevron-down fa-2x animate-bounce"></i>
            </a>
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
  
  <section className='profil-form' id="formulaire">
  <div className="container ">
      <div className="form-wrapper  rounded-4 shadow-lg overflow-hidden">
        <div className="row g-0">
          {/* Colonne Photo */}
          <div className="col-lg-4 photo-upload-section  p-5 d-flex flex-column ">
            <div className="upload-wrapper mb-4  ">
              <div className="profile-preview ratio ratio-1x1 mb-3  ">
                {formData.photo ? (
                  <img src={URL.createObjectURL(formData.photo)} className="rounded-circle" alt="Preview" />
                ) : (
                  <div className="placeholder-icon">
                    <i className="fas fa-user-circle fa-3x " style={{color:'rgb(0, 29, 52)'}}></i>
                  </div>
                )}
              </div>
              <label className="btn btn-dark w-100 mb-2 ">
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
            {errors.photo && (
    <div className="text-danger small mt-1">
      <i className="fas fa-exclamation-circle me-2"></i>
      {errors.photo[0]}
    </div>
  )}
          </div>

          {/* Colonne Formulaire */}
          <div className="col-lg-8 form-content-section p-5">
            <form onSubmit={handleSubmit}>
              {/* Section Informations */}
              <div className="form-section mb-5">
                <h3 className="section-title mb-4">
                  <i className="fas fa-user-graduate me-4 " style={{"color":' #824e00'}}></i>
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
                      {errors.nom && (
                          <div className="invalid-feedback d-block">
                            <i className="fas fa-exclamation-circle me-2"></i>
                            {errors.nom[0]}
                          </div>
                        )}                    </div>
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
                      {errors.prenom && (
              <div className="invalid-feedback d-block">
                <i className="fas fa-exclamation-circle me-2"></i>
                {errors.prenom[0]}
              </div>
            )}                    </div>
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
                      {errors.email && (
    <div className="invalid-feedback d-block">
      <i className="fas fa-exclamation-circle me-2"></i>
      {errors.email[0]}
    </div>
  )}                    </div>
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
                      {errors.telephone && (
    <div className="invalid-feedback d-block">
      <i className="fas fa-exclamation-circle me-2"></i>
      {errors.telephone[0]}
    </div>
  )}                    </div>
                  </div>
                </div>
              </div>

            {/* Section Liens académiques */}
            <div className="form-section mb-5">
              <h3 className="section-title mb-4">
                <i className="fas fa-passport me-4" style={{"color":' #824e00'}}></i>
                Identifiants de recherche
              </h3>

              <div className="row g-4">
                {/* ORCID */}
                <div className="col-12">
                  <div className="input-group">
                    <span className="input-group-text bg-orcid ">
                    <i 
  className="fab fa-orcid" 
  style={{
    color: 'rgb(149, 195, 9)',
    fontSize: '38px', // Contrôle la taille de l'icône
    width: '38px',    // Maintient l'espace réservé
    height: '38px',   // Maintient l'espace réservé
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
></i>                    </span>
                    <div className="form-floating flex-grow-1">
                      <input
                        type="url"
                        className={`form-control ${errors.orcid && 'is-invalid'}`}
                        id="orcid"
                        name="orcid"
                        placeholder="ORCID ID"
                        onChange={handleChange}
                      />
                      <label>Lien Profil ORCID</label>
                      {errors.orcid && <div className="invalid-feedback">{errors.orcid[0]}</div>}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="input-group">
                      <span className="input-group-text bg-scopus">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="38" height="38" viewBox="0 0 48 48">
<rect width="36" height="36" x="6" y="6" fill="#ff8200"></rect><path fill="#fff" d="M26.269,23.569c0-9.602,10.165-6.213,10.165-6.213l0.399-1.654	c-4.225-1.573-12.596-1.493-12.596,7.867c0,9.36,8.371,9.441,12.596,7.868l-0.399-1.654C36.434,29.782,26.269,33.171,26.269,23.569z"></path><path fill="#fff" d="M21.255,25.043c-1.067-1.426-3.364-1.918-5.88-2.87c-1.954-0.739-3.04-1.503-3.04-2.935	c0-1.433,1.188-2.516,3.564-2.516s4.438,1.293,4.438,1.293l0.874-1.607c0,0-4.647-2.481-8.142-1.013	c-3.345,1.405-3.496,4.87-1.844,6.703c1.282,1.422,3.844,2.134,5.689,2.803c2.259,0.756,3.003,1.382,3.003,2.87	c0,1.433-1.188,2.639-3.564,2.639s-5.527-1.766-5.527-1.766l-0.943,1.598c0,0,5.32,3.304,9.3,1.495	C22.486,30.237,22.604,26.846,21.255,25.043z"></path>
</svg>
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
                        <label>Lien Profil SCOPUS</label>
                        {errors.scopus && <div className="invalid-feedback">{errors.scopus[0]}</div>}
                      </div>
                  </div>
                </div>

              <div className="col-12">
                <div className="input-group">
                  <span className="input-group-text">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="38" height="38" viewBox="0 0 48 48">
<path fill="#1e88e5" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#1565c0" d="M35,16.592v-3.878L37,11H27l0.917,1.833c-1.236,0-2.265,0-2.265,0S19.095,13,19.095,18.748	c0,5.752,5.732,5.088,5.732,5.088s0,0.865,0,1.453c0,0.594,0.77,0.391,0.864,1.583c-0.388,0-7.964-0.208-7.964,4.998	s6.679,4.959,6.679,4.959s7.722,0.365,7.722-6.104c0-3.871-4.405-5.121-4.405-6.686c0-1.563,3.319-2.012,3.319-5.684	c0-0.823-0.028-1.524-0.149-2.12L34,13.571v3.02c-0.581,0.207-1,0.756-1,1.408v4.5c0,0.829,0.672,1.5,1.5,1.5s1.5-0.671,1.5-1.5V18	C36,17.348,35.581,16.799,35,16.592z M30.047,31.169c0.131,2.024-1.929,3.811-4.603,3.998c-2.671,0.188-4.946-1.295-5.077-3.316	c-0.133-2.016,1.927-3.805,4.6-3.996C27.641,27.667,29.914,29.152,30.047,31.169z M26.109,22.453	c-1.592,0.451-3.375-1.062-3.982-3.367c-0.604-2.312,0.195-4.543,1.786-4.992c1.593-0.453,3.374,1.059,3.981,3.367	C28.499,19.77,27.702,22.004,26.109,22.453z"></path><path fill="#e8eaf6" d="M34,16.592V12c0-0.051-0.015-0.097-0.029-0.143L35,11H21l-9,8h5.383	c0.174,5.466,5.715,4.836,5.715,4.836s0,0.865,0,1.453c0,0.594,0.771,0.391,0.865,1.583c-0.388,0-7.964-0.208-7.964,4.998	s6.679,4.959,6.679,4.959s7.721,0.365,7.721-6.104c0-3.871-4.404-5.121-4.404-6.686c0-1.563,3.318-2.012,3.318-5.684	c0-0.971-0.047-1.763-0.232-2.422L33,12.667v3.925c-0.581,0.207-1,0.756-1,1.408v4.5c0,0.829,0.672,1.5,1.5,1.5s1.5-0.671,1.5-1.5	V18C35,17.348,34.581,16.799,34,16.592z M28.319,31.169c0.131,2.024-1.928,3.811-4.602,3.998c-2.671,0.188-4.946-1.295-5.077-3.316	c-0.133-2.016,1.927-3.805,4.599-3.996C25.914,27.667,28.187,29.152,28.319,31.169z M24.38,22.453	c-1.591,0.451-3.373-1.062-3.981-3.367c-0.604-2.312,0.194-4.543,1.785-4.992c1.593-0.453,3.374,1.059,3.982,3.367	C26.77,19.77,25.973,22.004,24.38,22.453z"></path>
</svg></span>
                  <div className="form-floating flex-grow-1">
                    <input
                      type="url"
                      className={`form-control ${errors.scholar && 'is-invalid'}`}
                      id="scholar"
                      name="scholar"
                      placeholder="Profil Google Scholar"
                      onChange={handleChange}
                    />
                    <label>Lien Profil Google Scholar</label>
                    {errors.scholar && <div className="invalid-feedback">{errors.scholar[0]}</div>}
                  </div>
                </div>
              </div>
              </div> 
              </div> 


              {/* Section Affiliation */}
              <div className="form-section">
                <h3 className="section-title mb-4">
                  <i className="fas fa-users me-4 " style={{"color":' #824e00'}}></i>
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
                      {errors.id_equipe && (
    <div className="invalid-feedback d-block">
      <i className="fas fa-exclamation-circle me-2"></i>
      {errors.id_equipe[0]}
    </div>
  )}                    </div>
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
                      {errors.id_grade && (
    <div className="invalid-feedback d-block">
      <i className="fas fa-exclamation-circle me-2"></i>
      {errors.id_grade[0]}
    </div>
  )}                    </div>
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
