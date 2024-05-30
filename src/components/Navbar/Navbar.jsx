import Logo from "../../assets/images/jirehM.png";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
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
                .get(`https://backend-jireh.onrender.com/api/v1/user/obtenerusuario/${token}`, {
                    headers: {
                        "x-access-token": token
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
            <nav className="bg-white shadow-md offset-y-2 md:fixed w-full z-40">
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
                                    <Link to="/iniciar-sesion" className="text-white pr-10">Iniciar sesión</Link>
                                </li>
                                <li>
                                    <Link to="/registro" className="text-white pr-16">Crear una cuenta</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </nav>
                <div className="flex items-center font-medium justify-around">
                    <div className="z-50 pl-5 pr-5 md:w-auto w-full flex justify-between items-center">
                        <Link to="/">
                            <img src={Logo} alt="Logo JIREH" className="md:cursor-pointer" style={{ width: "160px", height: "60px" }} />
                        </Link>
                        <div onClick={() => setOpen(!open)} className="md:hidden">
                            {open ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
                        </div>
                    </div>
                    <ul className="md:flex hidden uppercase items-center gap-8">
                        <li>
                            <Link to="/" className="py-7 px-3 inline-block text-secondaryBlue hover:underline hover:text-primaryBlue">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/citas" className="py-7 px-3 inline-block text-secondaryBlue hover:underline hover:text-primaryBlue">
                                Citas
                            </Link>
                        </li>
                        <NavLinks />
                        <li>
                            <Link to="/quienes-somos" className="py-7 px-3 inline-block text-secondaryBlue hover:underline hover:text-primaryBlue">
                                ¿Quiénes Somos?
                            </Link>
                        </li>
                        <li>
                            <Link to="/contacto" className="py-7 px-3 inline-block text-secondaryBlue hover:underline hover:text-primaryBlue">
                                Contacto
                            </Link>
                        </li>
                    </ul>
                    <div className="md:block hidden">
                        {token && role === "usuario" ? (
                            <div className="flex justify-center items-center space-x-5">
                                <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-primaryBlue hover:text-secondaryBlue bg-secondaryBlue rounded-lg hover:bg-primaryBlue">
                                    <NotificationsNoneOutlinedIcon fontSize="small" />
                                    <span className="sr-only">Notifications</span>
                                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-secondaryBlue bg-primaryBlue border-2 border-secondaryBlue rounded-full -top-2 -end-2">0</div>
                                </button>
                                <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-primaryBlue hover:text-secondaryBlue bg-secondaryBlue rounded-lg hover:bg-primaryBlue">
                                    <ShoppingCartIcon fontSize="small" />
                                    <span className="sr-only">Notifications</span>
                                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-secondaryBlue bg-primaryBlue border-2 border-secondaryBlue rounded-full -top-2 -end-2">0</div>
                                </button>
                                <DropdownMenu name={user.user} />
                            </div>
                        ) : (
                            <Link to="/citas">
                                <Button texto="Pide tu cita" href="/citas" bg="secondaryBlue" textoColor="white" />
                            </Link>
                        )}
                    </div>
                    {/* Mobile Nav */}
                    <ul className={`
                        md:hidden bg-white absolute w-full h-full bottom-0 py-24 pl-4 duration-500 ${open ? "left-0" : "left-[-100%]"}
                    `}>
                        <li>
                            <Link to="/" className="py-7 px-3 inline-block">
                                Home
                            </Link>
                        </li>
                        <NavLinks />
                        <li>
                            <Link to="/" className="py-7 px-3 inline-block">
                                ¿Quiénes Somos?
                            </Link>
                        </li>
                        <li>
                            <Link to="/contacto" className="py-7 px-3 inline-block">
                                Contacto
                            </Link>
                        </li>
                        <div className="py-5">
                            <Button texto="Pide tu cita" bg="secondaryBlue" textoColor="white" />
                        </div>
                        <li className="bg-primaryBlue mr-4 rounded-md">
                            <Link to="/" className="text-white py-3 px-3 inline-block">
                                Iniciar Sesión
                            </Link>
                        </li>
                        <li className="border border-primaryBlue mr-4 rounded-md mt-4">
                            <Link to="/" className="text-primaryBlue py-3 px-3 inline-block">
                                Crear una cuenta
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
