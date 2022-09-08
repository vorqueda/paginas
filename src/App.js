import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Pagina1 from "./paginas/Pagina1";
import Pagina2 from "./paginas/Pagina2";
import Pagina3 from "./paginas/Pagina3";
import Pagina4 from "./paginas/Pagina4";
import Navigation from "./layouts/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />        
      <Routes>
        <Route path="/" element={<Home />} />   
          <Route path="/pagina1/*" element={<Pagina1 />} />
          <Route path="/pagina2/*" element={<Pagina2 />} />
          <Route path="/pagina3/*" element={<Pagina3 />} />
          <Route path="/pagina4/*" element={<Pagina4 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
