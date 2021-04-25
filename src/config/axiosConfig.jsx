import {makeUseAxios} from "axios-hooks";
import axios from "axios";

const bearerTokenInterceptor = async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers = {
            authorization: `Bearer ${token}`
        };
    }

    return config;
};
const onRejected = (error) => Promise.reject(error);

const ROOT_HOST = "http://localhost";
const HOST = {
    FILE_SERVICE: ROOT_HOST + ":8081",
    DISCOVER_VEGAN_API: ROOT_HOST + ":8080",
    AUTHENTICATION_SERVICE: ROOT_HOST + ":8082"
}
const fileServiceAxios = axios.create({baseURL: HOST.FILE_SERVICE});
const discoverVeganApiAxios = axios.create({baseURL: HOST.DISCOVER_VEGAN_API});
const authenticationServiceAxios = axios.create({baseURL: HOST.AUTHENTICATION_SERVICE});

fileServiceAxios.interceptors.request.use(bearerTokenInterceptor, onRejected);
discoverVeganApiAxios.interceptors.request.use(bearerTokenInterceptor, onRejected);
authenticationServiceAxios.interceptors.request.use(bearerTokenInterceptor, onRejected);

const API = {
    useFileServiceAxios: makeUseAxios({
        axios: fileServiceAxios
    }),
    useDiscoverVeganApiAxios: makeUseAxios({
        axios: discoverVeganApiAxios
    }),
    useAuthenticationServiceAxios: makeUseAxios({
        axios: authenticationServiceAxios
    }),
}

export {API};
