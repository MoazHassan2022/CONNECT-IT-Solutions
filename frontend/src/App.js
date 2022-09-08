import './App.css';
import CustomerMainPage from './pages/Customermain/CustomerMainPage';
import Signinup from './pages/Signinup/signinup';
import { BrowserRouter, Route, Routes, Switch, useHistory, useLocation } from "react-router-dom";
import { createContext, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';


function App() {


  return (
      <Routes>
        <Route path="/" element={ <CustomerMainPage /> } />
        <Route path="/login" element={ <Signinup /> } />
      </Routes>
  );
}

export default App;
