import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyEmail, codePassReset, codeverifyEmail, passwordReset } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [emailVerify, setEmailVerify] = useState(null);
    const [codePass, setCodePass] = useState(null);
    const [codeEmail, setCodeEmail] = useState(null);
    const [passReset, setPassReset] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [errors, setErrors] = useState(null);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res);
            setUser(res.data);
            setIsRegister(true);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    };

    const singin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const verifyE = async (user) => {
        try {
            const res = await verifyEmail(user);
            console.log(res);
            setEmailVerify(res.data);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const sendCodePass = async (user) => {
        try {
            const res = await codePassReset(user);
            console.log(res);
            setCodePass(res.data);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const sendPasswordReset = async (user) => {
        try {
            const res = await passwordReset(user);
            console.log(res);
            setPassReset(res.data);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const sendCodeEmail = async (user) => {
        try {
            const res = await codeverifyEmail(user);
            console.log(res);
            setCodeEmail(res.data);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        if (errors && errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors(null); // Reiniciar los errores a null después de 3 segundos
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <AuthContext.Provider
            value={{
                signup,
                singin,
                verifyE,
                sendCodePass,
                sendCodeEmail,
                sendPasswordReset,
                passReset,
                codeEmail,
                codePass,
                user,
                isRegister,
                emailVerify,
                isAuthenticated,
                errors
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};