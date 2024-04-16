import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import AdminLayout from "../AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import CrudTableCita from "./CrudTableCita";
import Loader from "../../../components/Ui/Loader";
import Button from "../../../components/Ui/Button";
import CalendarCitas from "./CalendarCitas";

function AdminCitas() {

    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [db, setDb] = useState([]);

    useEffect(() => {
        setLoading(true);
        if (token) {
            axios
                .get(`https://backend-jireh.onrender.com/api/v1/cita/`, {
                    headers: {
                        "x-access-token": token
                    },
                })
                .then(({ data } ) => setDb(data))
                .catch((error) => console.log(error))
        }
        setLoading(false);
    }, [db])

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
            <HeaderAdmin texto="CITAS ADMIN" linkText="citas administrador" />
            <div className="px-10">
                <Button texto="Agendar una nueva cita" />
                <CalendarCitas />
            </div>
            {loading === true ? <Loader /> :  null}
        </AdminLayout>
    )
}

export default AdminCitas;