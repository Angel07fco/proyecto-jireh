import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState, useEffect } from "react";
import { DivOrigami } from "./ImageOrigami";

const HeaderHome = () => {
  const [index, setIndex] = useState(0);
  const mascotas = [
    "🏠 Animales de domesticos:",
    "🐕 Perro",
    "🐈 Gato",
    "🐇 Conejo",
    "🐁 Hamster",
    "🐢 Tortuga",
    "🐟 Pez",
    "🦜 Loro",
    "🚜 Animales de granja:",
    "🐎 Caballo",
    "🐄 Vaca",
    "🐂 Toro",
    "🐏 Oveja",
    "🐖 Cerdo",
    "🐓 Gallo",
    "🐔 Gallina",
    "🦚 Pavo Real",
  ];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % mascotas.length);
    }, 2000);

    return () => clearInterval(intervalId);
  });
  return (
    <div className="bg-primaryBlue grid md:grid-cols-2 h-auto">
      <div className="md:mr-20 mx-10">
        <div className="md:mt-24 mt-8 md:ml-28">
          <h1 className="text-secondaryBlue font-bold md:text-4xl text-xl">
            En JIREH nos preocupamos por el bienestar de tu(s) amiguit@(s):
          </h1>
          <span>
            <span className="text-secondaryBlue font-bold md:text-4xl text-xl">
              {mascotas[index]}
            </span>
          </span>
        </div>
        <div className="md:ml-28 mt-10 bg-white rounded-xl py-4 px-8 mb-10">
          <div className="flex items-center justify-between">
            <h1 className="text-secondaryBlue text-xl font-bold">
              Quieres saber más de JIREH
            </h1>
            <div className="flex items-center justify-between">
              <CalendarMonthIcon fontSize="small" />
              <h2 className="text-secondaryBlue hover:underline cursor-pointer">
                ¡Pide tu cita ahora!
              </h2>
            </div>
          </div>
          <div className="border border-primaryBlue flex flex-row items-center justify-between p-3 rounded-xl mt-2 mb-2">
            <input
              placeholder="Ingrese su correo electrónico"
              className="w-full h-8 border border-none"
            />
            <div className="flex flex-row">
              <div className="bg-verde py-2 px-2 rounded-md mr-2 cursor-pointer">
                <NearMeOutlinedIcon />
              </div>
              <div className="bg-primaryBlue py-2 px-2 rounded-md cursor-not-allowed">
                <MarkEmailReadOutlinedIcon className="text-white" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-textoNota text-xs">
              <span className="font-bold">¡Nota! </span>Al ingresar y enviar tu
              correo electrónico se te proporcionará más información acerca de
              lo que representa JIREH Community para los amantes de los
              animales.
            </h2>
          </div>
        </div>
      </div>
      <div className="hidden md:block" style={{ height: "85vh" }}>
        <DivOrigami />
      </div>
    </div>
  );
};

export default HeaderHome;
