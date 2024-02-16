import { useAuthStore } from '@/stores';

const AppKEY =  `${import.meta.env.VITE_APPKey}`;

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        console.log("fetching [", url, "]");
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { loginToken } = useAuthStore();
    const isLoggedIn = !!loginToken;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${loginToken}`, ClientUUID: localStorage.getItem(`${AppKEY}`), ClientUUIDsig: localStorage.getItem(`${AppKEY}+sig`) };
    } else {
        return { ClientUUID: localStorage.getItem(`${AppKEY}`), ClientUUIDsig: localStorage.getItem(`${AppKEY}+sig`) };
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const { loginToken, logout } = useAuthStore();
            if ([401, 403].includes(response.status) && loginToken) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                logout();
            }

            //I can only attribute the need for the next 4 lines to various servers idiosyncrasies around status codes and messages
            // the VS 19 IDE server gave full status messages - my IDE does, but my hosted IIS did not...
            var errorResponses = "";
            if (response.status == "400") { console.log("400 caught");errorResponses = "400 - Bad Request"; }
            if (response.status == "401") { console.log("401 caught");errorResponses = "401 - Unauthorized"; }
            if (response.status == "403") { console.log("403 caught");errorResponses = "403 - Forbidden"; }
            if (response.status == "417") { console.log("417 caught");errorResponses = "417 - Expectation Failed"; }
            const error = (data && data.message) || errorResponses; // response.status; //Text;
            return Promise.reject(error);
        }
        return data;
    });
}    
