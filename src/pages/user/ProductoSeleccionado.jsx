import { Link, useParams } from 'react-router-dom';
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
            <div className='pl-40 my-5'>
                <div className="flex items-center py-4">
                    <a href="#" className="text-secondaryBlue">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </a>

                    <span className="mx-5 text-secondaryBlue rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </span>

                    <Link to="/tienda" className="text-secondaryBlue hover:underline">
                        Tienda
                    </Link>

                    <span className="mx-5 text-secondaryBlue rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </span>

                    <p className="text-secondaryBlue hover:underline">
                        {productoSeleccionado.nombre}
                    </p>
                </div>
            </div>
            <div className="mb-10">
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