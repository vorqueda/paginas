import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveUsuario, getUsuario, updateUsuario } from "../../firebase/apiUsuarios";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  name: "",
  phone: "",
};
export const UsuarioForm = (props) => {
  const [usuario, setUsuario] = useState(initialState);
  const params = useParams();
  const navigate = useNavigate();

  const handleInputChange = ({ target: { name, value } }) =>
    setUsuario({ ...usuario, [name]: value });

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
      await saveUsuario(usuario);
      toast("New Link Added", {
        type: "success",
      });
    } else {
      await updateUsuario(params.id, usuario);
      toast("Updated", {
        type: "success",
      });
    }

    // Clean Form
    setUsuario(initialState);
    navigate("/pagina1/pagina1/usuarioslist");
  };

  const getLinkById = async (id) => {
    try {
      const doca = await getUsuario(id);
      setUsuario({ ...doca.data() });

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
        <label htmlFor="name">Nombre de Usuario</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Juan Perez"
            value={usuario.name}
            name="name"
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="email">Email de Usuario</label>
        <div className="input-group">
          <input
            type="text"
            value={usuario.email}
            name="email"
            placeholder="Usuario email"
            className="form-control mb-3"
            onChange={handleInputChange}
          />
        </div>

        <label htmlFor="description">Telefono de Usuario</label>
        <div className="input-group">
        <input
            type="text"
            value={usuario.phone}
            name="phone"
            placeholder="Usuario Telefono"
            className="form-control mb-3"
            onChange={handleInputChange}
          />
        </div>
        <button
          className="btn btn-primary btn-block"
          disabled={!usuario.name || !usuario.email}
        >
          {props.currentId === "" ? "Save" : "Update"}
        </button>
      </form>
    </div>
  );
};
