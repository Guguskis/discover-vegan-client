import React, {useEffect, useState} from 'react';

import harvesine from "haversine-distance";
import {DEFAULTS} from "../../config/config.jsx";
import {ArraysState} from "../../utils/utils.jsx";

const useOnDragUpdateVendors = (viewport, setVendors) => {

    const [lastStepPosition, setLastStepPosition] = useState(getPosition(viewport));
    const [visitedCoordinates, setVisitedCoordinates] = useState([])

    const handleMouseMove = (event) => {

        if (!event.leftButton)
            return;

        const currentPosition = getPosition(viewport)
        const distance = harvesine(currentPosition, lastStepPosition)

        if (distance > DEFAULTS.STEP_DISTANCE_METERS && doesNotIntersectOtherPoints(currentPosition)) {
            setLastStepPosition(currentPosition)
            ArraysState.add(setVisitedCoordinates, currentPosition)
        }
    }

    const doesNotIntersectOtherPoints = (position) => {
        const intersectedCoordinates = visitedCoordinates.filter(visitedCoordinate => {
            const distance = harvesine(visitedCoordinate, position)
            return distance < DEFAULTS.STEP_DISTANCE_METERS;
        });

        return intersectedCoordinates.length === 0;
    }

    useEffect(() => {
        setVendors();
    }, [visitedCoordinates])

    return [handleMouseMove];
};

function getPosition(viewport) {
    return {
        latitude: viewport.latitude,
        longitude: viewport.longitude
    };
}

export default useOnDragUpdateVendors;
