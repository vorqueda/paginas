import { Routes, Route } from "react-router-dom";

import { TareasList } from "../components/tareas/TareasList";
import { TareaForm } from "../components/tareas/TareaForm";

function LayoutPagina3()  {
return (
    <>
    <div>

    <Routes>
      <Route path="pagina3/tareaslist" element={<TareasList />} />
      <Route path="add" element={<TareaForm />} />
      <Route path="edit/:id" element={<TareaForm />} />
    </Routes>

    </div>    
    </>
    );
  }
  
  export default LayoutPagina3;
  