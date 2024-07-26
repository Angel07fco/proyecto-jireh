import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin";
import AdminLayout from "../AdminLayout";
import Loader from "../../../components/Ui/Loader";

const localizer = momentLocalizer(moment);

function AdminCitas() {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [db, setDb] = useState([]);

    const [date, setDate] = useState(new Date());
    const [counts, setCounts] = useState({
        realizada: 0,
        'en vivo': 0,
        'en proceso de finalizar': 0,
        proxima: 0,
    });

    useEffect(() => {
        setLoading(true);
        if (token) {
            axios
                .get(`https://backend-jireh.onrender.com/api/v1/cita/`, {
                    headers: {
                        "x-access-token": token
                    },
                })
                .then(({ data }) => setDb(data))
                .catch((error) => console.log(error));
        }
        setLoading(false);
    }, [token]);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const formattedDate = moment(date).format('DD-MM-YYYY');
                const response = await axios.get(`https://backend-jireh.onrender.com/api/v1/citas/count/${formattedDate}`, {
                    headers: {
                        "x-access-token": token
                    },
                });
                setCounts(response.data);
            } catch (error) {
                console.error("Error fetching counts:", error);
            }
        };
        fetchCounts();
    }, [date, token]);

    const CustomToolbar = (toolbar) => {
        const goToBack = () => {
            toolbar.onNavigate("PREV");
        };

        const goToNext = () => {
            toolbar.onNavigate("NEXT");
        };

        const goToCurrent = () => {
            toolbar.onNavigate("TODAY");
        };

        const label = () => {
            const date = moment(toolbar.date);
            return (
                <span>
                    {date.format("MMMM")} {date.format("YYYY")}
                </span>
            );
        };

        return (
            <div className="flex justify-between mb-4">
                <div className="flex justify-center items-center">
                    <button onClick={goToBack} className="mr-2 text-3xl">&#8249;</button>
                    <button onClick={goToCurrent}>Hoy</button>
                    <button onClick={goToNext} className="ml-2 text-3xl">&#8250;</button>
                </div>
                <div>{label()}</div>
            </div>
        );
    };

    const CustomDateCellWrapper = ({ value, children }) => {
        const handleViewCitas = () => {
            setDate(value);
        };

        return (
            <div className="relative">
                {children}
                <button
                    onClick={handleViewCitas}
                    className="absolute bottom-1 right-1 bg-blue-500 text-white px-2 py-1 text-xs rounded"
                >
                    Ver Citas
                </button>
            </div>
        );
    };

    return (
        <AdminLayout>
            <HeaderAdmin texto="CITAS ADMIN" linkText="citas administrador" />
            <div className="flex px-10 h-screen">
                <div className="w-1/2 p-4">
                    <Calendar
                        localizer={localizer}
                        events={[]}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        onNavigate={date => setDate(date)}
                        components={{
                            toolbar: CustomToolbar,
                            dateCellWrapper: CustomDateCellWrapper,
                        }}
                    />
                </div>
                <div className="w-1/2 p-4 grid grid-cols-2 gap-4">
                    <CountCard title="Realizadas" count={counts.realizada} color="bg-green-500" />
                    <CountCard title="En Vivo" count={counts['en vivo']} color="bg-red-500" />
                    <CountCard title="En Proceso de Finalizar" count={counts['en proceso de finalizar']} color="bg-yellow-500" />
                    <CountCard title="Próximas" count={counts.proxima} color="bg-blue-500" />
                </div>
            </div>
            {loading === true ? <Loader /> : null}
        </AdminLayout>
    );
}

const CountCard = ({ title, count, color }) => (
    <div className={`p-4 rounded-lg shadow-md ${color} text-white`}>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-4xl mt-2">{count}</p>
    </div>
);

export default AdminCitas;
