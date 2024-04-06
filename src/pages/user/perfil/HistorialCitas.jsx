import Header from "../../../components/Header/Header";
import Aside from "../../../components/Aside";
import Layout from "../Layout";

function HistorialCitas() {
  return (
    <Layout>
      <div className="flex">
        <Aside selected={3} />
        <div className="w-full">
          <Header texto="Historial de citas de mis mascotas" linkText="Citas" />
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Cita JIREH</h2>
              <p className="text-sm text-gray-600 mb-4">Fecha: 14/02/20</p>
              <p className="text-sm text-gray-600 mb-4">Hora: 10:00 am</p>
              <p className="text-gray-700">La cita se llevara a cabo a la mascota Malu</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HistorialCitas