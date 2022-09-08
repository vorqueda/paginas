import { Link } from "react-router-dom";
import "../paginas/navigation.css";

function Navigation()  {
return (
    <>
    <div>
    <nav>
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/pagina1/*">Usuarios</Link></li>
        <li><Link to="/pagina2/*">Oficinas</Link></li>
        <li><Link to="/pagina3/*">Tareas</Link></li>
        <li><Link to="/pagina4/*">Instancias</Link></li>
    </ul>
    </nav>
  
    </div>    
    </>
    );
  }
  
  export default Navigation;
  