import { TextField, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ValidateOTP({ dataU, message, state }) {

    const { verifyE, emailVerify, errors: signinErrors } = useAuth();
    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = handleSubmit((data) => {
        const formData = { ...data, email: dataU };
        console.log(formData);
        verifyE(formData);
    });

    const navigate = useNavigate();
    const [found, setFound] = useState(false);
    const [messageTrue, setMessageTrue] = useState("");
    useEffect(() => {
        if (emailVerify) {
            setFound(true);
            setMessageTrue("Código valido: Tu cuenta ha sido activida. Ahora puedes Iniciar sesión.")
            const timeoutId = setTimeout(() => {
                navigate('/iniciar-sesion');
            }, 3000);
            return () => clearTimeout(timeoutId);
        }
    }, [emailVerify]);

    return (
        <div>
            <h2 className="text-2xl font-bold">Código de validacion de correo electrónico</h2>
            <h5 className="text-lg my-6">Revisa tu correo electrónico. Te hemos enviado un código de validación. Úsalo aquí para {message}.</h5>
            {signinErrors && (
                <div className="bg-red-500 my-5 p-4 text-white" style={{ marginTop: "10px", marginBottom: "20px" }}>
                    <span className="font-bold">Error 400: </span>{signinErrors}
                </div>
            )}
            {found && (
                <div className="bg-green bg-gren my-5 p-4 text-white">
                <span className="font-bold">200: </span>{messageTrue}
                </div>
            )}
            <form onSubmit={onSubmit}>
                <div className="mb-6">
                    <TextField fullWidth value={dataU} disabled/>
                </div>
                <div className="mb-6">
                    <TextField fullWidth label="Código de validación *" variant="outlined"
                        {...register("otp", {
                            required: { value: true, message: "El código es requerido" },
                            pattern: { value: /^[0-9]{4}$/, message: "El código debe tener un máximo de 4 dígitos y solo puede contener números." },
                        })}
                    />
                    {errors.otp && <span className="font-bold text-red-500">{errors.otp.message}</span>}
                </div>
                <div className="flex justify-end mt-6">
                    {found ? (
                        <Button variant="contained" size="large" disabled>Validando</Button>
                    ) : (
                        <Button variant="contained" size="large" type='onSubmit'>Validar código</Button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default ValidateOTP