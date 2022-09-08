import { Link } from "react-router-dom";
import LayoutPagina1 from "../layouts/LayoutPagina1";
import "./nav.css";

function Pagina1() {
    return (
    <div>
        <center><h1>Usuarios
            </h1></center>
        <div>
        <nav>
        <ul>
        <li><Link to="pagina1/usuarioslist">
            Listado 
        </Link>
        </li>
        <li>        
        <Link to="add">
            Nuevo 
        </Link>
        </li>
        </ul>
        </nav>
        <LayoutPagina1 />
        </div>
    </div>
    )
}
export default Pagina1;
