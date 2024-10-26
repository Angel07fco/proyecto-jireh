import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PetsIcon from "@mui/icons-material/Pets";
import { useNavigate } from "react-router-dom";

function CalendarCitas() {
  const [db, setDb] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`http://localhost:5000/api/v1/cita/`, {
          headers: { "x-access-token": token },
        })
        .then(({ data }) => setDb(data))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [db]);

  console.log(db);

  moment.locale("es");
  const localizer = momentLocalizer(moment);

  const messages = {
    allDay: "Todo el día",
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
  };

  const events = db.map((item) => ({
    usuario: item.usuario,
    medico: item.medico,
    mascota: item.mascota,
    servicio: item.servicio,
    img: item.imagen,
    hora: item.hora,
    fecha: item.fecha,
    comentarios: item.comentarios,
    start: new Date(moment(item.fecha, "DD-MM-YYYY").toDate()),
    end: new Date(moment(item.fecha, "DD-MM-YYYY").toDate()),
  }));

  const EventComponent = ({ event }) => {
    const navigate = useNavigate();

    let cita = event;

    const handleNavigate = () => {
      navigate("/cita-detalles", { state: { cita } });
    };

    return (
      <div
        className="block p-1 rounded-lg shadow-md max-h-24 overflow-y-auto"
        onClick={handleNavigate}
      >
        <div className="flex items-center">
          <PetsIcon />
          <p className="font-semibold ml-2">{event.mascota}</p>
        </div>
      </div>
    );
  };

  const components = { event: EventComponent };

  return (
    <div className="h-[95vh] w-[100%] my-10">
      <Calendar
        localizer={localizer}
        events={events}
        views={["month"]}
        components={components}
        messages={messages}
      />
    </div>
  );
}

export default CalendarCitas;
