import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Iconos
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';

function CalendarCitas() {
    const [db, setDb] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get(`https://backend-jireh.onrender.com/api/v1/cita/`, {
                    headers: {
                        "x-access-token": token
                    },
                })
                .then(({ data }) => setDb(data))
                .catch((error) => console.log(error))
                .finally(() => setLoading(false));
        }
    }, []);

    const localizer = momentLocalizer(moment);

    // Generar eventos desde los datos de la base de datos
    const events = db.map(item => ({
        usuario: item.usuario,
        medico: item.medico,
        mascota: item.mascota,
        servicio: item.servicio,
        hora: item.hora,
        start: new Date(moment(item.fecha, 'DD-MM-YYYY').toDate()),
        end: new Date(moment(item.fecha, 'DD-MM-YYYY').toDate()),
    }));

    const EventComponent = ({ event }) => {
        return (
            <Link className="block p-2 rounded-lg shadow-md max-h-24 overflow-y-auto">
                <div className="flex items-center">
                    <PersonIcon />
                    <p className="font-semibold ml-2">{event.usuario}</p>
                </div>
                <div className="flex items-center">
                    <PetsIcon />
                    <p className="font-semibold ml-2">{event.mascota}</p>
                </div>
                <p className="text-sm">Hora cita: {event.hora}</p>
            </Link>
        );
    };

    const components = {
        event: EventComponent
    };

    return (
        <div className="h-[95vh] w-[100%] my-10">
            <Calendar
                localizer={localizer}
                events={events}
                views={["month"]}
                components={components}
            />
        </div>
    );
}

export default CalendarCitas;
