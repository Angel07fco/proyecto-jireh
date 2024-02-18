import axios from "axios";

const API = "https://backend-jireh.onrender.com/api/v1";

export const registerRequest = (user) => axios.post(`${API}/user/signup`, user);

export const loginRequest = (user) => axios.post(`${API}/user`, user);

export const verifyEmail = (user) => axios.post(`${API}/email_verification/verify`, user);

export const codePassReset = (user) => axios.post(`${API}/forgot_password`, user);

export const passwordReset = (user) => axios.post(`${API}/forgot_password/reset`, user);

export const codeverifyEmail = (user) => axios.post(`${API}/email_verification`, user);