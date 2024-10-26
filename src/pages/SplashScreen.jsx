import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importa Framer Motion
import jirehImage from "../assets/images/jireh.jpg";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/inicio"); // Redirige al Home después de 3 segundos
    }, 3000);

    return () => clearTimeout(timer); // Limpia el temporizador
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Estado inicial: oculto y desplazado hacia abajo
        animate={{ opacity: 1, y: 0 }} // Animación de entrada: aparece y sube
        transition={{ duration: 1 }} // Duración de la animación: 1 segundo
        className="text-center"
      >
        {/* Imagen */}
        <motion.img
          src={jirehImage} // Coloca la ruta correcta de tu imagen
          alt="Splash Image"
          className="w-48 h-48 mx-auto object-cover"
          initial={{ scale: 0 }} // La imagen empieza pequeña
          animate={{ scale: 1 }} // Crece hasta su tamaño completo
          transition={{ duration: 1, delay: 0.5 }} // Después de 0.5 segundos
        />

        {/* Texto */}
        <motion.h1
          className="text-3xl text-secondaryBlue mt-4 font-bold"
          initial={{ opacity: 0 }} // El texto comienza invisible
          animate={{ opacity: 1 }} // Aparece progresivamente
          transition={{ duration: 1, delay: 1 }} // Empieza después de 1 segundo
        >
          ¡Bienvenido a JIREH!
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
