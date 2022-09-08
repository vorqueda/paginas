import { Link } from "react-router-dom";
import LayoutPagina3 from "../layouts/LayoutPagina3";
import "./nav.css";

function Pagina3() {
    return (
    <div>
        <center><h1>Tareas
            </h1></center>
        <div>
        <nav>
        <ul>
        <li><Link to="pagina3/tareaslist">
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
        <LayoutPagina3 />
        </div>
    </div>
    )
}
export default Pagina3;
