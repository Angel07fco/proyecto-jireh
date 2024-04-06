import FaqWeb from "../components/FaqWeb";
import Header from "../components/Header/Header";
import Layout from "./user/Layout";

function PreguntasFrecuentes() {
    return (
        <Layout>
            <Header texto="PREGUNTAS FRECUENTES (FAQ)" linkText="Preguntas frecuentes" />
            <div className="container md:px-36 py-12 mx-auto">
                <div className="lg:flex lg:-mx-12">
                    <div className="lg:mx-12">
                        <h1 className="text-xl font-semibold text-gray-800">Tabla de contenidos</h1>

                        <div className="mt-4 space-y-4 lg:mt-8">
                            <a className="block text-blue-500 hover:underline">General</a>
                            <a className="block text-gray-500 hover:underline">Citas</a>
                            <a className="block text-gray-500 hover:underline">Servicios</a>
                            <a className="block text-gray-500 hover:underline">Tienda</a>
                            <a className="block text-gray-500 hover:underline">Sobre nosotros</a>
                        </div>
                    </div>
                    <div className="flex-1 mt-8 lg:mx-12 lg:mt-0">
                        <FaqWeb
                            question="¿Cómo puedo agendar una cita?"
                            reply="Respuesta..."
                        />
                        <hr className="my-8 border-gray-200 dark:border-secondaryBlue"></hr>
                        <FaqWeb
                            question="¿Cuáles son los servicios que ofrece la veterinaria?"
                            reply="Respuesta..."
                        />
                        <hr className="my-8 border-gray-200 dark:border-secondaryBlue"></hr>
                        <FaqWeb
                            question="¿Ofrecen servicios de urgencias y cómo puedo contactarlos?"
                            reply="Respuesta..."
                        />
                        <hr className="my-8 border-gray-200 dark:border-secondaryBlue"></hr>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PreguntasFrecuentes;