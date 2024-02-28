import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../Ui/Button";

const ModalProduct = ({ isOpen, onClose, images }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handlePrev = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="modal-content bg-white rounded-lg p-8">
                        <div className="flex justify-end">
                            <button className="bg-black text-white w-10 h-10" onClick={onClose}>
                                X
                            </button>
                        </div>
                        <div className="carousel">
                            <motion.img
                                key={selectedImageIndex}
                                src={images[selectedImageIndex]}
                                alt={`Image ${selectedImageIndex}`}
                                className="carousel-image w-96 h-96"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            />
                            <div className="flex justify-between space-x-20">
                                <Button onClick={handlePrev} texto="Atras" />
                                <Button onClick={handleNext} texto="Siguiente" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalProduct;
