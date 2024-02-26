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
    const [errors, setErrors] = useState(null);
    const [response, setResponse] = useState(null);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setResponse(res.data.msj);
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
            setResponse(res.data.msj);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const verifyE = async (user) => {
        try {
            const res = await verifyEmail(user);
            console.log(res);
            setResponse(res.data.msj);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const sendCodePass = async (user) => {
        try {
            const res = await codePassReset(user);
            console.log(res);
            setResponse(res.data.msj);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const sendPasswordReset = async (user) => {
        try {
            const res = await passwordReset(user);
            console.log(res);
            setResponse(res.data.msj);
        } catch (error) {
            setErrors(error.response.data);
            console.log(error.response.data);
        }
    }

    const sendCodeEmail = async (user) => {
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
                sendCodePass,
                sendCodeEmail,
                sendPasswordReset,
                user,
                errors,
                response
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};