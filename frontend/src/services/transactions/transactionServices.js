import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { BASE_URL } from "../../utils/url";
import axios from "axios"


//! Get the token
const token = getUserFromStorage();
//!Create Transaction
export const addTransactionAPI = async ({ type, category, date, description, amount }) => {
    const response = await axios.post(`${BASE_URL}/transactions/create`, {
        type, category, date, description, amount
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    //!sReturn a promise
    return response.data;
}

//!lists categories
export const listTransactionsAPI = async ({ startDate, endDate, type, category }) => {

    const response = await axios.get(`${BASE_URL}/transactions/lists`, {
        params: {
            startDate, endDate, type, category
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    //!Return a promise
    return response.data;

}

//!update category
export const updatedTransactionAPI = async ({ id, type, category, date, description, amount }) => {
    const response = await axios.put(`${BASE_URL}/transactions/update/${id}`, {
        type, category, date, description, amount
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    //!sReturn a promise
    return response.data;
}

//!Delete Transaction
export const deleteTransactionAPI = async (id) => {

    const response = await axios.delete(`${BASE_URL}/transactions/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    //!Return a promise
    return response.data;
}

