import { useEffect, useState } from "react";
import { getInstancias } from "../../firebase/apiInstancias";
import { InstanciaCard } from "./InstanciaCard";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getTarea } from "../../firebase/apiTareas";
import { getOficina } from "../../firebase/apiOficinas";

export const InstanciasList = (props) => {
  const navigate = useNavigate();
  const params = useParams();
/*------------------ list instancias ----------------------*/
const [instancias, setInstancias] = useState([]);
  const getInstancialist = async (id) => {
    const querySnapshot = await  getInstancias(id);
    const docas = [];
    querySnapshot.forEach((doc) =>  {
      docas.push({ ...doc.data(), id: doc.id, tarea: params.id});
    });
    setInstancias(docas);
  };
  useEffect(() => {
    if (params.id) {
      getInstancialist(params.id);
    }
  }, []);
/*----------------------fin  listo instancia ------*/     
/*----------------------- tarea ---------------*/
const [tarea, setTarea] = useState([]);
const getTareaById = async (id) => {
  const doc = await getTarea(id);
  setTarea(doc.data());
};
useEffect(() => {
    getTareaById(params.id);
  }
);
/*--------------------------fin tarea -------------*/
/*----------------------- oficina ---------------------*/
const [oficina, setOficina] = useState([]);
const getOficinaById = async (id) => {
  const doc = await getOficina(id);
  setOficina(doc.data());
};
useEffect(() => {
    getOficinaById(tarea.ta_oficina);
  }
);
/*--------------------------fin tarea -------------*/
    

return (
    <>
        <h2>Instancias de la tarea:, {oficina.of_nombre}, {tarea.ta_descripcion} </h2>

        <h3>
        <button type="button" className="btn btn-success" onClick={() => navigate(`../../pagina4/add/${params.id}`)}>
          Nuevo</button>
        </h3>    
        
      {instancias.map((instancia) => (
        <div className="col-md-4" key={instancia.id}>      
          <InstanciaCard instancia={instancia} />
        </div>
      ))}
      <p>fin</p>
    </>
  );

};
/*

*/