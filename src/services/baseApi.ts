import axios from 'axios';

const baseApi = axios.create({
    baseURL: 'http://localhost:8080',
});

export default baseApi;
