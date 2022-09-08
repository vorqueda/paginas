import { useEffect, useState } from "react";
import { getOficinas } from "../../firebase/apiOficinas";
import { OficinaCard } from "./OficinaCard";

export const OficinasList = () => {
  const [oficinas, setOficinas] = useState([]);

  const getLinks = async () => {
    const querySnapshot = await getOficinas();
//     onGetLinks((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setOficinas(docs);
//     });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      {oficinas.map((link) => (
        <div className="col-md-4" key={link.id}>
          <OficinaCard link={link} />
        </div>
      ))}
    </>
  );
};
