import { deleteInstancia } from "../../firebase/apiInstancias";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getUsuario } from "../../firebase/apiUsuarios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function InstanciaCard({ instancia }) {
const params = useParams();
const navigate = useNavigate();
/*
useEffect(() => {
  console.log(params);
} 
*/
/*------------------------  delete ------------------------------*/

  const onDeleteLink = async (tareaid, instanciaid) => {
    if (window.confirm("Esta seguro que quiere borrar esta instancia?", {tareaid},{instanciaid})) {
      await deleteInstancia(tareaid, instanciaid);
      toast("Instancia borrada exitosamente", {
        type: "error",
        autoClose: 2000,
      });
      navigate("/pagina4");
    }
  };

//       onClick={() => navigate(`../../pagina4/edit/${instancia.tarea}/${instancia.id}`)}    >
/*----------------------- usuario ---------------*/
const [usuario, setUsuario] = useState([]);
const getUsuarioById = async (id) => {
    const doca = await getUsuario(id);
    setUsuario(doca.data());
  }; 
useEffect(() => {
    getUsuarioById(instancia.user);
  }
);
/*--------------------------fin usuario -------------*/

  return (
    <div 
      className="card mb-3 card-website"
      key={instancia.id}
      onClick={() => navigate(`../../pagina4/edit/${instancia.tarea}/${instancia.id}`)}    
    >
    <ul className="list-group-flush">
      <li className="list-group-item">Usuario: {usuario.name}</li>
      <li className="list-group-item">{instancia.fecha}</li>
      <li className="list-group-item">{instancia.coment}</li>
    </ul>
    <button
      className="btn btn-danger btn-sm d-flex align-items-center"
      onClick={(e) => {
        e.stopPropagation();
        onDeleteLink(instancia.tarea,instancia.id);
      }}
    >
    <i className="material-icons">Borrar</i>
    </button>
    </div>
  );
}
