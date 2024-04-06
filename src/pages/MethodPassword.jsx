import Layout from "./user/Layout";
import Logo from "../assets/images/logoJIREH.png";
import Button from "../components/Ui/Button";
import { useNavigate } from 'react-router-dom';

function MethodPassword() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/recuperar-contraseña');
    };

    const handleClick2 = () => {
        navigate('/recuperar-contraseña-pregunta');
    };

    return (
        <Layout>
            <section className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-24 w-auto" src={Logo} alt="Logo JIREH" />
                    <h2 className="mt-5 text-2xl font-bold leading-9 tracking-tight text-gray-900">Recuperación de contraseña</h2>
                    <h5>Seleccione el método que desea recuperar su contraseña.</h5>
                    <div className="my-5 space-y-5">
                        <Button texto="Enviando un código a mi correo" onClick={handleClick} />
                        <Button texto="Pregunta secreta" onClick={handleClick2} />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default MethodPassword