import Logo from "../../assets/images/jirehM.png";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useState } from "react";
import Button from "../Ui/Button";

function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <nav className="bg-white shadow-md offset-y-2 md:fixed w-full z-50">
            <nav className="md:block hidden bg-secondaryBlue">
                <div className="flex items-center justify-between">
                    <div></div>
                    <ul className="flex items-center space-x-4 py-2 list-none">
                        <li>
                            <Link to="/iniciar-sesion" className="text-white pr-10">Iniciar sesión</Link>
                        </li>
                        <li>
                            <Link to="/registro" className="text-white pr-16">Crear una cuenta</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="flex items-center font-medium justify-around">
                <div className="z-50 pl-5 pr-5 md:w-auto w-full flex justify-between items-center">
                    <Link to="/">
                        <img src={Logo} alt="Logo JIREH" className="md:cursor-pointer" style={{width: "160px", height:"60px"}} />
                    </Link>
                    <div onClick={()=>setOpen(!open)} className="md:hidden" >
                        {
                            open
                            ?
                                <CloseIcon fontSize="large" />
                            :
                                <MenuIcon fontSize="large" />
                        }
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
                            ¿Quiénes  Somos?
                        </Link>
                    </li>
                    <li>
                        <Link to="/contacto" className="py-7 px-3 inline-block text-secondaryBlue hover:underline hover:text-primaryBlue">
                            Contacto
                        </Link>
                    </li>
                </ul>
                <div className="md:block hidden">
                    <Button texto="Pide tu cita" bg="secondaryBlue" textoColor="white" />
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
    )
}

export default Navbar