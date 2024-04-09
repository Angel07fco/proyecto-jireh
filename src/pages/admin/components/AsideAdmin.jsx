import React from "react";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ComputerIcon from '@mui/icons-material/Computer';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import TodayIcon from '@mui/icons-material/Today';
import PetsIcon from '@mui/icons-material/Pets';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function AsideAdmin() {
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Citas", path: "/admin-citas", icon: TodayIcon },
        { title: "Servicios", path: "/admin-servicios", icon: MiscellaneousServicesIcon },
        { title: "Productos", path: "/admin-productos", icon: AddShoppingCartIcon },
        { title: "Usuarios", path: "/admin-usuarios", icon: SupervisedUserCircleIcon },
        { title: "Mascotas", path: "/admin-mascotas", icon: PetsIcon },
        //{ title: "Ofertas" },
        //{ title: "Ventas" }
    ]

    const Menu2 = [
        { title: "Mi Cuenta", path: "/admin", icon: PersonIcon },
        { title: "Reportes", path: "/admin", icon: AssessmentIcon },
        { title: "Salir", path: "/admin", icon: LogoutIcon },
    ]

    return (
        <div className="flex fixed">
            <div className={`bg-secondaryBlue h-screen p-5 pt-8 ${open ? "w-72" : "w-24"} duration-300 relative`}>
                <ArrowBackIcon
                    className={`bg-white text-darkPurple text-3xl rounded-full absolute -right-3 top-9 border border-secondaryBlue cursor-pointer ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />

                <div className='inline-flex items-center'>
                    <ComputerIcon sx={{ fontSize: 50 }} className={`bg-primaryBlue text-4xl rounded cursor-pointer block float-left mr-2 duration-300 ${open && "rotate-[360deg]"}`} />
                    <div className='flex flex-col'>
                        <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>Dashboard</h1>
                    </div>
                </div>

                <div className='flex items-center rounded-md bg-lightWhite mt-6 px-4 py-2'>
                    <SearchIcon className='text-white text-lg block float-left cursor-pointer mr-2' />
                    <input type='search' placeholder='Buscar...' className='w-full text-base bg-transparent text-white focus:outline-none' />
                </div>

                <ul className='pt-2'>
                {Menus.map((menu, index) => (
                    <li
                        className="flex items-center justify-center p-2 text-primaryBlue text-sm gap-x-4 cursor-pointer hover:text-secondaryBlue hover:bg-primaryBlue rounded-md mt-2"
                        key={index}
                    >
                        <span
                            title={menu.title}
                            className={`text-2xl block float-left ${!open ? "tooltip" : ""}`}
                        >
                            <menu.icon />
                            {!open && (
                                <span className="hidden group-hover:inline ml-2">{menu.title}</span>
                            )}
                        </span>
                        <Link
                            to={menu.path}
                            className={`text-base font-medium flex-1 duration-200 pt-1 ${!open && "hidden"} hover:underline`}
                        >
                            {menu.title}
                        </Link>
                    </li>
                ))}
                </ul>

                <ul className='mt-10'>
                {Menu2.map((menu, index) => (
                    <li
                    className="flex items-center justify-center p-2 text-primaryBlue text-sm gap-x-4 cursor-pointer hover:text-secondaryBlue hover:bg-primaryBlue rounded-md mt-2"
                    key={index}
                    >
                        <span
                            title={menu.title}
                            className={`text-2xl block float-left ${!open ? "tooltip" : ""}`}
                        >
                            <menu.icon className='m-0 p-0' />
                            {!open && (
                                <span className="hidden group-hover:inline ml-2">{menu.title}</span>
                            )}
                        </span>
                        <span className={`text-base font-medium flex-1 duration-200 pt-1 ${!open && "hidden"}`}>
                            {menu.title}
                        </span>
                    </li>
                ))}
                </ul>

            </div>
        </div>
    )
}

export default AsideAdmin;