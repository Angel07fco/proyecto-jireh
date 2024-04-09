import CrudTableRowMascotas from "./CrudTableRowMascotas";

function CrudTableMascotas({ data, setDataToEdit, deleteData }) {
    return (
        <div>
            <h1>Tabla de Datos</h1>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Constelación</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {data.length === 0 ? (
                    <tr>
                    <td colSpan="3">Sin datos</td>
                    </tr>
                ) : (
                    data.map((el, index) => (
                        <CrudTableRowMascotas
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
    );
}

export default CrudTableMascotas;