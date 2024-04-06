import axios from "axios";

const API = "https://backend-jireh.onrender.com/api/v1";
// https://backend-jireh.onrender.com/api/v1
// localhost:5000/api/v1
export const getPetsByUser = (userId, token) => {
    return axios.get(`${API}/pet/`, userId, {
        headers: {
            "x-access-token": token
        }
    });
};

export const registerPet = (pet) => axios.post(`${API}/pet/newpet`, pet);