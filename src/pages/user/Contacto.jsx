import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import Header from "../../components/Header/Header";
import Layout from "./Layout";
import CardContact from "../../components/Ui/CardContact";
import { FiPhone, FiMapPin, FiMessageSquare } from "react-icons/fi";
import FormContact from '../../components/Form/FormContact';

function Contacto() {
    return (
        <Layout>
            <Header texto="EMERGENCIAS LAS 24 HORAS" linkText="Contacto" />
            <section className="md:mx-40 mx-10">
                <h1 className="text-3xl font-bold mt-16 text-secondaryBlue">¡Queremos conocer tu opinión!</h1>
                <p className="text-xl mt-5">Nuestra misión es brindarte una atención de calidad a ti y a tus mascotas, fomentando su salud y bienestar. Es por ello que deseamos saber cual es tu experiencia con la clinica. Comparte tu opinión, comentarios, quejas y sugerencias en los siguientes contactos.</p>

                <div className="grid md:grid-cols-2 md:space-x-20 my-20">
                    <div className="mb-10">
                        <div className="flex flex-col space-y-5 justify-center items-center">
                            <p className='text-secondaryBlue text-2xl font-bold mt-5'>Síguenos en nuestras redes sociales</p>
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
                        <div className='flex space-x-5 mt-10'>
                            <CardContact
                                title="Escribenos"
                                subtitle="7711620008"
                                Icon={FiMessageSquare}
                                href="/"
                            />
                            <CardContact
                                title="Llamadas"
                                subtitle="77 1162 0008"
                                Icon={FiPhone}
                                href="/"
                            />
                        </div>
                        <div className='flex mt-10'>
                            <CardContact
                                title="Visitanos"
                                subtitle="Bulevar Adolfo Lopez S/N Colonia Aviación Civil"
                                Icon={FiMapPin}
                                href="/"
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-secondaryBlue text-center text-2xl font-bold mt-5'>¿Tienes alguna duda?</p>
                        <FormContact />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Contacto