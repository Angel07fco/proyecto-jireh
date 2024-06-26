import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ children, redirecTo="/" }) => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (!token || rol !== "usuario") {
        return <Navigate to={redirecTo} />
    }
    return children ? children : <Outlet />
}