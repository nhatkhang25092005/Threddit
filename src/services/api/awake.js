import axiosClient from "../axiosClient";

const awake = () => axiosClient.get(import.meta.env.VITE_BASE_URL)

export default awake