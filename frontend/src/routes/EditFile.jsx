import React from "react";
import partyFecth from "../axios/config";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/useToast";
import "./EditAndCreate.css";

const EditFile = () => {
  const [party, setParty] = useState(null);
  const [services, setServices] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFecth.get("/services");

      setServices(res.data);

      loadParty();
    };

    const loadParty = async () => {
      const res = await partyFecth.get(`/parties/${id}`);

      setParty(res.data);
    };

    loadServices();
  }, []);
  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredService = services.filter((s) => s._id === value);

    let partyServices = party.services;

    if (checked) {
      partyServices = [...partyServices, filteredService[0]];
    } else {
      partyServices = partyServices.filter((s) => s._id !== value);
    }
    setParty({ ...party, services: partyServices });
  };

  const updateParty = async (e) => {
    e.preventDefault();

    try {
      const res = await partyFecth.put(`/parties/${party._id}`, party);
      if (res.status === 200) {
         useToast(res.data.msg);
        navigate(`/party/${id}`);
      }
    } catch (error) {
     useToast(error.response.data.msg,"error");
    }
  };

  if (!party) return <p>Caregando...</p>;
  return (
    <div className="container d-flex justify-content-center align-items-center ">
      <div className="w-75 text-center border border-secondary bg-light p-4 rounded mt-5 mb-5">
        <div className="my-3 pb-1">
          <h2 className="mb-3">Editando: {partyFecth.title}</h2>
          <p className="mb-4 d-inline-block border-bottom border-2 border-dark ">
            Ajustes as informações da sua festa
          </p>
        </div>
        <form onSubmit={(e) => updateParty(e)} className="row g-3 text-start">
          <div className="col-md-6">
            <label className="form-label">Nome da festa</label>
            <input
              className="form-control"
              type="text"
              placeholder="Seja criativo..."
              required
              onChange={(e) => setParty({ ...party, title: e.target.value })}
              value={party.title}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Anfitrião</label>
            <input
              className="form-control"
              type="text"
              placeholder="Quem está dando a festa"
              required
              onChange={(e) => setParty({ ...party, author: e.target.value })}
              value={party.author}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Descrição</label>
            <textarea
              className="form-control"
              placeholder="Conte mais sobre a festa..."
              required
              onChange={(e) =>
                setParty({ ...party, description: e.target.value })
              }
              value={party.description}
            ></textarea>
          </div>
          <div className="col-md-6">
            <label className="form-label">Orçamento</label>
            <input
              className="form-control"
              type="number"
              placeholder="Quanto você pretende investir?"
              required
              onChange={(e) => setParty({ ...party, budget: e.target.value })}
              value={party.budget}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Imagem</label>
            <input
              className="form-control"
              type="text"
              placeholder="Insira uma URL de uma imagem"
              required
              onChange={(e) => setParty({ ...party, image: e.target.value })}
              value={party.image}
            />
          </div>
          <div className="col-12 text-center mt-4">
            <div className="text-center my-4">
              <h2 className="d-inline-block border-bottom border-2 border-dark pb-1 mb-3">
                Escolha os serviços
              </h2>
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Ver serviços
                </button>

                <ul
                  className="dropdown-menu p-3  dropdown-menu-end shadow bg-light"
                  style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    width: "350px",
                  }}
                >
                  {services.length === 0 && (
                    <p className="m-0">Carregando...</p>
                  )}

                  {services.length > 0 &&
                    services.map((service) => (
                      <li key={service._id} className="mb-3 border-bottom pb-2">
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={service.image}
                            alt={service.name}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "contain",
                            }}
                          />
                          <div className="text-start ">
                            <p className="mb-1 fw-bold">{service.name}</p>
                            <p className="mb-1 text-muted">
                              R$ {service.price}
                            </p>
                            <div className="form-check-dark form-check-lg">
                              <input
                                type="checkbox"
                                id={`service-${service._id}`}
                                value={service._id}
                                onChange={(e) => handleServices(e)}
                                checked={
                                  party.services.find(
                                    (partyservice) =>
                                      partyservice._id === service._id
                                  ) || ""
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`service-${service._id}`}
                              >
                                Solicitar
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 text-center">
            <button
              id="btn"
              type="submit"
              className="btn btn-success  px-4 py-2 mt-3"
            >
              Editar Festa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFile;
