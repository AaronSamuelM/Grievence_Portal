import axios from "axios";
import { LOGIN_INITIATE, LOGIN_VERIFY } from "../constants/api";
const { VITE_APP_API_URL } = import.meta.env

export const useLoginStart = (args) => {
    return axios.post(VITE_APP_API_URL + LOGIN_INITIATE,
        {
            ...args
        }
    )
}

export const useLoginVerify = (args) => {
    return axios.post(VITE_APP_API_URL + LOGIN_VERIFY,
        {
            ...args
        }
    )
}