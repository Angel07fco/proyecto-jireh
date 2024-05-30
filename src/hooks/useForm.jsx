import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export const useForm = (initialForm, validateForm, caso) => {
    const { signup, singin, verifyE, sendForgotMethod, sendValidateReply, sendValidateCode, sendPasswordReset, response, errors: signinErrors } = useAuth();
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
                signup(form);  // Formulario.jsx
            } else if (caso === 2) {
                singin(form); // FormLogin.jsx
            } else if (caso === 3) {
                verifyE(form); // FormConfirmAccount.jsx
            } else if (caso === 4) {
                sendForgotMethod(form); // FormQuestion.jsx
            } else if (caso === 5) {
                sendForgotMethod(form); // FormSendOtp.jsx
            } else if (caso === 6) {
                sendValidateReply(form); // FormQuestionSecret.jsx
            } else if (caso === 7) {
                sendValidateCode(form); // FormUnlockAccount.jsx
            } else if (caso === 8) {
                sendPasswordReset(form);
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
                if (caso === 2) {
                    const userRole = localStorage.getItem("rol");
                    if (userRole === "usuario") {
                        navigate('/');
                    } else if (userRole === "admin") {
                        navigate('/admin');
                    }
                }
                if (caso === 3) {
                    navigate('/iniciar-sesion');
                }
                if (caso === 4 && initialForm.indicator === "2") {
                    navigate('/pregunta-secreta', { state: { email: form.email } });
                }
                if (caso === 5 && initialForm.indicator === "1") {
                    navigate('/confirmar-codigo', { state: { email: form.email } });
                }
                if (caso === 6) {
                    navigate('/cambiar-contrasena', { state: { email: form.email } });
                }
                if (caso === 7) {
                    navigate('/iniciar-sesion');
                    navigate('/cambiar-contrasena', { state: { email: form.email } });
                }
                if (caso === 8) {
                    navigate('/iniciar-sesion');
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