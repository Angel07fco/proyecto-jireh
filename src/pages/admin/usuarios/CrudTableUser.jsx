import CrudTableRowUser from "./CrudTableRowUser";

function CrudTableUser({ data, setDataToEdit, deleteData }) {
    return (
        <div className="mt-10">
            <h1 className="bg-secondaryBlue text-primaryBlue p-2 text-center font-medium text-xl">Tabla de Datos de Usuarios</h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">Usuario</th>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">Email</th>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">Phone</th>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">Rol</th>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">Estado</th>
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
                            <CrudTableRowUser
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

export default CrudTableUser