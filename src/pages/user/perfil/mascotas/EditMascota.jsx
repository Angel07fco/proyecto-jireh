import { Link, useLocation } from "react-router-dom";
import Layout from "../../Layout";
import Aside from "../../../../components/Aside";
import { useEffect, useState } from "react";
import { Input } from "../../../../components/Ui/Input";
import Label from "../../../../components/Ui/Label";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { arraypets } from "../../../../helpers/ArrayPets";
import Loader from "../../../../components/Ui/Loader";
import Success from "../../../../components/Ui/Alertas/Success";
import Danger from "../../../../components/Ui/Alertas/Danger";

function EditMascota() {
    const { state } = useLocation();
    const { id } = state;
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [responseErrors, setResponseErrors] = useState(false);
    const [responseSuccess, setResponseSuccess] = useState(false);

    const { register, formState: { errors }, watch } = useForm();
    const selectedCategoria = watch("categoria", "");

    const [loading, setLoading] = useState(false);

    // Imagen
    const [renderImg, setRenderImg] = useState(false);

    // Nombre
    const [renderName, setRenderName] = useState(false);

    // Edad
    const [renderEdad, setRenderEdad] = useState(false);

    // Categoria
    const [renderDetalles, setRenderDetalles] = useState(false);

    // Peso
    const [renderPeso, setRenderPeso] = useState(false);

    // Altura
    const [renderAltura, setRenderAltura] = useState(false);

    const hanSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        try {
            const response = await axios.put(`https://backend-jireh.onrender.com/api/v1/pet/actualizar/${id._id}`, data, {
                headers: {
                    "x-access-token": token // Asegúrate de que token esté definido
                },
            });
            setLoading(false);
            console.log("Formulario enviado:", response);
            navigate("/mascotas");
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
        setLoading(false);
    }

    const [open5, setOpen5] = useState(false);
    const eliminarMascota = () => {
        setOpen5(true);
    };


    const confirmarEliminarMascota = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(
                `https://backend-jireh.onrender.com/api/v1/pet/${id._id}`,
                {},
                {
                    headers: {
                        "x-access-token": token
                    }
                }
            );
            setResponseSuccess(response.data.msj);
            setLoading(false);
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
    const handleImageChange = async (event) => {
        setLoading(true);
        event.preventDefault();
        const data = {
            "img": selectedImage
        };
        try {
            const response = await axios.put(`https://backend-jireh.onrender.com/api/v1/pet/actualizar/${id._id}`, data, {
                headers: {
                    "x-access-token": token // Asegúrate de que token esté definido
                },
            });
            setLoading(false);
            console.log("Formulario enviado:", response);
            navigate("/mascotas");
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
        setLoading(false);
    }

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

    useEffect(() => {
        if (responseErrors && responseErrors.length > 0) {
            const timer = setTimeout(() => {
                navigate("/mascotas");
                setResponseErrors(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [responseErrors]);

    useEffect(() => {
        if (responseSuccess && responseSuccess.length > 0) {
            const timer = setTimeout(() => {
                navigate("/mascotas");
                setResponseSuccess(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [responseSuccess]);

    return (
        <Layout>
            <div className="flex">
                <Aside selected={1} />
                {loading && <Loader />}
                {responseSuccess && <Success mensaje={responseSuccess} />}
                {responseErrors && <Danger mensaje={responseErrors} />}
                <div className="w-full h-[100vh] overflow-y-scroll">
                    <div className="mx-10">
                        <h1 className="bg-secondaryBlue text-primaryBlue p-3 text-3xl text-center mt-5">{id.name}</h1>
                        <div className="mt-10 w-full flex">
                            <div className="w-2/6">
                                {renderImg ? (
                                    <>
                                        <div className="bg-primaryBlue w-[80%] ml-[10%] rounded-full mb-5">
                                            {selectedImage && (
                                                <img src={selectedImage} className="w-[100%] h-[100%]" alt="Vista previa" />
                                            )}
                                        </div>
                                        <form onSubmit={handleImageChange}>
                                            <input type="file" name="image" onChange={uploadImage} />
                                            {selectedImage && (
                                                <button
                                                    type="submit"
                                                    className="w-full rounded-2xl border-2 border-secondaryBlue bg-white px-6 py-3
                                                    font-semibold uppercase text-secondaryBlue transition-all duration-300
                                                    hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                                                    hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                                                    active:rounded-2xl active:shadow-none mt-3"
                                                >
                                                    Guardar Imagen
                                                </button>
                                            )}
                                        </form>
                                        <div
                                            className="mt-3 cursor-pointer text-secondaryBlue font-bold text-lg"
                                            onClick={() => setRenderImg(false)}
                                        >
                                            Cancelar
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-primaryBlue w-[80%] ml-[10%] rounded-full mb-5">
                                            <img src={id.img} className="w-[100%] h-[100%]" alt="Imagen de la mascota" />
                                        </div>
                                        <button
                                            className="w-full rounded-2xl border-2 border-secondaryBlue bg-white px-6 py-3
                                            font-semibold uppercase text-secondaryBlue transition-all duration-300
                                            hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                                            hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                                            active:rounded-2xl active:shadow-none"
                                            onClick={() => setRenderImg(true)}
                                        >
                                            Actualizar Imagen
                                        </button>
                                    </>
                                )}
                                <div className="mt-5">
                                    <button
                                        className="w-full rounded-2xl border-2 border-secondaryBlue bg-white px-6 py-3
                                        font-semibold uppercase text-secondaryBlue transition-all duration-300
                                        hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                                        hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                                        active:rounded-2xl active:shadow-none"
                                        onClick={eliminarMascota}
                                    >
                                        Eliminar Mascota
                                    </button>
                                </div>
                            </div>

                            <div className="w-4/6 px-10">
                                <div className="flex justify-between space-x-5">
                                    <div className="w-full">
                                        <div className="flex justify-between mb-1">
                                            <Label>Nombre mascota</Label>
                                            {renderName
                                                ?
                                                    <button onClick={() => setRenderName(false)} className="text-secondaryBlue">Cancelar</button>
                                                :
                                                    <EditIcon onClick={() => setRenderName(true)} className="bg-secondaryBlue text-primaryBlue rounded-full p-1" sx={{ fontSize: 25 }} />
                                            }
                                        </div>
                                        {renderName
                                            ?
                                                <>
                                                    <form onSubmit={hanSubmit}>
                                                        <Input
                                                            type="text"
                                                            placeholder={id.name}
                                                            name="name"
                                                        />
                                                        <button
                                                            className="w-full mt-2 rounded-2xl border-2 border-secondaryBlue bg-white px-6 py-3
                                                            font-semibold uppercase text-secondaryBlue transition-all duration-300
                                                            hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                                                            hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                                                            active:rounded-2xl active:shadow-none"
                                                        >
                                                            Guardar
                                                        </button>
                                                    </form>
                                                </>
                                            :
                                                <Input
                                                    disabled
                                                    value={id.name}
                                                />
                                        }
                                    </div>
                                    <div className="w-full">
                                        <div className="flex justify-between mb-1">
                                            <Label>Edad</Label>
                                            {renderEdad
                                                ?
                                                    <button onClick={() => setRenderEdad(false)} className="text-secondaryBlue">Cancelar</button>
                                                :
                                                    <EditIcon onClick={() => setRenderEdad(true)} className="bg-secondaryBlue text-primaryBlue rounded-full p-1" sx={{ fontSize: 25 }} />
                                            }
                                        </div>
                                        {renderEdad
                                            ?
                                                <>
                                                    <form onSubmit={hanSubmit}>
                                                        <Input
                                                            type="text"
                                                            placeholder={`${id.age} años`}
                                                            name="age"
                                                        />
                                                        <button
                                                            className="w-full mt-2 rounded-2xl border-2 border-secondaryBlue bg-white px-6 py-3
                                                            font-semibold uppercase text-secondaryBlue transition-all duration-300
                                                            hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                                                            hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                                                            active:rounded-2xl active:shadow-none"
                                                        >
                                                            Guardar
                                                        </button>
                                                    </form>
                                                </>
                                            :
                                                <Input
                                                    disabled
                                                    value={`${id.age} años`}
                                                />
                                        }
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flex justify-between bg-secondaryBlue mb-2 p-1">
                                        <h1 className="text-primaryBlue">- Detalles</h1>
                                        {renderDetalles
                                            ?
                                                <button onClick={() => setRenderDetalles(false)} className="text-primaryBlue">Cancelar</button>
                                            :
                                                <EditIcon onClick={() => setRenderDetalles(true)} className="bg-secondaryBlue text-primaryBlue rounded-full p-1" sx={{ fontSize: 25 }} />
                                        }
                                    </div>
                                    <div className="flex justify-between space-x-5">
                                        <div className="w-full">
                                            {renderDetalles
                                                ?
                                                    <form onSubmit={hanSubmit} className="flex flex-col">
                                                        <div className="flex space-x-5">
                                                            <div className="w-full">
                                                                <Label>Categoria</Label>
                                                                <select
                                                                    className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                                    focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 ${errors.categoria ? "border-red-500" : ""}`}
                                                                    {...register("categoria", { required: "Seleccione una categoría" })}
                                                                >
                                                                    <option value="">Selecciona una categoría</option>
                                                                    {arraypets.map((item, index) => (
                                                                        <option key={index} value={item.categoria}>
                                                                            {item.categoria}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                {errors.categoria && <p className="text-red-500 text-xs font-bold">{errors.categoria.message}</p>}
                                                            </div>
                                                            <div className="w-full">
                                                                <Label>Especie</Label>
                                                                <select
                                                                    className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                                    focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3 ${errors.especie ? "border-red-500" : ""}`}
                                                                    {...register("especie", { required: "Seleccione una especie" })}
                                                                    disabled={!selectedCategoria}
                                                                >
                                                                    <option value="">Selecciona una especie</option>
                                                                    {selectedCategoria &&
                                                                        arraypets
                                                                            .find(item => item.categoria === selectedCategoria)
                                                                            ?.especies.map((item, index) => (
                                                                                <option key={index} value={item.name}>
                                                                                    {item.name}
                                                                                </option>
                                                                            ))}
                                                                </select>
                                                                {errors.especie && <p className="text-red-500 text-xs font-bold">{errors.especie.message}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="flex space-x-5 mt-5">
                                                            <div className="w-full">
                                                                <Label>Tamaño</Label>
                                                                <select
                                                                    className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                                    focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                                                    id="tamano"
                                                                    {...register("tamano", { required: "Seleccione un Tamaño" })}
                                                                >
                                                                    <option value="">Selecciona un Tamaño</option>
                                                                    <option value="Pequeño">Pequeño</option>
                                                                    <option value="Mediano">Mediano</option>
                                                                    <option value="Grande">Grande</option>
                                                                    <option value="Gigante">Gigante</option>
                                                                </select>
                                                                {errors.tamano && <p className="text-red-500 text-xs font-bold">{errors.tamano.message}</p>}
                                                            </div>
                                                            <div className='w-full'>
                                                                <Label>Género</Label>
                                                                <select
                                                                    className="mt-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1
                                                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                                    focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                                                    id="genero"
                                                                    {...register("genero", { required: "Seleccione un Género" })}
                                                                >
                                                                    <option value="">Selecciona un Género</option>
                                                                    <option value="Macho">Macho</option>
                                                                    <option value="Hembra">Hembra</option>
                                                                </select>
                                                                {errors.genero && <p className="text-red-500 text-xs font-bold">{errors.genero.message}</p>}
                                                            </div>
                                                        </div>
                                                        <div className='w-full mt-5'>
                                                            <Label>Raza</Label>
                                                            <div className="mt-2">
                                                                <input
                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                                    focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                                                    type="text"
                                                                    name="raza"
                                                                    {...register("raza", { required: "Raza es obligatorio" })}
                                                                />
                                                                {errors.raza && <p className="text-red-500 text-xs font-bold">{errors.raza.message}</p>}
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="w-full mt-2 rounded-2xl border-2 border-secondaryBlue bg-white px-6 py-3
                                                            font-semibold uppercase text-secondaryBlue transition-all duration-300
                                                            hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                                                            hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                                                            active:rounded-2xl active:shadow-none"
                                                        >
                                                            Guardar
                                                        </button>
                                                    </form>
                                                :
                                                    <div>
                                                        <div className="flex space-x-5">
                                                            <div className="w-full">
                                                                <Label>Categoria</Label>
                                                                <Input
                                                                    disabled
                                                                    value={id.categoria}
                                                                />
                                                            </div>
                                                            <div className="w-full">
                                                                <Label>Especie</Label>
                                                                <Input
                                                                    disabled
                                                                    value={id.especie}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex space-x-5 mt-3">
                                                            <div className="w-full">
                                                                <Label>Tamaño</Label>
                                                                <Input
                                                                    disabled
                                                                    value={id.tamano}
                                                                />
                                                            </div>
                                                            <div className="w-full">
                                                                <Label>Genero</Label>
                                                                <Input
                                                                    disabled
                                                                    value={id.genero}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex space-x-5 mt-3">
                                                            <div className="w-full">
                                                                <Label>Raza</Label>
                                                                <Input
                                                                    disabled
                                                                    value={id.raza}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h1 className="text-primaryBlue bg-secondaryBlue mb-2 p-1">- Salud</h1>
                                    <div className="flex justify-between space-x-5">
                                        <div className="w-full">
                                            <div className="flex justify-between mb-1">
                                                <Label>Peso</Label>
                                                {renderPeso
                                                    ?
                                                        <button onClick={() => setRenderPeso(false)} className="text-secondaryBlue">Cancelar</button>
                                                    :
                                                        <EditIcon onClick={() => setRenderPeso(true)} className="bg-secondaryBlue text-primaryBlue rounded-full p-1" sx={{ fontSize: 25 }} />
                                                }
                                            </div>
                                            {renderPeso
                                                ?
                                                    <>
                                                        <form onSubmit={hanSubmit}>
                                                            <Input
                                                                type="text"
                                                                placeholder={id.peso}
                                                                name="peso"
                                                            />
                                                            <button
                                                                className="w-full mt-2 rounded-2xl border-2 border-secondaryBlue bg-white px-6 py-3
                                                                font-semibold uppercase text-secondaryBlue transition-all duration-300
                                                                hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                                                                hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                                                                active:rounded-2xl active:shadow-none"
                                                            >
                                                                Guardar
                                                            </button>
                                                        </form>
                                                    </>
                                                :
                                                    <Input
                                                        disabled
                                                        value={`${id.peso} kg.`}
                                                    />
                                            }
                                        </div>
                                        <div className="w-full">
                                            <div className="flex justify-between mb-1">
                                                <Label>Altura</Label>
                                                {renderAltura
                                                    ?
                                                        <button onClick={() => setRenderAltura(false)} className="text-secondaryBlue">Cancelar</button>
                                                    :
                                                        <EditIcon onClick={() => setRenderAltura(true)} className="bg-secondaryBlue text-primaryBlue rounded-full p-1" sx={{ fontSize: 25 }} />
                                                }
                                            </div>
                                            {renderAltura
                                                ?
                                                    <>
                                                        <form onSubmit={hanSubmit}>
                                                            <Input
                                                                type="text"
                                                                placeholder={`0.70 mts`}
                                                                name="age"
                                                            />
                                                            <button
                                                                className="w-full mt-2 rounded-2xl border-2 border-secondaryBlue bg-white px-6 py-3
                                                                font-semibold uppercase text-secondaryBlue transition-all duration-300
                                                                hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                                                                hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                                                                active:rounded-2xl active:shadow-none"
                                                            >
                                                                Guardar
                                                            </button>
                                                        </form>
                                                    </>
                                                :
                                                    <Input
                                                        disabled
                                                        value={`0.70 mts`}
                                                    />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-10 my-20">
                        <h1 className="bg-secondaryBlue text-primaryBlue p-3 text-3xl text-center mt-5">Seguimiento del alimento de mi mascota</h1>
                        <div className="mx-10">
                            <h1 className="mt-5 text-secondaryBlue text-lg"><span className="font-medium">Datos actualizados: </span>05-04-2024</h1>
                            <div className="mt-5 flex space-x-10">
                                <h1 className="text-secondaryBlue text-lg font-medium">Peso: <span className="bg-secondaryBlue text-primaryBlue p-1 rounded-md">14 kg</span></h1>
                                <h1 className="text-secondaryBlue text-lg font-medium">Altura: <span className="bg-primaryBlue text-secondaryBlue p-1 rounded-md">0.72 m</span></h1>
                                <h1 className="text-secondaryBlue text-lg font-medium">IMC: <span className="bg-secondaryBlue text-primaryBlue p-1 rounded-md">27.00</span></h1>
                            </div>

                            <div className="flex w-full">
                                <div className="w-2/6">
                                    <h1 className="mt-8 text-secondaryBlue text-lg font-medium">Recomendado:</h1>
                                    <div className="w-[60%] mt-12 ml-[10%] flex flex-col justify-center items-center bg-secondaryBlue pb-2 rounded-lg">
                                        <img className="w-[80%] -mt-12" src="https://res.cloudinary.com/dl8odylct/image/upload/v1712689124/jireh/platocomida_rpgllt.png" />
                                        <h1 className="text-primaryBlue font-medium">0.350 kg.</h1>
                                        <h1 className="text-primaryBlue font-medium">Por dia</h1>
                                    </div>
                                </div>
                                <div className="w-4/6">
                                    <h1 className="mt-8 text-secondaryBlue text-lg font-medium">Criterio:</h1>
                                    <div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex mt-8 items-center">
                                <h1 className="text-secondaryBlue text-lg font-medium">Calcular el aumento de alimento de mi mascota:</h1>
                                <Link to="/calculo-alimento" className="underline text-secondaryBlue ml-3">Ir</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal open={open5} onClose={() => setOpen5(false)}>
                    <div className='mx-auto my-4 w-96 mb-3'>
                        <h1 className='text-lg font-black text-gray-800 text-center'>Eliminar Mascota</h1>
                        <p className='text-sm text-gray-500 text-center mt-3'>¿Estas seguro que deseas eliminar esta mascota?</p>
                    </div>
                    <div className="flex gap-10 mt-10">
                        <button
                            onClick={() => setOpen5(!open5)}
                            className="bg-red-500 w-full text-white p-2 rounded-lg font-bold"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={confirmarEliminarMascota}
                            className="bg-primaryBlue w-full text-secondaryBlue p-2 rounded-lg font-bold"
                        >
                            Confirmar
                        </button>
                    </div>
                </Modal>
            </div>
        </Layout>
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

export default EditMascota