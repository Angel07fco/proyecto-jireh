import Logo from '../assets/notfound.jpg';
import { Link } from "react-router-dom";
import Button from './Ui/Button';

function Error404() {
    return (
        <div>
            <div className='my-10 flex md:flex-row flex-col justify-center'>
                <div className='flex justify-center items-center'>
                    <img src={Logo} alt="NOT FOUND" style={{width: '300px', height: '350px'}} />
                </div>
                <div className='md:ml-28'>
                    <h1 className='text-5xl font-bold text-secondaryBlue'>Oops.</h1>
                    <div className='my-5 space-y-2'>
                        <h3 className='text-lg'>No podemos encontrar la página que estás buscando</h3>
                        <h3 className='text-lg'>Es posible que haya caducado o que haya ocurrido un error tipográfico.</h3>
                        <h3 className='text-lg'>Quizas puedas encontrar lo que necesitas en nuestra página de inicio.</h3>
                    </div>
                    <Link to="/">
                        <Button texto="Ir a Inicio" />
                    </Link>
                </div>
                </div>
        </div>
    )
}

export default Error404