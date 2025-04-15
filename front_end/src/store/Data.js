import axios from 'axios';

//Authentification : 
export const Authentification= async (email, mot_de_passe) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/admin/login', {
      email,
      mot_de_passe
    });
    return response.data;  
  } catch (error) {
    throw error;  
  }
};

//Departements : 
export const CreateProf = async (professeurData) => {
  const token = localStorage.getItem('authToken'); // 🔑 Récupère le token ici
  try {
    const res = await axios.post('http://localhost:8000/api/professeurs', professeurData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data; // Retourner les données reçues
  } catch (err) {
    console.error('Erreur lors de la création du professeur:', err);
    throw err;
  }
};



//Departements : 
const RecupererDepartements = async () => {
  const token = localStorage.getItem('authToken'); // 🔑 Récupère le token ici
  try {
    const res = await axios.get( 'http://localhost:8000/api/departements', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return res.data;
  } catch (err) {
    console.error('Erreur RecupererDepartements:', err);
    throw err;
  }
};


/*export const createProfesseur = (data) => async (dispatch, getState) => {
  dispatch({ type: 'CREATE_PROFESSEUR_REQUEST' });

  try {
    const token = getState().auth.token;
    const response = await axios.post(
      'http://localhost:8000/api/professeurs',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: 'CREATE_PROFESSEUR_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'CREATE_PROFESSEUR_FAILURE', error: error.message });
  }
};

*/

















const API_BASE = 'http://127.0.0.1:8000/api/grades';

 const fetchGrades = async () => {
  try {
    const res = await axios.get(API_BASE);
    return res.data;
  } catch (err) {
    console.error('Erreur fetchGrades:', err);
    throw err;
  }
};

 const createGrade = async (grade) => {
  try {
    const res = await axios.post(API_BASE, grade);
    return res.data;
  } catch (err) {
    console.error('Erreur createGrade:', err);
    throw err;
  }
};

 const updateGrade = async (id, grade) => {
  try {
    const res = await axios.put(`${API_BASE}/${id}`, grade);
    return res.data;
  } catch (err) {
    console.error('Erreur updateGrade:', err);
    throw err;
  }
};

 const deleteGrade = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error('Erreur deleteGrade:', err);
    throw err;
  }
};

export {fetchGrades, createGrade ,deleteGrade,updateGrade};




// Fonction pour créer un département
 const createDepartement = async (departement) => {
  try {
    const res = await axios.post( 'http://localhost:8000/api/departements', departement);
    return res.data;
  } catch (err) {
    console.error('Erreur createDepartement:', err);
    throw err;
  }
};

// Fonction pour mettre à jour un département
 const updateDepartement = async (id, departement) => {
  try {
    const res = await axios.put(`${ 'http://localhost:8000/api/departements'}/${id}`, departement);
    return res.data;
  } catch (err) {
    console.error('Erreur updateDepartement:', err);
    throw err;
  }
};

// Fonction pour supprimer un département
 const deleteDepartement = async (id) => {
  try {
    const res = await axios.delete(`${ 'http://localhost:8000/api/departements'}/${id}`);
    return res.data;
  } catch (err) {
    console.error('Erreur deleteDepartement:', err);
    throw err;
  }
};
export {deleteDepartement, updateDepartement ,createDepartement,RecupererDepartements};

//laboratoire 
const API_LAB = 'http://localhost:8000/api/laboratoires';

export const fetchLaboratoires = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/laboratoires');
      return res.data;
    } catch (err) {
      console.error('Erreur fetchLaboratoires:', err);
      throw err;
    }
  }

export const createLaboratoire = async (laboratoire) => {
  try {
    const res = await axios.post(API_LAB, laboratoire);
    return res.data;
  } catch (err) {
    console.error('Erreur createLaboratoire:', err);
    throw err;
  }
};

export const updateLaboratoire = async (id, laboratoire) => {
  try {
    const res = await axios.put(`${API_LAB}/${id}`, laboratoire);
    return res.data;
  } catch (err) {
    console.error('Erreur updateLaboratoire:', err);
    throw err;
  }
};

export const deleteLaboratoire = async (id) => {
  try {
    const res = await axios.delete(`${API_LAB}/${id}`);
    return res.data;
  } catch (err) {
    console.error('Erreur deleteLaboratoire:', err);
    throw err;
  }
};
//Equipe 

const API_EQUIPES = 'http://localhost:8000/api/equipes';

export const fetchEquipes = async () => {
  try {
    const res = await axios.get(API_EQUIPES);
    return res.data;
  } catch (err) {
    console.error('Erreur fetchEquipes:', err);
    throw err;
  }
};

export const createEquipe = async (equipe) => {
  try {
    const res = await axios.post(API_EQUIPES, equipe);
    return res.data;
  } catch (err) {
    console.error('Erreur createEquipe:', err);
    throw err;
  }
};

export const updateEquipe = async (id, equipe) => {
  try {
    const res = await axios.put(`${API_EQUIPES}/${id}`, equipe);
    return res.data;
  } catch (err) {
    console.error('Erreur updateEquipe:', err);
    throw err;
  }
};

export const deleteEquipe = async (id) => {
  try {
    const res = await axios.delete(`${API_EQUIPES}/${id}`);
    return res.data;
  } catch (err) {
    console.error('Erreur deleteEquipe:', err);
    throw err;
  }
};






const API_URL = 'http://localhost:8000/api';

// Authentification professeur
export const loginProfesseur = async (email, mot_de_passe) => {
  try {
    const res = await axios.post(`${API_URL}/professeur/login`, {
      email,
      mot_de_passe
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};



// Récupérer les infos du profil du professeur connecté
export const getMonProfil = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/professeur/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Compléter le profil après la connexion
export const updateProfil = async (id, updatedData, token) => {
  try {
    const res = await axios.put(`${API_URL}/professeurs/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};



//create prof 


