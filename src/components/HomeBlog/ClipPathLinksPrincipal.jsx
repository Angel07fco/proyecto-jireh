import { useAnimate } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const ClipPathLinkPrincipal = () => {
    return (
        <div className="bg-neutral-50 px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <ClipPathLinksPrincipal />
            </div>
        </div>
    );
};

export const ClipPathLinkTipoContenido = () => {
    return (
        <div className="bg-neutral-50 px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <ClipPathLinksTipoContenido />
            </div>
        </div>
    );
};

export const ClipPathLinkAudienciaObjetivo = () => {
    return (
        <div className="bg-neutral-50 px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <ClipPathLinksAudienciaObjetivo />
            </div>
        </div>
    );
};

export const ClipPathLinkProblemasNecesidades = () => {
    return (
        <div className="bg-neutral-50 px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <ClipPathLinksProblemasNecesidades />
            </div>
        </div>
    );
};

export const ClipPathLinkGeograficas = () => {
    return (
        <div className="bg-neutral-50 px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <ClipPathLinksGeograficas />
            </div>
        </div>
    );
};

export const ClipPathLinkFrecuencia = () => {
    return (
        <div className="bg-neutral-50 px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <ClipPathLinksFrecuencia />
            </div>
        </div>
    );
};

const ClipPathLinksPrincipal = () => {
    return (
        <div className="divide-y divide-neutral-900 border border-neutral-900">
            <div className="grid grid-cols-2 divide-x divide-neutral-900">
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292056/jireh/blog/Salud_Animal_g6wkem.jpg"
                    Texto="Salud Animal"
                    data={{ additionalData: 'salud-animal', texto: "Salud Animal" }}
                />
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292056/jireh/blog/Consejos_de_Cuidado_s93uac.jpg"
                    Texto="Consejos de Cuidado"
                    data={{ additionalData: 'consejos-de-cuidado', texto: "Consejos de Cuidado" }}
                />
            </div>
            <div className="grid grid-cols-3 divide-x divide-neutral-900">
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292054/jireh/blog/Noticias_y_Actualizaciones_lrmq7a.avif"
                    Texto="Noticias y Actualizaciones"
                    data={{ additionalData: 'noticias-y-actualizaciones', texto: "Noticias y Actualizaciones" }}
                />
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292054/jireh/blog/Historias_de_Clientes_oxvgk4.avif"
                    Texto="Historias de Clientes"
                    data={{ additionalData: 'historias-de-clientes', texto: "Historias de Clientes" }}
                />
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292054/jireh/blog/Promociones_y_Ofertas_tva25b.jpg"
                    Texto="Promociones y Ofertas"
                    data={{ additionalData: 'promociones-y-ofertas', texto: "Promociones y Ofertas" }}
                />
            </div>
        </div>
    );
};

const ClipPathLinksTipoContenido = () => {
    return (
        <div className="divide-y divide-neutral-900 border border-neutral-900">
            <div className="grid grid-cols-2 divide-x divide-neutral-900">
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292769/jireh/blog/Art%C3%ADculos_Informativos_veterinaria_zjeijt.jpg"
                    Texto="Artículos Informativos"
                    data={{ additionalData: 'articulos-informativos', texto: "Artículos Informativos" }}
                />
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292768/jireh/blog/Gu%C3%ADas_y_Tutoriales_oykeme.webp"
                    Texto="Guías y Tutoriales"
                    data={{ additionalData: 'guias-y-tutoriales', texto: "Guías y Tutoriales" }}
                />
            </div>
            <div className="grid grid-cols-4 divide-x divide-neutral-900">
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292766/jireh/blog/Entrevistas_ydq0tu.webp"
                    Texto="Entrevistas"
                    data={{ additionalData: 'entrevistas', texto: "Entrevistas" }}
                />
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292765/jireh/blog/Opiniones_y_Rese%C3%B1as_ox3jvr.png"
                    Texto="Opiniones y Reseñas"
                    data={{ additionalData: 'opiniones-y-reseñas', texto: "Opiniones y Reseñas" }}
                />
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292765/jireh/blog/Videos_veterinaria_dqp0k5.jpg"
                    Texto="Videos"
                    data={{ additionalData: 'videos', texto: "Videos" }}
                />
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292765/jireh/blog/Infograf%C3%ADas_veterinaria_dxompd.jpg"
                    Texto="Infografías"
                    data={{ additionalData: 'infografias', texto: "Infografías" }}
                />
            </div>
        </div>
    );
};

