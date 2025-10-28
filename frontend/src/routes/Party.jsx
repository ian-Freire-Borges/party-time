import partyFecth from "../axios/config"
import {useState, useEffect} from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import useToast from "../hooks/useToast"

const Party = () => {
    const {id} = useParams();

    const navigate = useNavigate();

    const [party, setParty] = useState(null)

   useEffect(()=>{
    const loadParty = async()=>{
        const res = await partyFecth.get(`/parties/${id}`)

        setParty(res.data)
    };

    loadParty();
   },[]);

   const handleDelete = async ()=>{
    const res = await partyFecth.delete(`/parties/${id}`)

    if(res.status === 200){
        navigate("/")
        useToast(res.data.msg);
    }
   }

   if(!party) return <p>Carregando...</p>

  return (

  <div className="container my-4 text-white">
    <h1 className="mb-3">{party.title}</h1>
    <div className="mb-3">
        <img src={party.image} className="img-fluid rounded w-50 mx-auto" alt={party.title} />
    </div>
    <div className="mb-3 d-flex gap-2">
        <Link to={`/party/edit/${party._id}`} className="btn btn-primary">Editar</Link>
        <button className="btn btn-danger" onClick={handleDelete}>Excluir</button>
    </div>
    <p className="mb-3">Orçamento: R${party.budget}</p>
    <h3 className="mb-3">Serviços contratados:</h3>
    <div className="row g-3">
        {party.services.map((services) => (
            <div key={services._id} className="col-6 col-md-4 col-lg-3 text-center">
                <img src={services.image} alt={services.name} className="img-fluid rounded mb-2" style={{height: '150px', objectFit: 'cover', width: '100%'}} />
                <p className="mb-0">{services.name}</p>
            </div>
        ))}
    </div>
</div>


  )
}

export default Party