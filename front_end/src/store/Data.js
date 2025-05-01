import axios from 'axios' ; 

export const Authentification_Administrateur=async (email,mot_de_passe)=>{
    try{
          const res=await axios.post('http://localhost:8000/api/admin/login',{email,mot_de_passe});
          return res.data
    }
    catch(error){
          console.log('Erreur d authentification  ') ;
          throw error
    }
}


export const Authentification_Professeurs = async (code_authentification, mot_de_passe) => {
  try {
    const res = await axios.post('http://localhost:8000/api/professeur/login', {
      code_authentification,
      mot_de_passe
    });
    return res.data;
  } catch (error) {
    console.error('Erreur d\'authentification', error);
    throw error;
  }
};

export const updatePortfolio = (formData) => {
  const token = localStorage.getItem("authToken");
  return axios.post("http://localhost:8000/api/professeur/update-portfolio", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};


// Fetch listes
export const fetchGrades = async () => {
  const token = localStorage.getItem('authToken');
  return await axios.get('http://localhost:8000/api/grades', { headers: { Authorization: `Bearer ${token}` } });
};

export const fetchLaboratoires = async () => {
  const token = localStorage.getItem('authToken');
  return await axios.get('http://localhost:8000/api/laboratoires', { headers: { Authorization: `Bearer ${token}` } });
};

export const fetchEquipes = async () => {
  const token = localStorage.getItem('authToken');
  return await axios.get('http://localhost:8000/api/equipes', { headers: { Authorization: `Bearer ${token}` } });
};

export const fetchDepartements = async () => {
  const token = localStorage.getItem('authToken');
  return await axios.get('http://localhost:8000/api/departements', { headers: { Authorization: `Bearer ${token}` } });
};

