import React, {useEffect, useState} from 'react'
import ReactMapGL from 'react-map-gl'
import {usePosition} from 'use-position';

import './SimpleMap.css'

const SimpleMap = () => {
    const {latitude, longitude} = usePosition(false);

    const [viewport, setViewport] = useState({
        latitude: latitude,
        longitude: longitude,
        width: '100vw',
        height: '100vh',
        zoom: 13
    });

    useEffect(() => {
        setViewport({
            ...viewport,
            longitude: longitude,
            latitude: latitude
        })
    }, [latitude, longitude])

    if(!latitude || ! longitude)
        return(<div>Getting your location</div>)

    return (
        <div className='SimpleMap'>
            <ReactMapGL className='map'
                        {...viewport}
                        onViewportChange={setViewport}
                        mapStyle="mapbox://styles/mapbox/dark-v9">

            </ReactMapGL>
        </div>

    );
}

export default SimpleMap;
