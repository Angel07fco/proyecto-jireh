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
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const initialForm = { reply_secret: "" };

const validationsForm = (form) => {
    let errors = {};

    if (!form.reply_secret.trim()) {
        errors.reply_secret = "El campo 'Respuesta' es requerido.";
    }

    return errors;
};

function FormQuestionSecret() {
    const location = useLocation();
    const { email } = location.state;
    const { form, errors, loading, responseErrors, responseSuccess, handleChange, handleBlur, handleSubmit }
    = useForm({ ...initialForm, email }, validationsForm, 6);
    const { data } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!data) {
            // Redirigir a otra página si data está vacío
            navigate('/recuperar-contraseña-pregunta');
        }
    }, [data, navigate]);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-24 w-auto" src={Logo} alt="Logo JIREH" />
                <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">¡Recuperación de contraseña!</h2>
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
                        <Label>Pregunta secreta</Label>
                        <div className="mt-2">
                            <Input
                                value={data}
                                disabled
                            />
                        </div>
                    </div>

                    <div className='mt-3'>
                        <Label>Respuesta</Label>
                        <div className="mt-2">
                            <Input
                                type="text"
                                name="reply_secret"
                                placeholder="Escribe tu contraseña"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.reply_secret}
                                required
                            />
                            {errors.reply_secret && <p className="text-red-500 text-xs font-bold">{errors.reply_secret}</p>}
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

export default FormQuestionSecret;