const ClipPathLinksAudienciaObjetivo = () => {
    return (
        <div className="divide-y divide-neutral-900 border border-neutral-900">
            <div className="grid grid-cols-2 divide-x divide-neutral-900">
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292932/jireh/blog/Propietarios_de_Perros_fs668w.jpg"
                    Texto="Propietarios de Perros"
                    data={{ additionalData: 'propietarios-de-perros', texto: "Propietarios de Perros" }}
                />
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292931/jireh/blog/Propietarios_de_Gatos_nwbod2.jpg"
                    Texto="Propietarios de Gatos"
                    data={{ additionalData: 'propietarios-de-gatos', texto: "Propietarios de Gatos" }}
                />
            </div>
            <div className="grid grid-cols-3 divide-x divide-neutral-900">
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292930/jireh/blog/Propietarios_de_Animales_Ex%C3%B3ticos_epxrig.jpg"
                    Texto="Propietarios de Animales Exóticos"
                    data={{ additionalData: 'propietarios-de-animales-exoticos', texto: "Propietarios de Animales Exóticos" }}
                />
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292929/jireh/blog/Ni%C3%B1os_y_Mascotas_pcwy8x.jpg"
                    Texto="Niños y Mascotas"
                    data={{ additionalData: 'niños-y-mascotas', texto: "Niños y Mascotas" }}
                />
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721292928/jireh/blog/Adultos_Mayores_y_Mascotas_xi8juo.jpg"
                    Texto="Adultos Mayores y Mascotas"
                    data={{ additionalData: 'adultos-mayores-y-mascotas', texto: "Adultos Mayores y Mascotas" }}
                />
            </div>
        </div>
    );
};

const ClipPathLinksProblemasNecesidades = () => {
    return (
        <div className="divide-y divide-neutral-900 border border-neutral-900">
            <div className="grid grid-cols-2 divide-x divide-neutral-900">
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721293145/jireh/blog/Problemas_de_Salud_Comunes_veterinaria_col60d.jpg"
                    Texto="Problemas de Salud Comunes"
                    data={{ additionalData: 'problemas-de-salud-comunes', texto: "Problemas de Salud Comunes" }}
                />
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721293143/jireh/blog/Nutrici%C3%B3n_y_Dieta_veterinaria_u2u7xv.jpg"
                    Texto="Nutrición y Dieta veterinaria"
                    data={{ additionalData: 'nutricion-y-dieta-veterinaria', texto: "Nutrición y Dieta veterinaria" }}
                />
            </div>
            <div className="grid grid-cols-2 divide-x divide-neutral-900">
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721293142/jireh/blog/Entrenamiento_y_Comportamiento_veterinaria_lyit1i.jpg"
                    Texto="Entrenamiento y Comportamiento"
                    data={{ additionalData: 'entrenamiento-y-comportamiento', texto: "Entrenamiento y Comportamiento" }}
                />
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721293142/jireh/blog/Cuidado_Preventivo_uxoe1u.webp"
                    Texto="Cuidado Preventivo"
                    data={{ additionalData: 'cuidado-preventivo', texto: "Cuidado Preventivo" }}
                />
            </div>
        </div>
    );
};

