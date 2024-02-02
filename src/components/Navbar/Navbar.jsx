import Logo from "../../assets/images/logo.png";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Button from "../Button";
import NavLinks from "./NavLinks";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <nav className="bg-white">
            <div className="flex items-center font-medium justify-around">
                <div className="z-50 pl-5 pr-5 md:w-auto w-full flex justify-between items-center">
                    <img src={Logo} alt="Logo JIREH" className="md:cursor-pointer" style={{width: "180px", height:"80px"}} />
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
                        <Link to="/" className="py-7 px-3 inline-block">
                            Home
                        </Link>
                    </li>
                    <NavLinks />
                </ul>
                <div className="md:block hidden">
                    <Button />
                </div>
                {/* Mobile Nav */}
                <ul className={`
                    md:hidden bg-white absolute w-full h-full bottom-0 py-24 pl-4 duration-500 ${open ? "left-0" : "left-[-100%]"}
                `}>
                    <li>
                        <a className="py-7 px-3 inline-block">Home</a>
                    </li>
                    <NavLinks />
                    <div className="py-5">
                        <Button />
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar