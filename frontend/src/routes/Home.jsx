import partyFecth from "../axios/config";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./Home.css"


const Home = () => {
  const { searchParty } = useOutletContext();
  const [parties, setParties] =
   useState(null);
  const [filteredParties, setFilteredParties] = useState(null);

  useEffect(() => {
    const loadParties = async () => {
      const res = await partyFecth.get("/parties");

      console.log(res);

       setFilteredParties(res.data);
      setParties(res.data);
    };
    loadParties();
  }, []);

  useEffect(() => {
  if (!searchParty) {
    setFilteredParties(parties);
  } else {
    const filtered = parties.filter(p => {
      const titleLower = p.title.toLowerCase();
      const searchLower = searchParty.toLowerCase();
      for (let i = 0; i < searchLower.length; i++) {
        if (titleLower[i] !== searchLower[i]) {
          return false;
        }
      }
      return true;
    });
    setFilteredParties(filtered);
  }
}, [searchParty, parties]);

  if (!parties) {
    return <p>Caregando...</p>;
  }

  return (
    <div id="container "className="container w-75 text-centerrounded mt-5 mb-5">
      <div id="title">
      <h2>Suas Festas</h2>
      </div>
      <div className="row">
        {parties.lenght === 0 && <p>Não a festas cadastradas</p>}
        {filteredParties.map((party) => (
          <div key={party._id} className=" col-12 col-md-4 col-lg-3 mb-4">
             <div id="card-custom"className="card border border-dark ">
            {" "}
            <img
              src={party.image}
              className="card-img-top"
              style={{ maxHeight: "200px", objectFit: "cover" }}
              alt={party.title}
            />{" "}
            <div id="card-txt" className="card-body">
              {" "}
              <h5 className="card-title">{party.title}</h5>{" "}
              <p className="card-text">
                {party.description}
              </p>{" "}
              </div>
              <div id="card-btn" className="d-flex justify-content-center align-items-center">
              <Link to={`party/${party._id}`}className="btn btn-primary " id="link">
                Para a festa
              </Link> 
              </div>       
            </div>{" "}
          </div>
        ))}{" "}
      </div>
    </div>
  );
};

export default Home;
