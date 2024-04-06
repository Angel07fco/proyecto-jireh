import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PetsIcon from '@mui/icons-material/Pets';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';


function Aside({ selected }) {
    const [user, setUser] = useState("");
    const token = localStorage.getItem("token");

    // Lista de elementos del menú
    const menuItems = [
        { text: "Mi Perfil", path: "/perfil", icon: AccountCircleIcon, id: 0 },
        { text: "Mis mascotas", path: "/mascotas", icon: PetsIcon, id: 1 },
        { text: "Historial médico", path: "/historial-medico", icon: MedicalServicesIcon, id: 2 },
        { text: "Historial de citas", path: "/historial-citas", icon: EventNoteIcon, id: 3 },
        { text: "Productos comprados", path: "/productos-comprados", icon: ShoppingBagIcon, id: 4 }
    ];

    useEffect(() => {
        if (token) {
            axios
                .get(`https://backend-jireh.onrender.com/api/v1/user/obtenerusuario/${token}`, {
                    headers: {
                        "x-access-token": token
                    },
                })
                .then(({ data } ) => setUser(data))
                .catch((error) => console.log(error))
        }
    }, [token])

    return (
        <aside className="flex flex-col bottom-0 w-96 h-screen px-4 py-8 overflow-y-auto bg-secondaryBlue">
            <div className="flex flex-col items-center mt-6 -mx-2">
                <img className="object-cover w-24 h-24 mx-2 rounded-full" src={user.img} alt="avatar" />
                <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{user.user}</h4>
                <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                {menuItems.map(item => (
                    <Link
                        key={item.id}
                        to={item.path}
                        className={`flex items-center px-4 py-2 mt-5 ${selected === item.id ? 'text-secondaryBlue bg-primaryBlue' : 'text-primaryBlue hover:text-secondaryBlue bg-secondaryBlue hover:bg-primaryBlue'} rounded-lg`}
                    >
                        <item.icon sx={{ mr: 1 }} />
                        <span className="font-medium">{item.text}</span>
                    </Link>
                ))}
                </nav>
            </div>
        </aside>
    )
}

export default Aside;
