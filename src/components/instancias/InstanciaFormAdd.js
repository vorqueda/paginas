import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveInstancias, getInstancias, updateInstancias, getUsers } from "../../firebase/apiInstancias";
import { useParams, useNavigate } from "react-router-dom";
import Select from 'react-select';

// valor inicial de los campos de registro
const initialState = {
  user: "",
  fecha: "",
  coment: "",
  id: ""
};
// fin valor inicial

export const InstanciaFormAdd = (props) => {
  const [instanciak, setInstanciaK] = useState(initialState);
  const params = useParams();
  const navigate = useNavigate();

// setea campos
  const handleInputChange = ({ target: { name, value } }) =>
    setInstanciaK({ ...instanciak, [name]: value });
// fin setea campos

// valida campo
  const validURL = (str) => {
    var pattern = new RegExp(
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(str);
  };
// fin valida campo

// graba nueva instancia 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!params.instanciaid) {
      alert(params.tareaid,instanciak);
      await saveInstancias(params.tareaid, instanciak);
      toast("New Link Added", {
        type: "success",
      });
    }    
// sale de grabar
// Clean Form
    setInstanciaK(initialState);
    navigate("/pagina4/instancialist");
  };
// fin graba nueva instancia

// leo la instancia de la tarea  (params.id), params.instanciaid
  const getInstanciaById = async () => {
    const  querySnapshot = await getInstancias(params.tareaid);
    const instanciak = [];
    querySnapshot.forEach((doc) =>  {
      if(doc.id===params.instanciaid) {
        instanciak.push({ ...doc.data()});
      }
    });
    setInstanciaK(instanciak);
};

useEffect(() => {
    if (params.tareaid) {
      getInstanciaById(params.tareaid);
    }
  }, [params.tareaid]);
// fin leo las instancias de la tarea

// leo todas los usuarios
  const [users, setUsers] = useState([]);
  const getUsersList = async () => {
    const querySnapshot = await getUsers();
    const docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
    });
    setUsers(docs);
  };
  useEffect(() => {
    getUsersList();
  }, []);
// fin leo usuarios

// setea usuario
const [user, setUser] = useState([]);
const handleSelectChangeUser = (e) => {
        setUser({ ...user, name: e.value });
  }
// fin seteo oficina

// inicio del dom
  return (
    <div className="col-md-4 offset-md-4">
        <h3>Instancia: {params.id}</h3>
      <form onSubmit={handleSubmit} className="card card-body bg-secondary">
        <label htmlFor="name">Usuario</label>
        <div  style={{color: "black"}}>
        <Select onChange= {handleSelectChangeUser} 
          options = {users.map(user => ({value: user.id, label: user.name}))}
        />    
        </div>

        <label htmlFor="fecha">Fecha</label>
        <div className="input-group">
          <input
            type="text"
            value={instanciak.fecha}
            name="fecha"
            placeholder="Fecha"
            className="form-control mb-3"
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="coment">Comentario</label>
        <div className="input-group">
        <input
            type="text"
            value= {instanciak.coment}
            name="coment"
            placeholder="Comentario"
            className="form-control mb-3"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};
