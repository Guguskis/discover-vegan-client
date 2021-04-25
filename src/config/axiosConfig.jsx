import {makeUseAxios} from "axios-hooks";
import axios from "axios";

const ROOT_HOST = "http://localhost";
const HOST = {
    FILE_SERVICE: ROOT_HOST + ":8081",
    DISCOVER_VEGAN_API: ROOT_HOST + ":8080",
    AUTHENTICATION_SERVICE: ROOT_HOST + ":8082"
}
const API = {
    useFileServiceAxios: makeUseAxios({
        axios: axios.create({baseURL: HOST.FILE_SERVICE})
    }),
    useDiscoverVeganApiAxios: makeUseAxios({
        axios: axios.create({baseURL: HOST.DISCOVER_VEGAN_API})
    }),
    useAuthenticationServiceAxios: makeUseAxios({
        axios: axios.create({baseURL: HOST.AUTHENTICATION_SERVICE})
    }),
}
export {API};
