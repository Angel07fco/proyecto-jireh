import { motion } from "framer-motion";

const Loader = () => {
    const variants = {
        initial: {
        scaleY: 0.5,
        opacity: 0,
        },
        animate: {
        scaleY: 1,
        opacity: 1,
        transition: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "circIn",
        },
        },
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
        <div className="flex flex-col justify-center items-center">
            <motion.div
                transition={{
                staggerChildren: 0.25,
                }}
                initial="initial"
                animate="animate"
                className="flex gap-1"
            >
                <motion.div variants={variants} className="h-16 w-3 bg-white" />
                <motion.div variants={variants} className="h-16 w-3 bg-white" />
                <motion.div variants={variants} className="h-16 w-3 bg-white" />
                <motion.div variants={variants} className="h-16 w-3 bg-white" />
                <motion.div variants={variants} className="h-16 w-3 bg-white" />
            </motion.div>
            <p className="mt-3 text-white text-lg">Espere...</p>
        </div>
        </div>
    );
};

export default Loader;
