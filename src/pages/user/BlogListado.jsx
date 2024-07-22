import { useEffect, useState } from 'react';
import Header from "../../components/Header/Header";
import Layout from "./Layout";
import { useLocation, useNavigate } from 'react-router-dom';
import { TextParallaxContentExample } from '../../components/TextParallaxContent';
import axios from 'axios';

function BlogListado() {
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state || {};
    const blogParametro = data?.additionalData;
    const textoParametro = data?.texto;

    useEffect(() => {
        if (!data) {
            navigate('/blog');
        }
    }, [data, navigate]);

    const [datos, setDatos] = useState([]);
    useEffect(() => {
        axios
            .get(`https://backend-jireh.onrender.com/api/v1/blog/categoria/${blogParametro}`)
            .then(({ data }) => setDatos(data))
            .catch((error) => console.log(error));
    }, [blogParametro]);

    return (
        <Layout>
            <Header texto="BLOG LISTADO" linkText="Blog listado" />
            <div className="flex md:flex-row flex-col md:mx-36 pb-20 mt-10">
                <div className="w-full">
                    <p className="text-center mt-5 mb-14 text-6xl font-black text-secondaryBlue">
                        Blogs {textoParametro}
                    </p>

                    {datos.length > 0 ? (
                        <TextParallaxContentExample data={datos} />
                    ) : (
                        <p className="text-center text-2xl mt-10">
                            No hay blogs disponibles en esta categoría.
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default BlogListado;