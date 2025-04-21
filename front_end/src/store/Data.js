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

export const Authentification_Professeurs=async (code_authentification,mot_de_passe)=>{
  try{
        const res=await axios.post('http://localhost:8000/api/professeur/login',{code_authentification,mot_de_passe});
        return res.data
  }
  catch(error){
        console.log('Erreur d authentification ') ;
        throw error
  }
}


export const RecupererDepartements = async () => {
  try {
    const token = localStorage.getItem('authToken');

    const res = await axios.get('http://localhost:8000/api/departements',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.log('Erreur lors de la récupération des départements');
    throw error;
  }
};


