import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import AdminLayout from "../AdminLayout";
import { useState } from "react";
import CrudFormProduct from "./CrudFormProduct";
import CrudTableProduct from "./CrudTableProduct";
import { productos } from "../../../helpers/Product";

function AdminProductos() {
    const [db, setDb] = useState(productos);
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
        <AdminLayout>
            <HeaderAdmin texto="PRODUCTOS ADMIN" linkText="productos administrador" />
            <div className="px-10">
                <CrudFormProduct
                    createData={createData}
                    updateData={updateData}
                    dataToEdit={dataToEdit}
                    setDataToEdit={setDataToEdit}
                />
                <CrudTableProduct
                    data={db}
                    setDataToEdit={setDataToEdit}
                    deleteData={deleteData}
                />
            </div>
        </AdminLayout>
    )
}

export default AdminProductos