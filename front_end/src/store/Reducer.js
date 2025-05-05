import { combineReducers, createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";

//Authentification Administration  : 
const AdminInistialisation = {
    admin: null,
    token: null,
    message: null
};

const AdminstrateurAuthentification = (state = AdminInistialisation, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        admin: action.payload.admin,
        token: action.payload.token,
        message: null, // on nettoie le message
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        admin: null,
        token: null,
        message: action.payload, // on stocke le message ici
      };
      case 'LOGOUT':
        return AdminInistialisation; // Reset complet

    default:
      return state;
  }
};

// store/reducers/professeurReducer.js

const ProfesseurInitialisation = {
  prof: null,
  token: null,
  isCompleted: null,
  message: null,
  loading: false,      // ✅ nouveau : pour gérer le chargement
  updateSuccess: false // ✅ nouveau : pour savoir si update profil est réussi
};

const ProfesseurAuthentification = (state = ProfesseurInitialisation, action) => {
  switch (action.type) {

    // 🔵 Lorsqu'on se connecte avec succès
    case "LOGIN_SUCCESS":
      return {
        ...state,
        prof: action.payload.prof,
        token: action.payload.token,
        isCompleted: action.payload.is_completed,
        message: null,
        loading: false,
        updateSuccess: false,
      };

    // 🔴 Lorsqu'on échoue la connexion
    case "LOGIN_FAILURE":
      return {
        ...state,
        prof: null,
        token: null,
        isCompleted: null,
        message: action.payload,
        loading: false,
        updateSuccess: false,
      };

      
    // 🟠 Début du chargement pour update
    case "UPDATE_PROFILE_START":
      return {
        ...state,
        loading: true,
        updateSuccess: false,
      };

    // 🟢 Succès de mise à jour profil
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        prof: { ...state.prof, ...action.payload }, // on met à jour les données du prof
        isCompleted: 1,
        loading: false,
        updateSuccess: true,
      };

    // 🔴 Échec de mise à jour profil
    case "UPDATE_PROFILE_FAILURE":
      return {
        ...state,
        loading: false,
        updateSuccess: false,
        message: action.payload,
      };

    case 'LOGOUT':
        return ProfesseurInitialisation; // Reset complet
    default:
      return state;
  }
};







// Combine tous les reducers
const rootReducer = combineReducers({
  adminauth: AdminstrateurAuthentification,
  profauth:ProfesseurAuthentification
});

// Crée le store Redux
const store = createStore(rootReducer, applyMiddleware(thunk));

// ✅ Export du store
export default store;
