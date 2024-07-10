import axios, {type AxiosInstance} from 'axios';

const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_AIRTABLE_BASE_URL,
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`
    }
})

http.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use((response) => {
        console.log(import.meta)
        console.log("Response Interceptor çalıştı ");
        return response;
    },
    (error) => {
        console.log(" hata :", error.response.status);
        return Promise.reject(error);
    })
export default http;