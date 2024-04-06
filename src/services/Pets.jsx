import { useEffect, useState } from "react";
import { registerPet, getPetsByUser } from "../api/pets";

const Pets = () => {
    const [errors, setErrors] = useState(null);
    const [response, setResponse] = useState(null);
    const [data, setData] = useState(null);

    const obtenerPetByUser = async (userId, token) => {
        try {
            const res = await getPetsByUser(userId, token);
            console.log(res)
            setResponse(res.data.msj);
            setData(res.data);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    };

    const createNewPet = async (pet) => {
        try {
            const res = await registerPet(pet);
            setResponse(res.data.msj);
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
        obtenerPetByUser,
        createNewPet,
    };
}

export default Pets;