import { Route, Routes } from "react-router-dom";
import './App.css'

import Home from './pages/user/Home';
import NotFound from "./pages/NotFound";
import Citas from "./pages/user/Citas";
import Servicios from "./pages/user/Servicios";
import ServicioSeleccionado from "./pages/user/ServicioSeleccionado";
import Tienda from "./pages/user/Tienda";
import ProductoSeleccionado from "./pages/user/ProductoSeleccionado";
import QuienesSomos from "./pages/user/QuienesSomos";
import Contacto from "./pages/user/Contacto";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Password from "./pages/Password";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/citas' element={<Citas />} />
      <Route path='/servicios' element={<Servicios />} />
      <Route path='/servicio-seleccionado' element={<ServicioSeleccionado />} />
      <Route path='/tienda' element={<Tienda />} />
      <Route path='/producto-seleccionado' element={<ProductoSeleccionado />} />
      <Route path='/quienes-somos' element={<QuienesSomos />} />
      <Route path='/contacto' element={<Contacto />} />
      <Route path='/iniciar-sesion' element={<Login />} />
      <Route path='/registro' element={<Register />} />
      <Route path='/recuperar-contraseña' element={<Password />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
