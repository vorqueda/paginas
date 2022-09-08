import { Routes, Route } from "react-router-dom";
import { OficinasList } from "../components/oficinas/OficinasList";
import { OficinaForm } from "../components/oficinas/OficinaForm";
function LayoutPagina2()  {
return (
    <>
    <div>
    <Routes>
    <Route path="pagina2/oficinaslist" element={<OficinasList />} />
      <Route path="add" element={<OficinaForm />} />
      <Route path="edit/:id" element={<OficinaForm />} />
    </Routes>
    </div>    
    </>
    );
  }
  
  export default LayoutPagina2;
  