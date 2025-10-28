import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Particle from './components/particle';
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Footer from './components/Footer';
import { useState} from "react";

function App() {
  const [searchParty, setSearchParty] = useState("");
  
  return (
    <div>
      <Particle style={{ zIndex: -1, position: "fixed", top: 0, left: 0 }} />
      <div id="MainContent">
        <ToastContainer/>
        <Navbar setSearchParty={setSearchParty}/>
        <Outlet context={{ searchParty }} />
          <div className="mt-auto">
        <Footer/>
        </div>
      </div>
    </div>
  );
}


export default App;

