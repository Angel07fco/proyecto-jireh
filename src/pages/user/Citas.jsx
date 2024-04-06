import FormCita from "../../components/Form/FormCita";
import Header from "../../components/Header/Header";
import Layout from "./Layout";

function Citas() {
    return (
        <Layout>
            <Header texto="AGENDA UNA CITA" linkText="Cita" />
            <section className="md:mx-40 mx-10 mb-10">
                <div className="grid md:grid-cols-2 md:space-x-10">
                    <div>
                        <h1 className="text-3xl font-bold mt-16 text-secondaryBlue">¡Estamos listos para recibir a tu mascota!</h1>
                        <p className="text-xl mt-5">Si quieres reservar un espacio para uno de nuestros servicios, por favor completa el siguiente formulario con tus datos. Un miembro de nuestro equipo se pondrá en contacto contigo por teléfono para confirmar la disponibilidad.</p>
                    </div>
                    <div className="mt-10">
                        <p className='text-secondaryBlue text-center text-2xl font-bold mt-5'>Llene el siguiente formulario</p>
                        <FormCita />
                    </div>
                </div>

            </section>
        </Layout>
    )
}

export default Citas