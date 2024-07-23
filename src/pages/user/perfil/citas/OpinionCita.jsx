import { useEffect, useState } from "react"
import Aside from "../../../../components/Aside"
import Danger from "../../../../components/Ui/Alertas/Danger"
import Success from "../../../../components/Ui/Alertas/Success"
import Loader from "../../../../components/Ui/Loader"
import Layout from "../../Layout"
import { useLocation, useNavigate } from "react-router-dom"

function OpinionCita() {
    const navigate = useNavigate();
    const [response, setResponse] = useState();
    const [errorss, setErrors] = useState();
    const [loading, setLoading] = useState();
    const { state } = useLocation();
    const { cita } = state;

    useEffect(() => {
        if (errorss && errorss.length > 0) {
            const timer = setTimeout(() => {
                setErrors(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorss]);

    useEffect(() => {
        if (response && response.length > 0) {
            const timer = setTimeout(() => {
                setResponse(null);
                navigate('/historial-citas');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [response]);

    return (
        <Layout>
            <div className="flex">
                <Aside selected={3}/>
                {response && <Success mensaje={response} /> }
                {errorss && <Danger mensaje={errorss} /> }
                {loading && <Loader /> }
                <div className="w-full h-[100vh] overflow-y-scroll">
                    <div className="mx-10">
                        <h1 className="bg-secondaryBlue text-primaryBlue p-3 text-3xl text-center mt-5">Opinión sobre mi cita</h1>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default OpinionCita