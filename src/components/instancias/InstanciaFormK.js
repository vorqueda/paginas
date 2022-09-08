import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveInstancias, getInstancia, updateInstancias, getUsers } from "../../firebase/apiInstancias";
import { useParams, useNavigate } from "react-router-dom";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// valor inicial de los campos de registro
const initialState = {
  user: "",
  fecha:  "",
  coment: "",
};
// fin valor inicial

export const InstanciaFormK = (props) => {
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
//      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };
// fin valida campo

// graba update la instancia
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!params.instanciaid) {
       saveInstancias(params.tareaid, instanciak);
      toast("New Link Added", {
        type: "success",
      });
    } else {
       updateInstancias(params.tareaid, params.instanciaid, instanciak);
        toast("Updated", {
        type: "success",
      });
    }
// sale de grabar
    // Clean Form
    setInstanciaK(initialState);
    navigate("/pagina4/instancialist");
  };

  // leo la instancia de la tarea  (params.id), params.instanciaid
  const getInstanciaById = async (tareaid, instanciaid) => {
    const doca = await getInstancia(tareaid, instanciaid);
    doca.forEach((doc) => {
      if (doc.id===instanciaid){
      setInstanciaK(doc.data());
      }
    });
  };

useEffect(() => {
    if (params.tareaid) {
      getInstanciaById(params.tareaid, params.instanciaid);
    }
  }, [params.tareaid]);
// fin leo las instancias de la tarea
/*----------------------------------------  usuarios  ------------------------------*/
  const [usuarios, setUsuarios] = useState([]);
  const getUsersList = async () => {
    const querySnapshot = await getUsers();
    const docs = [];
    const usuarios = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
      usuarios.push({label: doc.data().name, value: doc.id});
  });
  setUsuarios(usuarios);
  };
  useEffect(() => {
    getUsersList();
  }, []);

  const handleSelectChangeUser = (e) => {
    setInstanciaK({ ...instanciak, user: e.value });
  };

  // muestro nombre del usuario d la instancia
  let u = ""
  usuarios.forEach((user) => {
    if(user.value === instanciak.user) {
    u = user.label;
  }
  });
/*----------------------------------------  fin usuarios   -----------------------*/

const [startDate, setStartDate] = useState(new Date());
const f = (fec)=>{
  setStartDate(fec);
  setInstanciaK({ ...instanciak, fecha: fec.toDateString()});
  }; 

// inicio del dom
  return (
    <div className="col-md-4 offset-md-4">
      <h3>Instancia: </h3>
      <form onSubmit={handleSubmit} className="card card-body bg-secondary">
        <label htmlFor="name">Usuario {u}</label>
        <div  style={{color: "black"}}>
        <Select onChange= {handleSelectChangeUser}
          value={instanciak.user}
//          options = {users.map(user => ({value: user.id, label: user.name}))} >
          options={usuarios}>
        </Select>              
        </div>

        <label htmlFor="fecha">Fecha {instanciak.fecha}</label>
        <div className="input-group">
        <DatePicker selected={startDate} onChange={(date) =>
        f(date)}
        />

        </div>

        <label htmlFor="coment">Comentario</label>
        <div className="input-group">
        <input
            type="text"
            value={instanciak.coment}
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
