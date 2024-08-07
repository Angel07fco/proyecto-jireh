import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import AdminLayout from "../AdminLayout";
import Loader from "../../../components/Ui/Loader";

function AdminCitas() {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [db, setDb] = useState([]);
    const [date, setDate] = useState(new Date());
    const [citasStats, setCitasStats] = useState({
        realizadas: 0,
        proxima: 0,
        enVivo: 0,
    });
    const [filter, setFilter] = useState('enVivo');
    const [filteredCitas, setFilteredCitas] = useState({
        realizadas: [],
        proxima: [],
        enVivo: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            if (token && date) {
                try {
                    setLoading(true);
                    const formattedDate = moment(date).format('DD-MM-YYYY');
                    const { data } = await axios.get(`https://backend-jireh.onrender.com/api/v1/cita/filtrar/${formattedDate}`, {
                        headers: {
                            "x-access-token": token
                        },
                    });

                    // Obtener la fecha y hora actual
                    const ahora = moment();

                    // Calcular las citas basadas en el tiempo actual y la fecha seleccionada
                    const realizadas = data.filter(cita => {
                        const [horaInicio, horaFin] = cita.hora.split('-');
                        const citaFin = moment(`${cita.fecha} ${horaFin}`, 'DD-MM-YYYY HH:mm');
                        return citaFin.isBefore(ahora);
                    });

                    const enVivo = data.filter(cita => {
                        const [horaInicio, horaFin] = cita.hora.split('-');
                        const citaInicio = moment(`${cita.fecha} ${horaInicio}`, 'DD-MM-YYYY HH:mm');
                        const citaFin = moment(`${cita.fecha} ${horaFin}`, 'DD-MM-YYYY HH:mm');
                        return citaInicio.isSameOrBefore(ahora) && citaFin.isAfter(ahora);
                    });

                    const proxima = data.filter(cita => {
                        const [horaInicio] = cita.hora.split('-');
                        const citaInicio = moment(`${cita.fecha} ${horaInicio}`, 'DD-MM-YYYY HH:mm');
                        return citaInicio.isAfter(ahora);
                    });

                    setDb(data);
                    setCitasStats({
                        realizadas: realizadas.length,
                        proxima: proxima.length,
                        enVivo: enVivo.length,
                    });

                    setFilteredCitas({
                        realizadas,
                        proxima,
                        enVivo,
                    });
                } catch (error) {
                    console.log(error);
                    setDb([]);
                    setCitasStats({
                        realizadas: 0,
                        proxima: 0,
                        enVivo: 0,
                    });
                    setFilteredCitas({
                        realizadas: [],
                        proxima: [],
                        enVivo: [],
                    });
                } finally {
                    setLoading(false);
                }
            }
        };
        
        fetchData();
    }, [date, token]);

    const formattedDate = moment(date).format('DD-MM-YYYY');

    // Filtrar citas basadas en el filtro actual
    const citasFiltradas = () => {
        switch (filter) {
            case 'realizadas':
                return filteredCitas.realizadas;
            case 'enVivo':
                return filteredCitas.enVivo;
            case 'proxima':
                return filteredCitas.proxima;
            default:
                return db;
        }
    };

    // Definir el texto del encabezado dinámicamente basado en el filtro seleccionado
    const getHeaderTitle = () => {
        switch (filter) {
            case 'realizadas':
                return `Citas realizadas del ${formattedDate}`;
            case 'enVivo':
                return `Citas en vivo del ${formattedDate}`;
            case 'proxima':
                return `Citas próximas del ${formattedDate}`;
            default:
                return `Citas del ${formattedDate}`;
        }
    };

    // Obtener el color de fondo para el encabezado
    const getHeaderBgColor = () => {
        switch (filter) {
            case 'realizadas':
                return 'bg-green-500';
            case 'enVivo':
                return 'bg-yellow-500';
            case 'proxima':
                return 'bg-red-500';
            default:
                return 'bg-primaryBlue';
        }
    };

    return (
        <AdminLayout>
            <HeaderAdmin texto="CITAS ADMIN" linkText="citas administrador" />
            {loading && <Loader />}
            <div className="flex flex-col items-center px-10 h-screen">
                <div className="w-full flex bg-primaryBlue">
                    <div className="w-1/3 flex flex-col justify-center p-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date-picker">
                            Selecciona una fecha
                        </label>
                        <DatePicker
                            id="date-picker"
                            selected={date}
                            onChange={date => setDate(date)}
                            dateFormat="dd-MM-yyyy"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="w-2/3 p-4 grid grid-cols-3 gap-4">
                        <CountCard title="Realizadas" count={citasStats.realizadas} color="bg-green-500" onClick={() => setFilter('realizadas')} isActive={filter === 'realizadas'} />
                        <CountCard title="En vivo" count={citasStats.enVivo} color="bg-yellow-500" onClick={() => setFilter('enVivo')} isActive={filter === 'enVivo'} />
                        <CountCard title="Próximas" count={citasStats.proxima} color="bg-red-500" onClick={() => setFilter('proxima')} isActive={filter === 'proxima'} />
                    </div>
                </div>
                <div className="w-full">
                    <h1 className={`my-10 ${getHeaderBgColor()} text-secondaryBlue p-2 text-4xl font-bold text-center`}>
                        {getHeaderTitle()}
                    </h1>
                    {citasFiltradas().length === 0 ? (
                        <div className="flex flex-col justify-center items-center my-10">
                            <EventBusyIcon sx={{ fontSize: 60 }} className="text-secondaryBlue" />
                            <h1 className="font-bold text-secondaryBlue text-lg mt-3">No tienes ninguna cita agendada en este momento.</h1>
                        </div>
                    ) : (
                        citasFiltradas().map(cita => (
                            <CardCita
                                key={cita._id}
                                id={cita._id}
                                cita={cita}
                                mascota={cita.mascota.name}
                                servicio={cita.servicio.name}
                                medico={cita.medico.nombre}
                                fecha={cita.fecha}
                                hora={cita.hora}
                                img={cita.mascota.img}
                                icono={cita.servicio.icono}
                                comentarios={cita.comentarios}
                                diaAgendado={cita.citaCreated}
                            />
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

const CountCard = ({ title, count, color, onClick, isActive }) => (
    <div
        className={`p-4 rounded-lg shadow-md ${color} text-white cursor-pointer ${isActive ? 'opacity-70' : ''}`}
        onClick={onClick}
    >
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-4xl mt-2">{count}</p>
    </div>
);

function CardCita({ cita, id, mascota, servicio, comentarios, medico, fecha, hora, img, icono, diaAgendado }) {
    return (
        <div className="w-full bg-white border border-gray-300 h-auto mb-5 flex flex-col rounded-xl shadow-md">
            <div className="w-full flex pl-10 py-5">
                <h1 className="font-bold text-secondaryBlue">{fecha}</h1>
                <h1 className="px-5">|</h1>
                <h1 className="font-bold text-secondaryBlue">{hora}</h1>
            </div>
            <div className="w-full">
                <hr className="border-t border-gray-300" />
            </div>
            <div className="w-full flex flex-row">
                <div className="w-2/12 flex justify-center items-center my-2">
                    <img className="w-28 h-28" src={img} alt={`Mascota ${mascota}`} />
                </div>
                <div className="w-8/12 mt-5 flex">
                    <div className="w-1/2">
                        <div className="flex items-center">
                            <img className="w-8 h-8" src={icono} alt={`Servicio ${servicio}`} />
                            <h1 className="ml-2 text-secondaryBlue font-bold text-xl">{servicio}</h1>
                        </div>
                        <h1 className="font-medium mt-2">Lo atiende: MVZ. {medico}</h1>
                        <h1 className="font-medium mt-2">Comentarios: {comentarios}</h1>
                    </div>
                    <div className="w-1/2">
                        <h1 className="font-medium">Fue agendada el:</h1>
                        <h1 className="font-bold">{diaAgendado}</h1>
                    </div>
                </div>
                <div className="w-2/12 mt-5 justify-center pr-10">
                    <div className="bg-white flex flex-col items-center justify-center space-y-4">
                        <button
                            className="px-6 py-2 font-medium bg-primaryBlue text-secondaryBlue w-full transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
                        >
                            Ver cita
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminCitas;