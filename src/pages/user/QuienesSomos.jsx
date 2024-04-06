import { BouncyCardsFeatures } from "../../components/BouncyCardsFeatures";
import Carrousel from "../../components/Carrousel";
import Header from "../../components/Header/Header";
import Layout from "./Layout";

function QuienesSomos() {
    return (
        <Layout>
            <Header texto="¿QUIENES SOMOS?" linkText="¿Quienes somos?" />
            <div className="flex md:flex-row flex-col md:mx-40 pb-20 mt-10">
                <div className="w-1/2 flex justify-end">
                    <img className="w-96" src="https://res.cloudinary.com/dl8odylct/image/upload/v1710516024/jireh/quienesomos1_xz4ogi.png" />
                </div>
                <div className="w-1/2 p-10">
                    <h1 className="text-6xl font-bold text-secondaryBlue">100%</h1>
                    <h1 className="text-6xl font-bold text-secondaryBlue">Am💙r</h1>
                    <h1 className="text-2xl font-bold text-secondaryBlue">Por los animalitos</h1>
                    <h1>En Clínica Veterinaria Jireh, somos un equipo de amantes de los animales que comparten una pasión por brindar el mejor cuidado posible.</h1>
                </div>
            </div>
            <BouncyCardsFeatures />
            <div className="md:mx-40 pb-20">
                <div className="flex justify-center items-center">
                    <h2 className="max-w-lg text-4xl font-bold md:text-5xl mt-20">Valores de JIREH</h2>
                </div>
                <Carrousel />
            </div>
        </Layout>
    )
}

export default QuienesSomos