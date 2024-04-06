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

let initialForm = { user: "", email: "", phone: "", password: "" };

const validationsForm = (form) => {
    let errors = {};
    let regexName = /^[a-zA-Z0-9]+$/;
    let regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    let regexPhone = /^[0-9]{10}$/;
    let regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%$])[A-Za-z\d@#%$]{8,20}$/;

    if (!form.user.trim()) {
        errors.user = "El campo 'Usuario' es requerido.";
    } else if(form.user.trim().length < 2) {
        errors.user = "El campo 'Usuario' es demasiado corto.";
    } else if (!regexName.test(form.user.trim())){
        errors.user = "El campo 'Usuario' solo acepta letras y número.";
    } else if (form.user.trim().length > 15){
        errors.user = "El campo 'Usuario' es demasiado largo.";
    }

    if (!form.email.trim()) {
        errors.email = "El campo 'Email' es requerido.";
    } else if (!regexEmail.test(form.email.trim())){
        errors.email = "El campo 'Email' es incorrecto.";
    }

    if (!form.phone.trim()) {
        errors.phone = "El campo 'Teléfono' es requerido.";
    } else if (!regexPhone.test(form.phone.trim())){
        errors.phone = "El campo 'Teléfono' es incorrecto.";
    }

    if (!form.password.trim()) {
        errors.password = "El campo 'Contraseña' es requerido.";
    } else if (!regexPass.test(form.password.trim())){
        errors.password = "El campo 'Contraseña' es incorrecto.";
    }

    return errors;
};

function Formulario() {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const { form, errors, loading, responseErrors, responseSuccess, handleChange, handleBlur, handleSubmit }
    = useForm(initialForm, validationsForm, 1);

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
                    <div>
                        <Label>Usuario</Label>
                        <div className="mt-2">
                            <Input
                                type="text"
                                name="user"
                                placeholder="Escribe tu Usuario"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.user}
                                required
                            />
                            {errors.user && <p className=" text-red-500 text-xs font-bold">{errors.user}</p>}
                        </div>
                    </div>

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
                        <Label>Telefóno</Label>
                        <div className="mt-2">
                            <Input
                                type="phone"
                                name="phone"
                                placeholder="Escribe tu número de teléfono"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.phone}
                                required
                            />
                            {errors.phone && <p className="text-red-500 text-xs font-bold">{errors.phone}</p>}
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
                                name="password"
                                placeholder="Escribe tu contraseña"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.password}
                                required
                            />
                            <PasswordStrengthMeter password={form.password} />
                            {errors.password && <p className="text-red-500 text-xs font-bold">{errors.password}</p>}
                        </div>
                    </div>

                    <div className="flex flex-row mt-5">
                        <input type="checkbox" required />
                        <Link to="/terminos&condiciones" className="ml-2 hover:text-secondaryBlue hover:underline">He leído y acepto los Términos y Condiciones</Link>
                    </div>

                    <div className="flex justify-end mt-6">
                        {Object.keys(errors).length === 0 && !responseErrors && !responseSuccess
                            ?
                                <>
                                    {loading
                                        ?
                                            <Loader />
                                        :
                                            <Button texto="Crear cuenta" bg="secondaryBlue" textoColor="white" />
                                    }
                                </>
                            :
                                <ButtonDisabled texto="Crear cuenta" bg="gray-500" />
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

export default Formulario