import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export const useForm = (initialForm, validateForm, caso) => {
    const { signup, singin, verifyE, sendPasswordReset, sendCodePass, response, errors: signinErrors } = useAuth();
    const [responseSuccess, setResponseSuccess] = useState("");
    const [responseErrors, setResponseError] = useState("");
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validateForm(form));

        if (Object.keys(errors).length === 0) {
            setLoading(true);
            if (caso === 1) {
                signup(form);
            } else if (caso === 2) {
                singin(form);
            } else if (caso === 3) {
                verifyE(form);
            } else if (caso === 4) {
                sendPasswordReset(form);
            } else if (caso === 5) {
                sendCodePass(form);
            }
        } else {
            return;
        }
    };

    useEffect(() => {
        setLoading(false);
        if (signinErrors) {
            setResponseError(signinErrors);
            const timeoutId = setTimeout(() => {
                if (responseErrors === "El correo electrónico aún no se ha verificado. Se ha enviado un código  a tu correo, por favor comprueba tu bandeja de entrada.") {
                    navigate('/confirmar-cuenta', { state: { email: form.email } });
                }
                setResponseError(null);
            }, 5000);
            return () => clearTimeout(timeoutId);
        }
    }, [signinErrors]);

    useEffect(() => {
        setLoading(false);
        if (response) {
            setResponseSuccess(response);
            const timeout = setTimeout(() => {
                setResponseSuccess(null);
                if (caso === 1) {
                    navigate('/confirmar-cuenta', { state: { email: form.email } });
                }
                if (caso === 3) {
                    navigate('/iniciar-sesion');
                }
                if (caso === 4) {
                    navigate('/iniciar-sesion');
                }
                if (caso === 5) {
                    navigate('/desbloquear-cuenta', { state: { email: form.email } });
                }
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [response]);

    return {
        form,
        errors,
        loading,
        responseErrors,
        responseSuccess,
        handleChange,
        handleBlur,
        handleSubmit
    }
}