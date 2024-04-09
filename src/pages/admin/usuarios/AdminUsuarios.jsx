import AdminLayout from "../AdminLayout";
import { useEffect, useState } from "react";
import CrudFromUser from "./CrudFromUser";
import CrudTableUser from "./CrudTableUser";
import Loader from "../../../components/Ui/Loader";
import axios from "axios";
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";

function AdminUsuarios() {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [db, setDb] = useState([]);

    useEffect(() => {
        setLoading(true);
        if (token) {
            axios
                .get(`https://backend-jireh.onrender.com/api/v1/user/admingetusers/usuario`, {
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
            <HeaderAdmin texto="USUARIOS ADMIN" linkText="usuarios administrador" />
            <div className="px-10">
                <CrudFromUser
                    createData={createData}
                    updateData={updateData}
                    dataToEdit={dataToEdit}
                    setDataToEdit={setDataToEdit}
                />
                <CrudTableUser
                    data={db}
                    setDataToEdit={setDataToEdit}
                    deleteData={deleteData}
                />
            </div>
            {loading === true ? <Loader /> :  null}
        </AdminLayout>
    );
}

export default AdminUsuarios;