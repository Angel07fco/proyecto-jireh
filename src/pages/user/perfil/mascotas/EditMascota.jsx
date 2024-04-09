import { Link, useLocation } from "react-router-dom";
import Layout from "../../Layout";
import Aside from "../../../../components/Aside";
import { useState } from "react";
import { Input } from "../../../../components/Ui/Input";
import Label from "../../../../components/Ui/Label";
import EditIcon from '@mui/icons-material/Edit';

function EditMascota() {
    const { state } = useLocation();
    const { id } = state;

    console.log("ID de la mascota:", id);

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

    return (
        <Layout>
            <div className="flex">
                <Aside selected={1} />
                <div className="w-full h-[100vh] overflow-y-scroll">
                    <div className="mx-10">
                        <h1 className="bg-secondaryBlue text-primaryBlue p-3 text-3xl text-center mt-5">{id.name}</h1>
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
                                                <img src={id.img} className="w-[100%] h-[100%]" />
                                            </div>
                                            <button
                                                className="w-full rounded-2xl border-2 border-secondaryBlue bg-white px-6 py-3
                                                font-semibold uppercase text-secondaryBlue transition-all duration-300
                                                hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md
                                                hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]
                                                active:rounded-2xl active:shadow-none"
                                                onClick={() => setRenderImg(true)}
                                            >Actualizar Imagen</button>
                                        </>
                                }
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
                                                    <form>
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
                                                    <form>
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
                                                    <form>
                                                        <select>
                                                            <option></option>
                                                        </select>
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
                                                                    value={id.tamano}
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
                                                        <form>
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
                                                        <form>
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
                            <h1 className="mt-5 text-secondaryBlue text-lg"><span className="font-medium">Datos actualizados: </span>09-04-2024</h1>
                            <div className="mt-5 flex space-x-10">
                                <h1 className="text-secondaryBlue text-lg font-medium">Peso: <span className="bg-secondaryBlue text-primaryBlue p-1 rounded-md">14 kg</span></h1>
                                <h1 className="text-secondaryBlue text-lg font-medium">Altura: <span className="bg-primaryBlue text-secondaryBlue p-1 rounded-md">14 kg</span></h1>
                                <h1 className="text-secondaryBlue text-lg font-medium">IMC: <span className="bg-secondaryBlue text-primaryBlue p-1 rounded-md">24.48</span></h1>
                            </div>

                            <div className="flex w-full">
                                <div className="w-2/6">
                                    <h1 className="mt-8 text-secondaryBlue text-lg font-medium">Recomendado:</h1>
                                    <div className="w-[60%] mt-12 ml-[10%] flex flex-col justify-center items-center bg-secondaryBlue pb-2 rounded-lg">
                                        <img className="w-[80%] -mt-12" src="https://res.cloudinary.com/dl8odylct/image/upload/v1712689124/jireh/platocomida_rpgllt.png" />
                                        <h1 className="text-primaryBlue font-medium">0.480 kg.</h1>
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
                                <Link className="underline text-secondaryBlue ml-3">Ir</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default EditMascota