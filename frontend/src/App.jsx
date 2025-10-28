import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Particle from './components/particle';
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Footer from './components/Footer';
import { useState,useEffect} from "react";

function App() {
  const [searchParty, setSearchParty] = useState("");
  
    useEffect(() => {
    const handleTouchMove = (e) => {
      if (document.body.scrollHeight <= window.innerHeight) {
        e.preventDefault(); // bloqueia bounce
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
  
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

