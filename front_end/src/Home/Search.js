import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Search.css'; // Fichier CSS que nous avons généré précédemment

export default function ResponsiveSearch() {
  const [inputValue, setInputValue] = useState('');
  const [professeurs, setProfesseurs] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/home/professeurs')
      .then((response) => setProfesseurs(response.data))
      .catch((error) => console.error('Erreur lors du chargement des professeurs :', error));
  }, []);

  useEffect(() => {
    if (inputValue.trim().length > 0) {
      const search = inputValue.toLowerCase();

      const filtered = professeurs.filter((prof) => {
        const nom = prof.nom?.toLowerCase() || '';
        const prenom = prof.prenom?.toLowerCase() || '';
        const domaine = prof.domaine?.toLowerCase() || '';
        return (
          `${nom} ${prenom}`.includes(search) ||
          nom.includes(search) ||
          prenom.includes(search) ||
          domaine.includes(search)
        );
      });

      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, professeurs]);

  const handleSelectSuggestion = (professeur) => {
    const fullName = `${professeur.nom ?? ''} ${professeur.prenom ?? ''}`.trim();
    setInputValue(fullName);
    setShowSuggestions(false);
    dispatch({ type: 'Search', payload: professeur });
    navigate(`/professeur/${professeur.nom}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const search = inputValue.toLowerCase();

    const matching = professeurs.filter((p) => {
      const nom = p.nom?.toLowerCase() || '';
      const prenom = p.prenom?.toLowerCase() || '';
      return (
        `${nom} ${prenom}` === search ||
        nom === search
      );
    });

    if (matching.length === 1) {
      dispatch({ type: 'Search', payload: matching[0] });
      navigate(`/professeur/${matching[0].nom}`);
    } else if (matching.length > 1) {
      setSuggestions(matching);
      setShowSuggestions(true);
    } else {
      alert('Aucun professeur trouvé avec ce nom.');
    }
  };

  return (
    <>
      <header className="modern-header">
        <div className="logo">EduConnectPro</div>
        <div className="auth-buttons">
          <Link to="/login/Professeur" className="auth-link">Espace Professeur</Link>
          <Link to="/Portfolio/Admin/Login" className="auth-link">Espace Admin</Link>
        </div>
      </header>

      <main className="main-container">
        <div className="search-wrapper">
          <div className="search-card">
            <h1 className="title">Trouvez le professeur idéal</h1>
            <p className="subtitle">Recherchez par nom, matière ou département</p>
            
            <form className="search-form" onSubmit={handleSearch}>
              <div className="input-container">
                <input
                  type="text"
                  className="search-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ex: Martin Dupont, Mathématiques..."
                  onFocus={() => inputValue.length > 0 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />

                {showSuggestions && suggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions.map((prof) => (
                      <li
                        key={prof._id}
                        className="suggestion-item"
                        onMouseDown={() => handleSelectSuggestion(prof)}
                      >
                        <div className="professor-info">
                          <span className="professor-name">{prof.nom} {prof.prenom}</span>
                          <span className="professor-details">{prof.domaine || 'Domaine non spécifié'}</span>
                        </div>
                        {prof.departement && (
                          <span className="department-badge">{prof.departement}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button type="submit" className="search-button">
                <i className="fas fa-search"></i> Rechercher
              </button>
            </form>
          </div>
        </div>

        <footer className="modern-footer">
          <div className="footer-container">
            <div className="footer-column">
              <h3 className="footer-title">Contactez-nous</h3>
              <p className="footer-text">
                <span className="footer-icon"><i className="fas fa-map-marker-alt"></i></span>
                Faculté des Sciences<br />
                BV Mohammed VI - BP 717 Oujda 60000<br />
                Maroc
              </p>
              <p className="footer-text">
                <span className="footer-icon"><i className="fas fa-phone"></i></span>
                +212 536500601/2
              </p>
              <p className="footer-text">
                <span className="footer-icon"><i className="fas fa-fax"></i></span>
                +212 536500603
              </p>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Réseaux sociaux</h3>
              <div className="social-links">
                <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://youtube.com" className="social-link" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-copyright">
            Tous droits réservés ump.ma - © {new Date().getFullYear()}
          </div>
        </footer>
      </main>
    </>
  );
}