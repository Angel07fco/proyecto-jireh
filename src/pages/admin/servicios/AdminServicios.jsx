import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import AdminLayout from "../AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../components/Ui/Loader";
import CrudTableServ from "./CrudTableServ";
import CrudFormServ from "./CrudFormServ";

function AdminServicios() {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [db, setDb] = useState([]);

    useEffect(() => {
        setLoading(true);
        if (token) {
            axios
                .get(`https://backend-jireh.onrender.com/api/v1/services`, {
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
            <HeaderAdmin texto="SERVICIOS ADMIN" linkText="servicios administrador" />
            <div className="px-10">
                <CrudTableServ
                    data={db}
                    setDataToEdit={setDataToEdit}
                    deleteData={deleteData}
                />
            </div>
            {loading === true ? <Loader /> :  null}
        </AdminLayout>
    )
}

export default AdminServicios