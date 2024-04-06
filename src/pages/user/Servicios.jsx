import Layout from "./Layout";
import Header from "../../components/Header/Header";
import Servicio from "../../services/Servicio";
import { useEffect, useState } from "react";
import Loader from "../../components/Ui/Loader";
import CardServices from "../../components/CardServices";

function Servicios() {

    const { data, response, errors, obtenerServicios } = Servicio();
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        obtenerServicios();
        if(response) {
            console.log(data);
            setDatos(data);
            setLoading(false);
        }
    }, [response]);

    return (
        <Layout>
            <Header texto="SERVICIOS VETERINARIOS" linkText="Servicios" />
            <section className="md:mx-40 mx-10">
                {errors && <div>Error: {errors}</div>}
                {loading && <Loader />}
                <div className="flex my-16">
                    <div className="w-[55%] px-14">
                        <h1 className="font-bold text-4xl text-secondaryBlue">Siempre al cuidado de tu amiguit@</h1>
                        <p className="text-lg text-secondaryBlue mt-5">
                            En JIREH, nos enorgullece ofrecer una amplia variedad de servicios 
                            diseñados para satisfacer las necesidades únicas de nuestros clientes. Nuestro equipo 
                            capacitado se dedica a brindar soluciones personalizadas y de calidad en cada servicio que realizamos.
                        </p>
                    </div>
                    <div className="w-[45%]">
                        <img src="https://res.cloudinary.com/dl8odylct/image/upload/v1711232477/jireh/imagenServicios_pph3cz.png" />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="font-bold text-5xl text-secondaryBlue">Nuestros servicios</h1>
                    <h2 className="font-bold text-xl mt-3">Todo lo que tus animalitos necesitan, en un solo lugar.</h2>
                </div>
                <div className="grid grid-cols-3 gap-10 my-10">
                    {datos.map(servicio => (
                        <CardServices
                            key={servicio.id}
                            name={servicio.name}
                            description={servicio.description}
                            img={servicio.img}
                            icon={servicio.icono}
                        />
                    ))}
                </div>
            </section>
        </Layout>
    )
}

export default Servicios