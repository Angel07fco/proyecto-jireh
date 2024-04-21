import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import axios from "axios";
import Loader from "../../../components/Ui/Loader";
import CrudTableHorarios from "./CrudTableHorarios";
import Button from "../../../components/Ui/Button";
import Label from "../../../components/Ui/Label";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { format } from "date-fns";
import Success from "../../../components/Ui/Alertas/Success";
import Danger from "../../../components/Ui/Alertas/Danger";
import { Input } from "../../../components/Ui/Input";

function AdminCuenta() {
    const [loading, setLoading] = useState(false);
    const [responseErrors, setResponseErrors] = useState(false);
    const [responseSuccess, setResponseSuccess] = useState(false);
    const [medico, setMedico] = useState([]);
    const [db, setDb] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
        .get(
            `https://backend-jireh.onrender.com/api/v1/veterinario/obtenerveterinario/6612a9ceed311e2bc5ee35de`
        )
        .then(({ data }) => setMedico(data))
        .catch((error) => console.log(error));
        setLoading(false);
    }, [medico]);

    useEffect(() => {
        setLoading(true);
        axios
        .get(
            `https://backend-jireh.onrender.com/api/v1/horario/6612a9ceed311e2bc5ee35de`
        )
        .then(({ data }) => setDb(data))
        .catch((error) => console.log(error));
        setLoading(false);
    }, [db]);

    const [id, setId] = useState("");
    const [fecha, setFecha] = useState("");

    const editData = (el) => {
        setId(el._id);
        setFecha(el.date);
        setOpen3(true);
    };

    const deleteData = (el) => {
        setFecha(el.date);
        setOpen2(true);
    };

    const confirmUpdate = async () => {
        setLoading(true);
        if (fecha !== "" && selectedStartTime !== "" && selectedEndTime !== "") {
            const data = {
                horaInicio: selectedStartTime,
                horaFin: selectedEndTime,
            };
            try {
                const response = await axios.patch(
                    `https://backend-jireh.onrender.com/api/v1/horario/6612a9ceed311e2bc5ee35de/${fecha}`,
                    data
                );
                setResponseSuccess(response.data.msj);
                console.log(response.data.msj);
            } catch (error) {
                if (error.response) {
                setResponseErrors(error.response.data);
                } else {
                setResponseErrors("Error al conectar con el servidor");
                }
            }
            setStartDate("");
            setSelectedStartTime("");
            setSelectedEndTime("");
            setShowTimePicker(false);
            setShowTimePicker2(false);
            setStartTimeSelected(false);
            setOpen3(false);
        } else {
        alert("Seleccion una fecha y hora");
        }
        setLoading(false);
    };

    const confirmDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`https://backend-jireh.onrender.com/api/v1/horario/deletecita/6612a9ceed311e2bc5ee35de/${fecha}`);
            setResponseSuccess(response.data.msj);
        } catch (error) {
            if (error.response) {
            setResponseErrors(error.response.data);
            } else {
            setResponseErrors("Error al conectar con el servidor");
            }
        }
        setOpen2(false);
        setLoading(false);
    };

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

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

    const handleRegisterHorario = async () => {
        setLoading(true);
        if (startDate !== "" && selectedStartTime !== "" && selectedEndTime !== "") {
            const formattedDate = format(startDate, "dd-MM-yyyy");
            const data = {
                dia: formattedDate,
                horaInicio: selectedStartTime,
                horaFin: selectedEndTime,
            };
            try {
                const response = await axios.post(
                    "https://backend-jireh.onrender.com/api/v1/horario/6612a9ceed311e2bc5ee35de",
                    data
                );
                setResponseSuccess(response.data.msj);
                console.log(response.data.msj);
            } catch (error) {
                if (error.response) {
                setResponseErrors(error.response.data);
                } else {
                setResponseErrors("Error al conectar con el servidor");
                }
            }
            setStartDate("");
            setSelectedStartTime("");
            setSelectedEndTime("");
            setShowTimePicker(false);
            setShowTimePicker2(false);
            setStartTimeSelected(false);
            setOpen(false);
        } else {
        alert("Seleccion una fecha y hora");
        }
        setLoading(false);
    };

    const handleCanceled = () => {
        setStartDate("");
        setSelectedStartTime("");
        setSelectedEndTime("");
        setShowTimePicker(false);
        setShowTimePicker2(false);
        setStartTimeSelected(false);
        setOpen(false);
        setOpen2(false);
        setOpen3(false);
    }

    useEffect(() => {
        if (responseErrors && responseErrors.length > 0) {
        const timer = setTimeout(() => {
            setResponseErrors(null);
        }, 3000);
        return () => clearTimeout(timer);
        }
    }, [responseErrors]);

    useEffect(() => {
        if (responseSuccess && responseSuccess.length > 0) {
        const timer = setTimeout(() => {
            setResponseSuccess(null);
        }, 3000);
        return () => clearTimeout(timer);
        }
    }, [responseSuccess]);

    const [selectedStartTime, setSelectedStartTime] = useState("");
    const [selectedEndTime, setSelectedEndTime] = useState("");
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showTimePicker2, setShowTimePicker2] = useState(false);
    const [startTimeSelected, setStartTimeSelected] = useState(false);

    const handleTimeSelect = (hour) => {
        setSelectedStartTime(formatTime(hour));
        setShowTimePicker(false);
        setStartTimeSelected(true); // Marcamos que se ha seleccionado la hora inicial
    };

    const handleTimeClick = () => {
        if (!startTimeSelected) {
        setShowTimePicker(true);
        }
    };

    const handleTimeClick2 = () => {
        if (selectedStartTime !== "") {
        setShowTimePicker2(true);
        }
    };

    const handleTimeSelect2 = (hour) => {
        setSelectedEndTime(formatTime(hour));
        setShowTimePicker2(false);
    };

    const formatTime = (hour) => {
        return hour.toString().padStart(2, "0") + ":00";
    };

    const getHoursAfter = (startHour) => {
        const hours = Array.from({ length: 24 }, (_, i) => i);
        return hours.slice(startHour + 1);
    };

    return (
        <AdminLayout>
            <HeaderAdmin
                texto="MI CUENTA ADMIN"
                linkText="cuenta administrador"
            />
            {loading && <Loader />}
            {responseSuccess && <Success mensaje={responseSuccess} />}
            {responseErrors && <Danger mensaje={responseErrors} />}
            <div className="px-10">
                <h1 className="font-bold text-4xl">Hola {medico.nombre}</h1>
                <p className="mt-2 text-lg">
                    En esta sección, podras ver y editar la información de su perfil asi
                    como sus citas a atender y el manejo de horarios.
                </p>
                <div>
                    <h1 className="my-10 bg-primaryBlue text-secondaryBlue p-2 text-4xl font-bold text-center">
                        Manejo de horarios
                    </h1>
                    <Button texto="Agregar un nuevo horario" onClick={() => setOpen(true)} />
                    <CrudTableHorarios
                        data={db}
                        editData={editData}
                        deleteData={deleteData}
                    />

                    <Modal open={open} onClose={() => setOpen(false)}>
                        <div className="mx-auto my-4 w-96 mb-3">
                            <h1 className="text-xl font-black text-gray-800 text-center">
                                Agregar un nuevo horario
                            </h1>
                        </div>
                        <div className="my-5">
                        <Label>Fecha</Label>
                            <DatePicker
                                className="w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                            focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                filterDate={isValidDate}
                                placeholderText="Selecciona una fecha"
                                locale={es}
                                dateFormat="dd/MM/yyyy"
                                weekStartsOn={1}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="time" className="font-medium">
                                Selecciona la hora de Inicio:
                            </label>
                            <div className="relative">
                                <input
                                type="text"
                                id="time"
                                name="time"
                                value={selectedStartTime}
                                readOnly
                                onClick={handleTimeClick}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {showTimePicker && (
                                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-64 overflow-y-auto">
                                    <ul className="py-2">
                                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                        <li
                                        key={hour}
                                        onClick={() => handleTimeSelect(hour)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                        {formatTime(hour)}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col mt-5">
                            <label htmlFor="time" className="font-medium">
                                Selecciona la hora Final:
                            </label>
                            <div className="relative">
                                <input
                                type="text"
                                id="time"
                                name="time"
                                value={selectedEndTime}
                                readOnly
                                onClick={handleTimeClick2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {showTimePicker2 && (
                                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-64 overflow-y-auto">
                                    <ul className="py-2">
                                    {getHoursAfter(
                                        parseInt(selectedStartTime.split(":")[0])
                                    ).map((hour) => (
                                        <li
                                        key={hour}
                                        onClick={() => handleTimeSelect2(hour)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                        {formatTime(hour)}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-10 mt-10">
                            <button
                                onClick={handleCanceled}
                                className="bg-red-500 w-full text-white p-2 rounded-lg font-bold"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleRegisterHorario}
                                className="bg-primaryBlue w-full text-secondaryBlue p-2 rounded-lg font-bold"
                            >
                                Confirmar
                            </button>
                        </div>
                    </Modal>

                    <Modal open={open2} onClose={() => setOpen2(false)}>
                        <div className='mx-auto my-4 w-96 mb-3'>
                            <h1 className='text-lg font-black text-gray-800 text-center'>Eliminar horario</h1>
                            <p className='text-sm text-gray-500 text-center mt-3'>¿Estas seguro que deseas eliminar tu horario para el dia {fecha}?</p>
                        </div>
                        <div className="flex gap-10 mt-10">
                            <button
                                onClick={() => setOpen2(false)}
                                className="bg-red-500 w-full text-white p-2 rounded-lg font-bold"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-primaryBlue w-full text-secondaryBlue p-2 rounded-lg font-bold"
                            >
                                Confirmar
                            </button>
                        </div>
                    </Modal>

                    <Modal open={open3} onClose={() => setOpen3(false)}>
                        <div className="mx-auto my-4 w-96 mb-3">
                            <h1 className="text-xl font-black text-gray-800 text-center">
                                Editar horario
                            </h1>
                        </div>
                        <div className="my-5">
                        <Label>Fecha</Label>
                            <Input value={fecha} />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="time" className="font-medium">
                                Selecciona la hora de Inicio:
                            </label>
                            <div className="relative">
                                <input
                                type="text"
                                id="time"
                                name="time"
                                value={selectedStartTime}
                                readOnly
                                onClick={handleTimeClick}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {showTimePicker && (
                                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-64 overflow-y-auto">
                                    <ul className="py-2">
                                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                        <li
                                        key={hour}
                                        onClick={() => handleTimeSelect(hour)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                        {formatTime(hour)}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col mt-5">
                            <label htmlFor="time" className="font-medium">
                                Selecciona la hora Final:
                            </label>
                            <div className="relative">
                                <input
                                type="text"
                                id="time"
                                name="time"
                                value={selectedEndTime}
                                readOnly
                                onClick={handleTimeClick2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {showTimePicker2 && (
                                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-64 overflow-y-auto">
                                    <ul className="py-2">
                                    {getHoursAfter(
                                        parseInt(selectedStartTime.split(":")[0])
                                    ).map((hour) => (
                                        <li
                                        key={hour}
                                        onClick={() => handleTimeSelect2(hour)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                        {formatTime(hour)}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-10 mt-10">
                            <button
                                onClick={handleCanceled}
                                className="bg-red-500 w-full text-white p-2 rounded-lg font-bold"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmUpdate}
                                className="bg-primaryBlue w-full text-secondaryBlue p-2 rounded-lg font-bold"
                            >
                                Confirmar
                            </button>
                        </div>
                    </Modal>
                </div>
            </div>
        </AdminLayout>
    );
}

function Modal({ open, onClose, children }) {
    return (
        <div
            className={`fixed z-50 inset-0 flex justify-center items-center transition-colors ${
                open ? "visible bg-gray-900 bg-opacity-70" : "invisible"
            }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-xl shadow p-6 transition-all ${
                open ? "scale-100 opacity-100" : "scale-125 opacity-0"
                }`}
            >
                {children}
            </div>
        </div>
    );
}

export default AdminCuenta;
