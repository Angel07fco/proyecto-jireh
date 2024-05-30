import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteAdmin = ({ children, redirecTo="/" }) => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (!token || rol !== "admin") {
        return <Navigate to={redirecTo} />
    }
    return children ? children : <Outlet />
}