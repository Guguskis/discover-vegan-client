import axios from 'axios'
import {makeUseAxios} from "axios-hooks";

const ROOT_HOST = "http://e26ed5545de0.ngrok.io";

const HOST = {
    FILE_SERVICE: ROOT_HOST + "/file-service",
    DISCOVER_VEGAN_API: ROOT_HOST + "/discover-vegan-api",
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
    MAP: {
        MAX_STEP_DISTANCE_METERS: 750,
        VENDORS_FETCH_COOLDOWN_MS: 500,
        MAX_ZOOM: 16
    }
}

export {API, DEFAULTS};
