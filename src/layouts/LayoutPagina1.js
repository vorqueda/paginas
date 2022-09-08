import { Routes, Route } from "react-router-dom";

import { UsuariosList } from "../components/usuarios/UsuariosList";
import { UsuarioForm } from "../components/usuarios/UsuarioForm";

function LayoutPagina1()  {
return (
    <>
    <div>

    <Routes>
      <Route path="pagina1/usuarioslist" element={<UsuariosList />} />
      <Route path="add" element={<UsuarioForm />} />
      <Route path="edit/:id" element={<UsuarioForm />} />
    </Routes>

    </div>    
    </>
    );
  }
  
  export default LayoutPagina1;
  