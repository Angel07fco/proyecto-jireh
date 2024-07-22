import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-secondaryBlue">
            {/* Navbar section 1 */}
            <div className='md:mx-40 mx-14 py-10 md:grid md:grid-cols-3'>
                {/* Navbar section 1 CONTACT */}
                <div>
                    <h1 className='text-primaryBlue font-bold text-xl'>CONTÁCTANOS</h1>
                    <div className='pr-20'>
                        <div className='flex flex-row items-center mt-10'>
                            <LocationOnIcon className='text-primaryBlue' />
                            <h1 className='text-primaryBlue ml-3'>Bulevar Adolfo López S/N Colonia Aviación Civil</h1>
                        </div>
                        <div className='flex flex-row items-center mt-5'>
                            <PhoneIcon className='text-primaryBlue' />
                            <h1 className='text-primaryBlue ml-3'>77 1162 0008</h1>
                        </div>
                        <div className='flex flex-row items-center mt-5'>
                            <EmailIcon className='text-primaryBlue' />
                            <h1 className='text-primaryBlue ml-3'>veterinariajireh@gmail.com</h1>
                        </div>
                    </div>
                </div>
                {/* Navbar section 1 JIREH */}
                <div className='grid grid-cols-2 gap-10 md:mt-0 mt-10'>
                    <div>
                        <h1 className='text-primaryBlue font-bold text-xl'>Para los amantes de los animales</h1>
                        <div className='text-primaryBlue mt-5 cursor-pointer'>
                            <p className='hover:underline mt-2 text-sm'>Nuestros servicios</p>
                            <p className='hover:underline mt-2 text-sm'>Citas</p>
                            <p className='hover:underline mt-2 text-sm'>Testimonios</p>
                            <Link to="/galeria">
                                <p className='hover:underline mt-2 text-sm'>Galería</p>
                            </Link>
                            <Link to="/preguntas-frecuentes">
                                <p className='hover:underline mt-2 text-sm'>FAQ (Preguntas Frecuentes)</p>
                            </Link>
                            <Link to="/blog">
                                <p className='hover:underline mt-2 text-sm'>Blog</p>
                            </Link>
                            <p className='hover:underline mt-2 text-sm'>Comentarios</p>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-primaryBlue font-bold text-xl'>Acerca de JIREH</h1>
                        <div className='text-primaryBlue mt-5 cursor-pointer'>
                            <p className='hover:underline mt-2 text-sm'>Acerca de JIREH</p>
                            <p className='hover:underline mt-2 text-sm'>¿Por qué elegir JIREH?</p>
                            <p className='hover:underline mt-2 text-sm'>Nuestros valores</p>
                            <p className='hover:underline mt-2 text-sm'>Misión</p>
                            <p className='hover:underline mt-2 text-sm'>Visión</p>
                            <p className='hover:underline mt-2 text-sm'>Tratamientos</p>
                            <p className='hover:underline mt-2 text-sm'>Medicina</p>
                            <p className='hover:underline mt-2 text-sm'>Consejos</p>
                        </div>
                    </div>
                </div>
                {/* Navbar section FORM AND FAQ */}
                <div className='md:pl-5 md:mt-0 mt-10'>
                    <div className='flex flex-row'>
                        <input className='w-full border border-primaryBlue bg-transparent p-2 rounded-md text-primaryBlue' type='email' placeholder='Ingrese su correo electrónico' />
                        <div className='bg-primaryBlue py-2 px-2 rounded-md mr-2 cursor-pointer ml-1'>
                            <NearMeOutlinedIcon />
                        </div>
                    </div>
                    <h2 className='text-textoNota text-xs mt-2'><span className='font-bold'>¡Nota! </span>Al ingresar y enviar tu correo electrónico se te proporcionará más información acerca de lo que representa JIREH Community para los amantes de los animales.</h2>
                </div>
            </div>
            {/* Navbar section 2 */}
            <div className="bg-primaryBlue py-3">
                <div className='flex items-center md:mx-40 mx-14'>
                    <Link to="/aviso&de&privacidad">
                        <h1 className="mr-4 text-secundaryBlue font-semibold text-sm cursor-pointer hover:underline">Aviso de Privacidad</h1>
                    </Link>
                    <Link to="/terminos&condiciones">
                        <h1 className="mr-4 text-secundaryBlue font-semibold text-sm cursor-pointer hover:underline">Términos y Condiciones</h1>
                    </Link>
                    <Link to="/politica&de&cookies">
                        <h1 className="text-secundaryBlue font-semibold text-sm cursor-pointer hover:underline">Políticas de Cookies</h1>
                    </Link>
                </div>
            </div>

            {/* Navbar section 3 */}
            <div className="bg-secondaryBlue">
                <div className='flex items-center justify-between md:mx-40 mx-14 py-3'>
                    <h1 className="text-primaryBlue font-semibold text-sm">2024 ©JIREH Todos los derechos reservados</h1>
                    <div className='flex'>
                        <div className='bg-primaryBlue w-11 h-11 rounded-full flex items-center justify-center mr-4 cursor-pointer'>
                            <WhatsAppIcon className='text-secundaryBlue' />
                        </div>
                        <div className='bg-primaryBlue w-11 h-11 rounded-full flex items-center justify-center mr-4 cursor-pointer'>
                            <FacebookIcon className='text-secundaryBlue' />
                        </div>
                        <div className='bg-primaryBlue w-11 h-11 rounded-full flex items-center justify-center cursor-pointer'>
                            <InstagramIcon className='text-secundaryBlue' />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;