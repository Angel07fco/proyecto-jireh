import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ children, redirecTo="/" }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to={redirecTo} />
    }
    return children ? children : <Outlet />
}