import { useParams } from 'react-router-dom';
import { productos } from '../../helpers/Product';
import Layout from "./Layout";
import Button from '../../components/Ui/Button';
import { useState } from 'react';
import ButtonDisabled from '../../components/Ui/ButtonDisabled';
import CarrouselImage from '../../components/Product/CarrouselImage';

function ProductoSeleccionado() {
    const { nombre } = useParams();
    const productoSeleccionado = productos.find(producto => producto.nombre === nombre);

    if (!productoSeleccionado) {
        return <div>Producto no encontrado</div>;
    }

    const [count, setCount] = useState(1);
    const incrementar = () => {
        if (count < productoSeleccionado.disponibles) {
            setCount(count => count + 1);
        }
    };
    const decrementar = () => {
        if (count > 1) {
            setCount(count => count - 1);
        }
    };
    return (
        <Layout>
            <div className="md:pt-40 mb-10">
                <div className='mx-40 flex flex-row'>
                    <div className='w-5/12 px-10'>
                        <CarrouselImage images={productoSeleccionado.imagen} />
                    </div>
                    <div className='w-4/12 px-10'>
                        <h1 className='text-3xl py-5 font-bold'>{productoSeleccionado.nombre}</h1>
                        <div className='w-full h-0.5 bg-gray-200' />
                        <h1 className='py-5'>{productoSeleccionado.descripcion}</h1>
                        <div className='w-full h-0.5 bg-gray-200' />
                        <h1 className='py-5'><span className='font-bold'>Mascota: </span>{productoSeleccionado.mascota}</h1>
                        <h1><span className='font-bold'>Cantidas: </span>{productoSeleccionado.disponibles}</h1>
                    </div>
                    <div className='w-3/12'>
                        <div className='p-3 border border-black'>
                            <h1 className='text-xl font-bold pb-5'>Desde: ${productoSeleccionado.precio}</h1>
                            <div className='w-full h-0.5 bg-gray-200' />
                            <div className="flex items-center space-x-5 my-5">
                                {count > 1
                                    ?
                                        <Button texto="-" onClick={decrementar} />
                                    :
                                        <ButtonDisabled texto="-" />
                                }
                                <p className='text-xl text-secondaryBlue font-bold'>{count}</p>
                                {count < productoSeleccionado.disponibles
                                    ?
                                        <Button texto="+" onClick={incrementar} />
                                    :
                                        <ButtonDisabled texto="+" />
                                }
                            </div>
                            <Button texto="Añadir al carrito" />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductoSeleccionado