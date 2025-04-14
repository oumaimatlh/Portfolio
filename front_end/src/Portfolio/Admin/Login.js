import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { Authentification } from '../../store/Data';

export default function LoginAdministrateur() {
  const [email, setEmail] = useState('');
  const [mot_de_passe, setMotDePasse] = useState('');
  
  const { admin, message: storeMessage} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  
    // actions/authActions.js
    const loginSuccess = (admin, token) => ({
          type: "LOGIN_SUCCESS",
          payload: { admin, token }
    });
    const loginFailure = (message) => ({
          type: "LOGIN_FAILURE",
          payload: message
    });


  const handlSeconnecter = async (e) => {
    e.preventDefault();

      try {
        const response = await Authentification(email, mot_de_passe);
        console.log(response.admin)
    
        // Stocker le token dans localStorage
        localStorage.setItem('authToken', response.token);
       
        // Dispatch des données dans le store Redux
        dispatch(loginSuccess(response.admin, response.token));  
        console.log(response.token)

      } catch (error) {
        if (error.response && error.response.status === 401) {
          dispatch(loginFailure('Email ou mot de passe incorrect.'));
        } else {
          dispatch(loginFailure('Erreur lors de la connexion.'));
        }
      }
  };

  useEffect(() => {
    if (admin) {
      navigate('/accueil'); 
    }
  }, [admin, navigate]);

    

  


  return (
    <div style={{ padding: '2rem' }}>
      <h2>Connexion Administrateur</h2>
      <form onSubmit={handlSeconnecter}>
        <div>
          <label>Email *:</label>
          <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>

        <div>
          <label>Mot de passe *:</label>
          <input type="password" value={mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} required />
        </div>

        <button type="submit">Se connecter</button>
      </form>

      {storeMessage && (
        <p style={{ marginTop: '1rem', color: 'crimson' }}>{storeMessage}</p>
      )}
    </div>
  );
}
