import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveOficina, getOficina, updateOficina } from "../../firebase/apiOficinas";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  of_nombre: "",
  of_calle: "",
  of_nro: "",
  of_piso: "",
  of_lugar: "",
};
export const OficinaForm = (props) => {
  const [oficina, setOficina] = useState(initialState);
  const params = useParams();
  const navigate = useNavigate();

  const handleInputChange = ({ target: { name, value } }) =>
    setOficina({ ...oficina, [name]: value });

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

//    if (!validURL(usuario.name))
//      return toast("invalid name", { type: "warning", autoClose: 1000 });

    if (!params.id) {
      await saveOficina(oficina)
      toast("New Link Added", {
        type: "success",
      });
    } else {
      await updateOficina(params.id, oficina);
      toast("Updated", {
        type: "success",
      });
    }

    // Clean Form
    setOficina(initialState);
    navigate("/pagina2/oficinalist");
  };

  const getLinkById = async (id) => {
    try {
      const doc = await getOficina(id);
      setOficina({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (params.id) {
      getLinkById(params.id);
    }
  }, [params.id]);

  return (
    <div className="col-md-4 offset-md-4">
      <form onSubmit={handleSubmit} className="card card-body bg-secondary">
        <label htmlFor="name">Nombre de Oficina</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Personal"
            value={oficina.of_nombre}
            name="of_nombre"
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="of_calle">Calle de Oficina</label>
        <div className="input-group">
          <input
            type="text"
            value={oficina.of_calle}
            name="of_calle"
            placeholder="Oficina calle"
            className="form-control mb-3"
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="of_nro">Nro de Oficina</label>
        <div className="input-group">
        <input
            type="text"
            value={oficina.of_nro}
            name="of_nro"
            placeholder="Oficina Nro"
            className="form-control mb-3"
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="of_nro">Piso de Oficina</label>
        <div className="input-group">
        <input
            type="text"
            value={oficina.of_piso}
            name="of_piso"
            placeholder="Oficina Piso"
            className="form-control mb-3"
            onChange={handleInputChange}
          />
        </div>


        <label htmlFor="of_nro">Lugar de Oficina</label>
        <div className="input-group">
        <input
            type="text"
            value={oficina.of_lugar}
            name="of_lugar"
            placeholder="Oficina Lugar"
            className="form-control mb-3"
            onChange={handleInputChange}
          />
        </div>

        <button
          className="btn btn-primary btn-block"
          disabled={!oficina.of_nombre || !oficina.of_calle}
        >
          {props.currentId === "" ? "Save" : "Update"}
        </button>
      </form>
    </div>
  );
};
