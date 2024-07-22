import Logo from "../../assets/images/logoJIREH.png";
import { useEffect, useRef, useState } from "react";
import ButtonDisabled from '../Ui/ButtonDisabled';
import {Input} from "../../components/Ui/Input";
import Button from "../../components/Ui/Button";
import Loader from "../../components/Ui/Loader";
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "../../hooks/useForm";
import Label from "../../components/Ui/Label";
import Success from "../Ui/Alertas/Success";
import Danger from "../Ui/Alertas/Danger";
import { Link } from "react-router-dom";

const initialForm = { email: "", password: "" };

const validationsForm = (form) => {
    let errors = {};
    let regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%$])[A-Za-z\d@#%$]{8,20}$/;

    if (!form.email.trim()) {
        errors.email = "El campo 'Email' es requerido.";
    } else if (!regexEmail.test(form.email.trim())){
        errors.email = "El campo 'Email' es incorrecto.";
    }

    if (!form.password.trim()) {
        errors.password = "El campo 'Contraseña' es requerido.";
    } else if (!regexPass.test(form.password.trim())){
        errors.password = "El campo 'Contraseña' es incorrecto.";
    }

    return errors;
};

function FormLogin() {
    const { form, errors, loading, responseErrors, responseSuccess, handleChange, handleBlur, handleSubmit }
    = useForm(initialForm, validationsForm, 2);
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (responseErrors === "El correo electrónico aún no se ha verificado. Se ha enviado un código  a tu correo, por favor comprueba tu bandeja de entrada.") {
                navigate('/confirmar-cuenta', { state: { email: form.email } });
            }
            if (responseErrors === "La cuenta ha sido bloqueada temporalmente. Comprueba tu bandeja de entrada.") {
                navigate('/confirmar-codigo', { state: { email: form.email } });
            }
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [responseErrors]);

    const onSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }

        if (isCaptchaCompleted) {
            handleSubmit(e); // Pasa el evento a handleSubmit
        } else {
            setMsjErrorC("Por favor, introduce un captcha correcto.");
        }
    }

    const [isCaptchaCompleted, setIsCaptchaCompleted] = useState(false);
    const [msjErrorC, setMsjErrorC] = useState("");
    const captcha = useRef(null);
    const onChange = () => {
        if (captcha.current.getValue()) {
        setIsCaptchaCompleted(true);
        setMsjErrorC("");
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-24 w-auto" src={Logo} alt="Logo JIREH" />
                <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">¡Bienvenido a la Comunidad de JIREH!</h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                {responseErrors && <Danger mensaje={responseErrors} />}
                {responseSuccess && <Success mensaje={responseSuccess} />}
                <form onSubmit={onSubmit}>
                    <div className='mt-3'>
                        <Label>Correo electrónico</Label>
                        <div className="mt-2">
                            <Input
                                type="email"
                                name="email"
                                placeholder="Escribe tu correo electrónico"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.email}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-xs font-bold">{errors.email}</p>}
                        </div>
                    </div>

                    <div className='mt-3'>
                        <div className="flex flex-row justify-between items-center">
                            <Label>Contraseña</Label>
                            <p
                                className="cursor-pointer text-sm font-medium text-secondaryBlue"
                                onClick={handleClickShowPassword}
                            >{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</p>
                        </div>
                        <div className="mt-2">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Escribe tu contraseña"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.password}
                                required
                            />
                            {errors.password && <p className="text-red-500 text-xs font-bold">{errors.password}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center my-10">
                        <ReCAPTCHA
                            ref={captcha}
                            sitekey="6LdmJVQpAAAAAC9oV3K9_U3NXeO3h-fHFbPUTWvJ"
                            onChange={onChange}
                        />
                        <span className="font-bold text-red-500">{msjErrorC}</span>
                    </div>

                    <div className="flex justify-end mt-6">
                        {Object.keys(errors).length === 0 && !responseErrors && !responseSuccess
                            ?
                                <>
                                    {loading
                                        ?
                                            <Loader />
                                        :
                                            <Button texto="Iniciar sesión" bg="secondaryBlue" textoColor="white" />
                                    }
                                </>
                            :
                                <ButtonDisabled texto="Iniciar sesión" bg="gray-500" />
                        }
                    </div>
                </form>
                <div className="flex justify-end mt-6">
                    <span>
                        ¿Aun no tienes una cuenta?
                        <Link to="/registro" className="text-secondaryBlue hover:underline ml-1">Crea un cuenta</Link>
                    </span>
                </div>
                <div className="flex justify-end mt-6">
                    <span>
                        ¿No puedes acceder?
                        <Link to="/metodo-recuperar" className="text-secondaryBlue hover:underline ml-1">Recuperar contraseña</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default FormLogin