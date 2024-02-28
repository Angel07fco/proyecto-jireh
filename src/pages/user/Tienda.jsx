import CardProductM from "../../components/Product/CardProductM";
import { productos } from "../../helpers/Product";
import Layout from "./Layout";

function Tienda() {
    return (
        <Layout>
            <div className="md:pt-32">
                <div className="flex items-center justify-between mx-56 my-16">
                    <h1 className="text-lg cursor-pointer hover:text-secondaryBlue hover:font-bold hover:underline">Alimentos</h1>
                    <div className="h-5 w-0.5 bg-gray-500" />
                    <h1 className="text-lg cursor-pointer hover:text-secondaryBlue hover:font-bold hover:underline">Medicamentos</h1>
                    <div className="h-5 w-0.5 bg-gray-500" />
                    <h1 className="text-lg cursor-pointer hover:text-secondaryBlue hover:font-bold hover:underline">Tratamientos</h1>
                    <div className="h-5 w-0.5 bg-gray-500" />
                    <h1 className="text-lg cursor-pointer hover:text-secondaryBlue hover:font-bold hover:underline">Higiene y Cuidado</h1>
                    <div className="h-6 w-0.5 bg-gray-500" />
                    <h1 className="text-lg cursor-pointer hover:text-secondaryBlue hover:font-bold hover:underline">Accesorios</h1>
                    <div className="h-6 w-0.5 bg-gray-500" />
                    <h1 className="text-lg cursor-pointer hover:text-secondaryBlue hover:font-bold hover:underline">Limpieza</h1>
                    <div className="h-5 w-0.5 bg-gray-500" />
                    <h1 className="text-lg cursor-pointer hover:text-secondaryBlue hover:font-bold hover:underline">Viaje y Transporte</h1>
                </div>

                <div className="flex md:flex-row flex-col md:mx-20 pb-20">
                    <div className="md:w-1/5 px-10">
                        <h1 className="text-4xl text-gray-700">Filtros</h1>
                    </div>
                    <div className="md:block hidden w-0.5 h-96 bg-gray-500" />
                    <div className="md:w-4/5 px-10">
                        <div className="flex items-center space-x-20">
                            <h1 className="text-4xl text-gray-700">Productos</h1>
                            <div className="relative w-full bg-white border border-gray-300">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar productos" required />
                                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 md:gap-4 md:gap-y-16 mt-10">
                        {productos.map((producto) => (
                            <CardProductM key={producto.id} nombre={producto.nombre} precio={producto.precio} imagen={producto.imagen} />
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Tienda;