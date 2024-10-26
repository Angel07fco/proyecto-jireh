import ButtonDisabled from "../Ui/ButtonDisabled";
import Button from "../../components/Ui/Button";
import Loader from "../../components/Ui/Loader";
import Label from "../../components/Ui/Label";
import Success from "../Ui/Alertas/Success";
import Danger from "../Ui/Alertas/Danger";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function FormCita() {
  const [responseSuccess, setResponseSuccess] = useState("");
  const [responseErrors, setResponseErrors] = useState("");

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

  const [selectedVetId, setSelectedVetId] = useState("");
  const handleSelectVet = (vetId) => {
    setSelectedVetId(vetId);
  };

  const [selectedFecha, setSelectedFecha] = useState("");
  const handleSelectFecha = (fecha) => {
    setSelectedFecha(fecha);
  };

  const [selectedHora, setSelectedHora] = useState("");
  const handleSelectHora = (hora) => {
    setSelectedHora(hora);
  };

  const [step, setStep] = useState(1);
  const handleNext = () => {
    setStep(step + 1);
  };
  const handleBack = () => {
    setStep(step - 1);
  };

  const handleRegister = () => {};

  return (
    <div>
      <ol className="flex mt-10 items-center w-full text-sm font-medium text-center sm:text-base">
        <li
          className={`flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
        >
          <div className="w-8 h-8 flex items-center justify-center border-2 border-secondaryBlue bg-secondaryBlue rounded-full">
            <h1 className="text-primaryBlue">1</h1>
          </div>
        </li>
        <li
          className={`flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
        >
          <div
            className={`w-8 h-8 flex items-center justify-center border-2 border-secondaryBlue  rounded-full ${
              step !== 1 ? "bg-secondaryBlue" : ""
            }`}
          >
            <h1
              className={` ${
                step !== 1 ? "text-primaryBlue" : "text-secondaryBlue"
              }`}
            >
              2
            </h1>
          </div>
        </li>
        <li className={`flex items-center `}>
          <div
            className={`w-8 h-8 flex items-center justify-center border-2 border-secondaryBlue  rounded-full ${
              step === 3 ? "bg-secondaryBlue" : ""
            }`}
          >
            <h1
              className={` ${
                step === 3 ? "text-primaryBlue" : "text-secondaryBlue"
              }`}
            >
              3
            </h1>
          </div>
        </li>
      </ol>

      {step === 1 && (
        <CardForm1 onNext={handleNext} onSelectVet={handleSelectVet} />
      )}
      {step === 2 && (
        <CardForm2
          onNext={handleNext}
          veterinario={selectedVetId}
          onBack={handleBack}
          onSelectFecha={handleSelectFecha}
          onSelectHora={handleSelectHora}
        />
      )}
      {step === 3 && (
        <CardForm3
          onBack={handleBack}
          onRegister={handleRegister}
          veterinario={selectedVetId}
          fecha={selectedFecha}
          hora={selectedHora}
        />
      )}

      <Modal />
    </div>
  );
}

function CardForm1({ onSelectVet, onNext }) {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [medicos, setMedicos] = useState([]);
  const [selectedMedicoIndex, setSelectedMedicoIndex] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (token) {
      axios
        .get(`http://localhost:5000/api/v1/veterinario/`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then(({ data }) => {
          setMedicos(data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [token]);

  const handleCardClick = (index) => {
    setSelectedMedicoIndex(index);
    onSelectVet(medicos[index]._id);
  };

  return (
    <div className="w-full bg-white h-auto justify-center items-center rounded-xl">
      <div className="flex items-center bg-secondaryBlue p-2 mt-10">
        <h1 className="font-bold text-primaryBlue text-xl">Paso 1:</h1>
        <h1 className="ml-2 text-primaryBlue text-xl">
          Seleccione el Médico de su confianza
        </h1>
      </div>
      <div className="w-full grid grid-cols-2 space-x-10 py-10">
        {medicos.map((item, index) => (
          <div
            key={index}
            className={`border border-secondaryBlue cursor-pointer rounded-xl p-5 ${
              selectedMedicoIndex === index ? "bg-primaryBlue" : ""
            }`}
            onClick={() => handleCardClick(index)}
          >
            <img src={item.img} />
            <h1 className="font-bold text-xl text-secondaryBlue">
              Médico Veterinario:
            </h1>
            <h1 className="text-secondaryBlue">{item.nombre}</h1>
          </div>
        ))}
      </div>
      {selectedMedicoIndex !== null ? (
        <Button onClick={onNext} texto="Siguiente" />
      ) : (
        <ButtonDisabled texto="Siguiente" />
      )}
      {loading && <Loader />}
    </div>
  );
}

function CardForm2({
  onNext,
  onBack,
  veterinario,
  onSelectFecha,
  onSelectHora,
}) {
  const [startDate, setStartDate] = useState("");
  const [selectedHora, setSelectedHora] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

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
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const obtenerHorarios = async () => {
    setLoading(true);
    if (startDate !== "") {
      const formattedDate = format(startDate, "dd-MM-yyyy");
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/cita/citas/${veterinario}/${formattedDate}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        setHorarios(response.data);

        const response2 = await axios.get(
          `http://localhost:5000/api/v1/horario/${veterinario}/${formattedDate}`
        );
        setHorariosDisponibles(response2.data.horariosDisponibles);

        console.log("Citas:", response.data);
        console.log(
          "Horarios disponibles:",
          response2.data.horariosDisponibles
        );
        if (response2.data.horariosDisponibles === undefined) {
          setOpen(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Seleccion una fecha");
    }
    setLoading(false);
  };

  let nuevosHorarios = [];

  // Verificar que horarios y horariosDisponibles no sean nulos
  if (horarios && horariosDisponibles) {
    const horas = horarios.map((item) => item.hora);
    // Filtrar los horarios únicos en cada arreglo
    const horariosUnicos1 = horariosDisponibles.filter(
      (hora) => !horas.includes(hora)
    );
    const horariosUnicos2 = horas.filter(
      (hora) => !horariosDisponibles.includes(hora)
    );

    // Combinar los horarios únicos de ambos arreglos
    nuevosHorarios = [...horariosUnicos1, ...horariosUnicos2];
  }

  // Verificar si ya se ha seleccionado fecha y hora
  const canProceed = startDate !== "" && selectedHora !== "";

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-auto flex flex-col rounded-xl cursor-pointer">
      <div className="flex items-center bg-secondaryBlue p-2 mt-10">
        <h1 className="font-bold text-primaryBlue text-xl">Paso 2:</h1>
        <h1 className="ml-2 text-primaryBlue text-xl">
          Seleccione dia y hora de la cita
        </h1>
      </div>

      <div className="mb-5">
        <div className="md:flex flex-row md:space-x-4 mt-3 items-center justify-center">
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
                  onSelectFecha(date); // Actualiza el estado de selectFecha
                }}
                filterDate={isValidDate}
                placeholderText="Selecciona una fecha"
                locale={es}
                dateFormat="dd/MM/yyyy"
                weekStartsOn={1}
              />
            </div>
          </div>
          <div className="w-full mt-3">
            <Button
              texto="Ver horarios"
              bg="secondaryBlue"
              textoColor="white"
              onClick={obtenerHorarios}
            />
          </div>
        </div>
      </div>

      <div className="md:flex flex-row md:space-x-4 mb-5">
        {nuevosHorarios.length === 0 ? (
          <div className="w-full border border-red-500 flex items-center justify-center p-2">
            <h1 className="text-red-500 text-xs font-bold">
              Para agendar la hora de la cita primero debe comprobar la
              disponibilidad de horarios del Médico y el dia.
            </h1>
          </div>
        ) : (
          <div className="w-full">
            <Label>Hora</Label>
            <select
              className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                            focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
              id="hora"
              onChange={(e) => {
                setSelectedHora(e.target.value); // Paso 1: Actualiza el estado de selectedHora
                onSelectHora(e.target.value); // Paso 2: Llama a la función onSelectHora con el valor seleccionado
              }}
            >
              <option value="">Seleccione una opción</option>
              {nuevosHorarios.map((item, index) => (
                <option
                  key={index}
                  value={item}
                  className="bg-secondaryBlue text-primaryBlue"
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex space-x-10">
        <Button onClick={onBack} texto="Atrás">
          Atrás
        </Button>
        {canProceed === true ? (
          <Button onClick={onNext} texto="Siguiente" />
        ) : (
          <ButtonDisabled texto="Siguiente" />
        )}
      </div>
      {loading && <Loader />}

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="mx-auto my-4 w-96">
          <h1 className="text-lg font-black text-gray-800 text-center">
            Horarios Disponibles
          </h1>
          <p className="text-sm text-gray-500 text-center mt-3">
            El Médico aun no agenda sus horarios disponibles para esa fecha.
          </p>
          <p className="font-bold text-red-500 text-center mt-3">
            Por favor seleccione otra fecha
          </p>
        </div>
        <div className="flex gap-10 mt-5">
          <button
            onClick={() => setOpen(false)}
            className="bg-red-500 w-full text-white p-2 rounded-lg font-bold"
          >
            Entendido
          </button>
        </div>
      </Modal>
    </div>
  );
}

function CardForm3({ onBack, onRegister, veterinario, fecha, hora }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState("");
  const [servicio, setServicio] = useState("");
  const [mascota, setMascota] = useState("");
  const [comment, setComment] = useState("");
  const [responseSuccess, setResponseSuccess] = useState("");
  const [responseErrors, setResponseErrors] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (token) {
      axios
        .get(`http://localhost:5000/api/v1/user/obtenerusuario/${token}`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then(({ data }) => setUser(data))
        .catch((error) => console.log(error));
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/services/`)
      .then(({ data }) => setServices(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const [selectedServiceIndex, setSelectedServiceIndex] = useState("");
  const handleCardClick = (index) => {
    setSelectedServiceIndex(index);
    setServicio(services[index]._id);
  };

  const [selectedMascotaIndex, setSelectedMascotaIndex] = useState("");
  const handleMascotaClick = (index) => {
    setSelectedMascotaIndex(index);
    setMascota(pets[index]._id);
  };

  const [pets, setPets] = useState([]);
  useEffect(() => {
    setLoading(true);
    if (token) {
      axios
        .get(`http://localhost:5000/api/v1/pet/${user._id}`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then(({ data }) => setPets(data))
        .catch((error) => console.log(error));
    }
    setLoading(false);
  }, [user]);

  // Verificar si ya se ha seleccionado fecha y hora
  const canProceed = servicio !== "" && mascota !== "" && comment !== "";

  const [open, setOpen] = useState(false);

  const handleConfirmCita = async () => {
    const data = {
      usuario: user._id,
      medico: veterinario,
      fecha: formatDate(fecha),
      hora: hora,
      servicio: servicio,
      mascota: mascota,
      comentarios: comment,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/cita/newcita",
        data,
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setResponseSuccess(response.data.msj);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        setResponseErrors(error.response.data);
      } else {
        setResponseErrors("Error al conectar con el servidor");
      }
    }
    setOpen(false);
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
        navigate("/historial-citas");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [responseSuccess]);

  return (
    <div className="w-full h-auto flex flex-col rounded-xl cursor-pointer">
      {responseErrors && <Danger mensaje={responseErrors} />}
      {responseSuccess && <Success mensaje={responseSuccess} />}
      <div className="flex items-center bg-secondaryBlue p-2 mt-10">
        <h1 className="font-bold text-primaryBlue text-xl">Paso 3:</h1>
        <h1 className="ml-2 text-primaryBlue text-xl">
          Mascota, servicio y comentarios
        </h1>
      </div>

      <div className="my-5">
        <h1 className="font-medium text-lg mb-3  text-secondaryBlue">
          Seleccione un servicio:
        </h1>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {services.map((item, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              className={`border border-secondaryBlue p-2 rounded-xl flex flex-col justify-center items-center ${
                selectedServiceIndex === index ? "bg-primaryBlue" : ""
              }`}
            >
              <img src={item.icono} className="w-10 h-10" />
              <h1 className="text-sm text-center">{item.name}</h1>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <div className="mt-2">
          <div className="flex justify-between items-center">
            <h1 className="font-medium text-lg mb-3  text-secondaryBlue">
              Seleccione una mascota:
            </h1>
            <Link
              to="/mascotas"
              className="block underline text-sm font-medium leading-6 text-gray-900"
            >
              Agregar una nueva mascota
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {pets.map((item, index) => (
              <div
                key={index}
                onClick={() => handleMascotaClick(index)}
                className={`border border-secondaryBlue p-2 rounded-xl flex flex-col justify-center items-center ${
                  selectedMascotaIndex === index ? "bg-primaryBlue" : ""
                }`}
              >
                <img src={item.img} className="w-10 h-10" />
                <h1 className="text-sm text-center">{item.name}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-5">
        <Label>Comentarios adicionales</Label>
        <div className="mt-2">
          <textarea
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                        ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                        focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
            type="text"
            placeholder="Este espacio es para agregar detalles extras a la cita."
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </div>

      <div className="flex space-x-10">
        <Button onClick={onBack} texto="Atrás">
          Atrás
        </Button>
        {canProceed === true ? (
          <Button texto="Agendar" onClick={() => setOpen(true)} />
        ) : (
          <ButtonDisabled texto="Agendar" />
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="mx-auto my-4 w-96 mb-3">
          <h1 className="text-lg font-black text-gray-800 text-center">
            Confirmar cita
          </h1>
          <p className="text-sm text-gray-500 text-center mt-3">
            ¿Deseas agendar tu cita?
          </p>
        </div>
        <div className="flex gap-10 mt-10">
          <button
            onClick={() => setOpen(false)}
            className="bg-red-500 w-full text-white p-2 rounded-lg font-bold"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmCita}
            className="bg-primaryBlue w-full text-secondaryBlue p-2 rounded-lg font-bold"
          >
            Confirmar
          </button>
        </div>
      </Modal>

      {loading && <Loader />}
    </div>
  );
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Agrega ceros iniciales si es necesario
  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  return `${formattedDay}-${formattedMonth}-${year}`;
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

export default FormCita;
