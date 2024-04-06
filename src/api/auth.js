import axios from "axios";

const API = "https://backend-jireh.onrender.com/api/v1";
// https://backend-jireh.onrender.com/api/v1
// localhost:5000/api/v1
export const registerRequest = (user) => axios.post(`${API}/user/crearcuenta`, user);

export const loginRequest = (user) => axios.post(`${API}/user`, user);

export const verifyEmail = (user) => axios.post(`${API}/email_verification/verify`, user);

export const forgotPassMethod = (user) => axios.post(`${API}/forgot_password`, user);

export const validateReply = (user) => axios.post(`${API}/forgot_password/validatereply`, user);

export const validateOTP = (user) => axios.post(`${API}/forgot_password/validateotp`, user);

export const passwordReset = (user) => axios.post(`${API}/forgot_password/reset`, user);

export const codeverifyEmail = (user) => axios.post(`${API}/email_verification`, user);

export const logout = (token) => {
    return axios.post(`${API}/user/logout`, token, {
        headers: {
            "x-access-token": token
        }
    });
};
