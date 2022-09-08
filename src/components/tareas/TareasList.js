import { useEffect, useState } from "react";
import { getTareas } from "../../firebase/apiTareas";
import { TareaCard } from "./TareaCard";
import { useParams } from "react-router-dom";

export const TareasList = () => {
  const params = useParams();
 
  const [tareas, setTareas] = useState([]);

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

  return (
    <>
      {tareas.map((tarea) => (
        <div className="col-md-4" key={tarea.id}>
          <TareaCard tarea={tarea} />
        </div>
      ))}
    </>
  );
};
