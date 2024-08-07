import Header from "../../../components/Header/Header";
import Aside from "../../../components/Aside";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EventBusyIcon from '@mui/icons-material/EventBusy';
import Loader from "../../../components/Ui/Loader";
import Success from "../../../components/Ui/Alertas/Success";
import Danger from "../../../components/Ui/Alertas/Danger";
import moment from "moment";

function HistorialCitas() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState("");
  const [proximas, setProximas] = useState([]);
  const [realizadas, setRealizadas] = useState([]);
  const [enVivo, setEnVivo] = useState([]);
  const [citasCalificadas, setCitasCalificadas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      axios
        .get(`https://backend-jireh.onrender.com/api/v1/user/obtenerusuario/${token}`, {
          headers: {
            "x-access-token": token
          },
        })
        .then(({ data }) => setUser(data))
        .catch((error) => console.log(error));
    }
  }, [token]);

  useEffect(() => {
    if (user._id) {
      setLoading(true);
      axios
        .get(`https://backend-jireh.onrender.com/api/v1/cita/${user._id}`, {
          headers: {
            "x-access-token": token
          },
        })
        .then(({ data }) => {
          console.log("Citas recibidas: ", data);

          const ahora = moment();

          // Clasificar citas usando la lógica de tiempo
          const citasProximas = data.filter(cita => {
            const citaInicio = moment(`${cita.fecha} ${cita.hora.split('-')[0]}`, 'DD-MM-YYYY HH:mm');
            return citaInicio.isAfter(ahora);
          });

          const citasRealizadas = data.filter(cita => {
            const citaFin = moment(`${cita.fecha} ${cita.hora.split('-')[1]}`, 'DD-MM-YYYY HH:mm');
            return citaFin.isBefore(ahora) && !cita.opinionUsuario;
          });

          const citasEnVivo = data.filter(cita => {
            const [horaInicio, horaFin] = cita.hora.split('-');
            const citaInicio = moment(`${cita.fecha} ${horaInicio}`, 'DD-MM-YYYY HH:mm');
            const citaFin = moment(`${cita.fecha} ${horaFin}`, 'DD-MM-YYYY HH:mm');
            return citaInicio.isSameOrBefore(ahora) && citaFin.isAfter(ahora);
          });

          const citasYaOpinadas = data.filter(cita => {
            const citaFin = moment(`${cita.fecha} ${cita.hora.split('-')[1]}`, 'DD-MM-YYYY HH:mm');
            return citaFin.isBefore(ahora) && cita.opinionUsuario;
          });

          setProximas(citasProximas);
          setRealizadas(citasRealizadas);
          setEnVivo(citasEnVivo);
          setCitasCalificadas(citasYaOpinadas);

          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <Layout>
      <div className="flex">
        <Aside selected={3} />
        <div className="w-full h-[100vh] overflow-y-scroll">
          <Header texto="Historial de citas de mis mascotas" linkText="Citas" />
          <div className="gap-10 px-10">
            <h1 className="my-5 bg-primaryBlue text-secondaryBlue p-2 text-4xl font-bold text-center">
              Mis citas
            </h1>
            {enVivo.length > 0 && (
              <h1 className="mb-3 text-secondaryBlue pl-2 bg-yellow-500 font-bold text-lg">Citas en vivo</h1>
            )}
            {enVivo.length > 0 && (
              enVivo.map(cita => (
                <CardCitaVivo
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
            {realizadas.length > 0 && (
              <h1 className="mb-3 text-secondaryBlue pl-2 bg-blue-500 font-bold text-lg">Citas que esperan tu opinión</h1>
            )}
            {realizadas.length > 0 && (
              realizadas.map(cita => (
                <CardCitasRealizadas
                  key={cita._id}
                  id={cita._id}
                  cita={cita}
                  mascota={cita.mascota.name}
                  servicio={cita.servicio.name}
                  fecha={cita.fecha}
                  img={cita.mascota.img}
                  icono={cita.servicio.icono}
                />
              ))
            )}
            <h1 className="mb-3 text-secondaryBlue font-bold pl-2 bg-red-500 text-lg">Citas próximas</h1>
            {proximas.length === 0 ? (
              <div className="flex flex-col justify-center items-center my-10">
                <EventBusyIcon sx={{ fontSize: 60 }} className="text-secondaryBlue" />
                <h1 className="font-bold text-secondaryBlue text-lg mt-3">No tienes ninguna cita proxima agendada en este momento.</h1>
              </div>
            ) : (
              proximas.map(cita => (
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
            {citasCalificadas.length > 0 && (
              <h1 className="mb-3 text-secondaryBlue font-bold pl-2 bg-green-500 text-lg">Citas que ya opiné</h1>
            )}
            {citasCalificadas.length > 0 && (
              citasCalificadas.map(cita => (
                <CardCitasOpinion
                  key={cita._id}
                  id={cita._id}
                  cita={cita}
                  mascota={cita.mascota.name}
                  servicio={cita.servicio.name}
                  fecha={cita.fecha}
                  img={cita.mascota.img}
                  icono={cita.servicio.icono}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function CardCitasRealizadas({ img, cita, mascota, icono, servicio, fecha }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/opinion-cita", { state: { cita } });
  };
  return (
    <div className="w-full bg-white border border-gray-300 h-auto mb-5 flex flex-col rounded-xl shadow-md">
      <div className="w-full flex flex-row">
        <div className="w-2/12 flex justify-center items-center my-2">
          <img className="w-14 h-14" src={img} alt={`Mascota ${mascota}`} />
        </div>
        <div className="w-8/12 flex">
          <div className="flex items-center">
            <img className="w-6 h-6" src={icono} alt={`Servicio ${servicio}`} />
            <h1 className="ml-2 text-secondaryBlue text-md">Tu cita con el servicio {servicio} del dia {fecha} espera tu opinión.</h1>
          </div>
        </div>
        <div className="w-2/12 flex justify-center items-center pr-10">
          <button
            onClick={handleClick}
            className="w-full group relative px-4 py-2 font-medium text-secondaryBlue transition-colors duration-[400ms] hover:text-secondaryBlue"
          >
            <span>Opinar</span>
            <span className="absolute left-0 top-0 h-[2px] w-0 bg-secondaryBlue transition-all duration-100 group-hover:w-full" />
            <span className="absolute right-0 top-0 h-0 w-[2px] bg-secondaryBlue transition-all delay-100 duration-100 group-hover:h-full" />
            <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-secondaryBlue transition-all delay-200 duration-100 group-hover:w-full" />
            <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-secondaryBlue transition-all delay-300 duration-100 group-hover:h-full" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CardCitasOpinion({ img, cita, mascota, icono, servicio, fecha }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/opinion-cita", { state: { cita } });
  };
  return (
    <div className="w-full bg-white border border-gray-300 h-auto mb-5 flex flex-col rounded-xl shadow-md">
      <div className="w-full flex flex-row">
        <div className="w-2/12 flex justify-center items-center my-2">
          <img className="w-14 h-14" src={img} alt={`Mascota ${mascota}`} />
        </div>
        <div className="w-8/12 flex">
          <div className="flex items-center">
            <img className="w-6 h-6" src={icono} alt={`Servicio ${servicio}`} />
            <h1 className="ml-2 text-secondaryBlue text-md">Tu cita con el servicio {servicio} del dia {fecha} ya ha sido opinada.</h1>
          </div>
        </div>
        <div className="w-2/12 flex justify-center items-center pr-10">
          <button
            onClick={handleClick}
            className="w-full group relative px-4 py-2 font-medium text-secondaryBlue transition-colors duration-[400ms] hover:text-secondaryBlue"
          >
            <span>Ver Opinión</span>
            <span className="absolute left-0 top-0 h-[2px] w-0 bg-secondaryBlue transition-all duration-100 group-hover:w-full" />
            <span className="absolute right-0 top-0 h-0 w-[2px] bg-secondaryBlue transition-all delay-100 duration-100 group-hover:h-full" />
            <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-secondaryBlue transition-all delay-200 duration-100 group-hover:w-full" />
            <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-secondaryBlue transition-all delay-300 duration-100 group-hover:h-full" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CardCita({ cita, id, mascota, servicio, comentarios, medico, fecha, hora, img, icono, diaAgendado }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/edit-cita", { state: { cita } });
  };

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const [errorss, setErrors] = useState();
  const token = localStorage.getItem("token");

  const handleCancelar = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`https://backend-jireh.onrender.com/api/v1/cita/cancelar/${id}`, {
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
  };

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

  return (
    <div className="w-full bg-white border border-gray-300 h-auto mb-5 flex flex-col rounded-xl shadow-md">
      {response && <Success mensaje={response} />}
      {errorss && <Danger mensaje={errorss} />}
      {loading && <Loader />}
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
              onClick={handleClick}
              className="px-6 py-2 font-medium bg-primaryBlue text-secondaryBlue w-full transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              Ver cita
            </button>

            <button
              className="group relative px-4 py-2 font-medium text-secondaryBlue w-full transition-colors duration-[400ms] hover:text-secondaryBlue"
              onClick={() => setOpen(true)}
            >
              <span>Cancelar</span>
              <span className="absolute left-0 top-0 h-[2px] w-0 bg-secondaryBlue transition-all duration-100 group-hover:w-full" />
              <span className="absolute right-0 top-0 h-0 w-[2px] bg-secondaryBlue transition-all delay-100 duration-100 group-hover:h-full" />
              <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-secondaryBlue transition-all delay-200 duration-100 group-hover:w-full" />
              <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-secondaryBlue transition-all delay-300 duration-100 group-hover:h-full" />
            </button>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className='mx-auto my-4 w-96 mb-3'>
          <h1 className='text-lg font-black text-gray-800 text-center'>Cancelar cita para {mascota}</h1>
          <p className='text-sm text-gray-500 text-center mt-3'>¿Estás seguro que deseas cancelar tu cita?</p>
        </div>
        <div className="flex gap-10 mt-10">
          <button
            onClick={() => setOpen(false)}
            className="bg-red-500 w-full text-white p-2 rounded-lg font-bold"
          >
            Cancelar
          </button>
          <button
            onClick={handleCancelar}
            className="bg-primaryBlue w-full text-secondaryBlue p-2 rounded-lg font-bold"
          >
            Confirmar
          </button>
        </div>
      </Modal>
    </div>
  );
}

function CardCitaVivo({ cita, id, mascota, servicio, comentarios, medico, fecha, hora, img, icono, diaAgendado }) {
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

          </div>
        </div>
      </div>
    </div>
  );
}

function Modal({ open, onClose, children }) {
  return (
    <div
      className={`fixed z-40 inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-gray-900 bg-opacity-70" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-[50%] rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default HistorialCitas;