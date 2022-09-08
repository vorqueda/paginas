//import { deleteTarea } from "../../firebase/apiTareas";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOficina } from "../../firebase/apiOficinas";
import { useParams } from "react-router-dom";
const initialState = {
  of_nombre: "",
};

/*--------------------------------------------------*/
export function TareaCard({ tarea }) {
/*--------------------------------------------------*/

const params = useParams();
const navigate = useNavigate();
const getOfById = async (id) => {
  try {
    const doc = await getOficina(tarea.ta_oficina);

    setOficina({...doc.data() });
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  if (tarea.ta_oficina) {
    getOfById(tarea.ta_oficina);
  }
}, [params.id]);

/*------------------------
  const navigate = useNavigate();

  const onDeleteLink = async (id) => {
    if (window.confirm("Esta seguro que quiere borrar esta instancia?")) {
      await deleteTarea(id);
      toast("Instancia borrada exitosamente", {
        type: "error",
        autoClose: 2000,
      });
      navigate("/pagina4");
    }
  };
*/
/*----------------------- oficina ---------------*/
const [oficina, setOficina] = useState([]);
const getOficinaById = async (id) => {
    const doca = await getOficina(id);
    setOficina(doca.data());
  }; 
useEffect(() => {
    getOficinaById(tarea.ta_oficina);
  }
);
/*--------------------------fin tarea -------------*/
  return (
    <div
      className="card mb-3 card-website"
      key={tarea.id}
      onClick={() => navigate(`../../pagina4/instanciaslist/${tarea.id}`)}
    >
    <ul className="list-group-flush">
      <li className="list-group-item">{oficina.of_nombre} - </li>
      <li className="list-group-item">{tarea.ta_descripcion} - </li>
      <li className="list-group-item">{tarea.ta_fecha}</li>
    </ul>

    </div>
  );
}
