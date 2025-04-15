import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateProf } from '../../../store/Data'; // Importer la fonction de data.js

// Action pour succès
const createProfesseurSuccess = (professeurData) => ({
  type: 'CREATE_PROFESSEUR_SUCCESS',
  payload: professeurData,
});

// Action pour erreur
const createProfesseurFailure = (error) => ({
  type: 'CREATE_PROFESSEUR_FAILURE',
  error,
});

const AdminCreateProfesseur = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    code_authentification: '',
    mot_de_passe: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: 'CREATE_PROFESSEUR_REQUEST' }); // Indiquer que la requête est en cours

    try {
      const professeurData = await CreateProf(form); // Appeler la fonction CreateProf pour envoyer la requête

      // Si l'API retourne des données, on dispatch l'action de succès
      dispatch(createProfesseurSuccess(professeurData));

      // Optionnel : rediriger ou afficher un message de succès
    } catch (err) {
      // Si une erreur survient, on dispatch l'action d'échec
      dispatch(createProfesseurFailure(err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Générer un compte Professeur</h2>

      <input
        type="text"
        name="code_authentification"
        placeholder="Code d'authentification"
        value={form.code_authentification}
        onChange={handleChange}
        required
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        type="password"
        name="mot_de_passe"
        placeholder="Mot de passe"
        value={form.mot_de_passe}
        onChange={handleChange}
        required
        className="w-full mb-2 p-2 border rounded"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Créer Professeur
      </button>
    </form>
  );
};

export default AdminCreateProfesseur;
