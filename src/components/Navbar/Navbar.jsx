import Logo from "../../assets/images/jirehM.jpg";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useState } from "react";
import Button from "../Button";

function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <nav className="bg-white shadow-md offset-y-2 md:fixed w-full z-10">
            <nav className="md:block hidden bg-secondaryBlue">
                <div className="flex items-center justify-between">
                    <div></div>
                    <ul className="flex items-center space-x-4 py-2 list-none">
                        <li>
                            <Link to="/" className="text-white pr-10">Iniciar sesión</Link>
                        </li>
                        <li>
                            <Link to="/" className="text-white pr-16">Crear una cuenta</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="flex items-center font-medium justify-around">
                <div className="z-50 pl-5 pr-5 md:w-auto w-full flex justify-between items-center">
                    <img src={Logo} alt="Logo JIREH" className="md:cursor-pointer" style={{width: "140px", height:"80px"}} />
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
                        <Link to="/" className="py-7 px-3 inline-block text-secondaryBlue hover:underline hover:text-primaryBlue">
                            Citas
                        </Link>
                    </li>
                    <NavLinks />
                    <li>
                        <Link to="/" className="py-7 px-3 inline-block text-secondaryBlue hover:underline hover:text-primaryBlue">
                            ¿Quienes Somos?
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="py-7 px-3 inline-block text-secondaryBlue hover:underline hover:text-primaryBlue">
                            Contacto
                        </Link>
                    </li>
                </ul>
                <div className="md:block hidden">
                    <Button texto="Pide cita" />
                </div>
                {/* Mobile Nav */}
                <ul className={`
                    md:hidden bg-white absolute w-full h-full bottom-0 py-24 pl-4 duration-500 ${open ? "left-0" : "left-[-100%]"}
                `}>
                    <li>
                        <Link className="py-7 px-3 inline-block">
                            Home
                        </Link>
                    </li>
                    <NavLinks />
                    <li>
                        <Link className="py-7 px-3 inline-block">
                            ¿Quienes Somos?
                        </Link>
                    </li>
                    <li>
                        <Link className="py-7 px-3 inline-block">
                            Contacto
                        </Link>
                    </li>
                    <div className="py-5">
                        <Button texto="Pide cita" />
                    </div>
                    <li>
                        <Link to="/" className="text-blue-500 py-3 px-3 inline-block">
                            Iniciar Sesión
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="text-blue-500 py-3 px-3 inline-block">
                            Crear una cuenta
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar