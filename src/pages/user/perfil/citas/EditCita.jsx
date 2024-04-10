import { useLocation } from "react-router-dom";
import Layout from "../../Layout";
import Aside from "../../../../components/Aside";
import { useEffect, useState } from "react";
import Label from "../../../../components/Ui/Label";
import EditIcon from '@mui/icons-material/Edit';
import { Input } from "../../../../components/Ui/Input";
import Loader from "../../../../components/Ui/Loader";
import axios from "axios";
import Success from "../../../../components/Ui/Alertas/Success";
import Danger from "../../../../components/Ui/Alertas/Danger";
import { useNavigate } from 'react-router-dom';

function EditCita() {
    const navigate = useNavigate();
    const [response, setResponse] = useState();
    const [errors, setErrors] = useState();
    const { state } = useLocation();
    const { cita } = state;

    // Mascotas
    const [renderMascota, setRenderMascota] = useState(false);

    // Servivios
    const [renderServicio, setRenderServicio] = useState(false);

    // Comentarios
    const [comentario, setRenderComentarios] = useState(false);

    // Detalles
    const [renderDetalles, setRenderDetalles] = useState(false);

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
            if (response.data.mensaje === "No se puede cancelar la cita. Debe ser al menos dos días antes de la cita.") {
                setErrors(response.data.mensaje);
            } else {
                setResponse(response.data.mensaje);
            }
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data);
            } else {
                setErrors("Error al conectar con el servidor");
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        if (errors && errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        if (response && response.length > 0) {
            const timer = setTimeout(() => {
                setResponse(null);
                navigate('/historial-citas');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [response]);

    const onSubmit = async (data) => {
        console.log(data);
        setLoading(true);
        setLoading(false);
    };

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
                                <div className="bg-primaryBlue w-[80%] ml-[10%] rounded-full mb-5">
                                    <h1 className="bg-secondaryBlue text-primaryBlue p-3 text-3xl text-center mt-5">{cita.mascota.name}</h1>
                                    <img src={cita.mascota.img} className="w-[100%] h-[100%]" />
                                </div>
                            </div>
                            <div className="w-4/6">
                                <div className="w-full">
                                    <div className="flex justify-between mb-1">
                                        <Label>Nombre mascota</Label>
                                        {renderMascota
                                            ?
                                                <button onClick={() => setRenderMascota(false)} className="text-secondaryBlue">Cancelar</button>
                                            :
                                                <EditIcon onClick={() => setRenderMascota(true)} className="bg-secondaryBlue text-primaryBlue rounded-full p-1" sx={{ fontSize: 25 }} />
                                        }
                                    </div>
                                    {renderMascota
                                        ?
                                            <>
                                                <form>
                                                    <Input
                                                        type="text"
                                                        placeholder={cita.mascota.name}
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
                                                value={cita.mascota.name}
                                            />
                                    }

                                    <div className="flex justify-between mb-1 mt-5">
                                        <Label>Comentarios</Label>
                                        {comentario
                                            ?
                                                <button onClick={() => setRenderComentarios(false)} className="text-secondaryBlue">Cancelar</button>
                                            :
                                                <EditIcon onClick={() => setRenderComentarios(true)} className="bg-secondaryBlue text-primaryBlue rounded-full p-1" sx={{ fontSize: 25 }} />
                                        }
                                    </div>
                                    {comentario
                                        ?
                                            <>
                                                <form onSubmit={onSubmit}>
                                                    <Input
                                                        type="text"
                                                        placeholder={cita.comentarios}
                                                        name="comentarios"
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
                                                value={cita.comentarios}
                                            />
                                    }

                                    <div className="flex justify-between mb-1 mt-5">
                                        <Label>Servicio</Label>
                                        {renderServicio
                                            ?
                                                <button onClick={() => setRenderServicio(false)} className="text-secondaryBlue">Cancelar</button>
                                            :
                                                <EditIcon onClick={() => setRenderServicio(true)} className="bg-secondaryBlue text-primaryBlue rounded-full p-1" sx={{ fontSize: 25 }} />
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
                                        {renderDetalles
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
                                                <div className="space-y-3">
                                                    <div>
                                                        <Label>Médico</Label>
                                                        <Input
                                                            disabled
                                                            value={cita.medico.nombre}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Fecha</Label>
                                                        <Input
                                                            disabled
                                                            value={cita.fecha}
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label>Hora</Label>
                                                        <Input
                                                            disabled
                                                            value={cita.hora}
                                                        />
                                                    </div>
                                                </div>
                                        }
                                        </div>

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