import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ValidateOTP from "../components/ValidateOTP";
import Layout from "./user/Layout";

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isRegister, errors: signinErrors } = useAuth();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    signup(data);
  });

  const [found, setFound] = useState(false);
  const [messageTrue, setMessageTrue] = useState("");
  const [openCircular, setOpenCircular] = useState(false);
  useEffect(() => {
    if (isRegister) {
      setFound(true);
      setMessageTrue("El registro ha sido exitoso")
      const timeoutId = setTimeout(() => {
        setOpenCircular(true);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [isRegister]);

  const [showPassword1, setShowPassword1] = useState(false);
  const togglePasswordVisibility1 = () => {
    setShowPassword1((prevShowPassword) => !prevShowPassword);
  };

  const [email, setEmail] = useState("");

  return (
    <Layout>
      <div className="md:pt-40 pt-10 md:px-96 px-20 mb-10">
      {openCircular ? (
        <ValidateOTP dataU={email} message="activar tu cuenta." />
      ) : (
        <div>
          <h2 className="text-2xl font-bold">¡Únete a la Comunidad de JIREH!</h2>
          <h5 className="text-lg my-6">En JIREH, valoramos a nuestros miembros y su compromiso con el bienestar de sus queridas mascotas. Nuestro formulario de Registro es el primer paso para unirte a nuestra creciente comunidad de amantes de los animales y obtener acceso a una variedad de ventajas personalizadas.</h5>
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
            <div className="md:grid grid-cols-2 gap-5">
              <div>
                <TextField fullWidth label="Usuario *" variant="outlined"
                  {...register("user", {
                    required: { value: true, message: "Usuario es requerido" },
                    minLength: { value: 2, message: "Usuario debe tener al menos 2 caracteres" },
                    maxLength: { value: 50, message: "Usuario debe tener máximo 50 caracteres" },
                    pattern: { value: /^[a-zA-Z0-9]+$/, message: "Usuario no válido" }
                  })}
                />
                {errors.user && <span className="font-bold text-red-500">{errors.user.message}</span>}
              </div>
              <div className="md:mt-0 mt-5">
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
              </div>
            </div>

            <div className="md:grid grid-cols-2 gap-5 mt-5">
              <div>
                <TextField fullWidth label="Teléfono *" variant="outlined"
                  {...register("phone", {
                    required: { value: true, message: "Teléfono es requerido" },
                    pattern: { value: /^[0-9]{10}$/, message: "Teléfono no válido" },
                  })}
                />
                {errors.phone && <span className="font-bold text-red-500">{errors.phone.message}</span>}
              </div>
              <div className="md:mt-0 mt-5">
                <TextField fullWidth label="Contraseña *" variant="outlined" type={showPassword1 ? 'text' : 'password'}
                  {...register("password", {
                    required: { value: true, message: "Contraseña es requerida" },
                    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%$])[A-Za-z\d@#%$]{8,20}$/, message: "Contraseña no cumple con el formato válido" },
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility1} edge="end">
                          {showPassword1 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errors.password && <span className="font-bold text-red-500">{errors.password.message}</span>}
              </div>
            </div>

            <div className="flex flex-row mt-5">
              <input type="checkbox" required />
              <Link to="/terminos&condiciones" className="ml-2 hover:text-secondaryBlue hover:underline">Terminos y Condiciones</Link>
            </div>

            <div className="flex justify-end mt-6">
              {found ? (
                <Button variant="contained" size="large" disabled>Validando</Button>
              ) : (
                <Button variant="contained" size="large" type='onSubmit'>Registrarme</Button>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <span>
                ¿Ya tienes una cuenta?
                <Link to="/iniciar-sesion" className="text-secondaryBlue underline ml-1">Inicia sesión</Link>
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
    </Layout>
  )
}

export default Register;
