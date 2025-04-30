import axios from 'axios';

const baseApi = axios.create({
    baseURL: 'https://api-dashboard-furia.onrender.com',
});

export default baseApi;
