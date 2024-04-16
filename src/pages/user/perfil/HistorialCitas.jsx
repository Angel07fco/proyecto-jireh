import Header from "../../../components/Header/Header";
import Aside from "../../../components/Aside";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EventBusyIcon from '@mui/icons-material/EventBusy';

function HistorialCitas() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState("");
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, [token])

  useEffect(() => {
    setLoading(true);
    if (user) {
      axios
        .get(`https://backend-jireh.onrender.com/api/v1/cita/${user._id}`, {
            headers: {
                "x-access-token": token
            },
        })
        .then(({ data } ) => setDatos(data))
        .catch((error) => console.log(error))
        setLoading(false);
  }
  }, [user])

  console.log(datos)

  return (
    <Layout>
      <div className="flex">
        <Aside selected={3} />
        <div className="w-full h-[100vh] overflow-y-scroll">
          <Header texto="Historial de citas de mis mascotas" linkText="Citas" />
          <div className="grid grid-cols-2 gap-10 py-10 px-10">
            {datos.length === 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <EventBusyIcon sx={{ fontSize: 60 }} className="text-secondaryBlue" />
                  <h1 className="font-bold text-secondaryBlue text-lg mt-3">No tienes ninguna cita agendada en este momento.</h1>
                </div>
              ) : (
                datos.map(cita => (
                  <CardCita
                    key={cita.id}
                    cita={cita}
                    mascota={cita.mascota.name}
                    servicio={cita.servicio.name}
                    medico={cita.medico.nombre}
                    fecha={cita.fecha}
                    hora={cita.hora}
                    img={cita.mascota.img}
                    icono={cita.servicio.icono}
                    diaAgendado={cita.citaCreated}
                  />
                ))
              )
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}

function CardCita({cita, mascota, servicio, medico, fecha, hora, img, icono, diaAgendado}) {
  const navigate = useNavigate();

  const handleClick = () => {
      navigate("/edit-cita", { state: { cita } });
  };
  return (
    <div className="w-full bg-white h-auto flex p-5 rounded-xl border border-secondaryBlue" onClick={handleClick}>
      <div className="w-2/6">
        <h1 className="font-bold text-secondaryBlue text-xl text-center">{mascota}</h1>
        <img
          className="w-40 h-40 my-2"
          src={img}
        />
      </div>
      <div className="w-4/6 ml-5">
        <div className="flex items-center">
          <img
            className="w-8 h-8"
            src={icono}
          />
          <h1 className="ml-2 text-secondaryBlue font-bold text-xl">{servicio}</h1>
        </div>
        <h1 className="font-medium mt-2">Lo atiende: MVZ. {medico}</h1>
        <div className="mt-5">
          <h1 className="font-medium">Datos de la cita:</h1>
          <div>
            <h1 className="font-bold text-secondaryBlue">Fecha: <span className="font-medium">{fecha}</span></h1>
            <h1 className="font-bold text-secondaryBlue">Hora: <span className="font-medium">{hora}</span></h1>
          </div>
          <h1 className="mt-5 font-medium text-sm bg-secondaryBlue text-primaryBlue text-center">Fue agendada el {diaAgendado}</h1>
        </div>
      </div>
    </div>
  )
}


export default HistorialCitas