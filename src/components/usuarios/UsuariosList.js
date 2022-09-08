import { useEffect, useState } from "react";
import { getUsuarios } from "../../firebase/apiUsuarios";
import { UsuarioCard } from "./UsuarioCard";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const UsuariosList = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [usuarios, setUsuarios] = useState([]);

  const getLinks = async () => {
    const querySnapshot = await getUsuarios();
//     onGetLinks((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setUsuarios(docs);
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      {usuarios.map((link) => (
        <div className="col-md-4" key={link.id}>
          <UsuarioCard link={link} />
        </div>
      ))}
    </>
  );
};
