import { useEffect, useState } from 'react';
import Header from "../components/Header/Header";
import Loader from "../components/Ui/Loader";
import FaqWeb from "../components/FaqWeb";
import Layout from "./user/Layout";
import axios from "axios";

function PreguntasFrecuentes() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('https://backend-jireh.onrender.com/api/v1/preguntas-frecuentes')
            .then(({ data } ) => setFaqs(data))
            .catch((error) => console.log(error))
        setLoading(false);
    }, [faqs])

    return (
        <Layout>
            <Header texto="PREGUNTAS FRECUENTES (FAQ)" linkText="Preguntas frecuentes" />
            <div className="container md:px-36 py-12 mx-auto">
                <div className="lg:flex lg:-mx-12">
                    <div className="lg:mx-12">
                        <h1 className="text-xl font-semibold text-gray-800">Tabla de contenidos</h1>

                        <div className="mt-4 space-y-4 lg:mt-8">
                            <a className="block text-blue-500 hover:underline cursor-pointer">General</a>
                            <a className="block text-gray-500 hover:underline cursor-pointer">Citas</a>
                            <a className="block text-gray-500 hover:underline cursor-pointer">Servicios</a>
                            <a className="block text-gray-500 hover:underline cursor-pointer">Tienda</a>
                            <a className="block text-gray-500 hover:underline cursor-pointer">Sobre nosotros</a>
                        </div>
                    </div>
                    <div className="flex-1 mt-8 lg:mx-12 lg:mt-0">
                        {faqs.map((item, index) => (
                            <div key={index}>
                                <FaqWeb
                                    question={item.pregunta}
                                    reply={item.respuesta}
                                />
                                <hr className="my-8 border-gray-200 dark:border-secondaryBlue"></hr>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </Layout>
    )
}

export default PreguntasFrecuentes;