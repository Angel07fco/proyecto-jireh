import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Aside from "../../../components/Aside";
import Layout from "../Layout";
import HoverTiltCard from "../../../components/HoverTiltCard";
import ButtonCode from "../../../components/Ui/ButtonCode";
import Loader from "../../../components/Ui/Loader";
import axios from "axios";

function Perfil() {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [ModalTexto, setModalTexto] = useState("");
  const [tipoToken, setTipoToken] = useState("");
  const [dispositivo, setDispositivo] = useState("");
  const [time, setTime] = useState(0); // Temporizador inicializado a 0
  const [timerActive, setTimerActive] = useState(false); // Estado para controlar el temporizador

  const handleOpenModal = (imageUrl, text, tipo, dispositivoT) => {
    setModalImage(imageUrl);
    setModalTexto(text);
    setTipoToken(tipo);
    setDispositivo(dispositivoT);
    setOpen(true);
  };

  useEffect(() => {
    let timer;
    if (timerActive) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            clearFields();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const clearFields = () => {
    setTimerActive(false);
    setModalImage("");
    setModalTexto("");
    setTipoToken("");
    setDispositivo("");
    setContenido(false);
    setTokenAcceso("");
  };

  const cerrarModal = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(false);
  const [contenido, setContenido] = useState(false);
  const [tokenAcceso, setTokenAcceso] = useState("");
  const handleObtenerToken = async () => {
    setLoading(true);
    const response = await axios.post(
      `http://localhost:5000/api/v1/tokenacceso/${token}/${tipoToken}`
    );
    setTokenAcceso(response.data.token);
    setContenido(true);
    setLoading(false);
    setTime(300); // Iniciar el temporizador en 5 minutos
    setTimerActive(true); // Activar el temporizador
  };

  return (
    <Layout>
      <div className="flex">
        <Aside selected={0} />
        <div className="w-full h-[100vh] overflow-y-scroll">
          <Header texto="Mi Perfil" linkText="Mi perfil" />
          <div className="my-10 md:mx-20 mx-5">
            <div className="w-full md:flex">
              <div className="md:w-3/5">
                <h1 className="font-bold text-4xl">Hola AngelMH</h1>
                <p className="mt-2 text-lg">
                  En esta sección, el usuario puede ver y editar la información
                  de su perfil.
                </p>
              </div>
              <div className="md:w-2/5 flex flex-col space-y-5 items-center justify-center mt-10 md:mt-0">
                <HoverTiltCard
                  onClick={() =>
                    handleOpenModal(
                      "https://geekflare.com/cdn-cgi/image/width=1200,height=630,fit=crop,quality=90,format=auto,onerror=redirect,metadata=none/wp-content/uploads/sites/24/2022/06/best-android-watchface-apps.jpg",
                      "Obtener mi token Wear Os",
                      "wearos",
                      "Reloj inteligente"
                    )
                  }
                  text="Obtener mi token Wear Os"
                  imageUrl="https://geekflare.com/cdn-cgi/image/width=1200,height=630,fit=crop,quality=90,format=auto,onerror=redirect,metadata=none/wp-content/uploads/sites/24/2022/06/best-android-watchface-apps.jpg"
                />
                <HoverTiltCard
                  onClick={() =>
                    handleOpenModal(
                      "https://external-preview.redd.it/qSjTwzoy1wCSSW0DVXV8NWjdgx8fcH13ZunOhqE7ODo.jpg?width=640&crop=smart&auto=webp&s=e8e6dd488e57c1b48233d2b5f1c0b0381d5144a3",
                      "Obtener mi token Alexa",
                      "alexa",
                      "Alexa"
                    )
                  }
                  text="Obtener mi token Alexa"
                  imageUrl="https://external-preview.redd.it/qSjTwzoy1wCSSW0DVXV8NWjdgx8fcH13ZunOhqE7ODo.jpg?width=640&crop=smart&auto=webp&s=e8e6dd488e57c1b48233d2b5f1c0b0381d5144a3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} imageUrl={modalImage}>
        <div className="mx-auto my-4 w-96 mb-3">
          {contenido ? (
            <div className="w-full">
              <h1 className="text-lg font-black text-secondaryBlue text-center">
                Puede generar un nuevo token en {formatTime(time)} minutos
              </h1>
            </div>
          ) : (
            <>
              <h1 className="text-lg font-black text-secondaryBlue text-center">
                {ModalTexto}
              </h1>
              <p className="text-sm text-secondaryBlue font-bold text-center mt-3">
                El token solo es de un uso.
              </p>
            </>
          )}
        </div>
        <div className="flex gap-10 mt-10">
          {contenido ? (
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-full flex justify-center items-center space-x-2">
                {tokenAcceso.split("").map((char, index) => (
                  <p
                    key={index}
                    className="bg-secondaryBlue text-primaryBlue text-lg font-bold pt-1 pb-2 px-3 flex justify-center items-center rounded-md"
                  >
                    {char}
                  </p>
                ))}
              </div>
              <p className="text-sm text-red-600 font-bold text-center mt-3">
                Nota: Este token solo funcionara en tu dispostivo {dispositivo}
              </p>
              <button
                onClick={cerrarModal}
                className="bg-red-500 w-full mt-3 text-white p-2 rounded-lg font-bold"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setOpen(false)}
                className="bg-red-500 w-full text-white p-2 rounded-lg font-bold"
              >
                Cancelar
              </button>
              <ButtonCode onClick={handleObtenerToken} />
            </>
          )}
        </div>
      </Modal>

      {loading && <Loader />}
    </Layout>
  );
}

function Modal({ open, onClose, children, imageUrl }) {
  return (
    <div
      className={`fixed z-50 inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-gray-900 bg-opacity-70" : "invisible"
      }`}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-40" />
      <div
        className={`relative bg-white rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: "0.2", // Ajusta la opacidad de la imagen de fondo aquí
            zIndex: "-1", // Asegura que la imagen esté detrás del contenido del modal
            borderRadius: "inherit", // Para heredar el borde redondeado
          }}
        />
        {children}
      </div>
    </div>
  );
}

export default Perfil;
