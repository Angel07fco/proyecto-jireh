import { useEffect, useState } from "react";
import { getServices } from "../api/services";

const Servicio = () => {
    const [errors, setErrors] = useState(null);
    const [response, setResponse] = useState(null);
    const [data, setData] = useState(null);

    const obtenerServicios = async () => {
        try {
            const res = await getServices();
            console.log(res);
            setResponse(res.data);
            setData(res.data);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        if (errors && errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        if (response && response.length > 0) {
            const timer = setTimeout(() => {
                setResponse(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [response]);

    return {
        response,
        errors,
        data,
        obtenerServicios,
    };
}

export default Servicio;