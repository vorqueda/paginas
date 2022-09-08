import { deleteTarea, getOficina } from "../../firebase/apiTareas";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const initialState = {
  of_nombre: "",
};

/*--------------------------------------------------*/
export function TareaCard({ tarea }) {
/*--------------------------------------------------*/
const [oficina, setOficina] = useState(initialState);
const params = useParams();
const getOfById = async (id) => {
  try {
    const doc = await getOficina(tarea.ta_oficina);

    setOficina({...doc.data() });
//console.log(tarea.ta_oficina);
console.log(oficina.of_nombre);
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  if (tarea.ta_oficina) {
    getOfById(tarea.ta_oficina);
  }
}, [params.id]);

/*------------------------*/  
  const navigate = useNavigate();

  const onDeleteLink = async (id) => {
    if (window.confirm("Esta Seguro que quiere boorar la tarea?")) {
      await deleteTarea(id);
      toast("Tarea borrada exitosamente", {
        type: "error",
        autoClose: 2000,
      });
      navigate("/pagina3");
    }
  };

  return (
    <div
      className="card mb-3 card-website"
      key={tarea.id}
      onClick={() => navigate(`../../pagina3/edit/${tarea.id}`)}
    >
    <ul className="list-group-flush">
      <li clasName="list-group-item">{oficina.of_nombre} - </li>
      <li className="list-group-item">{tarea.ta_fecha} - </li>
      <li className="list-group-item">{tarea.ta_descripcion}</li>
    </ul>
    <button
      className="btn btn-danger btn-sm d-flex align-items-center"
      onClick={(e) => {
        e.stopPropagation();
        onDeleteLink(tarea.id);
      }}
    >
    <i className="material-icons">Borrar</i>
    </button>
    </div>
  );
}
