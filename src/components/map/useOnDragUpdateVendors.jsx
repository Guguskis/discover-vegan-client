import React, {useEffect, useState} from 'react';

import harvesine from "haversine-distance";
import {DEFAULTS} from "../../config/config.jsx";
import {API} from "../../config/axiosConfig.jsx";

const useOnDragUpdateVendors = (viewport, selectedVendor) => {

    const [vendors, setVendors] = useState([])
    const [fetchedVendors, setFetchedVendors] = useState([])
    const [alwaysDisplayVendors, setAlwaysDisplayVendors] = useState([]);
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
    }, [viewport])

    useEffect(() => {
        if (vendorData) {
            setFetchedVendors(vendorData);
            setFetchCooldown(true)
        }
    }, [vendorData]);

    useEffect(() => {

        let allVendors = [];

        allVendors = allVendors.concat(fetchedVendors)

        const nonDuplicateAlwaysDisplayVendors = removeDuplicateVendors(allVendors, alwaysDisplayVendors)
        allVendors = allVendors.concat(nonDuplicateAlwaysDisplayVendors);

        if (selectedVendor) {
            const nonDuplicateSelectedVendors = removeDuplicateVendors(allVendors, [selectedVendor]);
            allVendors = allVendors.concat(nonDuplicateSelectedVendors);
        }

        setVendors(allVendors)
    }, [fetchedVendors, alwaysDisplayVendors, selectedVendor])

    const removeDuplicateVendors = (fromVendors, toRemoveVendors) => {
        return toRemoveVendors.filter(vendor => {
            return !fromVendors.some(
                existingVendor => existingVendor.vendorId === vendor.vendorId);
        });
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setFetchCooldown(false)
        }, DEFAULTS.MAP.VENDORS_FETCH_COOLDOWN_MS);
        return () => clearTimeout(timer);
    }, [fetchCooldown]);

    const onViewStateChange = (event) => {

        if (!mapPositionChange(event))
            return;

        const currentPosition = getPosition(viewport)
        const distance = harvesine(currentPosition, lastStepPosition)
        let canDoStep = getCanDoStep(distance, viewport.zoom);

        if (canDoStep && canFetchData()) {
            setLastStepPosition(currentPosition)
            fetchVendors()
        }
    }
    return [vendors, onViewStateChange, setAlwaysDisplayVendors];
};

const mapPositionChange = (event) => {
    if (event.isRotating)
        return false;
    if (event.isDragging && event.isPanning)
        return true;
    return true;
}

function getPosition(viewport) {
    return {
        latitude: viewport.latitude,
        longitude: viewport.longitude
    };
}

function getCanDoStep(distance, zoom) {

    if (zoom > 15 && 250 > distance) {
        return true;
    } else if (zoom < 15 && 350 > distance) {
        return true;
    } else if (zoom < 14 && 500 > distance) {
        return true;
    }

    return distance > DEFAULTS.MAP.MAX_STEP_DISTANCE_METERS;
}

export default useOnDragUpdateVendors;
