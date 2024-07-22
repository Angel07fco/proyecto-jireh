import { useState } from "react";
import Header from "../../components/Header/Header";
import { SlideTabsGaleria } from "../../components/SlideTabsGaleria";
import Layout from "./Layout";
import ShuffleHero from "../../components/ShufleHeroGaleria";

function Galeria() {
    const [selectedTab, setSelectedTab] = useState("Categorías Temáticas");

    /*const renderContent = () => {
        switch (selectedTab) {
        case "Temáticas Principales":
            return <ClipPathLinkPrincipal />;
        case "Tipo de Contenido":
            return <ClipPathLinkTipoContenido />;
        case "Audiencia Objetivo":
            return <ClipPathLinkAudienciaObjetivo />;
        case "Problemas o Necesidades":
            return <ClipPathLinkProblemasNecesidades />;
        case "Geográficas":
            return <ClipPathLinkGeograficas />;
        case "Frecuencia":
            return <ClipPathLinkFrecuencia />;
        default:
            return <ClipPathLinkPrincipal />;
        }
    };*/

    return (
        <Layout>
            <Header texto="GALERIA" linkText="Galeria" />
            <div className="flex md:flex-row flex-col md:mx-36 pb-20 mt-10">
                <div className="w-full">
                    <SlideTabsGaleria onTabChange={setSelectedTab} />
                    <ShuffleHero />
                </div>
            </div>
        </Layout>
    )
}

export default Galeria