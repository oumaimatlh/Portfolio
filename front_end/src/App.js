import { Routes, Route } from "react-router-dom";
import Search from "./Home/search";
import LoginProfesseurs from "./Portfolio/Prof/loginprofesseur";
import Complete_profil from "./Portfolio/Prof/completeport";


function App() {
  return (
    <Routes>
        {/*Page d'acceuil :*/}
        <Route path='/' element={<Search/>}/>

        {/*Routes Professeurs :*/}
        <Route path="/login/Professeur" element={<LoginProfesseurs />} />
        <Route path="/professeur/completer-profil" element={<Complete_profil />} />


        {/*Routes Administrateurs :*/}

        {/*Routes Utilisateurs :*/}

    </Routes>
  );
}

export default App;
