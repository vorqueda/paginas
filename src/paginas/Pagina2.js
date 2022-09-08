import { Link } from "react-router-dom";
import LayoutPagina2 from "../layouts/LayoutPagina2";
import "./nav.css";

function Pagina2() {
    return (
    <div>
        <center><h1>Oficinas
            </h1></center>
        <div>
        <nav>
        <ul>
        <li><Link to="pagina2/oficinaslist">
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
        <LayoutPagina2 />
        </div>
    </div>
    )
}
export default Pagina2;
