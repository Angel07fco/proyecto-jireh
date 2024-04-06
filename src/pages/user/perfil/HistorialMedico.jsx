import Header from "../../../components/Header/Header";
import Aside from "../../../components/Aside";
import Layout from "../Layout";

function HistorialMedico() {
    return (
      <Layout>
        <div className="flex">
          <Aside selected={2} />
          <div className="w-full">
            <Header texto="Historial médido de mis mascotas" linkText="Historial médico" />
          </div>
        </div>
      </Layout>
  )
}

export default HistorialMedico;
