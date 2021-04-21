import axios from 'axios'
import {makeUseAxios} from "axios-hooks";

const HOST = {
    FILE_SERVICE: "http://localhost:8081",
    DISCOVER_VEGAN_API: "http://localhost:8080",
}

const API = {
    useFileServiceAxios: makeUseAxios({
        axios: axios.create({baseURL: HOST.FILE_SERVICE})
    }),
    useDiscoverVeganApiAxios: makeUseAxios({
        axios: axios.create({baseURL: HOST.DISCOVER_VEGAN_API})
    }),
}

const DEFAULTS = {
    STEP_DISTANCE_METERS: 3000,
    VENDORS_FETCH_COOLDOWN_MS: 1000
}

export {API, DEFAULTS};
