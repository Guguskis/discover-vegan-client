import axios from 'axios'
import {makeUseAxios} from "axios-hooks";

const HOST = {
    STORAGE: "http://localhost:8081",
    DISCOVER_VEGAN_API: "http://localhost:8080",
}

const API = {
    useStorageAxios: makeUseAxios({
        axios: axios.create({baseURL: HOST.STORAGE})
    }),
    useDiscoverVeganApiAxios: makeUseAxios({
        axios: axios.create({baseURL: HOST.DISCOVER_VEGAN_API})
    }),
}

export {API};
