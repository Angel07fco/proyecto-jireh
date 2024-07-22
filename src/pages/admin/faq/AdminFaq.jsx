import { useEffect, useState } from "react";
import Loader from "../../../components/Ui/Loader";
import AdminLayout from "../AdminLayout";
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import Button from "../../../components/Ui/Button";
import axios from "axios";
import CrudTableFaq from "./CrudTableFaq";
import Label from "../../../components/Ui/Label";
import Success from "../../../components/Ui/Alertas/Success";
import Danger from "../../../components/Ui/Alertas/Danger";

function AdminFaq() {
    const [loading, setLoading] = useState(false);
    const [responseErrors, setResponseErrors] = useState(false);
    const [responseSuccess, setResponseSuccess] = useState(false);
    const [db, setDb] = useState([]);
    const [mensajeError, setMensajeError] = useState("");

    useEffect(() => {
        setLoading(true);
        axios.get(
            `https://backend-jireh.onrender.com/api/v1/preguntas-frecuentes`
        )
        .then(({ data }) => setDb(data))
        .catch((error) => console.log(error));
        setLoading(false);
    }, [db]);

    const [id, setId] = useState("");
    const [pregunta, setPregunta] = useState("");
    const [respuesta, setRespuesta] = useState("");

    const editData = (el) => {
        setOpen3(true);
        setId(el._id);
        setPregunta(el.pregunta);
        setRespuesta(el.respuesta);
    };

    const deleteData = (el) => {
        setOpen2(true);
        setId(el._id);
    };

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const handleCanceled = () => {
        setId("");
        setPregunta("");
        setRespuesta("");
        setMensajeError("");
        setOpen(false);
        setOpen2(false);
        setOpen3(false);
    };

    const handleRegisterFaq = async () => {
        if (pregunta === "" || respuesta === "") {
            if (pregunta === "") {
                setMensajeError("El campo pregunta es obligatorio");
                return;
            } else if (respuesta === "") {
                setMensajeError("El campo respuesta es obligatorio");
                return;
            } else {
                setMensajeError("Todos los campos son obligatorios");
                return;
            }
        }
        setLoading(true);
        const data = {
            pregunta: pregunta,
            respuesta: respuesta,
            activa: true
        };
        try {
            const response = await axios.post(
                "https://backend-jireh.onrender.com/api/v1/preguntas-frecuentes/",
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
        setId("");
        setPregunta("");
        setRespuesta("");
        setOpen(false);
        setLoading(false);
    };

    const confirmUpdate = async () => {
        if (pregunta === "" || respuesta === "") {
            if (pregunta === "") {
                setMensajeError("El campo pregunta es obligatorio");
                return;
            } else if (respuesta === "") {
                setMensajeError("El campo respuesta es obligatorio");
                return;
            } else {
                setMensajeError("Todos los campos son obligatorios");
                return;
            }
        }
        setLoading(true);
        const data = {
            pregunta: pregunta,
            respuesta: respuesta,
            activa: true
        };
        try {
            const response = await axios.put(
                `https://backend-jireh.onrender.com/api/v1/preguntas-frecuentes/${id}`,
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
        setId("");
        setPregunta("");
        setRespuesta("");
        setOpen3(false);
        setLoading(false);
    };

    const confirmDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`https://backend-jireh.onrender.com/api/v1/preguntas-frecuentes/${id}`);
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
            <HeaderAdmin
                texto="PREGUNTAS FRECUENTES ADMIN"
                linkText="preguntas frecuentes administrador"
            />
            {loading && <Loader />}
            {responseSuccess && <Success mensaje={responseSuccess} />}
            {responseErrors && <Danger mensaje={responseErrors} />}
            <div className="px-10">
                <h1 className="my-10 bg-primaryBlue text-secondaryBlue p-2 text-4xl font-bold text-center">
                    Preguntas Frecuentes
                </h1>
                <Button texto="Agregar una nueva pregunta" onClick={() => setOpen(true)} />
                <CrudTableFaq
                    data={db}
                    editData={editData}
                    deleteData={deleteData}
                />

                <Modal open={open} onClose={() => setOpen(false)}>
                    <div className="mx-auto my-4 w-96 mb-3">
                        <h1 className="text-xl font-black text-gray-800 text-center">
                            Agregar una nueva pregunta frecuente
                        </h1>
                    </div>
                    <div className="my-5">
                        <Label>Pregunta</Label>
                        <textarea
                            type="text"
                            value={pregunta}
                            onChange={(e) => setPregunta(e.target.value)}
                            className="w-full h-12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="my-5">
                        <Label>Respuesta</Label>
                        <textarea
                            type="text"
                            value={respuesta}
                            onChange={(e) => setRespuesta(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-5">
                        <p className="text-red-500 font-bold">{mensajeError}</p>
                    </div>

                    <div className="flex gap-10 mt-5">
                        <button
                            onClick={handleCanceled}
                            className="bg-red-500 w-full text-white p-2 rounded-lg font-bold"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleRegisterFaq}
                            className="bg-primaryBlue w-full text-secondaryBlue p-2 rounded-lg font-bold"
                        >
                            Confirmar
                        </button>
                    </div>
                </Modal>

                <Modal open={open2} onClose={() => setOpen2(false)}>
                    <div className='mx-auto my-4 w-96 mb-3'>
                        <h1 className='text-lg font-black text-gray-800 text-center'>Eliminar Pregunta Frecuente</h1>
                        <p className='text-sm text-gray-500 text-center mt-3'>¿Estas seguro que deseas eliminar la Pregunta Frecuente?</p>
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
                            Editar Pregunta Frecuente
                        </h1>
                    </div>
                    <div className="my-5">
                        <Label>Pregunta</Label>
                        <textarea
                            type="text"
                            value={pregunta}
                            onChange={(e) => setPregunta(e.target.value)}
                            className="w-full h-12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="my-5">
                        <Label>Respuesta</Label>
                        <textarea
                            type="text"
                            value={respuesta}
                            onChange={(e) => setRespuesta(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-5">
                        <p className="text-red-500 font-bold">{mensajeError}</p>
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

export default AdminFaq;
