import Logo from "../../assets/images/logoJIREH.png";
import ButtonDisabled from '../Ui/ButtonDisabled';
import {Input} from "../../components/Ui/Input";
import Button from "../../components/Ui/Button";
import Loader from "../../components/Ui/Loader";
import { useForm } from "../../hooks/useForm";
import Label from "../../components/Ui/Label";
import Success from "../Ui/Alertas/Success";
import Danger from "../Ui/Alertas/Danger";
import { Link } from "react-router-dom";

const initialForm = { email: "", indicator: "1" };

const validationsForm = (form) => {
    let errors = {};
    let regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (!form.email.trim()) {
        errors.email = "El campo 'Email' es requerido.";
    } else if (!regexEmail.test(form.email.trim())){
        errors.email = "El campo 'Email' es incorrecto.";
    }

    return errors;
};

function FormSendOtp() {

    const { form, errors, loading, responseErrors, responseSuccess, handleChange, handleBlur, handleSubmit }
    = useForm(initialForm, validationsForm, 5);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-24 w-auto" src={Logo} alt="Logo JIREH" />
                <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">¡Recuperación de contraseña!</h2>
                <h5>¿Necesitas restablecer tu contraseña? ¡No hay problema! Ingresa tu dirección de correo electrónico y se enviara un código a su correo electrónico.</h5>
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
                                placeholder="Escribe tu correo electrónico"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.email}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-xs font-bold">{errors.email}</p>}
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
                                            <Button texto="Enviar código" bg="secondaryBlue" textoColor="white" />
                                    }
                                </>
                            :
                                <ButtonDisabled texto="Enviar código" bg="gray-500" />
                        }
                    </div>
                </form>
                <div className="flex justify-end mt-6">
                    <span>
                        ¿Desea iniciar sesión?
                        <Link to="/iniciar-sesion" className="text-secondaryBlue hover:underline ml-1">Crea un cuenta</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default FormSendOtp;
