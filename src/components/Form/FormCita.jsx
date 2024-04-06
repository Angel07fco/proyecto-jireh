import ButtonDisabled from '../Ui/ButtonDisabled';
import {Input} from "../../components/Ui/Input";
import Button from "../../components/Ui/Button";
import Loader from "../../components/Ui/Loader";
import Label from "../../components/Ui/Label";
import Success from "../Ui/Alertas/Success";
import Danger from "../Ui/Alertas/Danger";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

function FormCita() {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const [responseSuccess, setResponseSuccess] = useState("");
    const [responseErrors, setResponseErrors] = useState("");

    const [user, setUser] = useState("");
    const token = localStorage.getItem("token");
    useEffect(() => {
        setLoading(true);
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
        setLoading(false);
    }, [token])
    console.log(user)

    const [services, setServices] = useState("");
    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://backend-jireh.onrender.com/api/v1/services/`)
            .then(({ data } ) => setServices(data))
            .catch((error) => console.log(error))
        setLoading(false);
    }, [token])
    console.log(services)

    const [pets, setPets] = useState("");
    useEffect(() => {
        setLoading(true);
        if (token) {
            axios
                .get(`https://backend-jireh.onrender.com/api/v1/pet/${user._id}`, {
                    headers: {
                        "x-access-token": token
                    },
                })
                .then(({ data } ) => setPets(data))
                .catch((error) => console.log(error))
        }
        setLoading(false);
    }, [user])
    console.log(pets)

    const onSubmit = async (data) => {
        console.log(data);
        setLoading(true);
        try {
            const response = await axios.post("https://backend-jireh.onrender.com/api/v1/cita/newcita", { ...data, usuario: user._id }, {
                headers: {
                    "x-access-token": token
                },
            });
            setResponseSuccess(response.data.msj);
            reset();
        } catch (error) {
            if (error.response) {
                setResponseErrors(error.response.data);
            } else {
                setResponseErrors("Error al conectar con el servidor");
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        if (responseErrors && responseErrors.length > 0) {
            const timer = setTimeout(() => {
                setResponseErrors(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [responseErrors]);

    useEffect(() => {
        if (responseSuccess && responseSuccess.length > 0) {
            const timer = setTimeout(() => {
                setResponseSuccess(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [responseSuccess]);

    return (
        <>
            {responseErrors && <Danger mensaje={responseErrors} />}
            {responseSuccess && <Success mensaje={responseSuccess} />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mt-3'>
                    <div className="mt-2">
                        <div className='flex justify-between items-center'>
                            <Label>Nombre de la mascota</Label>
                            <Link to="/mascotas" className='block underline text-sm font-medium leading-6 text-gray-900'>Agregar una nueva mascota</Link>
                        </div>
                        <select
                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                id="mascota"
                                {...register("mascota", { required: "Seleccione una Mascota" })}
                            >
                            <option value="">Seleccione una mascota</option>
                            {pets &&
                                <>
                                    {pets.map((item, index) => (
                                        <option key={index} value={item._id} className='bg-secondaryBlue text-primaryBlue'>
                                            {item.name}
                                        </option>
                                    ))}
                                </>
                            }
                        </select>
                        {errors.mascota && <p className="text-red-500 text-xs font-bold">{errors.mascota.message}</p>}
                    </div>
                </div>

                <div className='mt-3'>
                    <Label>Tipo de servicio</Label>
                    <select
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                            focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            id="servicio"
                            {...register("servicio", { required: "Seleccione un Servicio" })}
                        >
                        <option value="">Seleccione un servicio</option>
                        {services &&
                            <>
                                {services.map((item, index) => (
                                    <option key={index} value={item._id} className='bg-secondaryBlue text-primaryBlue'>
                                        {item.name}
                                    </option>
                                ))}
                            </>
                        }
                    </select>
                    {errors.servicio && <p className="text-red-500 text-xs font-bold">{errors.servicio.message}</p>}
                </div>

                <div className='md:flex flex-row md:space-x-4 mt-3'>
                    <div className='w-full'>
                        <Label>Fecha</Label>
                        <div>
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                type="text"
                                name="fecha"
                                {...register("fecha", { required: "Fecha es obligatorio" })}
                            />
                            {errors.fecha && <p className="text-red-500 text-xs font-bold">{errors.fecha.message}</p>}
                        </div>
                    </div>
                    <div className='w-full md:mt-0 mt-'>
                        <Label>Hora</Label>
                        <select
                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                id="hora"
                                {...register("hora", { required: "Seleccione un Servicio" })}
                            >
                            <option value="">Seleccione una opción</option>
                            <option value="De 09:00 am a 11:00 am">De 09:00 am a 11:00 am</option>
                            <option value="De 12:00 am a 02:00 pm">De 12:00 am a 02:00 pm</option>
                            <option value="De 02:00 pm a 04:00 pm">De 02:00 pm a 04:00 pm</option>
                            <option value="De 04:00 pm a 06:00 pm">De 04:00 pm a 06:00 pm</option>
                        </select>
                        {errors.hora && <p className="text-red-500 text-xs font-bold">{errors.hora.message}</p>}
                    </div>
                </div>

                <div className='mt-3'>
                    <Label>Comentarios adicionales</Label>
                    <div className="mt-2">
                        <textarea
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                            focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            type="text"
                            name="comentarios"
                            {...register("comentarios", { required: "Comentarios es obligatorio" })}
                        />
                        {errors.comentarios && <p className="text-red-500 text-xs font-bold">{errors.comentarios.message}</p>}
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    {Object.keys(errors).length === 0 && !responseErrors && !responseSuccess
                        ?
                            <>
                                {loading
                                    ?
                                        <Loader />
                                    :
                                        <Button texto="Enviar" bg="secondaryBlue" textoColor="white" />
                                }
                            </>
                        :
                            <ButtonDisabled texto="Enviar" bg="gray-500" />
                    }
                </div>
            </form>
        </>
    );
}

export default FormCita;