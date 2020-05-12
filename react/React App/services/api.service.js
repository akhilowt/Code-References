import axios from 'axios';

import { getApiUrl,source } from '../config/api.config';
import { errorMessages } from '../config/messages.config';

import { localStorageService } from './localstorage.service';

// declare a request interceptor
axios.interceptors.request.use(request => {
    if (request.method.toUpperCase() == "POST") {
        request.headers["Content-Type"] = "application/json";
    }
    request.headers.source = source;
    const isLoggedIn = localStorageService.isAuthenticated();
    if (isLoggedIn) {
        const token = localStorageService.getAuthorizationToken();
        request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
}, error => {
    return Promise.reject(error);
});

// declare a response interceptor
axios.interceptors.response.use((response) => {
    // do something with the response data
    return Promise.resolve(response.data);
}, error => {
    debugger;
    // handle the response error
    const { response } = error;

    if (response) {
        const { status, data } = response;
        // place your reentry code
        if (status === 401) {
            return Promise.reject(data.Message);
        } else {
            return Promise.reject(data.Message);
        }
    } else {
        if (error.message == "Network Error") {
            return Promise.reject(errorMessages.API_NOT_AVAILABLE);
        } else {
            return Promise.reject(error.message);
        }
    }

});

/* api methods */

const login = (username, password) => {
    return axios.post(getApiUrl('LOGIN'), { username, password }).then(response => {
        if(response.Success) {
            localStorageService.storeAuthUser(response);
        }
        return response;
    });
};

const logout = () => {
    localStorageService.clearLocalStorage();
};

const get = (endpoint) => {
    return axios.get(getApiUrl(endpoint));
}

const sendResetPasswordEmail = (username) => {
    debugger;
    return axios.post(getApiUrl('SENDRESTPASSWOREMAIL'), { username }).then(response => {
        return response;
    });
};

const post = (endpoint, data) => {
    return axios.post(getApiUrl(endpoint), data);
}

export const apiService = {
    get,
    post,
    login,
    logout,
    sendResetPasswordEmail
};