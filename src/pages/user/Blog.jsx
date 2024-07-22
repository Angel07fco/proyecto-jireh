import { useState } from "react";
import Header from "../../components/Header/Header";
import {
    ClipPathLinkPrincipal,
    ClipPathLinkTipoContenido,
    ClipPathLinkAudienciaObjetivo,
    ClipPathLinkProblemasNecesidades,
    ClipPathLinkGeograficas,
    ClipPathLinkFrecuencia
} from "../../components/HomeBlog/ClipPathLinksPrincipal";
import { SlideTabss } from "../../components/SlideTabss";
import Layout from "./Layout";

function Blog() {
    const [selectedTab, setSelectedTab] = useState("Temáticas Principales");

    const renderContent = () => {
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
    };

    return (
        <Layout>
            <Header texto="BLOG" linkText="Blog" />
            <div className="flex md:flex-row flex-col md:mx-36 pb-20 mt-10">
                <div className="w-full">
                    <SlideTabss onTabChange={setSelectedTab} />
                    <p className="text-center mt-10 text-6xl font-black text-secondaryBlue">
                        {selectedTab}
                    </p>
                    {renderContent()}
                </div>
            </div>
        </Layout>
    );
}

export default Blog;
