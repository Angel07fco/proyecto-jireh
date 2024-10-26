import Header from "../../../components/Header/Header";
import Aside from "../../../components/Aside";
import Layout from "../Layout";
import { Link } from "react-router-dom";

function Cuenta() {
  return (
    <Layout>
      <div className="flex">
        <Aside />
        <div className="w-full h-[100vh] overflow-y-scroll">
          <Header texto="Mi cuenta" linkText="Mi cuenta" />
          <div className="my-10 md:mx-20 mx-5">
            <h1 className="text-2xl">
              En esta sección podra visualizar la información de su perfil y su
              mascota(s), historial médico de su mascota(s), historial de citas,
              productos comprados y tratamientos o medicamentos sugeridos para
              su mascota(s).
            </h1>
            <div className="grid md:grid-cols-2 gap-5 my-10">
              <CardHome
                title="Mi Perfil"
                content="En esta sección, el usuario puede ver y editar la información de su perfil personal."
                img="https://res.cloudinary.com/dl8odylct/image/upload/v1711329076/jireh/user_glssuc.png"
                link="/perfil"
              />
              <CardHome
                title="Mis Mascotas"
                content="En esta sección, el usuario puede gestionar la información relacionada con sus mascotas."
                img="https://res.cloudinary.com/dl8odylct/image/upload/v1711328979/jireh/mascotas_npaa7q.png"
                link="/mascotas"
              />
              <CardHome
                title="Historial Médico"
                content="Esta sección permite al usuario acceder al historial médico de sus mascotas."
                img="https://res.cloudinary.com/dl8odylct/image/upload/v1711328954/jireh/historialmedico_qktzqa.png"
                link="/historial-medico"
              />
              <CardHome
                title="Historial de Citas"
                content="En esta sección, el usuario puede ver el registro de todas las citas programadas para sus mascotas."
                img="https://res.cloudinary.com/dl8odylct/image/upload/v1711328952/jireh/historialcitas_dj8auc.png"
                link="/historial-citas"
              />
              <CardHome
                title="Productos Comprados"
                content="Aquí el usuario puede revisar un registro de los productos que ha comprado para sus mascotas, como alimentos, juguetes, accesorios, etc."
                img="https://res.cloudinary.com/dl8odylct/image/upload/v1711328951/jireh/productos_s0rgmf.png"
                link="/productos-comprados"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function CardHome({ title, content, img, link }) {
  return (
    <div className="relative flex flex-col min-w-0 bg-white shadow-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap">
          <div className="max-w-full lg:w-1/2 lg:flex-none">
            <div className="flex flex-col h-full">
              <h5 className="font-bold text-secondaryBlue text-lg">{title}</h5>
              <p className="md:mb-12 mb-4">{content}</p>
              <Link to={link}>
                <a
                  className="mt-auto flex items-center mb-0 font-semibold leading-normal text-sm group text-slate-500"
                  href="javascript:;"
                >
                  Ver mas sobre {title}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="fill-current w-4 h-4 ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200"
                  >
                    <path d="M88 272h248v-32H88c-13.3 0-24 10.7-24 24v32c0 13.3 10.7 24 24 24h248v-32H88v-24zm277.5-96.5l79.5 79.5c9.4 9.4 9.4 24.6 0 34l-79.5 79.5c-7.5 7.5-19.8 7.5-27.3 0l-7.1-7.1c-7.5-7.5-7.5-19.8 0-27.3L400.6 256l-47.5-47.5c-7.5-7.5-7.5-19.8 0-27.3l7.1-7.1c7.5-7.5 19.8-7.5 27.3 0z" />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
          <div className="max-w-full px-3 md:mt-12 mt-4 ml-auto text-center lg:mt-0 lg:w-5/12 lg:flex-none">
            <div className="h-full bg-gradient-to-tl from-primaryBlue to-secondaryBlue rounded-xl">
              <img
                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-tailwind/img/shapes/waves-white.svg"
                className="absolute top-0 hidden w-1/2 h-full lg:block"
                alt="waves"
              />
              <div className="relative flex items-center justify-center h-full hidden md:block">
                <img
                  className="relative z-20 w-28 h-40 pt-3"
                  src={img}
                  alt={title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cuenta;
