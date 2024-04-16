import AdminLayout from "../AdminLayout"
import HeaderAdmin from "../components/HeaderAdmin/HeaderAdmin"

function AdminCuenta() {
    return (
        <AdminLayout>
            <HeaderAdmin texto="MI CUENTA ADMIN" linkText="cuenta administrador" />
            <div className="px-10">
                <h1>Manejo de horarios</h1>
            </div>
        </AdminLayout>
    )
}

export default AdminCuenta