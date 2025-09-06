import axios from "axios";
import { SEND_OTP, VERIFY_OTP } from "../constants/api";
const { VITE_APP_API_URL } = import.meta.env

export const useSendOTP = (args) => {
    return axios.post(VITE_APP_API_URL + SEND_OTP,
        {
            ...args
        }
    )
}

export const useVerifyOTP = (args) => {
    return axios.post(VITE_APP_API_URL + VERIFY_OTP,
        {
            ...args
        }
    )
}