import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Layout from "./user/Layout";
import { useEffect, useState } from "react";
import PasswordReset from "./PasswordReset";

function Password() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const { sendCodePass, codePass, errors: signinErrors } = useAuth();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    sendCodePass(data);
  });

  const [found, setFound] = useState(false);
  const [messageTrue, setMessageTrue] = useState("");
  const [openCircular, setOpenCircular] = useState(false);
  useEffect(() => {
    if (codePass) {
      setFound(true);
      setMessageTrue("Se ha enviado un código para actualizar su contraseña.")
      const timeoutId = setTimeout(() => {
        setOpenCircular(true);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [codePass]);

  const [email, setEmail] = useState("");

  return (
    <Layout>
      <div className="md:pt-40 pt-10 md:px-96 px-20 mb-10">
        {openCircular
          ?
          <PasswordReset dataU={email} subject="Actualizar mi contraseña" messageU="¡Por favor! ingresa una nueva contraseña." />
          :
            <div className="md:mx-24">
              <h2 className="text-2xl font-bold">¡Recuperación de Contraseña!</h2>
              <h5 className="text-lg my-6">Bienvenido de vuelta. Estamos aquí para ayudarte a recuperar tu contraseña. Solo ingresa tu correo electrónico para enviarte un código y poder restablecer tu contraseña.</h5>
              {signinErrors && (
                <div className="bg-red-500 my-5 p-4 text-white" style={{ marginTop: "10px", marginBottom: "20px" }}>
                  <span className="font-bold">Error 400: </span>{signinErrors}
                </div>
              )}
              {found && (
                <div className="bg-green bg-gren my-5 p-4 text-white">
                  <span className="font-bold">200: </span>{messageTrue}
                </div>
              )}
              <form onSubmit={onSubmit}>
                <TextField fullWidth label="Correo electrónico" variant="outlined"
                  {...register("email", {
                    required: { value: true, message: "Correo es requerido" },
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: "Formato de correo no válido",
                    }
                  })}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className="font-bold text-red-500">{errors.email.message}</span>}
                <div className="flex justify-end mt-6">
                  <Button variant="contained" size="large" type='onSubmit'>Enviar código</Button>
                </div>
              </form>
            </div>
        }
      </div>
    </Layout>
  )
}

export default Password