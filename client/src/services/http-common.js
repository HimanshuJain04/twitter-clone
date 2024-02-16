import axios from "axios";
const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export default axios.create(
    {
        baseURL: BASE_URL,
        headers: {
            "Content-type": "application/json"
        }
    }
);