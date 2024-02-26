import Logo from "../../assets/images/logoJIREH.png"
import ButtonDisabled from '../Ui/ButtonDisabled';
import { useLocation } from 'react-router-dom';
import { useForm } from "../../hooks/useForm";
import {Input} from "../../components/Ui/Input";
import Label from "../../components/Ui/Label";
import Button from "../../components/Ui/Button";
import Loader from "../../components/Ui/Loader";
import Danger from "../Ui/Alertas/Danger";
import Success from "../Ui/Alertas/Success";
import { useState } from "react";

const initialForm = { newPassword: "", otp: "" };

const validationsForm = (form) => {
    let errors = {};
    let regexCode = /^[0-9]{4}$/;
    let regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%$])[A-Za-z\d@#%$]{8,20}$/;

    if (!form.otp.trim()) {
        errors.otp = "El campo 'Código' es requerido.";
    } else if(form.otp.trim().length < 4) {
        errors.otp = "El campo 'Código' es demasiado corto.";
    } else if (form.otp.trim().length > 4){
        errors.otp = "El campo 'Código' es demasiado largo.";
    } else if (!regexCode.test(form.otp.trim())){
        errors.otp = "El campo 'Código' solo permite números.";
    }

    if (!form.newPassword.trim()) {
        errors.newPassword = "El campo 'Nueva contraseña' es requerido.";
    } else if (!regexPass.test(form.newPassword.trim())){
        errors.newPassword = "El campo 'Nueva contraseña' es incorrecto.";
    }

    return errors;
};

function FormConfirmAccount() {
    const location = useLocation();
    const { email } = location.state;
    const { form, errors, loading, responseErrors, responseSuccess, handleChange, handleBlur, handleSubmit }
    = useForm({ ...initialForm, email }, validationsForm, 4);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-24 w-auto" src={Logo} alt="Logo JIREH" />
                <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">¡Recuperación de contraseña!</h2>
                <h5>Por favor, verifique su correo electrónico e ingrese el código de activación y una nueva contraseña.</h5>
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
                        <Label>Código</Label>
                        <div className="mt-2">
                            <Input
                                type="number"
                                name="otp"
                                placeholder="Escribe el código de activación"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.otp}
                                required
                            />
                            {errors.otp && <p className="text-red-500 text-xs font-bold">{errors.otp}</p>}
                        </div>
                    </div>

                    <div className='mt-3'>
                        <div className="flex flex-row justify-between items-center">
                            <Label>Nueva contraseña</Label>
                            <p
                                className="cursor-pointer text-sm font-medium text-secondaryBlue"
                                onClick={handleClickShowPassword}
                            >{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</p>
                        </div>
                        <div className="mt-2">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                name="newPassword"
                                placeholder="Escribe tu contraseña"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.newPassword}
                                required
                            />
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
            </div>
        </div>
    );
}

export default FormConfirmAccount;