import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveTarea, getTarea, updateTarea, getOficinas, getOficina } from "../../firebase/apiTareas";
import { useParams, useNavigate } from "react-router-dom";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialState = {
  ta_oficina: "",
  ta_nombre: "",
  ta_fecha: "",
  ta_descripcion: "",
  oficina:""
};
export const TareaForm = (props) => {

 const [tarea, setTarea] = useState(initialState);
  const params = useParams();
  const navigate = useNavigate();

  const handleInputChange = ({ target: { name, value } }) =>
    setTarea({ ...tarea, [name]: value });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(tarea);

//    if (!validURL(usuario.name))
//      return toast("invalid name", { type: "warning", autoClose: 1000 });

    if (!params.id) {
      await saveTarea(tarea);
      toast("New Link Added", {
        type: "success",
      });
    } else {
      await updateTarea(params.id, tarea);
      toast("Updated", {
        type: "success",
      });
    }

    // Clean Form
    setTarea(initialState);
    navigate("/pagina3/tarealist");
  };

  const getLinkById = async (id) => {
    try {
      const doc = await getTarea(id);
      setTarea({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getLinkById(params.id);
    }
  }, [params.id]);
  /*--------------------  oficinas -------------------------------*/
  const [oficinas, setOficinas] = useState([]);
  const getListOficinas = async () => {
      const querySnapshot = await getOficinas();
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setOficinas(docs);
  };
  useEffect(() => {
    getListOficinas();
  }, []);
  let tareita = "";
  oficinas.map((lin) => {
    if(lin.id===tarea.ta_oficina){
    tareita =lin.of_nombre;
}});
/*--------------------------- fin oficinas ------------------------*/

    const handleSelectChange = (e) => {
        console.log(e.value);
        setTarea({ ...tarea, ta_oficina: e.value });
        console.log(tarea);

      }

      const [startDate, setStartDate] = useState(new Date());
      const f = (fec)=>{
        setStartDate(fec);
        setTarea({ ...tarea, ta_fecha: fec.toDateString()});
        }; 

    return (
    <div className="col-md-4 offset-md-4">
    
      <form onSubmit={handleSubmit} className="card card-body bg-secondary">
        <label  htmlFor="name">Nombre de Oficina:  </label>
        <a style={{color: "red", font_size: "150px"}}>{tareita }</a>
        <div  style={{color: "black"}}>
        <Select onChange= {handleSelectChange} 
          options = {oficinas.map(oficina => ({value: oficina.id, label: oficina.of_nombre}))}
        />    
        </div>

        <label htmlFor="email">Fecha de Tarea:</label>
        <a style={{color: "red", font_size: "150px"}}>{tarea.ta_fecha }</a>
        <div className="input-group">
        <DatePicker selected={startDate} onChange={(date) =>
          f(date)}
        />
        </div>

        <label htmlFor="description">Descripcion de la Tarea</label>
        <div className="input-group">
        <input
            type="text"
            value={tarea.ta_descripcion}
            name="ta_descripcion"
            placeholder="Descripcion de tarea"
            className="form-control mb-3"
            onChange={handleInputChange}
          />
        </div>
        <button
          className="btn btn-primary btn-block"
          disabled={!tarea.ta_oficina || !tarea.ta_descripcion}
        >
          {props.currentId === "" ? "Save" : "Update"}
        </button>
      </form>
    </div>
  );
};
