import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { BASE_URL } from "../../utils/url";
import second from "axios"

//!Get the token 
const token = getUserFromStorage();

//!Login
export const loginAPI = async ({ email, password }) => {
    const response = await second.post(`${BASE_URL}/users/login`, {
        email,
        password,
    });
    //!sReturn a promise
    return response.data;
}

//!Register
export const registerAPI = async ({ username, email, password }) => {
    const response = await second.post(`${BASE_URL}/users/register`, {
        email,
        password,
        username
    });
    //!sReturn a promise
    return response.data;
}

//!Change Password
export const changePasswordAPI = async ({ newPassword }) => {

    const response = await second.post(`${BASE_URL}/users/change-password`, {
        newPassword,
    },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    //!sReturn a promise
    return response.data;
}

//!Update Profile
export const updateProfileAPI = async ({ username, email }) => {
    const response = await second.put(`${BASE_URL}/users/update-profile`, {
        username, email
    },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    //!sReturn a promise
    return response.data;
}