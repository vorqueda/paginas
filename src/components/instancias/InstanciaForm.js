import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Select from 'react-select';
import { saveInstancia, getInstancia, updateInstancia } from "../../firebase/apiInstancias";
import { getUsuarios } from "../../firebase/apiUsuarios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// valor inicial de la instancia
const initialState = {
  user: "",
  fecha: "",
  coment: "",
};
// fin valor inicial

export const InstanciaForm = (props) => {

  const [instancia, setInstancia] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

// pregunto si es nuevo o update
useEffect(() => {
  if (params.instanciaid) {
    getInstanciaById(params.tareaid, params.instanciaid);
  }
}, []);

// leo la instancia si es update  
const getInstanciaById = async (tareaid, instanciaid) => {
  const doca = await getInstancia(tareaid, instanciaid);
  doca.forEach((doc) => {
    if (doc.id===instanciaid){
      setInstancia(doc.data());
    }
  });
};

// leo usuarios
const [usuarios, setUsuarios] = useState([]);
const getUsersList = async () => {
  const querySnapshot = await getUsuarios();
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

// leo usuario si es update
let usuario = ""
usuarios.forEach((user) => {
  if(user.value === instancia.user) {
    usuario = user.label;
  }
});

// controlo los cambios de los campos
const handleInputChange = ({ target: { name, value } }) =>
  setInstancia({ ...instancia, [name]: value });

// setea fecha
const [startDate, setStartDate] = useState(new Date());
const fech = (fec)=>{
  setStartDate(fec);
  setInstancia({ ...instancia, fecha: fec.toDateString()});
  };

// cambio de fecha

const handleSelectChangeFecha = (e) => {
  setInstancia({ ...instancia, fecha: e.value });
};

// graba nueva instancia o update la instancia
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!params.instanciaid) {
    saveInstancia(params.tareaid);
    toast("Nueva Instancia Agregada", {
      type: "success",
    });
  } else {
       updateInstancia(params.tareaid, params.instanciaid, instancia);
        toast("Updated", {
        type: "success",
      });
  }
  setInstancia(initialState);
  navigate("/pagina4/instancialist");
};

// inicio del dom
  return (
    <div className="col-md-4 offset-md-4">
      <h3>Instancia: {params.instanciaid}</h3>
      <form onSubmit={handleSubmit} className="card card-body bg-secondary">
        <label htmlFor="name">Usuario {usuario}</label>
        <div  style={{color: "black"}}>
        <Select onChange= {handleSelectChangeFecha} 
          options = {usuarios.map(usuario => ({value: usuario.id, label: usuario.name}))}
        />     
        </div>

        <label htmlFor="fecha">Fecha {instancia.fecha}</label>
        <div className="input-group">
        <DatePicker selected={startDate} onChange={(date) =>
        fech(date)}
          />
        </div>

        <label htmlFor="coment">Comentario</label>
        <div className="input-group">
        <input
            type="text"
            value={instancia.coment}
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
