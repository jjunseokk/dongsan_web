import axios from "axios";
// 리얼
const baseURL = "http://localhost:8000";

const AxiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": baseURL,
    "Access-Control-Allow-Credentials": true,
  },
  baseURL,
});

export default AxiosInstance;
