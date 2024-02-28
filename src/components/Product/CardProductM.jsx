import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const CardProductM = ({ nombre, precio, imagen }) => {
    const ref = useRef(null);

    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rY = mouseX / width - HALF_ROTATION_RANGE;
        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;

        setRotateX(rX);
        setRotateY(rY);
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <Link to={`/producto-seleccionado/${nombre}`}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transformStyle: "preserve-3d",
                    width: "288px"
                }}
                animate={{
                    rotateX,
                    rotateY,
                }}
                className="relative rounded-xl bg-gradient-to-br from-gray-100 to-gray-200"
            >
                <div
                    style={{
                        transform: "translateZ(75px)",
                        transformStyle: "preserve-3d",
                    }}
                    className="inset-2 rounded-xl bg-white shadow-lg"
                >
                    <img
                        className="object-cover object-center w-72 h-56 rounded-t-xl"
                        src={imagen[0]}
                        alt={nombre}
                    />
                    <div className="flex items-center px-6 py-3 bg-secondaryBlue">
                        <h1 className="text-lg font-semibold text-white">{nombre}</h1>
                    </div>
                    <div className="flex items-center px-6 py-3">
                        <svg className="w-6 h-6 fill-current text-gray-500" viewBox="0 0 24 24">
                            <path d="M12 2l2.061 6.317H22l-5.35 3.893 2.05 6.33L12 16.65l-6.7 4.89 2.05-6.33L2 8.317h7.939L12 2z"/>
                        </svg>
                        <svg className="w-6 h-6 fill-current text-gray-500" viewBox="0 0 24 24">
                            <path d="M12 2l2.061 6.317H22l-5.35 3.893 2.05 6.33L12 16.65l-6.7 4.89 2.05-6.33L2 8.317h7.939L12 2z"/>
                        </svg>
                        <svg className="w-6 h-6 fill-current text-gray-500" viewBox="0 0 24 24">
                            <path d="M12 2l2.061 6.317H22l-5.35 3.893 2.05 6.33L12 16.65l-6.7 4.89 2.05-6.33L2 8.317h7.939L12 2z"/>
                        </svg>
                        <svg className="w-6 h-6 fill-current text-gray-500" viewBox="0 0 24 24">
                            <path d="M12 2l2.061 6.317H22l-5.35 3.893 2.05 6.33L12 16.65l-6.7 4.89 2.05-6.33L2 8.317h7.939L12 2z"/>
                        </svg>
                        <svg className="w-6 h-6 fill-current text-gray-500" viewBox="0 0 24 24">
                            <path d="M12 2l2.061 6.317H22l-5.35 3.893 2.05 6.33L12 16.65l-6.7 4.89 2.05-6.33L2 8.317h7.939L12 2z"/>
                        </svg>
                    </div>
                    <div className="px-6 py-3">
                        <p className="font-bold">Desde ${precio}</p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default CardProductM;