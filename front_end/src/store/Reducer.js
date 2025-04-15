import { combineReducers, createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";

// Reducer Auth Admin
const authInitialState = {
  admin: null,
  token: null,
  message: '',
};

function authReducer(state = authInitialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        admin: action.payload.admin,
        token: action.payload.token,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
}

// Reducer Grades
const gradesInitialState = {
  list: [],
  loading: false,
  error: null,
};

function gradesReducer(state = gradesInitialState, action) {
  switch (action.type) {
    case 'FETCH_GRADES_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_GRADES_SUCCESS':
      return { ...state, loading: false, list: action.payload };
    case 'FETCH_GRADES_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

// Reducer Laboratoires
const laboInitialState = {
  list: [],
  loading: false,
  error: null,
};

function laboReducer(state = laboInitialState, action) {
  switch (action.type) {
    case 'FETCH_LABORATOIRES_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_LABORATOIRES_SUCCESS':
      return { ...state, loading: false, list: action.payload };
    case 'FETCH_LABORATOIRES_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

// Reducer Départements
const departementInitialState = {
  list: [],
  loading: false,
  error: null,
};

function departementReducer(state = departementInitialState, action) {
  switch (action.type) {
    case 'FETCH_DEPARTEMENTS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_DEPARTEMENTS_SUCCESS':
      return { ...state, loading: false, list: action.payload };
    case 'FETCH_DEPARTEMENTS_FAILURE':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

// Reducer Équipes
const equipeInitialState = {
  list: [],
  loading: false,
  error: null,
};

function equipeReducer(state = equipeInitialState, action) {
  switch (action.type) {
    case 'FETCH_EQUIPE_REQUEST':
    case 'CREATE_EQUIPE_REQUEST':
    case 'DELETE_EQUIPE_REQUEST':
    case 'UPDATE_EQUIPE_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_EQUIPE_SUCCESS':
      return { ...state, loading: false, list: action.payload };

    case 'CREATE_EQUIPE_SUCCESS':
      return { ...state, loading: false, list: [...state.list, action.payload] };

    case 'DELETE_EQUIPE_SUCCESS':
      return {
        ...state,
        loading: false,
        list: state.list.filter((equipe) => equipe.id !== action.payload),
      };

    case 'UPDATE_EQUIPE_SUCCESS':
      return {
        ...state,
        loading: false,
        list: state.list.map((equipe) =>
          equipe.id === action.payload.id ? { ...equipe, ...action.payload } : equipe
        ),
      };

    case 'FETCH_EQUIPE_FAILURE':
    case 'CREATE_EQUIPE_FAILURE':
    case 'DELETE_EQUIPE_FAILURE':
    case 'UPDATE_EQUIPE_FAILURE':
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
}

// Reducer Professeurs
const professeurInitialState = {
  loading: false,
  success: false,
  error: null,
  data: null, // Pour stocker les données du professeur
};

function professeurReducer(state = professeurInitialState, action) {
  switch (action.type) {
    case 'CREATE_PROFESSEUR_REQUEST':
      return { ...state, loading: true, success: false, error: null };
    case 'CREATE_PROFESSEUR_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload, // Stocker les données du professeur ici
      };
    case 'CREATE_PROFESSEUR_FAILURE':
      return { ...state, loading: false, success: false, error: action.error };
    default:
      return state;
  }
}



// Combine tous les reducers
const rootReducer = combineReducers({
  auth: authReducer,
  grades: gradesReducer,
  departements: departementReducer,
  laboratoires: laboReducer,
  equipes: equipeReducer,
  professeur: professeurReducer,
});

// Crée le store Redux
const store = createStore(rootReducer, applyMiddleware(thunk));

// ✅ Export du store
export default store;
