import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import AdminLayout from "../AdminLayout";
import CrudTablePet from "./CrudTablePet";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../components/Ui/Loader";
import Success from "../../../components/Ui/Alertas/Success";
import Danger from "../../../components/Ui/Alertas/Danger";

function AdminMascotas() {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [responseErrors, setResponseErrors] = useState(false);
  const [responseSuccess, setResponseSuccess] = useState(false);
  const [db, setDb] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (token) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/v1/pet`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then(({ data }) => setDb(data))
        .catch((error) => console.log(error));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [db]);

  const [id, setId] = useState("");
  const habilitar = (id) => {
    setId(id);
    setOpen4(true);
  };

  const deshabilitar = (id) => {
    setId(id);
    setOpen5(true);
  };

  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  const clearFields = () => {
    setId("");
  };

  const handleCanceled = () => {
    clearFields();
    setOpen4(false);
    setOpen5(false);
  };

  const confirmHabilitar = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/pet/habilitar/${id}`,
        {},
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setResponseSuccess(response.data.msj);
    } catch (error) {
      if (error.response) {
        setResponseErrors(error.response.data);
      } else {
        setResponseErrors("Error al conectar con el servidor");
      }
    }
    setOpen4(false);
    setLoading(false);
  };

  const confirmDeshabilitar = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/pet/deshabilitar/${id}`,
        {},
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setResponseSuccess(response.data.msj);
    } catch (error) {
      if (error.response) {
        setResponseErrors(error.response.data);
      } else {
        setResponseErrors("Error al conectar con el servidor");
      }
    }
    setOpen5(false);
    setLoading(false);
  };

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

  return (
    <AdminLayout>
      <HeaderAdmin texto="MASCOTAS ADMIN" linkText="mascotas administrador" />
      {loading && <Loader />}
      {responseSuccess && <Success mensaje={responseSuccess} />}
      {responseErrors && <Danger mensaje={responseErrors} />}
      <div className="px-10">
        <h1 className="my-10 bg-primaryBlue text-secondaryBlue p-2 text-4xl font-bold text-center">
          Mascotas
        </h1>
        <CrudTablePet
          data={db}
          habilitar={habilitar}
          deshabilitar={deshabilitar}
        />

        <Modal open={open4} onClose={() => setOpen4(false)}>
          <div className="mx-auto my-4 w-96 mb-3">
            <h1 className="text-lg font-black text-gray-800 text-center">
              Habilitar Mascota
            </h1>
            <p className="text-sm text-gray-500 text-center mt-3">
              ¿Estas seguro que deseas habilitar esta mascota?
            </p>
          </div>
          <div className="flex gap-10 mt-10">
            <button
              onClick={handleCanceled}
              className="bg-red-500 w-full text-white p-2 rounded-lg font-bold"
            >
              Cancelar
            </button>
            <button
              onClick={confirmHabilitar}
              className="bg-primaryBlue w-full text-secondaryBlue p-2 rounded-lg font-bold"
            >
              Confirmar
            </button>
          </div>
        </Modal>

        <Modal open={open5} onClose={() => setOpen5(false)}>
          <div className="mx-auto my-4 w-96 mb-3">
            <h1 className="text-lg font-black text-gray-800 text-center">
              Deshabilitar Mascota
            </h1>
            <p className="text-sm text-gray-500 text-center mt-3">
              ¿Estas seguro que deseas deshabilitar esta mascota?
            </p>
          </div>
          <div className="flex gap-10 mt-10">
            <button
              onClick={handleCanceled}
              className="bg-red-500 w-full text-white p-2 rounded-lg font-bold"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDeshabilitar}
              className="bg-primaryBlue w-full text-secondaryBlue p-2 rounded-lg font-bold"
            >
              Confirmar
            </button>
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
}

function Modal({ open, onClose, children }) {
  return (
    <div
      className={`fixed z-40 inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-gray-900 bg-opacity-70" : "invisible"
      }`}
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

export default AdminMascotas;
