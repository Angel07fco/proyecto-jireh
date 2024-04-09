import CrudTableRowProduct from "./CrudTableRowProduct"

function CrudTableProduct({ data, setDataToEdit, deleteData }) {
    return (
        <div className="mt-10">
            <h1 className="bg-secondaryBlue text-primaryBlue p-2 text-center font-medium text-xl">Tabla de Datos de Usuarios</h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">Producto</th>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">Imagen</th>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">Precio</th>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">Cantidad</th>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">Para mascotas:</th>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">Pata edades:</th>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">Pata tamaños:</th>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">Opciones</th>
                </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">Sin datos</td>
                        </tr>
                    ) : (
                        data.map((el, index) => (
                            <CrudTableRowProduct
                                key={index}
                                el={el}
                                setDataToEdit={setDataToEdit}
                                deleteData={deleteData}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CrudTableProduct