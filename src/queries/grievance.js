import axios from "axios";
import { GRIEVANCE_RAISE, GRIEVANCE_TRACK, GRIEVANCE_LIST } from "../constants/api";
const { VITE_APP_API_URL } = import.meta.env

export const useRaiseGrievance = (formData) => {
  return axios.post(
    VITE_APP_API_URL + GRIEVANCE_RAISE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("access_token"),
      },
    }
  );
};


export const useTrackGrievance = (args) => {
  return axios.post(VITE_APP_API_URL + GRIEVANCE_TRACK, {
    ...args,
  });
};

export const useListGrievances = (args) => {
  return axios.post(VITE_APP_API_URL + GRIEVANCE_LIST, {
    ...args,
  });
};
