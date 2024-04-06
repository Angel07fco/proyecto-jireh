import Header from "../../../components/Header/Header";
import Aside from "../../../components/Aside";
import Layout from "../Layout";
import FormPet from "../../../components/Form/FormPet";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../components/Ui/Loader";

function Mascotas() {
    const token = localStorage.getItem("token");
    const [user, setUser] = useState("");
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(false);

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
    }, [user])

    console.log(datos)

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
                        <div>
                            <h1 className="bg-secondaryBlue p-5 text-primaryBlue font-bold text-center text-2xl mb-5">Agregar una nueva mascota</h1>
                            <FormPet />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

function CardPet({img, name, category, especie, size, raza, age, peso, genero}) {
    return (
        <div className="w-full bg-white h-auto flex flex-col p-5 rounded-xl">
            <div className="flex justify-between items-center">
                <h1>{category}</h1>
                <h1>{genero}</h1>
            </div>
            <img src={img} />
        </div>
    )
}

export default Mascotas;
