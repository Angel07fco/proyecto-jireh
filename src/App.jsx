import { Route, Routes } from "react-router-dom";
import './App.css';

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
import MethodPassword from "./pages/MethodPassword";
import PasswordQuestion from "./pages/PasswordQuestion";
import UnlockQuestionSecret from "./pages/UnlockQuestionSecret";
import PreguntasFrecuentes from "./pages/PreguntasFrecuentes";
import Perfil from "./pages/user/perfil/Perfil";
import Mascotas from "./pages/user/perfil/Mascotas";
import HistorialMedico from "./pages/user/perfil/HistorialMedico";
import HistorialCitas from "./pages/user/perfil/HistorialCitas";
import ProductosComprados from "./pages/user/perfil/ProductosComprados";
import Cuenta from "./pages/user/perfil/Cuenta"; // Cambiado a la ruta correcta
import { ProtectedRoute } from "./components/Protected/ProtectedRoute";
import CambiarPassword from "./pages/CambiarPassword";
import Admin from "./pages/admin/Admin";
//import ImageCloudinary from "./utils/ImageCloudinary";
import AdminUsuarios from "./pages/admin/usuarios/AdminUsuarios";
import AdminProductos from "./pages/admin/productos/AdminProductos";
//import Calendar from "./utils/Calendar";
import CrudMascotas from "./utils/crud/mascotas/CrudMascotas";
import AdminCitas from "./pages/admin/citas/AdminCitas";
import AdminServicios from "./pages/admin/servicios/AdminServicios";
import AdminMascotas from "./pages/admin/mascotas/AdminMascotas";
import EditMascota from "./pages/user/perfil/mascotas/EditMascota";
import EditCita from "./pages/user/perfil/citas/EditCita";
import Matematicas from "./pages/user/perfil/mascotas/Matematicas";
import CitasDetalle from "./pages/admin/citas/CitasDetalle";
import AdminCuenta from "./pages/admin/cuenta/AdminCuenta";
import { ProtectedRouteAdmin } from "./components/Protected/ProtectedRouteAdmin";
import Exit from "./pages/admin/Exit";
import Blog from "./pages/user/Blog";
import Galeria from "./pages/user/Galeria";
import AdminBlog from "./pages/admin/blog/AdminBlog";
import AdminGaleria from "./pages/admin/galeria/AdminGaleria";
import AdminFaq from "./pages/admin/faq/AdminFaq";
import BlogListado from "./pages/user/BlogListado";
import BlogListadoInfo from "./pages/user/BlogListadoInfo";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/citas' element={<Citas />} />
      <Route path='/servicios' element={<Servicios />} />
      <Route path='/servicio-seleccionado' element={<ServicioSeleccionado />} />
      <Route path='/' element={<Tienda />} />
      <Route path='/producto-seleccionado/:nombre' element={<ProductoSeleccionado />} />
      <Route path='/quienes-somos' element={<QuienesSomos />} />
      <Route path='/contacto' element={<Contacto />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/blog-listado' element={<BlogListado />} />
      <Route path='/blog-listado-detalles' element={<BlogListadoInfo />} />
      <Route path='/galeria' element={<Galeria />} />
      <Route path='/preguntas-frecuentes' element={<PreguntasFrecuentes />} />

      <Route element={<ProtectedRoute />} >
        <Route path='/cuenta' element={<Cuenta />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path='/mascotas' element={<Mascotas />} />
        <Route path='/edit-mascota' element={<EditMascota />} />
        <Route path='/historial-medico' element={<HistorialMedico />} />
        <Route path='/historial-citas' element={<HistorialCitas />} />
        <Route path='/edit-cita' element={<EditCita />} />
        <Route path='/calculo-alimento' element={<Matematicas />} />
        <Route path='/cuenta' element={<ProductosComprados />} />
      </Route>

      <Route element={<ProtectedRouteAdmin />} >
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin-citas' element={<AdminCitas />} />
        <Route path='/cita-detalles' element={<CitasDetalle />} />
        <Route path='/admin-servicios' element={<AdminServicios />} />
        <Route path='/admin-blog' element={<AdminBlog />} />
        <Route path='/admin-galeria' element={<AdminGaleria />} />
        <Route path='/admin' element={<AdminProductos />} />
        <Route path='/admin-usuarios' element={<AdminUsuarios />} />
        <Route path='/admin-mascotas' element={<AdminMascotas />} />
        <Route path='/admin-cuenta' element={<AdminCuenta />} />
        <Route path='/admin-faq' element={<AdminFaq />} />
        <Route path='/admin-exit' element={<Exit />} />
      </Route>

      <Route path='/iniciar-sesion' element={<Login />} />
      <Route path='/registro' element={<Register />} />
      <Route path='/confirmar-cuenta' element={<ConfirmAccount />} />
      <Route path='/metodo-recuperar' element={<MethodPassword />} />
      <Route path='/recuperar-contraseña' element={<Password />} />
      <Route path='/recuperar-contraseña-pregunta' element={<PasswordQuestion />} />
      <Route path='/confirmar-codigo' element={<UnlockAccount />} />
      <Route path='/pregunta-secreta' element={<UnlockQuestionSecret />} />
      <Route path='/cambiar-contrasena' element={<CambiarPassword />} />

      <Route path='/aviso&de&privacidad' element={<AvisoPrivacidad />} />
      <Route path='/terminos&condiciones' element={<TerminosCondiciones />} />
      <Route path='/politica&de&cookies' element={<PoliticaCookies />} />

      <Route path='/preguntas&frecuentes' element={<PreguntasFrecuentes />} />

      <Route path='*' element={<NotFound />} />

      {/* Crud Mscotas */}
      <Route path='/crud-mascotas' element={<CrudMascotas />} />

      {/* Rutas para paginas de prueba
        <Route path="/image-cloudinary" element={<ImageCloudinary />} />
        <Route path="/calendar" element={<Calendar />} />
      */}
    </Routes>
  )
}

export default App;
