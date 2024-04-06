import axios from "axios";

const API = "https://backend-jireh.onrender.com/api/v1";
// https://backend-jireh.onrender.com/api/v1
// localhost:5000/api/v1

export const getServices = () => axios.get(`${API}/services`);

export const registerRequest = (service) => axios.post(`${API}/services`, service);