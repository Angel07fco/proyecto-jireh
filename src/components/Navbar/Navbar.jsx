import Logo from "../../assets/images/jirehM.png";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useEffect, useState } from "react";
import Button from "../Ui/Button";
import axios from "axios";
import DropdownMenu from "./DropdownMenu";
import Loader from "../Ui/Loader";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("rol");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/v1/user/obtenerusuario/${token}`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then(({ data }) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [token]);

  return (
    <>
      {loading && <Loader />}
      <nav className="bg-white shadow-md md:fixed w-full z-40">
        {/* Barra superior */}
        <nav className="md:block hidden bg-secondaryBlue">
          <div className="flex items-center justify-between">
            <div></div>
            {token && role === "usuario" ? (
              <div className="w-full py-2 px-10 flex justify-end">
                <h1 className="text-primaryBlue">Bienvenido {user.email}</h1>
              </div>
            ) : (
              <ul className="flex items-center space-x-4 py-2 list-none">
                <li>
                  <Link to="/iniciar-sesion" className="text-white pr-10">
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link to="/registro" className="text-white pr-16">
                    Crear una cuenta
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>

        {/* Navbar principal */}
        <div className="flex items-center font-medium justify-between py-0 px-10">
          <div className="z-50 md:w-auto w-full flex justify-between items-center">
            <Link to="/">
              <img
                src={Logo}
                alt="Logo JIREH"
                className="md:cursor-pointer w-auto max-w-xs md:max-w-none h-auto"
                style={{ width: "160px", height: "60px" }}
              />
            </Link>
            <div onClick={() => setOpen(!open)} className="md:hidden">
              {open ? (
                <CloseIcon fontSize="large" />
              ) : (
                <MenuIcon fontSize="large" />
              )}
            </div>
          </div>

          {/* Menú de escritorio */}
          <ul className="md:flex hidden uppercase items-center gap-8">
            <li>
              <Link
                to="/"
                className="py-7 px-3 inline-block text-secondaryBlue hover:underline hover:text-primaryBlue"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/citas"
                className="py-7 px-3 inline-block text-secondaryBlue hover:underline hover:text-primaryBlue"
              >
                Citas
              </Link>
            </li>
            <NavLinks />
            <li>
              <Link
                to="/quienes-somos"
                className="py-7 px-3 inline-block text-secondaryBlue hover:underline hover:text-primaryBlue"
              >
                ¿Quiénes Somos?
              </Link>
            </li>
            <li>
              <Link
                to="/contacto"
                className="py-7 px-3 inline-block text-secondaryBlue hover:underline hover:text-primaryBlue"
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* Botón y Dropdown para usuarios registrados */}
          <div className="md:block hidden">
            {token && role === "usuario" ? (
              <div className="flex justify-center items-center space-x-5">
                <button
                  type="button"
                  className="relative inline-flex items-center p-3 text-sm font-medium text-center text-primaryBlue hover:text-secondaryBlue bg-secondaryBlue rounded-lg hover:bg-primaryBlue"
                >
                  <NotificationsNoneOutlinedIcon fontSize="small" />
                  <span className="sr-only">Notifications</span>
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-secondaryBlue bg-primaryBlue border-2 border-secondaryBlue rounded-full -top-2 -end-2">
                    0
                  </div>
                </button>
                <DropdownMenu name={user.user} />
              </div>
            ) : (
              <Link to="/citas">
                <Button
                  texto="Pide tu cita"
                  href="/citas"
                  bg="secondaryBlue"
                  textoColor="white"
                />
              </Link>
            )}
          </div>

          {/* Menú móvil */}
          <ul
            className={`md:hidden bg-white absolute w-full h-screen bottom-0 py-24 pl-4 duration-500 overflow-y-auto ${
              open ? "left-0" : "left-[-100%]"
            }`}
          >
            <li>
              <Link to="/" className="py-7 px-3 inline-block">
                Home
              </Link>
            </li>
            <NavLinks />
            <li>
              <Link to="/quienes-somos" className="py-7 px-3 inline-block">
                ¿Quiénes Somos?
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="py-7 px-3 inline-block">
                Contacto
              </Link>
            </li>
            <li>
              <Link to="/citas" className="py-7 px-3 inline-block">
                Citas
              </Link>
            </li>
            <li>
              <Link to="/cuenta" className="py-7 px-3 inline-block">
                Mi cuenta
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
