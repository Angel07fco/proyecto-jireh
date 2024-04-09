import ButtonDisabled from '../Ui/ButtonDisabled';
import Button from "../../components/Ui/Button";
import Loader from "../../components/Ui/Loader";
import Label from "../../components/Ui/Label";
import Success from "../Ui/Alertas/Success";
import Danger from "../Ui/Alertas/Danger";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { format } from 'date-fns';

function FormCita() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
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

    const [services, setServices] = useState("");
    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://backend-jireh.onrender.com/api/v1/services/`)
            .then(({ data } ) => setServices(data))
            .catch((error) => console.log(error))
        setLoading(false);
    }, [token])

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

    const [medicos, setMedicos] = useState("");
    useEffect(() => {
        setLoading(true);
        if (token) {
            axios
                .get(`https://backend-jireh.onrender.com/api/v1/veterinario/`, {
                    headers: {
                        "x-access-token": token
                    },
                })
                .then(({ data } ) => setMedicos(data))
                .catch((error) => console.log(error))
        }
        setLoading(false);
    }, [medicos])

    const onSubmit = async (data) => {
        console.log(data);
        setLoading(true);
        const formattedDate = format(startDate, 'dd-MM-yyyy');
        try {
            const response = await axios.post("https://backend-jireh.onrender.com/api/v1/cita/newcita", { ...data, usuario: user._id, fecha: formattedDate }, {
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

    const [startDate, setStartDate] = useState("");

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0; // 0 significa domingo
    };

    const isValidDate = (date) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 30); // Suma 30 días
        return date >= new Date() && date <= currentDate && isWeekday(date);
    };

    const [horarios, setHorarios] = useState(null);
    const [selectedMedico, setSelectedMedico] = useState("");
    const obtenerHorarios = async () => {
        setLoading(true);
        const formattedDate = format(startDate, 'dd-MM-yyyy');
        try {
            const response = await axios
            .get(`https://backend-jireh.onrender.com/api/v1/cita/citas/${selectedMedico}/${formattedDate}`, {
                    headers: {
                        "x-access-token": token
                    },
                })
            setHorarios(response.data);
            console.log(response.data)// Ajustar la respuesta para obtener solo los datos
        } catch (error) {
            if (error.response) {
                setResponseErrors(error.response.data);
            } else {
                setResponseErrors("Error al conectar con el servidor");
            }
        }
        setLoading(false);
    };

    const horariosDisponibles = ["09:00-10:30", "10:30-12:00", "12:30-14:00", "14:00-15:30", "16:00-17:30", "17:30-19:00"];

    let nuevosHorarios = [];

    // Verificar que horarios y horariosDisponibles no sean nulos
    if (horarios && horariosDisponibles) {
        const horas = horarios.map(item => item.hora);
        // Filtrar los horarios únicos en cada arreglo
        const horariosUnicos1 = horariosDisponibles.filter(hora => !horas.includes(hora));
        const horariosUnicos2 = horas.filter(hora => !horariosDisponibles.includes(hora));

        // Combinar los horarios únicos de ambos arreglos
        nuevosHorarios = [...horariosUnicos1, ...horariosUnicos2];
    }


    return (
        <>
            {responseErrors && <Danger mensaje={responseErrors} />}
            {responseSuccess && <Success mensaje={responseSuccess} />}
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-3'>
                    <Label>Médico Veterinario</Label>
                    <select
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                            focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                            id="medico"
                            {...register("medico", { required: "Seleccione un Médico" })}
                            onChange={(e) => setSelectedMedico(e.target.value)}
                        >
                        <option value="">Seleccione un Médico</option>
                        {medicos &&
                            <>
                                {medicos.map((item, index) => (
                                    <option key={index} value={item._id} className='bg-secondaryBlue text-primaryBlue'>
                                        {item.nombre}
                                    </option>
                                ))}
                            </>
                        }
                    </select>
                    {errors.medico && <p className="text-red-500 text-xs font-bold">{errors.medico.message}</p>}
                </div>

                <div className='md:flex flex-row md:space-x-4 mt-3 items-center justify-center'>
                    <div>
                        <Label>Fecha</Label>
                        <div>
                            <DatePicker
                                className="w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                filterDate={isValidDate}
                                placeholderText="Selecciona una fecha"
                                locale={es} // Configura el idioma español
                                dateFormat="dd/MM/yyyy"
                                weekStartsOn={1}
                            />
                        </div>
                    </div>
                    <div className='w-full'>
                        <Button texto="Ver horarios" bg="secondaryBlue" textoColor="white" onClick={obtenerHorarios} />
                    </div>
                </div>

                <div className='md:flex flex-row md:space-x-4 mt-3'>
                    {
                        nuevosHorarios === null
                        ?
                            <div className='w-full border border-red-500 flex items-center justify-center p-2'>
                                <h1 className='text-red-500 text-xs font-bold'>Para agendar la hora de la cita primero debe comprobar la disponibilidad de horarios del Médico y el dia.</h1>
                            </div>
                        :
                            <div className='w-full md:mt-0 mt-'>
                                <Label>Hora</Label>
                                {horarios === null
                                    ?
                                        <div className='w-full border border-red-500 flex items-center justify-center p-2'>
                                            <h1 className='text-red-500 text-xs font-bold'>Para agendar la hora de la cita primero debe comprobar la disponibilidad de horarios del Médico y el dia.</h1>
                                        </div>
                                    :
                                        <select
                                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                            focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                            id="hora"
                                            {...register("hora", { required: "Seleccione una Hora" })}
                                        >
                                            <option value="">Seleccione una opción</option>
                                                {nuevosHorarios.map((item, index) => (
                                                    <option key={index} value={item} className='bg-secondaryBlue text-primaryBlue'>
                                                        {item}
                                                    </option>
                                                ))}
                                        </select>
                                }
                                {errors.hora && <p className="text-red-500 text-xs font-bold">{errors.hora.message}</p>}
                            </div>
                    }
                </div>

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