import React, {useEffect, useState} from 'react'
import ReactMapGL from 'react-map-gl'
import {usePosition} from 'use-position';

import './SimpleMap.css'
import {Guid} from "../utils/utils";
import PlaceMarkers from "./PlaceMarkers";
import PlacePopup from "./PlacePopup";

const SimpleMap = () => {
    const {latitude, longitude} = usePosition(false);
    const [popupInfo, setPopupInfo] = useState(null);

    const [viewport, setViewport] = useState({
        latitude: 40.67,
        longitude: -13.59,
        width: '100vw',
        height: '100vh',
        zoom: 13
    });

    const [places, setPlaces] = useState([
        {id: '1', longitude: 25.341746138622348, latitude: 54.72744555070343},
        {id: '2', longitude: 25.348183440258097, latitude: 54.72298451304856},
        {id: '3', longitude: 25.33977203278708, latitude: 54.716093723400704},
        {id: '4', longitude: 25.32149009614157, latitude: 54.718473409062995},
        {id: '5', longitude: 25.325781630565665, latitude: 54.72888289157234},
        {id: '6', longitude: 25.367924498608037, latitude: 54.73165830208707},
    ]);

    const onClickAddPlace = (data) => {

        const marker = {
            id: `${Guid.newGuid()}`,
            longitude: data.lngLat[0],
            latitude: data.lngLat[1]
        };
        console.table(places)
        setPlaces(markers => [...markers, marker])
    }

    useEffect(() => {
        if (latitude && longitude) {
            setViewport({
                ...viewport,
                longitude: longitude,
                latitude: latitude
            })

            onClickAddPlace({lngLat: [longitude, latitude]})
        }
    }, [latitude, longitude])

    // if (!latitude || !longitude)
    //     return (<div>Getting your location</div>)

    return (
        <ReactMapGL className='map'
                    {...viewport}
                    onViewportChange={setViewport}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    onClick={onClickAddPlace}>
            <PlaceMarkers places={places} setPopupInfo={setPopupInfo}/>
            <PlacePopup popupInfo={popupInfo} setPopupInfo={setPopupInfo}/>
        </ReactMapGL>
    );
}

export default SimpleMap;
