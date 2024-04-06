import CardProductM from "../../components/Product/CardProductM";
import Header from "../../components/Header/Header";
import { productos } from "../../helpers/Product";
import Layout from "./Layout";
import { useState } from "react";
import Slider from '@mui/material/Slider';

function Tienda() {
    const [busqueda, setBusqueda] = useState("");
    const [ordenPor, setOrdenPor] = useState("");
    const [edadFiltro, setEdadFiltro] = useState("");
    const [tamanioFiltro, setTamanioFiltro] = useState("");
    const [precioFiltro, setPrecioFiltro] = useState([0, 200]);

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const handleOrdenamiento = (e) => {
        setOrdenPor(e.target.value);
    };

    const handleEdadFiltro = (e) => {
        setEdadFiltro(e.target.value);
    };

    const handleTamanioFiltro = (e) => {
        setTamanioFiltro(e.target.value);
    };

    const handlePrecioFiltro = (e, newValue) => {
        setPrecioFiltro(newValue);
    };

    const productosFiltrados = productos
        .filter(
            (producto) =>
                producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
                (!edadFiltro || producto.edad === edadFiltro) &&
                (!tamanioFiltro || producto.tamanio === tamanioFiltro) &&
                producto.precio >= precioFiltro[0] &&
                producto.precio <= precioFiltro[1]
        )
        .sort((a, b) => {
            if (ordenPor === "precioAsc") {
                return a.precio - b.precio;
            } else if (ordenPor === "precioDesc") {
                return b.precio - a.precio;
            } else {
                return 0;
            }
        });

    return (
        <Layout>
            <Header texto="TIENDA EN LINEA JIREH" linkText="Tienda" />
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

            <div className="flex md:flex-row flex-col md:mx-40 pb-20">
                <div className="md:w-1/5 px-5">
                    <h1 className="text-2xl font-bold text-gray-700 mb-3">Filtrar por edad</h1>
                    <div className="pl-2 space-y-3 flex flex-col">
                        <label>
                            <input
                                type="radio"
                                value=""
                                checked={edadFiltro === ""}
                                onChange={handleEdadFiltro}
                            />
                            Todos
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Cachorro"
                                checked={edadFiltro === "Cachorro"}
                                onChange={handleEdadFiltro}
                            />
                            Cachorro
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Adulto"
                                checked={edadFiltro === "Adulto"}
                                onChange={handleEdadFiltro}
                            />
                            Adulto
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Maduro"
                                checked={edadFiltro === "Maduro"}
                                onChange={handleEdadFiltro}
                            />
                            Maduro
                        </label>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-700 mb-3 mt-8">Filtrar por tamaño</h1>
                    <div className="pl-2 space-y-3 flex flex-col">
                        <label>
                            <input
                                type="radio"
                                value=""
                                checked={tamanioFiltro === ""}
                                onChange={handleTamanioFiltro}
                            />
                            Todos
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Pequeño"
                                checked={tamanioFiltro === "Pequeño"}
                                onChange={handleTamanioFiltro}
                            />
                            Pequeño
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Mediano"
                                checked={tamanioFiltro === "Mediano"}
                                onChange={handleTamanioFiltro}
                            />
                            Mediano
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Grande"
                                checked={tamanioFiltro === "Grande"}
                                onChange={handleTamanioFiltro}
                            />
                            Grande
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Gigante"
                                checked={tamanioFiltro === "Gigante"}
                                onChange={handleTamanioFiltro}
                            />
                            Gigante
                        </label>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-700 mb-3 mt-8">Filtrar por precio</h1>
                    <div className="flex justify-between items-center">
                        <span className="mr-5">${precioFiltro[0]}</span>
                        <Slider
                            value={precioFiltro}
                            onChange={handlePrecioFiltro}
                            valueLabelDisplay="auto"
                            min={0}
                            max={200}
                        />
                        <span className="ml-5">${precioFiltro[1]}</span>
                    </div>
                </div>
                <div className="md:w-4/5 px-10 border-l-2 border-gray-500">
                    <div className="flex items-center space-x-20">
                        <h1 className="text-4xl text-gray-700">Productos</h1>
                        <div className="relative w-full bg-white border border-gray-300">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar productos" required value={busqueda} onChange={handleBusqueda} />
                        </div>
                    </div>
                    <div className="w-full flex justify-end my-5">
                        <select
                            value={ordenPor}
                            onChange={handleOrdenamiento}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        >
                            <option value="">Ordenar por</option>
                            <option value="precioAsc">Precio: Menor a Mayor</option>
                            <option value="precioDesc">Precio: Mayor a menor</option>
                        </select>
                    </div>
                    <div className="grid md:grid-cols-3 md:gap-4 md:gap-y-16 mt-10">
                        {productosFiltrados.map((producto) => (
                            <CardProductM key={producto.id} nombre={producto.nombre} precio={producto.precio} imagen={producto.imagen} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Tienda;