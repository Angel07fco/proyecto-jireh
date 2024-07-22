import { useLocation } from "react-router-dom";
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import AdminLayout from "../AdminLayout";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import { format } from 'date-fns';
import Success from "../../../components/Ui/Alertas/Success";
import Danger from "../../../components/Ui/Alertas/Danger";
import Loader from "../../../components/Ui/Loader";
import Label from "../../../components/Ui/Label";
import { Input } from "../../../components/Ui/Input";
import Button from "../../../components/Ui/Button";

function CitasDetalle() {
    const navigate = useNavigate();
    const [response, setResponse] = useState();
    const [errorss, setErrors] = useState();
    const { state } = useLocation();
    const { cita } = state;

    console.log(cita)

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Servivios
    const [renderServicio, setRenderServicio] = useState(false);

    // Comentarios
    const [comentario, setRenderComentarios] = useState(false);

    // Detalles
    const [renderDetalles, setRenderDetalles] = useState(false);

    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const handleSubmitDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`https://backend-jireh.onrender.com/api/v1/cita/cancelar/${cita._id}`, {
                headers: {
                    "x-access-token": token
                },
            });
            if (response.data.mensaje === "No se puede cancelar la cita. Debe ser al menos dos días antes de la cita.") {
                setErrors(response.data.mensaje);
            } else {
                setResponse(response.data.mensaje);
            }
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data);
            } else {
                setErrors("Error al conectar con el servidor");
            }
        }
        setOpen(false);
        setLoading(false);
    }

    useEffect(() => {
        if (errorss && errorss.length > 0) {
            const timer = setTimeout(() => {
                setErrors(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorss]);

    useEffect(() => {
        if (response && response.length > 0) {
            const timer = setTimeout(() => {
                setResponse(null);
                navigate('/historial-citas');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [response]);

    const [services, setServices] = useState("");
    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://backend-jireh.onrender.com/api/v1/services/`)
            .then(({ data } ) => setServices(data))
            .catch((error) => console.log(error))
        setLoading(false);
    }, [token])

    const [medicos, setMedicos] = useState([]);
    useEffect(() => {
        setLoading(true);
        if (token) {
            axios
                .get(`https://backend-jireh.onrender.com/api/v1/veterinario/`, {
                    headers: {
                        "x-access-token": token
                    },
                })
                .then(({ data }) => {
                    setMedicos(data);
                })
                .catch((error) => console.log(error))
                .finally(() => setLoading(false));
        }
    }, [token]);

    const hanSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        try {
            const response = await axios.put(`https://backend-jireh.onrender.com/api/v1/cita/actualizar/${cita._id}`, data, {
                headers: {
                    "x-access-token": token // Asegúrate de que token esté definido
                },
            });
            setLoading(false);
            console.log("Formulario enviado:", response);
            if (response.data.mensaje === "No se puede actualizar la cita. Debe ser al menos 1 día antes de la cita.") {
                setErrors(response.data.mensaje);
            } else {
                setResponse(response.data.mensaje);
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
        setLoading(false);
    }

    const [open, setOpen] = useState(false);

    // Logica para actualizar medico, dia y hora
    const [medico, setMedico] = useState("");
    const [startDate, setStartDate] = useState("");
    const [selectedHora, setSelectedHora] = useState("");

    const [selectedMedicoIndex, setSelectedMedicoIndex] = useState("");
    const handlMedicoClick = (index) => {
        setSelectedMedicoIndex(index);
        setMedico(medicos[index]._id);
    };

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
    const obtenerHorarios = async () => {
        setLoading(true);
        if (startDate !== ""){
            const formattedDate = format(startDate, 'dd-MM-yyyy');
            try {
                const response = await axios
                .get(`https://backend-jireh.onrender.com/api/v1/cita/citas/${medico}/${formattedDate}`, {
                        headers: {
                            "x-access-token": token
                        },
                    })
                setHorarios(response.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Seleccion una fecha")
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

    const handleSubmitUpdateCita = async () => {
        setLoading(true);
        const formattedDate = format(startDate, 'dd-MM-yyyy');
        const hora = selectedHora;
        const data = {
            medico,
            fecha: formattedDate,
            hora
        };
        try {
            const response = await axios.put(`https://backend-jireh.onrender.com/api/v1/cita/actualizar/${cita._id}`, data, {
                headers: {
                    "x-access-token": token
                },
            });
            setLoading(false);
            console.log("Cita actualizada:", response);
            if (response.data.mensaje === "No se puede actualizar la cita. Debe ser al menos 1 día antes de la cita.") {
                setErrors(response.data.mensaje);
            } else {
                setResponse(response.data.mensaje);
            }
        } catch (error) {
            console.error("Error al actualizar la cita:", error);
            setLoading(false);
            setErrors("Error al conectar con el servidor");
        }
    };

    const handleResetFields = () => {
        // Restablece el estado de los campos del formulario a su valor inicial
        reset();
        // Restablece el estado de los demás campos que necesitas
        setMedico("");
        setStartDate("");
        setHorarios(null);
    };

    return (
        <AdminLayout>
            <div className="flex">
                {response && <Success mensaje={response} /> }
                {errorss && <Danger mensaje={errorss} /> }
                {loading && <Loader /> }
                <div className="w-full h-[100vh] overflow-y-scroll">
                    <div className="mx-10">
                        <h1 className="bg-secondaryBlue text-primaryBlue p-3 text-3xl text-center mt-5">Cita agendada</h1>
                        <div onClick={() => setOpen(true)} className="bg-red-500 text-white mt-5 p-3 text-xl text-center rounded-xl hover:bg-white hover:text-red-500 border hover:border-red-500 cursor-pointer">
                            Cancelar cita
                        </div>
                        <div className="mt-10 w-full flex">
                            <div className="w-2/6">
                                <div className="bg-primaryBlue w-[80%] ml-[10%] rounded-full mb-5">
                                    <h1 className="bg-secondaryBlue text-primaryBlue p-3 text-3xl text-center mt-5">{cita.mascota}</h1>
                                    <img src={cita.img} className="w-[100%] h-[100%]" />
                                </div>
                            </div>
                            <div className="w-4/6">
                                <div className="w-full">
                                    <div className="flex justify-between mb-1">
                                        <div className="w-full">
                                            <Label>Nombre mascota</Label>
                                            <Input
                                                disabled
                                                value={cita.mascota}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-between mb-1 mt-5">
                                        <Label>Comentarios</Label>
                                        {/* {comentario
                                            ?
                                                <button onClick={() => setRenderComentarios(false)} className="text-secondaryBlue">Cancelar</button>
                                            :
                                                <EditIcon onClick={() => setRenderComentarios(true)} className="bg-secondaryBlue text-primaryBlue rounded-full p-1" sx={{ fontSize: 25 }} />
                                        } */}
                                    </div>
                                    {comentario
                                        ?
                                            <>
                                                <form onSubmit={hanSubmit}>
                                                    <Input
                                                        type="text"
                                                        placeholder={cita.comentarios}
                                                        name="comentarios"
                                                    />
                                                    <button
                                                        className="w-full mt-2 rounded-2xl border-2 border-secondaryBlue bg-white px-6 py-3
                                                        font-semibold uppercase text-secondaryBlue transition-all duration-300
                                                        hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                                                        hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                                                        active:rounded-2xl active:shadow-none"
                                                    >
                                                        Guardar
                                                    </button>
                                                </form>
                                            </>
                                        :
                                            <Input
                                                disabled
                                                value={cita.comentarios}
                                            />
                                    }

                                    <div className="flex justify-between mb-1 mt-5">
                                        <Label>Servicio</Label>
                                        {/* {renderServicio
                                            ?
                                                <button onClick={() => setRenderServicio(false)} className="text-secondaryBlue">Cancelar</button>
                                            :
                                                <EditIcon onClick={() => setRenderServicio(true)} className="bg-secondaryBlue text-primaryBlue rounded-full p-1" sx={{ fontSize: 25 }} />
                                        } */}
                                    </div>
                                    {renderServicio
                                        ?
                                            <>
                                                <form onSubmit={hanSubmit}>
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
                                                    <button
                                                        className="w-full mt-2 rounded-2xl border-2 border-secondaryBlue bg-white px-6 py-3
                                                        font-semibold uppercase text-secondaryBlue transition-all duration-300
                                                        hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                                                        hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                                                        active:rounded-2xl active:shadow-none"
                                                    >
                                                        Guardar
                                                    </button>
                                                </form>
                                            </>
                                        :
                                            <Input
                                                disabled
                                                value={cita.servicio}
                                            />
                                    }

                                    <div className="mt-8 mb-8">
                                        <div className="flex justify-between bg-secondaryBlue mb-2 p-1">
                                            <h1 className="text-primaryBlue">- Detalles</h1>
                                            {/* {renderDetalles
                                                ?
                                                    <button onClick={() => setRenderDetalles(false)} className="text-primaryBlue">Cancelar</button>
                                                :
                                                    <EditIcon onClick={() => setRenderDetalles(true)} className="bg-secondaryBlue text-primaryBlue rounded-full p-1" sx={{ fontSize: 25 }} />
                                            } */}
                                        </div>
                                        {renderDetalles
                                            ?
                                                <>
                                                    {medico === ""
                                                        ?
                                                            <>
                                                                <h1 className="font-medium text-secondaryBlue text-lg my-3">Seleccione un Médico:</h1>
                                                                <div className='w-full grid grid-cols-2 gap-5 mb-5'>
                                                                    {medicos.map((item, index) => (
                                                                        <div
                                                                            key={index}
                                                                            onClick={() => handlMedicoClick(index)}
                                                                            className={`border flex border-secondaryBlue cursor-pointer rounded-xl p-5 ${selectedMedicoIndex === index ? 'bg-primaryBlue' : ''}`}
                                                                        >
                                                                            <img src={item.img} className="w-16 h-16" />
                                                                            <div className="ml-3">
                                                                                <h1 className='font-bold text-xl text-secondaryBlue'>Médico Veterinario:</h1>
                                                                                <h1 className='text-secondaryBlue'>{item.nombre}</h1>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </>
                                                        :
                                                            <h1 className="border border-secondaryBlue p-1 text-center text-xl">Medico ya seleccionado</h1>
                                                    }

                                                    {nuevosHorarios.length === 0
                                                        ?
                                                            <div className='md:flex flex-row md:space-x-4 mt-3 items-center justify-center'>
                                                                <div>
                                                                    <Label>Fecha</Label>
                                                                    <div>
                                                                        <DatePicker
                                                                            className="w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                                                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                                            focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                                                            selected={startDate}
                                                                            onChange={(date) => {
                                                                                setStartDate(date);
                                                                            }}
                                                                            filterDate={isValidDate}
                                                                            placeholderText="Selecciona una fecha"
                                                                            locale={es}
                                                                            dateFormat="dd-MM-yyyy"
                                                                            weekStartsOn={1}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className='w-full'>
                                                                    <Button texto="Ver horarios" onClick={obtenerHorarios} />
                                                                </div>
                                                            </div>
                                                        :
                                                            <h1 className="border border-secondaryBlue p-1 text-center text-xl mt-5">Fecha ya seleccionado</h1>
                                                    }

                                                    <div className='md:flex flex-row md:space-x-4 my-5'>
                                                        {nuevosHorarios.length === 0 ? (
                                                            <div className='w-full border border-red-500 flex items-center justify-center p-2'>
                                                                <h1 className='text-red-500 text-xs font-bold'>Para agendar la hora de la cita primero debe comprobar la disponibilidad de horarios del Médico y el dia.</h1>
                                                            </div>
                                                        ) : (
                                                            <div className="w-full">
                                                                <button
                                                                    className="bg-red-500 text-white p-2 rounded-lg mb-3 hover:bg-white hover:text-red-500 border hover:border-red-500"
                                                                    onClick={() => {
                                                                        handleResetFields();
                                                                    }}
                                                                >Elejir otro Médico y fecha</button>
                                                                <div className='w-full'>
                                                                    <Label>Hora</Label>
                                                                    <select
                                                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                                                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                                        focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                                                        id="hora"
                                                                        onChange={(e) => {
                                                                            setSelectedHora(e.target.value); // Paso 1: Actualiza el estado de selectedHora
                                                                        }}
                                                                    >
                                                                        <option value="">Seleccione una opción</option>
                                                                        {nuevosHorarios.map((item, index) => (
                                                                            <option key={index} value={item} className='bg-secondaryBlue text-primaryBlue'>
                                                                                {item}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <button
                                                        onClick={handleSubmitUpdateCita}
                                                        className="w-full mt-2 rounded-2xl border-2 border-secondaryBlue bg-white px-6 py-3
                                                        font-semibold uppercase text-secondaryBlue transition-all duration-300
                                                        hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                                                        hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                                                        active:rounded-2xl active:shadow-none"
                                                    >
                                                        Guardar
                                                    </button>
                                                </>
                                            :
                                                <div className="space-y-3">
                                                    <div>
                                                        <Label>Médico</Label>
                                                        <Input
                                                            disabled
                                                            value={cita.medico}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Fecha</Label>
                                                        <Input
                                                            disabled
                                                            value={cita.fecha}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Hora</Label>
                                                        <Input
                                                            disabled
                                                            value={cita.hora}
                                                        />
                                                    </div>
                                                </div>
                                        }
                                        </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className='mx-auto my-4 w-96 mb-3'>
                    <h1 className='text-lg font-black text-gray-800 text-center'>Cancelar cita</h1>
                    <p className='text-sm text-gray-500 text-center mt-3'>¿Deseas cancelar tu cita?</p>
                </div>
                <div className='flex gap-10 mt-10'>
                    <button
                        onClick={() => setOpen(false)}
                        className='bg-red-500 w-full text-white p-2 rounded-lg font-bold'
                    >Cancelar</button>
                    <button
                        onClick={handleSubmitDelete}
                        className='bg-primaryBlue w-full text-secondaryBlue p-2 rounded-lg font-bold'
                    >Confirmar</button>
                </div>
            </Modal>
        </AdminLayout>
    )
}

function Modal({ open, onClose, children }) {
    return(
        <div
            className={`fixed z-50 inset-0 flex justify-center items-center transition-colors ${open ? 'visible bg-gray-900 bg-opacity-70' : 'invisible'}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-xl shadow p-6 transition-all ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`}
            >
                {children}
            </div>
        </div>
    )
}

export default CitasDetalle