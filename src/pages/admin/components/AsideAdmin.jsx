import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ComputerIcon from '@mui/icons-material/Computer';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import TodayIcon from '@mui/icons-material/Today';
import PetsIcon from '@mui/icons-material/Pets';
import CollectionsIcon from '@mui/icons-material/Collections';
import BookIcon from '@mui/icons-material/Book';
import QuizIcon from '@mui/icons-material/Quiz';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function AsideAdmin() {
    const [open, setOpen] = useState(true);
    const location = useLocation();
    const Menus = [
        { title: "Citas", path: "/admin-citas", icon: TodayIcon },
        { title: "Servicios", path: "/admin-servicios", icon: MiscellaneousServicesIcon },
        { title: "Usuarios", path: "/admin-usuarios", icon: SupervisedUserCircleIcon },
        { title: "Mascotas", path: "/admin-mascotas", icon: PetsIcon },
        { title: "Blog", path: "/admin-blog", icon: BookIcon },
        { title: "Galeria", path: "/admin-galeria", icon: CollectionsIcon },
        { title: "Preguntas frecuentes", path: "/admin-faq", icon: QuizIcon },
        { title: "Mi Cuenta", path: "/admin-cuenta", icon: PersonIcon },
        { title: "Salir", path: "/admin-exit", icon: LogoutIcon }
    ];

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
                            className={`flex items-center justify-center p-2 text-primaryBlue text-sm gap-x-4 cursor-pointer hover:text-secondaryBlue hover:bg-primaryBlue rounded-md mt-2 ${location.pathname === menu.path && "bg-primaryBlue text-secondaryBlue"}`}
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
            </div>
        </div>
    )
}

export default AsideAdmin;