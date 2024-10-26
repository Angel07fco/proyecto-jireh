import { useEffect, useState } from "react";
import Layout from "./Layout";
import Servicio from "../../services/Servicio";
import Loader from "../../components/Ui/Loader";
import HeaderHome from "../../components/HeaderHome/HeaderHome";

function Home() {
  const { data, response, errors, obtenerServicios } = Servicio();
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    obtenerServicios();

    if (response) {
      console.log(data);
      setDatos(data);
      setLoading(false);
    }
  }, [response]);

  return (
    <Layout>
      <HeaderHome />
      <section className="md:mx-40 mx-10">
        {errors && <div>Error: {errors}</div>}
        {loading && <Loader />}
        <div className="md:flex my-10 md:my-20">
          <div className="md:w-2/5">
            <img src="https://res.cloudinary.com/dl8odylct/image/upload/v1711234743/jireh/serviciosHome_phzz7e.png" />
          </div>
          <div className="md:w-3/5">
            <h1 className="font-bold text-4xl text-secondaryBlue">
              Servicios para el cuidado de tu mascota
            </h1>
            <h2 className="font-bold mt-2">
              Desde consulta médica general hasta especialidades y urgencias.
            </h2>
            <div className="w-full grid grid-cols-3 md:grid-cols-5 gap-10 mt-10">
              {datos.map((servicio) => (
                <ServiceIcon
                  key={servicio.id}
                  name={servicio.name}
                  icon={servicio.icono}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function ServiceIcon({ name, icon }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-20 h-20 flex justify-center items-center rounded-full border border-secondaryBlue">
        <img className="w-12 h-12" src={icon} />
      </div>
      <h1 className="text-center">{name}</h1>
    </div>
  );
}

export default Home;
