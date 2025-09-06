import axios from "axios";
import { GRIEVANCE_RAISE } from "../constants/api";
const { VITE_APP_API_URL } = import.meta.env

export const useRaiseGrievance = (args) => {
    return axios.post(VITE_APP_API_URL + GRIEVANCE_RAISE,
        {
            ...args
        },
        {
            headers: {
                Authorization: "ADD_THE_JWT_TOKEN_HERE"
            }
        }
    )
}