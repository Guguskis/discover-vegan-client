import axios from 'axios'
import {makeUseAxios} from "axios-hooks";

const HOST = {
    STORAGE: "http://localhost:8081"
}

const API = {
    useStorageAxios: makeUseAxios({
        axios: axios.create({baseURL: HOST.STORAGE})
    })
}

export {API};
