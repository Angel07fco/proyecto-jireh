import { createContext, useState, useContext, useEffect } from "react";
import {
    registerRequest,
    loginRequest,
    verifyEmail,
    forgotPassMethod,
    validateReply,
    validateOTP,
    codeverifyEmail,
    passwordReset,
    logout
} from "../api/auth";

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
    const [errors, setErrors] = useState(null);
    const [response, setResponse] = useState(null);
    const [data, setData] = useState(null);

    const signup = async (user) => {  // Funcion para crear una cuenta
        try {
            const res = await registerRequest(user);
            setResponse(res.data.msj);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    };

    const singin = async (user) => {  // Funcion para iniciar sesion
        try {
            const res = await loginRequest(user);
            console.log(res);
            setUser(res.data);
            console.log(res.data);
            setResponse(res.data.msj);
            localStorage.setItem("token", res?.data.token);
            localStorage.setItem("rol", res?.data.rol);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const userLogout = async (token) => { // Funcion para cerrar sesion
        try {
            const res = await logout(token);
            setResponse(res.data.msj);
            localStorage.removeItem("token");
            localStorage.removeItem("rol");
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const verifyE = async (user) => {  // Funcion para verficar la cuenta por email
        try {
            const res = await verifyEmail(user);
            console.log(res);
            setResponse(res.data.msj);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const sendForgotMethod = async (user) => {  // Funcion para recuperar contraseña por metodo
        try {
            const res = await forgotPassMethod(user);
            setData(res.data.createdPasswordReset.question_secret);
            setResponse(res.data.msj);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const sendValidateReply = async (user) => {  // Funcion para validar la respuesta para recuperar contraseña por pregunta secreta
        try {
            const res = await validateReply(user);
            console.log(res);
            setResponse(res.data.msj);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const sendValidateCode = async (user) => {  // Funcion para validar el codigo para recuperar contraseña por email
        try {
            const res = await validateOTP(user);
            console.log(res);
            setResponse(res.data.msj);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const sendPasswordReset = async (user) => { // Funcion para cambiar contraseña
        try {
            const res = await passwordReset(user);
            console.log(res);
            setResponse(res.data.msj);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const sendCodeEmail = async (user) => {  // Funcion para enviar codigo de activacion de cuenta
        try {
            const res = await codeverifyEmail(user);
            console.log(res);
            setResponse(res.data.msj);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        if (errors && errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        if (response && response.length > 0) {
            const timer = setTimeout(() => {
                setResponse(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [response]);

    return (
        <AuthContext.Provider
            value={{
                signup,
                singin,
                verifyE,
                sendForgotMethod,
                sendValidateReply,
                sendValidateCode,
                sendPasswordReset,
                sendCodeEmail,
                userLogout,
                user,
                errors,
                response,
                data
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};