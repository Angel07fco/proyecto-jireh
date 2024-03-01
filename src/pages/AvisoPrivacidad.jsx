import Header from "../components/Header/Header";
import Layout from "./user/Layout";

function AvisoPrivacidad() {
    return (
        <Layout>
            <div className="md:pt-32">
                <Header texto="Aviso de Privacidad" />
                <section className="md:mx-40 mx-10 my-10 space-y-6">
                    <h1 className="text-lg font-normal"><span className="font-bold">Eddie Hernández Vidal</span>, mejor conocido como <span className="font-bold">Clinica Veterinaria Jireh</span>, con domicilio en calle Bulevar Adolfo Lopez, colonia Aviación Civil, ciudad Huejutla de Reyes, municipio o delegación Huejutla de Reyes, c.p. 43000, en la entidad de Hidalgo, país México, <span className="font-bold">es el responsable del uso y protección de sus datos personales</span>, y al respecto le informamos lo siguiente:</h1>

                    <h1 className="text-3xl text-secondaryBlue">¿Para qué fines utilizaremos sus datos personales?</h1>
                    <h1 className="text-lg font-normal ml-5">Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:</h1>
                    <ul className="list-none pl-10 space-y-2">
                        <li className="flex items-center"><span className="mr-2">➤</span>Para mejorar la seguridad de nuestros servicios</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Para detectar abusos, fraudes y actividades ilegales</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Para cumplir con las solicitudes de productos, servicios, funcionalidad y soporte</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Procesamiento de Pagos</li>
                    </ul>
                    <h1 className="text-lg font-normal ml-5">De manera adicional, utilizaremos su información personal para las siguientes finalidades secundarias que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:</h1>
                    <ul className="list-none pl-10 space-y-2">
                        <li className="flex items-center"><span className="mr-2">➤</span>Mejorar nuestros servicios</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Llevar a cabo el desarrollo de productos</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Para comunicarse con usted</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Notificarle sobre algun cambio en nuestros servicios</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Para cumplir con nuestras obligaciones legales</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Gestión de Cuentas de Cliente</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Marketing y Comunicación</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Seguimiento de Inventario</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Seguimiento de Citas</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Mercadotecnia o publicitaria</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Prospección comercial</li>
                    </ul>
                    <h1 className="text-lg font-normal ml-5">En caso de que no desee que sus datos personales se utilicen para estos fines secundarios, indíquelo a continuación:</h1>
                    <h1 className="text-lg font-normal ml-5">No consiento que mis datos personales se utilicen para los siguientes fines:</h1>
                    <ul className="list-none pl-10 space-y-2">
                        <li className="flex items-center"><span className="mr-2">[ ]</span>Mejorar nuestros servicios</li>
                        <li className="flex items-center"><span className="mr-2">[ ]</span>Llevar a cabo el desarrollo de productos</li>
                        <li className="flex items-center"><span className="mr-2">[ ]</span>Para comunicarse con usted</li>
                        <li className="flex items-center"><span className="mr-2">[ ]</span>Notificarle sobre algun cambio en nuestros servicios</li>
                        <li className="flex items-center"><span className="mr-2">[ ]</span>Para cumplir con nuestras obligaciones legales</li>
                        <li className="flex items-center"><span className="mr-2">[ ]</span>Gestión de Cuentas de Cliente</li>
                        <li className="flex items-center"><span className="mr-2">[ ]</span>Marketing y Comunicación</li>
                        <li className="flex items-center"><span className="mr-2">[ ]</span>Seguimiento de Inventario</li>
                        <li className="flex items-center"><span className="mr-2">[ ]</span>Seguimiento de Citas</li>
                        <li className="flex items-center"><span className="mr-2">[ ]</span>Mercadotecnia o publicitaria</li>
                        <li className="flex items-center"><span className="mr-2">[ ]</span>Prospección comercial</li>
                    </ul>
                    <h1 className="text-lg font-normal ml-5">La negativa para el uso de sus datos personales para estas finalidades no podrá ser un motivo para que le neguemos los servicios y productos que solicita o contrata con nosotros.</h1>

                    <h1 className="text-3xl text-secondaryBlue">¿Qué datos personales utilizaremos para estos fines?</h1>
                    <h1 className="text-lg font-normal ml-5">Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos los siguientes datos personales:</h1>
                    <ul className="list-none pl-10 space-y-2">
                        <li className="flex items-center"><span className="mr-2">➤</span>Nombre</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Registro Federal de Contribuyentes(RFC)</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Nacionalidad</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Domicilio</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Teléfono particular</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Teléfono celular</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Correo electrónico</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Edad</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Fotografía</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Cuentas bancarias</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Número de tarjetas de crédito</li>
                    </ul>
                    <h1 className="text-lg font-normal ml-5">Además de los datos personales mencionados anteriormente, para las finalidades informadas en el presente aviso de privacidad utilizaremos los siguientes datos personales considerados como sensibles, que requieren de especial protección:</h1>
                    <ul className="list-none pl-10 space-y-2">
                        <li className="flex items-center"><span className="mr-2">➤</span>Estado de salud físico presente, pasado o futuro</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Información financiera</li>
                    </ul>

                    <h1 className="text-3xl text-secondaryBlue">¿Cómo puede acceder, rectificar o cancelar sus datos personales, u oponerse a su uso?</h1>
                    <h1 className="text-lg font-normal ml-5">Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.</h1>
                    <h1 className="text-lg font-normal ml-5">Para el ejercicio de cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva a través del siguiente medio:</h1>
                    <h1 className="text-lg font-normal ml-5">A traves del sitio web o al telefono: 77 1162 0008</h1>
                    <h1 className="text-lg font-normal ml-5">Con relación al procedimiento y requisitos para el ejercicio de sus derechos ARCO, le informamos lo siguiente:</h1>
                    <h1 className="text-xl font-bold ml-5">a) ¿A través de qué medios pueden acreditar su identidad el titular y, en su caso, su representante, así como la personalidad este último?</h1>
                    <h1 className="text-lg font-normal ml-5">Indentificación oficial vigente o Identificación con fotografia</h1>
                    <h1 className="text-xl font-bold ml-5">b) ¿Qué información y/o documentación deberá contener la solicitud?</h1>
                    <h1 className="text-lg font-normal ml-5">Datos de Identificación, Descripción de la Solicitud, Documentación de Identidad, Documentación Adicional, Información de Contacto</h1>
                    <h1 className="text-xl font-bold ml-5">c) ¿En cuántos días le daremos respuesta a su solicitud?</h1>
                    <h1 className="text-lg font-normal ml-5">1 a 4 dias habiles</h1>
                    <h1 className="text-xl font-bold ml-5">d) ¿Por qué medio le comunicaremos la respuesta a su solicitud?</h1>
                    <h1 className="text-lg font-normal ml-5">Sitio web, Comunicación Telefónica, Email si lo proporciono</h1>
                    <h1 className="text-xl font-bold ml-5">e) ¿En qué medios se pueden reproducir los datos personales que, en su caso, solicite?</h1>
                    <h1 className="text-lg font-normal ml-5">Base de datos de la empresa</h1>
                    <h1 className="text-xl font-bold ml-5">g) Para mayor información sobre el procedimiento, ponemos a disposición los siguientes medios:</h1>
                    <h1 className="text-lg font-normal ml-5">Línea Telefónica de Atención al Cliente: 7711620008</h1>
                    <h1 className="text-lg font-normal ml-5">Los datos de contacto de la persona o departamento de datos personales, que está a cargo de dar trámite a las solicitudes de derechos ARCO, son los siguientes:</h1>
                    <h1 className="text-xl font-bold ml-5">a) Nombre de la persona o departamento de datos personales:</h1>

                    <h1 className="text-3xl text-secondaryBlue">Usted puede revocar su consentimiento para el uso de sus datos personales</h1>
                    <h1 className="text-lg font-normal ml-5">Usted puede revocar el consentimiento que, en su caso, nos haya otorgado para el tratamiento de sus datos personales. Sin embargo, es importante que tenga en cuenta que no en todos los casos podremos atender su solicitud o concluir el uso de forma inmediata, ya que es posible que por alguna obligación legal requiramos seguir tratando sus datos personales. Asimismo, usted deberá considerar que para ciertos fines, la revocación de su consentimiento impl`icará que no le podamos seguir prestando el servicio que nos solicitó, o la conclusión de su relación con nosotros.</h1>
                    <h1 className="text-lg font-normal ml-5">Para revocar su consentimiento deberá presentar su solicitud a través del siguiente medio:</h1>
                    <h1 className="text-lg font-normal ml-5">Mediante el formulario de contacto, ubicado en la seccion de Contacto</h1>
                    <h1 className="text-lg font-normal ml-5">Con relación al procedimiento y requisitos para la revocación de su consentimiento, le informamos lo siguiente:</h1>
                    <h1 className="text-xl font-bold ml-5">a) ¿A través de qué medios pueden acreditar su identidad el titular y, en su caso, su representante, así como la personalidad este último?</h1>
                    <h1 className="text-lg font-normal ml-5">Identificación oficial vigente, Identificación con fotografia</h1>
                    <h1 className="text-xl font-bold ml-5">b) ¿Qué información y/o documentación deberá contener la solicitud?</h1>
                    <h1 className="text-lg font-normal ml-5">Datos de Identificación del Titular de los Datos, Descripción de la Solicitud, Documentación de Identidad, Detalles de Contacto</h1>
                    <h1 className="text-xl font-bold ml-5">c) ¿En cuántos días le daremos respuesta a su solicitud?</h1>
                    <h1 className="text-lg font-normal ml-5">1 a 4 dias habiles</h1>
                    <h1 className="text-xl font-bold ml-5">d) ¿Por qué medio le comunicaremos la respuesta a su solicitud?</h1>
                    <h1 className="text-lg font-normal ml-5">A traves de algun correro valido proporcionado por el solicitante</h1>

                    <h1 className="text-3xl text-secondaryBlue">¿Cómo puede limitar el uso o divulgación de su información personal?</h1>
                    <h1 className="text-lg font-normal ml-5">Con objeto de que usted pueda limitar el uso y divulgación de su información personal, le ofrecemos los siguientes medios:</h1>
                    <h1 className="text-lg font-normal ml-5">Mediante el formulario de contacto, ubicado en la seccion de Contacto</h1>

                    <h1 className="text-3xl text-secondaryBlue">El uso de tecnologías de rastreo en nuestro portal de internet</h1>
                    <h1 className="text-lg font-normal ml-5">Le informamos que en nuestra página de internet utilizamos cookies, web beacons u otras tecnologías, a través de las cuales es posible monitorear su comportamiento como usuario de internet, así como brindarle un mejor servicio y experiencia al navegar en nuestra página. Los datos personales que recabamos a través de estas tecnologías, los utilizaremos para los siguientes fines:</h1>
                    <h1 className="text-lg font-normal ml-5">Prestación de Servicios, Preferencias, Mejora de Productos y Servicios, Marketing y Publicidad y Rastreo</h1>
                    <h1 className="text-lg font-normal ml-5">Los datos personales que obtenemos de estas tecnologías de rastreo son los siguientes:</h1>
                    <ul className="list-none pl-10 space-y-2">
                        <li className="flex items-center"><span className="mr-2">➤</span>Identificadores de una sesión</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Región en la que se encuentra el usuario</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Fecha y hora del inicio y final de una sesión de un usuario</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Páginas web visitadas por un usuario</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Búsquedas realizadas por un usuario</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Publicidad revisada por un usuario</li>
                        <li className="flex items-center"><span className="mr-2">➤</span>Preferencias de interacción del usuario</li>
                    </ul>

                    <h1 className="text-3xl text-secondaryBlue">¿Cómo puede conocer los cambios en este aviso de privacidad?</h1>
                    <h1 className="text-lg font-normal ml-5">El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad; de cambios en nuestro modelo de negocio, o por otras causas.</h1>
                    <h1 className="text-lg font-normal ml-5">Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad, a través de: Correo electronico o en la misma pagina web.</h1>
                    <h1 className="text-lg font-normal ml-5">El procedimiento a través del cual se llevarán a cabo las notificaciones sobre cambios o actualizaciones al presente aviso de privacidad es el siguiente:</h1>
                    <h1 className="text-lg font-normal ml-5">Se enviara un correo electronico al cliente o a traves de la pagina informando sobre los cambios realizados en el avido de privacidad</h1>

                    <div className="md:flex items-center justify-between pt-10">
                        <h1 className="text-xl font-bold text-secondaryBlue">Jireh se reserva el derecho de cambiar los avisos de la presente Aviso de Privacidad en cualquier momento.</h1>
                        <h1 className="text-xl font-bold text-secondaryBlue">Última actualización: 14/11/2023</h1>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default AvisoPrivacidad