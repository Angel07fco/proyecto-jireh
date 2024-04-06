import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const Carrousel = () => {
    return (
        <HorizontalScrollCarousel />
    );
};

const HorizontalScrollCarousel = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <motion.div style={{ x }} className="flex gap-4">
                {cards.map((card) => {
                    return <Card card={card} key={card.id} />;
                })}
            </motion.div>
        </div>
        </section>
    );
};

const Card = ({ card }) => {
    return (
        <div
            key={card.id}
            className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
        >
        <div
            style={{
            backgroundImage: `url(${card.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            }}
            className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
        ></div>
        <div className="absolute inset-0 z-10 grid place-content-center">
            <p className="bg-gradient-to-br from-primaryBlue to-white/0 p-8 text-5xl font-black uppercase text-white backdrop-blur-lg text-center">
                {card.title}
            </p>
        </div>
        </div>
    );
};

export default Carrousel;

const cards = [
    {
        url: "https://res.cloudinary.com/dl8odylct/image/upload/v1710531456/jireh/etica_ygg1sx.webp",
        title: "Etica Profesional",
        id: 1,
    },
    {
        url: "https://res.cloudinary.com/dl8odylct/image/upload/v1710531454/jireh/respeto_prwdot.webp",
        title: "Respeto",
        id: 2,
    },
    {
        url: "https://res.cloudinary.com/dl8odylct/image/upload/v1710531458/jireh/transparencia_nqmujj.jpg",
        title: "Transparencia",
        id: 3,
    },
    {
        url: "https://res.cloudinary.com/dl8odylct/image/upload/v1710531456/jireh/honestidad_nfegfl.jpg",
        title: "Honestidad",
        id: 4,
    },
    {
        url: "https://res.cloudinary.com/dl8odylct/image/upload/v1710531455/jireh/empatia_vexmeq.jpg",
        title: "Empatía",
        id: 5,
    }
];