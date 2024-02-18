import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PasswordReset({ dataU }) {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const { sendPasswordReset, passReset, errors: signinErrors } = useAuth();
  const onSubmit = handleSubmit((data) => {
    const formData = { ...data, email: dataU };
    console.log(formData);
    sendPasswordReset(formData);
  });

  const navigate = useNavigate();
  const [found, setFound] = useState(false);
  const [messageTrue, setMessageTrue] = useState("");
  useEffect(() => {
    if (passReset) {
      setFound(true);
      setMessageTrue("Tu contraseña se ha restablecido con extio.")
      const timeoutId = setTimeout(() => {
        navigate('/iniciar-sesion');
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [passReset]);


  const [showPassword1, setShowPassword1] = useState(false);
  const togglePasswordVisibility1 = () => {
    setShowPassword1((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold md:mx-24">¡Actualizar mi contraseña!</h1>
      <h5 className="text-lg md:mx-24 my-6">¡Por favor! ingresa una nueva contraseña.</h5>
      {signinErrors && (
        <div className="bg-red-500 my-5 p-4 text-white md:mx-24" style={{ marginTop: "10px", marginBottom: "20px" }}>
          <span className="font-bold">Error 400: </span>{signinErrors}
        </div>
      )}
      {found && (
        <div className="bg-green bg-gren my-5 p-4 text-white md:mx-24">
          <span className="font-bold">200: </span>{messageTrue}
        </div>
      )}
      <form onSubmit={onSubmit} className="md:mx-24">
        <div className="mb-6">
          <TextField fullWidth value={dataU} disabled/>
        </div>
        <div className="mb-6">
          <TextField fullWidth label="Código de validación *" variant="outlined"
            {...register("otp", {
              required: { value: true, message: "El código es requerido" },
              pattern: { value: /^[0-9]{4}$/, message: "El código debe tener un máximo de 4 dígitos y solo puede contener números." },
            })}
          />
          {errors.otp && <span className="font-bold text-red-500">{errors.otp.message}</span>}
        </div>
        <div className="md:mt-0 mt-5">
          <TextField fullWidth label="Contraseña *" variant="outlined" type={showPassword1 ? 'text' : 'password'}
            {...register("newPassword", {
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
          {errors.newPassword && <span className="font-bold text-red-500">{errors.newPassword.message}</span>}
        </div>
        <div className="flex justify-end mt-6">
          <Button variant="contained" size="large" type='onSubmit'>Actualizar contraseña</Button>
        </div>
      </form>
    </div>
  )
}

export default PasswordReset