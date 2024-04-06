import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Layout from "./user/Layout";

function PoliticaCookies() {
    return (
        <Layout>
            <Header texto="POLÍTICA DE COOKIES" linkText="Política de cookies" />
            <section className="md:mx-40 mx-10 my-10 space-y-6">
                <h1 className="text-lg font-normal">En la Clínica Veterinaria Jireh, nos preocupamos por ofrecer la mejor experiencia a nuestros usuarios, y es por eso que utilizamos cookies y tecnologías similares en nuestro sitio web. Estas herramientas nos permiten brindar servicios y funcionalidades que mejoran la navegación y personalizan la interacción en nuestras páginas.</h1>
                <h1 className="text-lg font-normal">Al aceptar el uso de cookies, estás permitiendo que aprovechemos al máximo estas funcionalidades para adaptarnos a tus preferencias y necesidades. Nuestra Política de Cookies está diseñada para informarte sobre cómo utilizamos estas tecnologías y cuáles son tus opciones al respecto.</h1>

                <h1 className="text-3xl text-secondaryBlue">¿Qué Son las Cookies?</h1>
                <h1 className="text-lg font-normal ml-5">En Jireh utilizamos archivos de texto que se almacenan en tu ordenador, conocidos comúnmente como cookies. Las cookies almacenan y recuperan información cuando navegas. En general, estas tecnologías pueden servir para finalidades muy diversas, por ejemplo, reconocerte como usuario, obtener información sobre tus hábitos de navegación o personalizar la forma en que se muestra el contenido. Los usos concretos que hacemos de estas tecnologías se describen a continuación.</h1>
                <h1 className="text-lg font-normal ml-5">Utilizamos cookies para ayudarte en tu recorrido por la web y las cookies que usamos son seguras. La información que recogemos con las cookies nos ayuda a identificar cualquier error que tengamos, o mostrarte productos que creemos que pueden interesarte. Si creas una cuenta de usuario, nuestras cookies también nos permitirán recordarte cada vez que te identifiques o inicies sesión, simplificando algún proceso en el que se necesite introducir todos tus datos de nuevo.</h1>
                <h1 className="text-lg font-normal ml-5">El consentimiento de estas cookies en el dispositivo del usuario se producirá siempre de manera posterior a la recogida del consentimiento y/o configuración de éstas. No obstante, las cookies que son necesarias para el funcionamiento del sitio web (cookies estrictamente necesarias) estarán activadas por defecto, sin que sea necesario recabar el consentimiento del usuario para su instalación.</h1>
                <h1 className="text-lg font-normal ml-5">Sin embargo, si prefieres restringir, bloquear o eliminar cookies de Jireh, podrás hacerlo a través del configurador que se habilita a través de las preferencias de tu navegador, tal y como se explica más abajo.</h1>
                <h1 className="text-lg font-normal ml-5">Se utilizan Cookies para:</h1>
                <ul className="list-none pl-10 space-y-2">
                    <li className="flex items-center"><span className="mr-2">➤</span>Asegurar que las páginas web puedan funcionar correctamente.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>Almacenar las preferencias, si selecciono alguna preferencia por ejemplo para problemas visuales donde la letra toma otro aspecto.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>Conocer la experiencia de navegaciones del usuario.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>Conocer servicios o productos de interés del usuario.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>Recopilar información estadística, como páginas que ha visitado el usuario o cuánto tiempo ha estado en el sitio web.</li>
                </ul>

                <h1 className="text-3xl text-secondaryBlue">¿Qué tipos de cookies utilizamos en Jireh?</h1>
                <h1 className="text-lg font-normal ml-5">Este sitio web utiliza diferentes tipos de cookies:</h1>
                <h1 className="text-lg font-normal ml-5">Las <span className="font-bold">cookies ‘estrictamente necesarias’</span> le permitirán navegar con facilidad por el sitio web. Estas Cookies son utilizadas exclusivamente por nosotros y, por lo tanto, son cookies de origen. Esto significa que toda la información almacenada en las cookies solo se almacena en este sitio web. Este tipo de cookies no se utilizan para recopilar información personal que pueda utilizarse con fines de marketing, ni tampoco para recordar los sitios de Internet a los que ha accedido. Utilizamos las cookies estrictamente necesarias para:</h1>
                <ul className="list-none pl-10 space-y-2">
                    <li className="flex items-center"><span className="mr-2">➤</span>Mantienen al usuario identificado de forma que, si abandona el sitio web, el navegador o el dispositivo y en otro momento vuelve a acceder a la misma página, seguirá identificado, facilitando así su navegación sin tener que volver a identificarse por delimitado tiempo.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>Comprobar si el usuario esté autorizado para acceder a ciertos servicios o zonas del sitio web.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>Recordar cierta información, como los datos que haya introducido en formularios de citas o contacto al navegar por distintas páginas en una misma sesión del navegador web.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>Recordar los productos de su carrito de compras una vez que haya cerrado la sesión</li>
                </ul>
                <h1 className="text-lg font-normal ml-5">Las <span className="font-bold">cookies de ‘preferencia’</span> como su propio nombre indica, estas cookies guardan los datos según la preferencia de configuración que establezca cada usuario. Permiten al usuario acceder al sitio web con algunas características de preferencia general predefinidas por el mismo usuario. Estas cookies se usan para definir las preferencias del usuario y su uso como:</h1>
                <ul className="list-none pl-10 space-y-2">
                    <li className="flex items-center"><span className="mr-2">➤</span>Averiguar en qué país o región se encuentra el usuario que accede o visita el sitio.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>Recordar determinados ajustes que haya utilizado, como el diseño, el tamaño del texto y los colores.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>Recordar si ya le hemos preguntado si desea participar en una encuesta.</li>
                </ul>
                <h1 className="text-lg font-normal ml-5">Las <span className="font-bold">cookies de ‘estadísticas’</span> también conocidas como cookies analíticas, son herramientas fundamentales para recopilar información sobre cómo los usuarios interactúan con un sitio web. Estas cookies recopilan datos de manera anónima y se utilizan para analizar y entender el comportamiento de los visitantes. La información recopilada ayuda a los propietarios del sitio a tomar decisiones informadas para mejorar la experiencia del usuario y la eficacia del sitio. Estas cookies nos ayudan a:</h1>
                <ul className="list-none pl-10 space-y-2">
                    <li className="flex items-center"><span className="mr-2">➤</span>Saber en que secciones está más interesado el usuario.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>Numero de visitas en el sitio.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>Medir el tiempo de actividad que un usuario permanece en el sitio.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>Si hace un clic en algún slider o banner publicitario.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>Saber a qué otro sitio accede une vez que visito el nuestro.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>Ayudan a identificar posibles problemas técnicos o errores en el sitio web al rastrear las páginas que generan mensajes de error.</li>
                </ul>
                <h1 className="text-lg font-normal ml-5">Las <span className="font-bold">cookies de ‘marketing’</span> son herramientas valiosas que utilizamos para personalizar y optimizar tu experiencia en nuestro sitio web. Su función principal es recopilar información sobre tus preferencias y hábitos de navegación, permitiéndonos ofrecerte contenidos publicitarios adaptados a tus intereses.</h1>
                <h1 className="text-lg font-normal ml-5">A través de estas cookies, podemos segmentar a nuestra audiencia de manera eficiente, presentando ofertas, promociones y productos que se ajusten a sus gustos específicos. Además, contribuyen a medir la efectividad de nuestras campañas publicitarias y evaluar el rendimiento de los anuncios que visualizas. Estas cookies nos ayudan a:</h1>
                <ul className="list-none pl-10 space-y-2">
                    <li className="flex items-center"><span className="mr-2">➤</span>Conocer las preferencias de servicios o productos.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>Al conoces tus patrones de navegación, podemos presentarte ofertas, promociones, productos y servicios que se alinean a tus necesidades y preferencias.</li>
                    <li className="flex items-center"><span className="mr-2">➤</span>En campañas publicitarias nos ayudan a conocer como interactúas con nuestros anuncios, a fin de evaluar el rendimiento y que contribuya en la toma de decisiones en un futuro.</li>
                </ul>

                <h1 className="text-3xl text-secondaryBlue">Cookies propias y de terceros</h1>

                <h1 className="text-3xl text-secondaryBlue">Gestión de Cookies</h1>
                <h1 className="text-lg font-normal ml-5">El usuario puede libremente y en cualquier momento decidir acerca de la implementación o no en su dispositivo de nuestras cookies, así como su eliminación.</h1>
                <h1 className="text-lg font-normal ml-5">Como se ha mencionado hay que cookies que necesitamos estrictamente ya que son las que proporcionan cierta funcionalidad al sitio además de que nos ayudan a identificar si los usuarios son personas reales y así evitar algún tipo de hacking en un futuro.</h1>
                <h1 className="text-lg font-normal ml-5">Si el usuario rechaza las cookies estas simplemente no serán instaladas en su sistema, pero se tiene en cuenta que algunas funcionalidades del sistema pueden no funcionar de la manera que se espera.</h1>
                <h1 className="text-lg font-normal ml-5">Si el usuario acepta la política de cookies y desea revocar su consentimiento puede hacerlo de la siguiente manera, para que el usuario pueda bloquear o eliminar las cookies deberá de identificar el tipo de navegador que utiliza y de este modo acceder a alguno de los siguientes enlaces de acorde a su navegador:</h1>
                <ul className="list-none pl-10 space-y-2">
                    <li className="flex items-center">
                        <span className="mr-2">➤</span>Microsoft Internet Explorer o Microsoft Edge:
                        <Link
                                className="ml-2 text-secondaryBlue underline"
                                target="_blank"
                                to="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                            >
                                https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <span className="mr-2">➤</span>Mozilla Firefox:
                        <Link
                            className="ml-2 text-secondaryBlue underline"
                            target="_blank"
                            to="https://support.mozilla.org/es/kb/impedir-que-los-sitios-web-guarden-sus-preferencia"
                        >
                            https://support.mozilla.org/es/kb/impedir-que-los-sitios-web-guarden-sus-preferencia
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <span className="mr-2">➤</span>Google Chrome:
                        <Link
                            className="ml-2 text-secondaryBlue underline"
                            target="_blank"
                            to="https://support.google.com/accounts/answer/61416?hl=es"
                        >
                            https://support.google.com/accounts/answer/61416?hl=es
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <span className="mr-2">➤</span>Safari:
                        <Link
                            className="ml-2 text-secondaryBlue underline"
                            target="_blank"
                            to="http://safari.helpmax.net/es/privacidad-y-seguridad/como-gestionar-las-cookies"
                        >
                            http://safari.helpmax.net/es/privacidad-y-seguridad/como-gestionar-las-cookies
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <span className="mr-2">➤</span>Opera:
                        <Link
                            className="ml-2 text-secondaryBlue underline"
                            target="_blank"
                            to="https://help.opera.com/en/latest/web-preferences/#cookies"
                        >
                            https://help.opera.com/en/latest/web-preferences/#cookies
                        </Link>
                    </li>
                </ul>

                <div className="md:flex items-center justify-between pt-10">
                    <h1 className="text-xl font-bold text-secondaryBlue">Jireh se reserva el derecho de cambiar las cookies de la presente Política de Cookies en cualquier momento.</h1>
                    <h1 className="text-xl font-bold text-secondaryBlue">Última actualización: 14/11/2023</h1>
                </div>
            </section>
        </Layout>
    )
}

export default PoliticaCookies