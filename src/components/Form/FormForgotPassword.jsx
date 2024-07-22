import Logo from "../../assets/images/logoJIREH.png";
import ButtonDisabled from '../Ui/ButtonDisabled';
import { useForm } from "../../hooks/useForm";
import {Input} from "../../components/Ui/Input";
import Label from "../../components/Ui/Label";
import Button from "../../components/Ui/Button";
import Loader from "../../components/Ui/Loader";
import { useState } from "react";
import { Link } from "react-router-dom";
import Danger from "../Ui/Alertas/Danger";
import Success from "../Ui/Alertas/Success";
import PasswordStrengthMeter from "../PasswordStrengthMeter";
import { useLocation } from 'react-router-dom';

const initialForm = { newPassword: "" };

const validationsForm = (form) => {
    let errors = {};
    let regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%$])[A-Za-z\d@#%$]{8,20}$/;

    if (!form.newPassword.trim()) {
        errors.newPassword = "El campo 'Contraseña' es requerido.";
    } else if (!regexPass.test(form.newPassword.trim())){
        errors.newPassword = "El campo 'Contraseña' es incorrecto.";
    }

    return errors;
};

function FormForgotPassword() {
    const location = useLocation();
    const { email } = location.state;

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const { form, errors, loading, responseErrors, responseSuccess, handleChange, handleBlur, handleSubmit }
    = useForm({...initialForm, email }, validationsForm, 8);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-24 w-auto" src={Logo} alt="Logo JIREH" />
                <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">¡Únete a la Comunidad de JIREH!</h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                {responseErrors && <Danger mensaje={responseErrors} />}
                {responseSuccess && <Success mensaje={responseSuccess} />}
                <form onSubmit={handleSubmit}>
                    <div className='mt-3'>
                        <Label>Correo electrónico</Label>
                        <div className="mt-2">
                            <Input
                                type="email"
                                name="email"
                                value={email}
                                disabled
                            />
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
                        <div className="mt-2 space-y-2">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                name="newPassword"
                                placeholder="Escribe tu contraseña"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.newPassword}
                                required
                            />
                            <PasswordStrengthMeter password={form.newPassword} />
                            {errors.newPassword && <p className="text-red-500 text-xs font-bold">{errors.newPassword}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        {Object.keys(errors).length === 0 && !responseErrors && !responseSuccess
                            ?
                                <>
                                    {loading
                                        ?
                                            <Loader />
                                        :
                                            <Button texto="Restablecer contraseña" bg="secondaryBlue" textoColor="white" />
                                    }
                                </>
                            :
                                <ButtonDisabled texto="Restablecer contraseña" bg="gray-500" />
                        }
                    </div>
                </form>
                <div className="flex justify-end mt-6">
                    <span>
                        ¿Ya tienes una cuenta?
                        <Link to="/iniciar-sesion" className="text-secondaryBlue hover:underline ml-1">Inicia sesión</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default FormForgotPassword