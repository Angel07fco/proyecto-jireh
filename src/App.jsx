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
import TerminosCondiciones from "./pages/TerminosCondiciones";
import ConfirmAccount from "./pages/ConfirmAccount";
import UnlockAccount from "./pages/UnlockAccount";
import AvisoPrivacidad from "./pages/AvisoPrivacidad";
import PoliticaCookies from "./pages/PoliticaCookies";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/citas' element={<Citas />} />

      <Route path='/servicios' element={<Servicios />} />
      <Route path='/servicio-seleccionado' element={<ServicioSeleccionado />} />

      <Route path='/tienda' element={<Tienda />} />
      <Route path='/producto-seleccionado/:nombre' element={<ProductoSeleccionado />} />

      <Route path='/quienes-somos' element={<QuienesSomos />} />
      <Route path='/contacto' element={<Contacto />} />

      <Route path='/iniciar-sesion' element={<Login />} />
      <Route path='/registro' element={<Register />} />
      <Route path='/confirmar-cuenta' element={<ConfirmAccount />} />
      <Route path='/recuperar-contraseña' element={<Password />} />
      <Route path='/desbloquear-cuenta' element={<UnlockAccount />} />

      <Route path='/aviso&de&privacidad' element={<AvisoPrivacidad />} />
      <Route path='/terminos&condiciones' element={<TerminosCondiciones />} />
      <Route path='/politica&de&cookies' element={<PoliticaCookies />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App