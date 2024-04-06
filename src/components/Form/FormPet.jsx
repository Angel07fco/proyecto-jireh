import Label from "../../components/Ui/Label";
import Success from "../Ui/Alertas/Success";
import Danger from "../Ui/Alertas/Danger";
import Button from "../../components/Ui/Button";
import Loader from "../../components/Ui/Loader";
import ButtonDisabled from "../Ui/ButtonDisabled";
import { arraypets } from "../../helpers/ArrayPets";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function FormPet() {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [responseSuccess, setResponseSuccess] = useState("");
    const [responseErrors, setResponseErrors] = useState("");
    const [user, setUser] = useState("");

    const selectedCategoria = watch("categoria", "");
    const selectedEspecie = watch("especie", "");

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

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post("https://backend-jireh.onrender.com/api/v1/pet/newpet", { ...data, userId: user._id }, {
                headers: {
                    "x-access-token": token
                },
            });
            setResponseSuccess(response.data.msj);
            reset();
        } catch (error) {
            if (error.response) {
                setResponseErrors(error.response.data);
            } else {
                setResponseErrors("Error al conectar con el servidor");
            }
        }
        setLoading(false);
    };

    return (
        <>
            {responseErrors && <Danger mensaje={responseErrors} />}
            {responseSuccess && <Success mensaje={responseSuccess} />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='md:flex flex-row md:space-x-4 mt-3'>
                    <div className='w-full md:mt-0 mt-3'>
                        <Label>Seleccione una categoria</Label>
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
                    <div className='w-full md:mt-0 mt-3'>
                        <Label>Seleccione una especie</Label>
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

                <div className='md:flex flex-row md:space-x-4 mt-3'>
                    <div className='w-full'>
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
                    <div className='w-full md:mt-0 mt-3'>
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
                </div>

                <div className='md:flex flex-row md:space-x-4 mt-3'>
                    <div className='w-full'>
                        <Label>Nombre</Label>
                        <div className="mt-2">
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                type="text"
                                name="name"
                                {...register("name", { required: "Nombre es obligatorio" })}
                            />
                            {errors.name && <p className="text-red-500 text-xs font-bold">{errors.name.message}</p>}
                        </div>
                    </div>
                    <div className='w-full md:mt-0 mt-3'>
                        <Label>Edad</Label>
                        <div className="mt-2">
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                type="text"
                                name="age"
                                {...register("age", { required: "Edad es obligatorio" })}
                            />
                            {errors.age && <p className="text-red-500 text-xs font-bold">{errors.age.message}</p>}
                        </div>
                    </div>
            </div>

                <div className='md:flex flex-row md:space-x-4 mt-3'>
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
                    <div className='w-full md:mt-0 mt-3'>
                        <Label>Peso</Label>
                        <div className="mt-2">
                            <input
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                type="text"
                                name="peso"
                                {...register("peso", { required: "Peso es obligatorio" })}
                            />
                            {errors.peso && <p className="text-red-500 text-xs font-bold">{errors.peso.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    {Object.keys(errors).length === 0 && !responseErrors && !responseSuccess ?
                        <>
                            {loading ?
                                <Loader /> :
                                <Button texto="Enviar" bg="secondaryBlue" textoColor="white" type="submit" />
                            }
                        </> :
                        <ButtonDisabled texto="Enviar" bg="gray-500" />
                    }
                </div>
            </form>
        </>
    );
}

export default FormPet;
