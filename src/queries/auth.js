import axios from "axios";
import { LOGIN_INITIATE, LOGIN_VERIFY, LOGIN_REFRESH } from "../constants/api";
const { VITE_APP_API_URL } = import.meta.env

export const useLoginRefresh = (args) => {
    return axios.post(VITE_APP_API_URL + LOGIN_REFRESH,
        {
            ...args
        }
    )
}

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