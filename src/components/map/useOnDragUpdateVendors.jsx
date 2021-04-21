import React, {useEffect, useState} from 'react';

import harvesine from "haversine-distance";
import {API, DEFAULTS} from "../../config/config.jsx";

const useOnDragUpdateVendors = (viewport) => {

    const [vendors, setVendors] = useState([])
    const [{data: vendorData, loading: vendorLoading, error: vendorError}, executeVendor] = API.useDiscoverVeganApiAxios(
        {
            url: "/api/vendor",
            method: 'GET'
        },
        {manual: true}
    )

    const [fetchCooldown, setFetchCooldown] = useState(false)

    const [lastStepPosition, setLastStepPosition] = useState(getPosition(viewport));

    function canFetchData() {
        return !vendorLoading && !fetchCooldown;
    }

    const fetchVendors = () => {
        if (!canFetchData())
            return;

        executeVendor(
            {
                ...vendorData,
                params: {latitude: viewport.latitude, longitude: viewport.longitude}
            }
        );
    }

    useEffect(() => {
        fetchVendors();
    }, [])

    useEffect(() => {
        if (vendorData) {
            setVendors(vendorData);
            setFetchCooldown(true)
        }
    }, [vendorData]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFetchCooldown(false)
        }, DEFAULTS.VENDORS_FETCH_COOLDOWN_MS);
        return () => clearTimeout(timer);
    }, [fetchCooldown]);

    const handleMouseMove = (event) => {

        if (!event.leftButton)
            return;

        const currentPosition = getPosition(viewport)
        const distance = harvesine(currentPosition, lastStepPosition)
        let canDoStep = distance > DEFAULTS.STEP_DISTANCE_METERS;

        if (canDoStep && canFetchData()) {
            setLastStepPosition(currentPosition)
            fetchVendors()
        }
    }
    return [vendors, handleMouseMove];
};

function getPosition(viewport) {
    return {
        latitude: viewport.latitude,
        longitude: viewport.longitude
    };
}

export default useOnDragUpdateVendors;
