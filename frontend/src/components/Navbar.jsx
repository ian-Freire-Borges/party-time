import { useState, useEffect} from "react";
import {NavLink,useLocation } from "react-router-dom";
import "./Navbar.css"


const Navbar = ({ setSearchParty }) => {
  const location = useLocation();

 const showSearch = location.pathname === "/";
  const [input, setInput] = useState("");
    
  useEffect(() => {
 setSearchParty(input)

}, [input]); 

  useEffect(() => {
    setInput("");
  }, [location.pathname]);
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar bg-dark border-bottom border-body"data-bs-theme="dark">
  <div className="container-fluid">
    <a id="navtitle" className="navbar-brand fs-3 text-purple fw-bold ">Party Time !</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <NavLink id="nav" className="nav-link active" aria-current="page"  to="/">Minhas Festas</NavLink>
        </li>
        <li className="nav-item">
          <NavLink id="nav" className="nav-link active" aria-current="page"  to="/party/new">Criar Festas</NavLink>
        </li>
      </ul>
      {showSearch && (
      <form className="d-flex" role="search" type="search" >
        <input className="form-control me-2" type="search" placeholder="Nome da Festa" aria-label="Search"   value={input} onChange={(e) => setInput(e.target.value)} />
        <button id="btn" className="btn " type="submit" onClick={()=>setInput("")}>Limpar</button>
      </form>
          )}
    </div>
  </div>
</nav>
        
    )
}

export default Navbar