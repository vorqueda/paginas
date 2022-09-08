import { deleteUsuario } from "../../firebase/apiUsuarios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function UsuarioCard({ link }) {
  const navigate = useNavigate();

  const onDeleteLink = async (id) => {
    if (window.confirm("are you sure you want to delete this link?")) {
      await deleteUsuario(id);
      toast("Link Removed Successfully", {
        type: "error",
        autoClose: 2000,
      });
      navigate("/pagina1");
    }
  };

  return (
    <div
      className="card mb-3 card-website"
      key={link.id}
      onClick={() => navigate(`../../pagina1/edit/${link.id}`)}
    >
    <ul className="list-group-flush">
      <li className="list-group-item">{link.name}</li>
      <li className="list-group-item">{link.email}</li>
      <li className="list-group-item">{link.phone}</li>
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
