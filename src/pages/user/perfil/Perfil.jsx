import Header from "../../../components/Header/Header";
import Aside from "../../../components/Aside";
import Layout from "../Layout";

function Perfil() {
    return (
        <Layout>
            <div className="flex">
                <Aside selected={0} />
                <div className="w-full h-[100vh] overflow-y-scroll">
                    <Header texto="Mi Perfil" linkText="Mi perfil" />
                    <div className="my-10 mx-20">
                        <h1 className="font-bold text-4xl">Hola AngelMH</h1>
                        <p className="mt-2 text-lg">En esta sección, el usuario puede ver y editar la información de su perfil.</p>
                        
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Perfil;
