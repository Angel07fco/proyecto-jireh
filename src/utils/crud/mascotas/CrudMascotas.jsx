import { useState } from "react"
import CrudFormMascotas from "../components/CrudFormMascotas"
import CrudTableMascotas from "../components/CrudTableMascotas"

const initialDb = [
    {
        id: 1,
        name: "Seiya",
        constellation: "Pegaso"
    },
    {
        id: 2,
        name: "Shiryu",
        constellation: "Drágon"
    },
    {
        id: 3,
        name: "Hyoga",
        constellation: "Cisne"
    },
]

function CrudMascotas() {

    const [db, setDb] = useState(initialDb);
    const [dataToEdit, setDataToEdit] = useState(null);

    const createData = (data) => {
        data.id = Date.now();
        setDb([...db, data]);
    };

    const updateData = (data) => {
        let newData = db.map((el) => el.id === data.id ? data : el);
        setDb(newData);
    };

    const deleteData = (id) => {};

    return (
        <>
            <h1>Crud de mascotas</h1>
            <CrudFormMascotas
                createData={createData}
                updateData={updateData}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
            />
            <CrudTableMascotas
                data={db}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
            />
        </>
    )
}

export default CrudMascotas