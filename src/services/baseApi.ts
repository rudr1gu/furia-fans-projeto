import axios from 'axios';

const baseApi = axios.create({
    baseURL: 'https://localhost:8080',
});

export default baseApi;
