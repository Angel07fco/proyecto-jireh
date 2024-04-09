import { useLocation } from "react-router-dom";
import Layout from "../../Layout";
import Aside from "../../../../components/Aside";
import { useState } from "react";
import Label from "../../../../components/Ui/Label";
import EditIcon from '@mui/icons-material/Edit';
import { Input } from "../../../../components/Ui/Input";
import Loader from "../../../../components/Ui/Loader";
import axios from "axios";
import Success from "../../../../components/Ui/Alertas/Success";
import Danger from "../../../../components/Ui/Alertas/Danger";

function EditCita() {

    const [response, setResponse] = useState();
    const [errors, setErrors] = useState();
    const { state } = useLocation();
    const { cita } = state;

    // Imagen
    const [renderImg, setRenderImg] = useState(false);

    // Imagen
    const [renderServicio, setRenderervicio] = useState(false);

    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const handleSubmitDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`https://backend-jireh.onrender.com/api/v1/cita/cancelar/${cita._id}`, {
                headers: {
                    "x-access-token": token
                },
            });
            setResponse(response.data.mensaje);
            console.log(response);
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data);
            } else {
                setErrors("Error al conectar con el servidor");
            }
        }
        setLoading(false);
    }

    return (
        <Layout>
            <div className="flex">
                <Aside selected={3} />
                {response && <Success mensaje={response} /> }
                {errors && <Danger mensaje={errors} /> }
                {loading && <Loader /> }
                <div className="w-full h-[100vh] overflow-y-scroll">
                    <div className="mx-10">
                        <h1 className="bg-secondaryBlue text-primaryBlue p-3 text-3xl text-center mt-5">Cita agendada</h1>
                        <div onClick={handleSubmitDelete} className="bg-red-500 text-white mt-5 p-3 text-xl text-center rounded-xl hover:bg-white hover:text-red-500 border hover:border-red-500 cursor-pointer">
                            Cancelar cita
                        </div>
                        <div className="mt-10 w-full flex">
                            <div className="w-2/6">
                            {renderImg
                                    ?
                                        <>
                                            <div className="bg-primaryBlue w-[80%] ml-[10%] rounded-full mb-5">

                                            </div>
                                            <input type="file" />
                                            <div
                                                className="mt-3 cursor-pointer text-secondaryBlue font-bold text-lg"
                                                onClick={() => setRenderImg(false)}
                                            >
                                                Cancelar
                                            </div>
                                        </>
                                    :
                                        <>
                                            <div className="bg-primaryBlue w-[80%] ml-[10%] rounded-full mb-5">
                                                <img src={cita.mascota.img} className="w-[100%] h-[100%]" />
                                            </div>
                                            <button
                                                className="w-full rounded-2xl border-2 border-secondaryBlue bg-white px-6 py-3
                                                font-semibold uppercase text-secondaryBlue transition-all duration-300
                                                hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                                                hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                                                active:rounded-2xl active:shadow-none"
                                                onClick={() => setRenderImg(true)}
                                            >Cambiar mascota</button>
                                        </>
                                }
                            </div>
                            <div className="w-4/6">
                                <div className="w-full">
                                    <div className="flex justify-between mb-1">
                                        <Label>Nombre mascota</Label>
                                        {renderServicio
                                            ?
                                                <button onClick={() => setRenderervicio(false)} className="text-secondaryBlue">Cancelar</button>
                                            :
                                                <EditIcon onClick={() => setRenderervicio(true)} className="bg-secondaryBlue text-primaryBlue rounded-full p-1" sx={{ fontSize: 25 }} />
                                        }
                                    </div>
                                    {renderServicio
                                        ?
                                            <>
                                                <form>
                                                    <Input
                                                        type="text"
                                                        placeholder={cita.servicio.name}
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
                                                value={cita.servicio.name}
                                            />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default EditCita