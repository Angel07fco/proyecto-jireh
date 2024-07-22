import Header from "../../../components/Header/Header";
import Aside from "../../../components/Aside";
import Layout from "../Layout";
import FormPet from "../../../components/Form/FormPet";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../components/Ui/Loader";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';

function Mascotas() {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState("");
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (token) {
            axios
                .get(`https://backend-jireh.onrender.com/api/v1/user/obtenerusuario/${token}`, {
                    headers: {
                        "x-access-token": token
                    },
                })
                .then(({ data } ) => setUser(data))
                .catch((error) => console.log(error))
                setLoading(false);
        }
        setLoading(false);
    }, [user])

    console.log(user)

    useEffect(() => {
        setLoading(true);
        if (user) {
            axios
                .get(`https://backend-jireh.onrender.com/api/v1/pet/${user._id}`, {
                    headers: {
                        "x-access-token": token
                    },
                })
                .then(({ data } ) => setDatos(data))
                .catch((error) => console.log(error))
                setLoading(false);
        }
        setLoading(false);
    }, [user])

    console.log(datos);

    return (
        <Layout>
            <div className="flex">
                {loading && <Loader />}
                <Aside selected={1} />
                <div className="w-full h-[100vh] overflow-y-scroll">
                    <Header texto="Mis mascotas" linkText="Mis mascotas" />
                    <div className="mx-20">
                        <div>
                            <h1 className="bg-secondaryBlue p-5 text-primaryBlue font-bold text-center text-2xl">Mis mascotas</h1>
                            {datos.length === 0 ? (
                                <p className="text-center font-bold text-secondaryBlue text-xl my-10">No tienes ninguna mascota registrada.</p>
                            ) : (
                                <div className="bg-gradient-to-b from-blue-100 to-blue-200 my-10">
                                    <div className="grid grid-cols-3 gap-10 py-10 px-10">
                                        {datos.map(pet => (
                                            <CardPet
                                                key={pet.id}
                                                id={pet}
                                                img={pet.img}
                                                name={pet.name}
                                                category={pet.categoria}
                                                especie={pet.especie}
                                                size={pet.tamano}
                                                raza={pet.raza}
                                                age={pet.age}
                                                peso={pet.peso}
                                                genero={pet.genero}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mb-10">
                            <h1 className="bg-secondaryBlue p-5 text-primaryBlue font-bold text-center text-2xl mb-5">Agregar una nueva mascota</h1>
                            <FormPet />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

function CardPet({id, img, name, category, especie, size, raza, age, peso, genero}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/edit-mascota", { state: { id } });
    };
    return (
        <div className="w-full bg-white h-auto flex flex-col p-5 rounded-xl cursor-pointer" onClick={handleClick}>
            <div className="flex justify-between items-center">
                <h1 className="flex items-center text-secondaryBlue font-medium">
                    <span className="mr-2 border border-primaryBlue bg-primaryBlue rounded-full flex items-center justify-center p-1">
                        <HomeOutlinedIcon fontSize="small" className="text-secondaryBlue" />
                    </span>
                    {category}
                </h1>
                <h1 className="bg-secondaryBlue text-primaryBlue py-1 px-2 rounded-lg font-medium">{especie}</h1>
            </div>
            <div className="flex justify-center my-5 items-center">
                <img src={img} className="w-[90%] h-52" />
            </div>
            <div className="px-5">
                <h1 className="text-secondaryBlue font-medium">{name} ({genero})</h1>
            </div>
            <div className="flex justify-between items-center px-5">
                <h1 className="text-gray-500 font-medium">{raza}</h1>
                <h1 className="text-gray-500 font-medium">{size}</h1>
            </div>
            <div className="flex justify-between items-center px-5 mt-2">
                <h1 className="flex items-center text-secondaryBlue font-medium">
                    <div className="w-2 h-2 rounded-full bg-primaryBlue mr-2"></div>
                    {age} años
                </h1>
                <h1 className="flex items-center text-secondaryBlue font-medium">
                    <div className="w-2 h-2 rounded-full bg-primaryBlue mr-2"></div>
                    {peso} kg.
                </h1>
            </div>
            <div className="px-5 flex justify-between mt-5">
                <div className="">
                    <button className="bg-primaryBlue text-secondaryBlue py-1 px-2 rounded-xl">Editar</button>
                    <button
                        className="bg-secondaryBlue text-primaryBlue py-1 px-2 ml-2 rounded-xl"
                    >Desactivar</button>
                </div>
                <PetsOutlinedIcon className="text-secondaryBlue" />
            </div>
        </div>
    )
}

export default Mascotas;