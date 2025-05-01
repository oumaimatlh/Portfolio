import './connexion.css';

export default function Connexion() {
  return (
    <div className="connexion-page">
      <div className="connexion-modal">
        <h2 className="connexion-title">Choisissez votre profil</h2>
        <div className="connexion-buttons">
          <button className="connexion-button admin">Je suis un Administrateur</button>
          <button className="connexion-button prof">Je suis un Professeur</button>
        </div>
      </div>
    </div>
  );
}
