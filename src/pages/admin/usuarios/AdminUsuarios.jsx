import AdminLayout from "../AdminLayout";
import { useEffect, useState } from "react";
import CrudFromUser from "./CrudFromUser";
import CrudTableUser from "./CrudTableUser";
import Loader from "../../../components/Ui/Loader";
import axios from "axios";
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";

function AdminUsuarios() {
    const [loading, setLoading] = useState(false);
    const [responseErrors, setResponseErrors] = useState(false);
    const [responseSuccess, setResponseSuccess] = useState(false);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWYzMjM5ZjQ2ZTk1YzhiMTk1ZGE4MTEiLCJlbWFpbCI6ImFuZ2VsMDJmY29AZ21haWwuY29tIiwiaWF0IjoxNzEzMDQyODQyLCJleHAiOjE3MTU2MzQ4NDJ9.lUP_ESxb0wCKoAgefrnKhAWXWZqvKVY1eIrmb-LK36Y"
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

    console.log(db);

    const [dataToEdit, setDataToEdit] = useState(null);

    const createData = async (data) => {
        console.log(data);
        setLoading(true);
        try {
            const response = await axios.post("https://backend-jireh.onrender.com/api/v1/user/crearcuenta", data);
            console.log(response.data)
            setResponseSuccess(response.data.msj);
        } catch (error) {
            if (error.response) {
                setResponseErrors(error.response.data);
            } else {
                setResponseErrors("Error al conectar con el servidor");
            }
        }
        setLoading(false);
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