import axios from 'axios';
import { demoAdapter } from './demo/adapter';
const AxiosInstance = axios.create({ adapter: demoAdapter });
export default AxiosInstance;
