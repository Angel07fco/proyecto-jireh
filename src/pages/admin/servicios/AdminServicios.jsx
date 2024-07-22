import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import AdminLayout from "../AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../components/Ui/Loader";
import CrudTableServ from "./CrudTableServ";
import Button from "../../../components/Ui/Button";
import Label from "../../../components/Ui/Label";
import Success from "../../../components/Ui/Alertas/Success";
import Danger from "../../../components/Ui/Alertas/Danger";

function AdminServicios() {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [responseErrors, setResponseErrors] = useState(false);
    const [responseSuccess, setResponseSuccess] = useState(false);
    const [db, setDb] = useState([]);
    const [mensajeError, setMensajeError] = useState("");

    useEffect(() => {
        setLoading(true);
        if (token) {
            axios
                .get(`https://backend-jireh.onrender.com/api/v1/services/adminservices`, {
                    headers: {
                        "x-access-token": token
                    },
                })
                .then(({ data } ) => setDb(data))
                .catch((error) => console.log(error))
        }
        setLoading(false);
    }, [db])

    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [description, setDescription] = useState("");

    const editData = (el) => {
        setOpen3(true)
        setId(el._id);
        setSelectedImage(el.img);
        setNombre(el.name);
        setSelectedIcono(el.icono);
        setDescription(el.description);
    };

    const deleteData = (id) => {
        setOpen2(true);
        setId(id);
    };

    const habilitar = (id) => {
        setOpen4(true);
        setId(id);
    };

    const deshabilitar = (id) => {
        setOpen5(true);
        setId(id);
    };

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);

    const clearFields = () => {
        setId("");
        setSelectedImage("");
        setNombre("");
        setSelectedIcono("");
        setDescription("");
        setSelectedImage("");
        setMensajeError("");
    };

    const handleCanceled = () => {
        clearFields();
        setOpen(false);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        setOpen5(false);
    };

    const handleRegisterServicio = async () => {
        if ( nombre === "" || selectedIcono === "" || selectedImage === "" || description === "" ) {
            setMensajeError("Todos los campos son obligatorios");
            return;
        } else {
            setLoading(true);
            const data = {
                "name": nombre,
                "icono": selectedIcono,
                "img": selectedImage,
                "description": description
            };
            console.log(data)
            try {
                const response = await axios.post(
                    "https://backend-jireh.onrender.com/api/v1/services/newservice",
                    data,
                    {
                        headers: {
                            "x-access-token": token
                        }
                    }
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
            setOpen(false);
            clearFields();
            setLoading(false);
        }
    };

    const confirmUpdate = async () => {
        if ( nombre === "" || selectedIcono === "" || selectedImage === "" || description === "" ) {
            setMensajeError("Todos los campos son obligatorios");
            return;
        } else {
            setLoading(true);
            const data = {
                "name": nombre,
                "icono": selectedIcono,
                "img": selectedImage,
                "description": description
            };
            console.log(data)
            try {
                const response = await axios.put(
                    `https://backend-jireh.onrender.com/api/v1/services/${id}`,
                    data,
                    {
                        headers: {
                            "x-access-token": token
                        }
                    }
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
            setOpen3(false);
            clearFields();
            setLoading(false);
        }
    };

    const confirmDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`https://backend-jireh.onrender.com/api/v1/services/${id}`);
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

    const confirmHabilitar = async () => {
        setLoading(true);
        try {
            const response = await axios.put(
                `https://backend-jireh.onrender.com/api/v1/services/habilitar/${id}`,
                {},
                {
                    headers: {
                        "x-access-token": token
                    }
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
                `https://backend-jireh.onrender.com/api/v1/services/deshabilitar/${id}`,
                {},
                {
                    headers: {
                        "x-access-token": token
                    }
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

    const [selectedImage, setSelectedImage] = useState("");
    const uploadImage = async (e) => {
        setLoading(true);
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "proyectojireh");

        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dl8odylct/image/upload",
            data
        );
        console.log(response.data)
        setSelectedImage(response.data.secure_url);
        console.log(response.data.secure_url);
        setLoading(false);
    };

    const [selectedIcono, setSelectedIcono] = useState("");
    const uploadIcono = async (e) => {
        setLoading(true);
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "proyectojireh");

        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dl8odylct/image/upload",
            data
        );
        console.log(response.data)
        setSelectedIcono(response.data.secure_url);
        console.log(response.data.secure_url);
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
            <HeaderAdmin texto="SERVICIOS ADMIN" linkText="servicios administrador" />
            {loading && <Loader />}
            {responseSuccess && <Success mensaje={responseSuccess} />}
            {responseErrors && <Danger mensaje={responseErrors} />}
            <div className="px-10">
                <h1 className="my-10 bg-primaryBlue text-secondaryBlue p-2 text-4xl font-bold text-center">
                    Servicios
                </h1>
                <Button texto="Agregar un nuevo servicio" onClick={() => setOpen(true)} />
                <CrudTableServ
                    data={db}
                    editData={editData}
                    deleteData={deleteData}
                    habilitar={habilitar}
                    deshabilitar={deshabilitar}
                />

                <Modal open={open} onClose={() => setOpen(false)}>
                    <div className="mx-auto my-4 w-96 mb-3">
                        <h1 className="text-xl font-black text-gray-800 text-center">
                            Agregar un nuevo servicio
                        </h1>
                    </div>

                    <div className="my-3">
                        <Label>Nombre del servicio</Label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 space-x-5">
                        <div className="">
                            <Label>Imagen</Label>
                            <div className="w-[80%] rounded-full mb-5">
                                {selectedImage && (
                                    <img src={selectedImage} className="w-28 h-28" alt="Vista previa" />
                                )}
                                <div className="relative inline-block">
                                    <label className="flex items-center justify-center bg-gray-200 text-gray-700 border border-gray-300 rounded-md cursor-pointer w-48 h-10">
                                        <span>Seleccionar archivo</span>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={uploadImage}
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <Label>Icono</Label>
                            <div className="w-[80%] rounded-full mb-5">
                                {selectedIcono && (
                                    <img src={selectedIcono} className="w-28 h-28" alt="Vista previa" />
                                )}
                                <div className="relative inline-block">
                                    <label className="flex items-center justify-center bg-gray-200 text-gray-700 border border-gray-300 rounded-md cursor-pointer w-48 h-10">
                                        <span>Seleccionar archivo</span>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={uploadIcono}
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-3">
                        <Label>Descripción del servicio</Label>
                        <textarea
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                            onClick={handleRegisterServicio}
                            className="bg-primaryBlue w-full text-secondaryBlue p-2 rounded-lg font-bold"
                        >
                            Confirmar
                        </button>
                    </div>
                </Modal>

                <Modal open={open2} onClose={() => setOpen2(false)}>
                    <div className='mx-auto my-4 w-96 mb-3'>
                        <h1 className='text-lg font-black text-gray-800 text-center'>Eliminar Servicio</h1>
                        <p className='text-sm text-gray-500 text-center mt-3'>¿Estas seguro que deseas eliminar este servicio?</p>
                    </div>
                    <div className="flex gap-10 mt-10">
                        <button
                            onClick={handleCanceled}
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

                <Modal open={open4} onClose={() => setOpen4(false)}>
                    <div className='mx-auto my-4 w-96 mb-3'>
                        <h1 className='text-lg font-black text-gray-800 text-center'>Habilitar Servicio</h1>
                        <p className='text-sm text-gray-500 text-center mt-3'>¿Estas seguro que deseas habilitar este servicio?</p>
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
                    <div className='mx-auto my-4 w-96 mb-3'>
                        <h1 className='text-lg font-black text-gray-800 text-center'>Deshabilitar Servicio</h1>
                        <p className='text-sm text-gray-500 text-center mt-3'>¿Estas seguro que deseas deshabilitar este servicio?</p>
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

                <Modal open={open3} onClose={() => setOpen3(false)}>
                    <div className="mx-auto my-4 w-96 mb-3">
                        <h1 className="text-xl font-black text-gray-800 text-center">
                            Editar Servicio
                        </h1>
                    </div>

                    <div className="my-3">
                        <Label>Nombre del servicio</Label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 space-x-5">
                        <div className="">
                            <Label>Imagen</Label>
                            <div className="w-[80%] rounded-full mb-5">
                                {selectedImage && (
                                    <img src={selectedImage} className="w-28 h-28" alt="Vista previa" />
                                )}
                                <div className="relative inline-block">
                                    <label className="flex items-center justify-center bg-gray-200 text-gray-700 border border-gray-300 rounded-md cursor-pointer w-48 h-10">
                                        <span>Seleccionar archivo</span>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={uploadImage}
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <Label>Icono</Label>
                            <div className="w-[80%] rounded-full mb-5">
                                {selectedIcono && (
                                    <img src={selectedIcono} className="w-28 h-28" alt="Vista previa" />
                                )}
                                <div className="relative inline-block">
                                    <label className="flex items-center justify-center bg-gray-200 text-gray-700 border border-gray-300 rounded-md cursor-pointer w-48 h-10">
                                        <span>Seleccionar archivo</span>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={uploadIcono}
                                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-3">
                        <Label>Descripción del servicio</Label>
                        <textarea
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
            {loading === true ? <Loader /> :  null}
        </AdminLayout>
    )
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

export default AdminServicios;