import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState, useEffect } from 'react';

const Header = () => {
    const [index, setIndex] = useState(0);
    const mascotas = ['🏠 Animales de domesticos:', '🐕 Perro', '🐈 Gato', '🐇 Conejo', '🐁 Hamster', '🐢 Tortuga', '🐟 Pez', '🦜 Loro', '🚜 Animales de granja:', '🐎 Caballo', '🐄 Vaca', '🐂 Toro', '🐏 Oveja', '🐖 Cerdo', '🐓 Gallo', '🐔 Gallina', '🦚 Pavo Real' ];
    useEffect(() => {
        const intervalId = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % mascotas.length);
        }, 2000);

        return () => clearInterval(intervalId);
    });
    return (
        <div className="bg-primaryBlue md:pt-36 grid grid-cols-2">
            <div className='mr-5'>
                <div className="mt-16 ml-44">
                    <h1 className="text-secondaryBlue font-bold text-4xl">En JIREH nos preocupamos por el bienestar de tu(s) amiguit@(s):</h1>
                    <span>
                        <span className='text-secondaryBlue font-bold text-4xl'>{mascotas[index]}</span>
                    </span>
                </div>
                <div className='ml-44 mt-10 bg-white rounded-xl py-4 px-8'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-secondaryBlue text-xl font-bold'>Quieres saber mas de JIREH</h1>
                        <div className='flex items-center justify-between'>
                            <CalendarMonthIcon fontSize="small" />
                            <h2 className='text-secondaryBlue hover:underline cursor-pointer'>¡Pide tu cita ahora!</h2>
                        </div>
                    </div>
                    <div className='border border-primaryBlue flex flex-row items-center justify-between p-3 rounded-xl mt-2 mb-2'>
                        <input placeholder='Ingrese su correo electronico' className='w-full h-8 border border-none' />
                        <div className='flex flex-row'>
                            <div className='bg-green py-2 px-2 rounded-md mr-2 cursor-pointer'>
                                <NearMeOutlinedIcon />
                            </div>
                            <div className='bg-primaryBlue py-2 px-2 rounded-md cursor-not-allowed'>
                                <MarkEmailReadOutlinedIcon className='text-white' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className='text-textoNota text-xs'><span className='font-bold'>¡Nota! </span>Al ingresar y enviar tu correo electronico se te proporcionara mas informacion acerca de lo que representa JIREH para la comunidad animal.</h2>
                    </div>
                </div>
            </div>
            <div>
                <img src="https://res.cloudinary.com/dl8odylct/image/upload/v1706904292/perros_rbacpf.png" alt="img-mascota" className='mt-5' />
            </div>
        </div>
    )
}

export default Header;