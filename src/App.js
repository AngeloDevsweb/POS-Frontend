
import './App.css';
import {  Routes, Route  } from "react-router-dom";

import Navegacion from './components/Navegacion'
import CrearProducto from './components/CrearProducto'
import CrearIngreso from './components/CrearIngreso'
import Inventario from './components/Inventario'
import FormIngreso from './components/FormIngreso'
import Ingresos from './components/Ingresos'
import Pos from './components/Pos'
import FormPos from './components/FormPos'
import ConsultarVentas from './components/ConsultarVentas'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Navegacion/>
      <div className="container p-4"> 
        <Routes>
          <Route path="/" exact element={<Inventario/>} />
          <Route path="/crearproducto" element={<CrearProducto/>} />
          <Route path="/CrearIngreso" element={<CrearIngreso/>} />
          {/* <Route path="/edit/:id" element={</>} /> */}
          <Route path="/formIngreso/:id" element={<FormIngreso/>} />
          <Route path="/ConsultarIngresos" element={<Ingresos/>} />
          <Route path="/Pos" element={<Pos/>} />
          <Route path="/formPos/:id" element={<FormPos/>} />
          <Route path="/consultarventas" element={<ConsultarVentas/>} />

        </Routes>

      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
