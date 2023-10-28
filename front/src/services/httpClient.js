import axios from 'axios'


const httpClient = axios.create({
    baseURL: 'https://localhost',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000
});


httpClient.interceptors.request.use(
    (config) => {
        const jwtToken = localStorage.getItem('token') ?? false;
        if (jwtToken) {
            config.headers['Authorization'] = `Bearer ${jwtToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const handleResponseSucces = (response) => {
    return response?.data;
}

const handleResponseError = async (error) => {
    const originalRequest = error.config;
    const status = error?.response.status;
    const message = error?.response?.data?.message;
    if (status === 401 && message === 'Expired JWT Token' && !originalRequest._retry) {
        console.log('Expired JWT Token');
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            return Promise.reject(error);
        }
        const response = await axios.post('https://localhost/token/refresh', { refresh_token: refreshToken });
        const newJwtToken = response?.data?.token;
        const newRefreshToken = response?.data?.refresh_token;
        if (newJwtToken.length > 0 && newRefreshToken.length > 0) {
            localStorage.setItem('token', newJwtToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            originalRequest.headers['Authorization'] = `Bearer ${newJwtToken}`;
            return httpClient(originalRequest);
        }
    }
    return Promise.reject(error);
}

httpClient.interceptors.response.use(handleResponseSucces, handleResponseError);


const makeRequest = async (method, url, data, config) => {
    data = JSON.stringify(data)
    try {
        return await httpClient({
            method,
            url,
            data,
            ...config,
        });
    } catch (error) {
        throw error.response?.data;
    } finally {
    }
};

httpClient.get = async function (url, config) {
    return await makeRequest('get', url, null, config);

};

httpClient.post = async function (url, data, config) {
    const headers = { 'Content-Type': 'application/json', ...config?.headers };
    config = {
        ...config,
        headers
    };
    return await makeRequest('post', url, data, config);
};

httpClient.put = async function (url, data, config) {
    const headers = { 'Content-Type': 'application/json', ...config?.headers };
    config = {
        ...config,
        headers
    };
    return await makeRequest('put', url, data, config);

};

httpClient.patch = async function (url, data, config) {
    const headers = { 'Content-Type': 'application/json', ...config?.headers };
    config = {
        ...config,
        headers
    };
    return makeRequest('patch', url, data, config);
};

httpClient.delete = async function (url, config) {
    return makeRequest('delete', url, null, config);
};

export default httpClient;