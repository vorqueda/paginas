import { Link } from "react-router-dom";
import LayoutPagina4 from "../layouts/LayoutPagina4";
import "./nav.css";

function Pagina4() {
    return (
    <div>
        <center><h1>Instancias
            </h1></center>
        <div>
        <nav>
        <ul>
        <li><Link to="pagina4/tareaslist">
            Listado de Tareas
        </Link>
        </li>
        </ul>
        </nav>
        <LayoutPagina4 />
        </div>
    </div>
    )
}


export default Pagina4;