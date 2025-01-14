import axios from "axios";
// 리얼
const baseURL = "https://dongsan-book.shop";
// const baseURL = "http://localhost:8080";

const AxiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": baseURL,
    "Access-Control-Allow-Credentials": true,
  },
  baseURL,
  withCredentials: true,
});

export default AxiosInstance;