const ClipPathLinksGeograficas = () => {
    return (
        <div className="divide-y divide-neutral-900 border border-neutral-900">
            <div className="grid grid-cols-2 divide-x divide-neutral-900">
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721293287/jireh/blog/Eventos_Locales_veterinaria_omtdrj.jpg"
                    Texto="Eventos Locales"
                    data={{ additionalData: 'eventos-locales', texto: "Eventos Locales" }}
                />
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721293287/jireh/blog/Noticias_de_la_Cl%C3%ADnica_veterinaria_thlkyz.png"
                    Texto="Noticias de la Clínica"
                    data={{ additionalData: 'noticias-de-la-clinica', texto: "Noticias de la Clínica" }}
                />
            </div>
        </div>
    );
};

const ClipPathLinksFrecuencia = () => {
    return (
        <div className="divide-y divide-neutral-900 border border-neutral-900">
            <div className="grid grid-cols-3 divide-x divide-neutral-900">
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721293395/jireh/blog/Destacados_Semanales_veterinaria_g2qkal.jpg"
                    Texto="Destacados Semanales"
                    data={{ additionalData: 'destacados-semanales', texto: "Destacados Semanales" }}
                />
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721293394/jireh/blog/Actualizaciones_Mensuales_veterinaria_m6d6cn.png"
                    Texto="Actualizaciones Mensuales"
                    data={{ additionalData: 'actualizaciones-mensuales', texto: "Actualizaciones Mensuales" }}
                />
                <LinkBox
                    imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1721293392/jireh/blog/Especiales_Anuales_veterinaria_u68cvk.jpg"
                    Texto="Especiales Anuales"
                    data={{ additionalData: 'especiales-anuales', texto: "Especiales Anuales" }}
                />
            </div>
        </div>
    );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
    left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
    right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
    left: [NO_CLIP, TOP_RIGHT_CLIP],
    bottom: [NO_CLIP, TOP_RIGHT_CLIP],
    top: [NO_CLIP, TOP_RIGHT_CLIP],
    right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Texto, imageUrl, data  }) => {
    const [scope, animate] = useAnimate();
    const navigate = useNavigate();
    const href ="/blog-listado";

    const getNearestSide = (e) => {
        const box = e.target.getBoundingClientRect();

        const proximityToLeft = {
            proximity: Math.abs(box.left - e.clientX),
            side: "left",
        };
        const proximityToRight = {
            proximity: Math.abs(box.right - e.clientX),
            side: "right",
        };
        const proximityToTop = {
            proximity: Math.abs(box.top - e.clientY),
            side: "top",
        };
        const proximityToBottom = {
            proximity: Math.abs(box.bottom - e.clientY),
            side: "bottom",
        };

        const sortedProximity = [
            proximityToLeft,
            proximityToRight,
            proximityToTop,
            proximityToBottom,
        ].sort((a, b) => a.proximity - b.proximity);

        return sortedProximity[0].side;
    };

    const handleMouseEnter = (e) => {
        const side = getNearestSide(e);

        animate(scope.current, {
            clipPath: ENTRANCE_KEYFRAMES[side],
        });
    };

    const handleMouseLeave = (e) => {
        const side = getNearestSide(e);

        animate(scope.current, {
            clipPath: EXIT_KEYFRAMES[side],
        });
    };

    const handleClick = () => {
        navigate(href, { state: { data } });
    };

    return (
        <div
            onClick={handleClick}
            onMouseEnter={(e) => {
                handleMouseEnter(e);
            }}
            onMouseLeave={(e) => {
                handleMouseLeave(e);
            }}
            className="relative grid h-20 w-full place-content-center sm:h-36 md:h-60"
        >
            <h1 className="text-xl text-center text-secondaryBlue sm:text-3xl lg:text-4xl">{Texto}</h1>

            <div
                ref={scope}
                style={{
                    clipPath: BOTTOM_RIGHT_CLIP,
                    backgroundImage: `url('${imageUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="absolute inset-0 grid place-content-center bg-secondaryBlue text-primaryBlue"
            >
                <div className="bg-secondaryBlue px-2 pt-1 pb-2 opacity-80 rounded-lg">
                    <h1 className="text-xl text-center sm:text-3xl md:text-4xl text-primaryBlue">{Texto}</h1>
                </div>
            </div>
        </div>
    );
};