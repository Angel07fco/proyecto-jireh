import ButtonDisabled from '../Ui/ButtonDisabled';
import { useForm } from "../../hooks/useForm";
import {Input} from "../../components/Ui/Input";
import Label from "../../components/Ui/Label";
import Button from "../../components/Ui/Button";
import Loader from "../../components/Ui/Loader";
import Danger from "../Ui/Alertas/Danger";
import Success from "../Ui/Alertas/Success";

const initialForm = { email: "", asunto: "", msg: "" };

const validationsForm = (form) => {
    let errors = {};
    let regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (!form.email.trim()) {
        errors.email = "El campo 'Email' es requerido.";
    } else if (!regexEmail.test(form.email.trim())){
        errors.email = "El campo 'Email' es incorrecto.";
    }

    if (!form.asunto.trim()) {
        errors.asunto = "El campo 'Asunto' es requerido.";
    }

    if (!form.msg.trim()) {
        errors.msg = "El campo 'Mensaje' es requerido.";
    }

    return errors;
};

function FormContact() {
    const { form, errors, loading, responseErrors, responseSuccess, handleChange, handleBlur, handleSubmit }
    = useForm({ ...initialForm }, validationsForm, 3);

    return (
        <div className="flex min-h-full flex-col px-6 lg:px-8">
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
                                placeholder="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.email}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-xs font-bold">{errors.email}</p>}
                        </div>
                    </div>

                    <div className='mt-3'>
                        <Label>Asunto</Label>
                        <div className="mt-2">
                            <Input
                                type="text"
                                name="asunto"
                                placeholder="Asunto"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.asunto}
                                required
                            />
                            {errors.asunto && <p className="text-red-500 text-xs font-bold">{errors.asunto}</p>}
                        </div>
                    </div>

                    <div className='mt-3'>
                        <Label>Mensaje</Label>
                        <div className="mt-2">
                            <textarea
                                className='block h-20 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3'
                                type="text"
                                name="msg"
                                placeholder="Mensaje"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.msg}
                                required
                            />
                            {errors.msg && <p className="text-red-500 text-xs font-bold">{errors.msg}</p>}
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
                                            <Button texto="Enviar" bg="secondaryBlue" textoColor="white" />
                                    }
                                </>
                            :
                                <ButtonDisabled texto="Enviar" bg="gray-500" />
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormContact;