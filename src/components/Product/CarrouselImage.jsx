import { useState } from "react";
import ModalProduct from "./ModalProduct"; // Importa el componente Modal desde su archivo

const CarrouselImage = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center w-full mb-8">
                <img
                    src={selectedImage}
                    alt="Selected Product"
                    className="w-96 max-w-xl h-96 rounded-md shadow-lg cursor-pointer"
                    onClick={handleOpenModal} // Abre el modal al hacer clic en la imagen
                />
            </div>
            <div className="flex justify-center w-full overflow-x-auto">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Product ${index}`}
                        className="w-24 h-auto rounded-md shadow-lg mx-2 cursor-pointer"
                        onClick={() => setSelectedImage(image)} // Cambia la imagen seleccionada al hacer clic en una miniatura
                    />
                ))}
            </div>
            <ModalProduct isOpen={isModalOpen} onClose={handleCloseModal} images={images} />
        </div>
    );
};

export default CarrouselImage;
