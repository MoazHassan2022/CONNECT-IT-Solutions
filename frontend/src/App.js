import './App.css';
import CustomerMainPage from './pages/Customermain/CustomerMainPage';
import Signinup from './pages/Signinup/signinup';
import {  Route, Routes } from "react-router-dom";


function App() {
  return (
      <Routes>
        <Route path="/" element={ <CustomerMainPage /> } />
        <Route path="/login" element={ <Signinup /> } />
      </Routes>
  );
}

export default App;