import { Routes, Route } from "react-router-dom";
import FormulaireProfil from "./Portfolio/Prof/FormulaireProfil";
import PortfolioProf from "./Portfolio/Prof/PortfolioProf";
import Accueil from "./Portfolio/Admin/Accueil"

import Grade from "./Portfolio/Admin/Dashboard/Grade";
import Departement from "./Portfolio/Admin/Dashboard/Departement";
import Laboratoire from "./Portfolio/Admin/Dashboard/Laboratoire";
import Equipe from "./Portfolio/Admin/Dashboard/Equipe";
import LoginAdministrateur from "./Portfolio/Admin/LoginAdministrateur";
import AdminCreateProfesseur from "./Portfolio/Admin/Dashboard/CreateProf";
import LoginProfesseurs from "./Portfolio/Prof/LoginProfesseur";
import LogoAnimation from "./Home/jj";
import ResponsiveSearch from "./Home/Search";

function App() {
  return (
    <Routes>
      <Route path="/Portfolio/Admin/Login" element={<LoginAdministrateur />} />

      <Route path='/' element={<ResponsiveSearch/>} />
      
      <Route path="/Accueil" element={<Accueil />} />
      <Route path="/admin/Dashboard/Grade" element={<Grade />} />
      <Route path="/admin/Dashboard/Laboratoire" element={<Laboratoire />} />
      <Route path="/admin/Dashboard/Equipe" element={<Equipe />} />
      <Route path="/admin/Dashboard/Departement" element={<Departement />} />

      <Route path="/login/Professeur" element={<LoginProfesseurs />} />
      <Route path="/profil" element={<FormulaireProfil />} />
      <Route path="/portfolio" element={<PortfolioProf />} />
      <Route path='/LogoAnimation' element={<LogoAnimation />} />
    </Routes>
  );
}

export default App;
