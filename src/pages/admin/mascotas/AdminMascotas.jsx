import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import AdminLayout from "../AdminLayout";
import CrudFormPet from "./CrudFormPet";
import CrudTablePet from "./CrudTablePet";
import Loader from "../../../components/Ui/Loader";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminMascotas() {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [db, setDb] = useState([]);

    useEffect(() => {
        setLoading(true);
        if (token) {
            axios
                .get(`https://backend-jireh.onrender.com/api/v1/pet`, {
                    headers: {
                        "x-access-token": token
                    },
                })
                .then(({ data } ) => setDb(data))
                .catch((error) => console.log(error))
        }
        setLoading(false);
    }, [db])

    console.log(db)

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
            <HeaderAdmin texto="MASCOTAS ADMIN" linkText="mascotas administrador" />
            <div className="px-10">
                <CrudTablePet
                    data={db}
                    setDataToEdit={setDataToEdit}
                    deleteData={deleteData}
                />
            </div>
            {loading === true ? <Loader /> :  null}
        </AdminLayout>
    )
}

export default AdminMascotas