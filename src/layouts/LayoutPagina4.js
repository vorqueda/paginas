import { Routes, Route } from "react-router-dom";
import { TareasList } from "../components/instancias/TareasList";
import { InstanciasList } from "../components/instancias/InstanciasList";
import { InstanciaForm } from "../components/instancias/InstanciaForm";

function LayoutPagina4()  {
return (
    <>
    <div>

    <Routes>
      <Route path="pagina4/tareaslist" element={<TareasList />} />
      <Route path="instanciaslist/:id" element={<InstanciasList />} />
      <Route path="add/:tareaid" element={<InstanciaForm />} />
      <Route path="edit/:tareaid/:instanciaid" element={<InstanciaForm />} />
    </Routes>

    </div>    
    </>
    );
  }
  
  export default LayoutPagina4;
  