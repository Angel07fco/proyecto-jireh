import { useEffect, useState } from "react";
import Danger from "../../components/Ui/Alertas/Danger";
import Success from "../../components/Ui/Alertas/Success";
import Button from "../../components/Ui/Button";
import Loader from "../../components/Ui/Loader";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "./AdminLayout";
import HeaderAdmin from "./components/HeaderAdmin/HeaderAdmin";
import { useNavigate } from 'react-router-dom';


function Exit() {
    const { userLogout, response, errors: signinErrors } = useAuth();
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleLogout = () => {
        if (token) {
            userLogout({token});
        }
    };

    useEffect(() => {
        if (response) {
            setLoading(true);
            const timeout = setTimeout(() => {
                setLoading(false);
                navigate('/iniciar-sesion');
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [response]);
    return (
        <AdminLayout>
            <HeaderAdmin texto="ADMIN CERRAR SESIÓN" linkText="cerrar sesión" />
            {signinErrors && <Danger mensaje={signinErrors} />}
            {response && <Success mensaje={response} />}
            {loading && <Loader />}
            <div className="px-10">
                <h1 className="font-bold text-xl">¿Estás seguro que desear cerrar la sesión?</h1>
                <Button texto="Cerrar sesión" onClick={handleLogout} />
            </div>
        </AdminLayout>
    )
}

export default Exit