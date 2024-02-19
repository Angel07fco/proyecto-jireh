import { TextField, Button, InputAdornment, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useNavigate } from "react-router-dom";
import ValidateOTP from "../components/ValidateOTP";
import { useAuth } from "../context/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "./user/Layout";
import PasswordReset from "./PasswordReset";

function Login() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const {singin, isAuthenticated, sendCodeEmail, errors: singinErrors} = useAuth();
  const onSubmit = handleSubmit((data) => {
    if (isCaptchaCompleted) {
      console.log(data);
      singin(data);
      setMsjErrorC("");
    } else {
      setMsjErrorC("Por favor, introduce un captcha correcto.");
    }
  });
  const navigate = useNavigate();
  const [found, setFound] = useState(false);
  const [messageTrue, setMessageTrue] = useState("");
  useEffect(() => {
    if (isAuthenticated) {
      setFound(true);
      setMessageTrue("Has iniciado sesión correctamente")
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [isAuthenticated]);

  const [openCircular, setOpenCircular] = useState(false);
  const [openCircular2, setOpenCircular2] = useState(false);
  useEffect(() => {
    if (singinErrors === "El correo electrónico aún no se ha verificado. Comprueba tu bandeja de entrada."){
      setOpen(true);
    }
    if (singinErrors === "La cuenta ha sido bloqueada temporalmente. Comprueba tu bandeja de entrada."){
      setOpenCircular2(true);
    }
  })

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    const data = {email: email};
    sendCodeEmail(data);
    setOpen(false);
    setOpenCircular(true);
  };

  const [isCaptchaCompleted, setIsCaptchaCompleted] = useState(false);
  const [msjErrorC, setMsjErrorC] = useState("");
  const captcha = useRef(null);
  const onChange = () => {
    if (captcha.current.getValue()) {
      setIsCaptchaCompleted(true);
      setMsjErrorC("");
    }
  };

  const [showPassword1, setShowPassword1] = useState(false);
  const togglePasswordVisibility1 = () => {
    setShowPassword1((prevShowPassword) => !prevShowPassword);
  };

  const [email, setEmail] = useState("");

  return (
    <Layout>
      <div className="md:pt-40 pt-10 md:px-96 px-20 mb-10">
        {openCircular2
          ?
            <PasswordReset dataU={email} subject="Desbloquar mi cuenta" messageU="¡Por favor! ingresa una nueva contraseña, para poder desbloquear tu cuenta." />
          :
          <div>
            {openCircular
              ?
                <ValidateOTP dataU={email} message="activar tu cuenta." />
              :
                <div>
                <h1 className="text-2xl font-bold md:mx-24">¡Bienvenido a la Comunidad de JIREH!</h1>
                <h5 className="text-lg md:mx-24 my-6">¡Gracias por elegirnos! Inicia sesión para conectarte, compartir y disfrutar de los servicios y productos que ofrecemos para ti.</h5>
                {
                  singinErrors &&
                  <div className="bg-red-500 md:mx-24 my-5 p-4 text-white" style={{marginTop: "10px", marginBottom: "20px"}}>
                    <span className="font-bold">Error 400: </span>{singinErrors}
                  </div>
                }
                {
                  found &&
                  <div className="bg-green bg-gre md:mx-24 my-5 p-4 text-white">
                    <span className="font-bold">200: </span>{messageTrue}
                  </div>
                }
                <form onSubmit={onSubmit} className="md:mx-24">
                  <div className="mb-6">
                    <TextField
                      fullWidth label="Correo electrónico *" variant="outlined"
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
    
                  <TextField
                    fullWidth label="Contraseña *" variant="outlined" type={showPassword1 ? 'text' : 'password'}
                    {...register("password", {
                      required: { value: true, message: "Contraseña es requerido" },
                      pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%$])[A-Za-z\d@#%$]{8,20}$/, message: "Contraseña no valida, debe contener al menos 1 caracter especial, 1 número y 1 letra mayuscula." },
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
    
                  <div className="flex flex-col justify-center items-center my-10">
                    <ReCAPTCHA
                      ref={captcha}
                      sitekey="6LdmJVQpAAAAAC9oV3K9_U3NXeO3h-fHFbPUTWvJ"
                      onChange={onChange}
                    />
                    <span className="font-bold text-red-500">{msjErrorC}</span>
                  </div>
                  <div className="flex justify-end mt-6">
                    {found
                      ?
                        <Button variant="contained" size="large" disabled>Iniciando Sesión</Button>
                      :
                        <Button variant="contained" size="large" type='onSubmit'>Iniciar Sesión</Button>
                    }
                  </div>
    
                  <div className="flex justify-end mt-6">
                    <span>
                      ¿Aun no tienes una cuenta en JIREH?
                      <Link to="/registro" className="text-secondaryBlue underline ml-1">Registrate</Link>
                    </span>
                  </div>
    
                  <div className="flex justify-end mt-6">
                    <span>
                      ¿No puedes acceder?
                      <Link to="/recuperar-contraseña" className="text-secondaryBlue underline ml-1">Recuperar ahora</Link>
                    </span>
                  </div>
                </form>
              </div>
            }
          </div>
        }
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Desea enviar código de validación?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El correo electrónico proporcionado aun no ha sido validado, ¿desea enviar un codigo para validar su correo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No deseo enviarlo</Button>
          <Button onClick={handleSend} autoFocus>Enviar código</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  )
}

export default Login