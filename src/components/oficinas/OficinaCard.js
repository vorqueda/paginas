import { deleteOficina } from "../../firebase/apiOficinas";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function OficinaCard({ link }) {
  const navigate = useNavigate();

  const onDeleteLink = async (id) => {
    if (window.confirm("Esta Seguro que quiere borrar la oficina?")) {
      await deleteOficina(id);
      toast("Oficina borrada exitosamente", {
        type: "error",
        autoClose: 2000,
      });
      navigate("/pagina2");
    }
  };

  return (
    <div
      className="card mb-3 card-website"
      key={link.id}
      onClick={() => navigate(`../../pagina2/edit/${link.id}`)}
    >
      <ul className="list-group-flush">        
        <li className="list-group-item">{link.of_nombre} - </li>
        <li className="list-group-item">{link.of_calle} - </li>
        <li className="list-group-item">{link.of_nro} - </li>
        <li className="list-group-item">{link.of_piso} - </li>
        <li className="list-group-item">{link.of_lugar}</li>
      </ul>
        <button
          className="btn btn-danger btn-sm d-flex align-items-center"
          onClick={(e) => {
          e.stopPropagation();
          onDeleteLink(link.id);
          }}
        >
        <i className="material-icons">Borrar</i>
        </button>
    </div>
  );
}
