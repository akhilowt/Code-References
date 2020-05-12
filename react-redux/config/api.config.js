const API_URL = 'http://localhost:61024/';

const API_ENDPOINTS = {
    LOGIN: 'CourtLinkAPI/UserLogin',
    SENDRESTPASSWOREMAIL:'CourtLinkAPI/SendResetPasswordEmail'
}

export const getApiUrl = (key) => {
    return API_URL + API_ENDPOINTS[key];
}
export const source = "localhost";