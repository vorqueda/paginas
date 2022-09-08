import { useEffect, useState } from "react";
import { getTareas } from "../../firebase/apiTareas";
import { TareaCard } from "./TareaCard";
import { useParams } from "react-router-dom";

export const TareasList = () => {
  const params = useParams();
 
  const [tareas, setTareas] = useState([]);
  const initial = {
    of_nombre: "",
    };

    
  const [oficina, setOficina] = useState(initial);
 
  const getLinks = async () => {
    const querySnapshot = await getTareas();
//     onGetLinks((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) =>  {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setTareas(docs);    
  };

  useEffect(() => {
    getLinks();
  }, []);


//     });


  return (
    <>
      {tareas.map((link) => (
        <div className="col-md-4" key={link.id}>
          <TareaCard tarea={link} />
        </div>
      ))}
    </>
  );
};
