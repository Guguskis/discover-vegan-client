import React, {useEffect, useState} from 'react';

import harvesine from "haversine-distance";
import {API, DEFAULTS} from "../../config/config.jsx";
import {ArraysState} from "../../utils/utils.jsx";

const useOnDragUpdateVendors = (props) => {
    const {viewport} = props;

    const [vendors, setVendors] = useState([])
    const [{data: vendorData, loading: vendorLoading, error: vendorError}, executeVendor] = API.useDiscoverVeganApiAxios(
        {
            url: "/api/vendor",
            method: 'GET'
        },
        {manual: true}
    )

    const [lastStepPosition, setLastStepPosition] = useState(getPosition(viewport));
    const [visitedCoordinates, setVisitedCoordinates] = useState([])

    const fetchVendors = () => {
        if (vendorLoading)
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
        }
    }, [vendorData]);

    const handleMouseMove = (event) => {

        if (!event.leftButton)
            return;

        const currentPosition = getPosition(viewport)
        const distance = harvesine(currentPosition, lastStepPosition)

        if (distance > DEFAULTS.STEP_DISTANCE_METERS && doesNotIntersectOtherPoints(currentPosition)) {
            setLastStepPosition(currentPosition)
            ArraysState.add(setVisitedCoordinates, currentPosition)
            fetchVendors()
        }
    }

    const doesNotIntersectOtherPoints = (position) => {
        const intersectedCoordinates = visitedCoordinates.filter(visitedCoordinate => {
            const distance = harvesine(visitedCoordinate, position)
            return distance < DEFAULTS.STEP_DISTANCE_METERS;
        });

        return intersectedCoordinates.length === 0;
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
