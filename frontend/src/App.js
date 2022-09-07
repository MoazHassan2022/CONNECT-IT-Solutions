import './App.css';
import CustomerMainPage from './pages/Customermain/CustomerMainPage';
import Signinup from './pages/Signinup/signinup';
import { Route, Routes, Switch, useHistory, useLocation } from "react-router-dom";
import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
const AuthContext = createContext();

function App() {


  return (
    <>
      <Switch>

      <Route path="/" element={ 
        <ProtectedRoute>
          <CustomerMainPage />
        </ProtectedRoute>
      } />


      <Route path="/login" element={
          <Signinup />
      } />
            
      </Switch>
    </>
  );
}

export default App;
