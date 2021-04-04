import React, {useEffect, useState} from 'react'
import ReactMapGL from 'react-map-gl'
import {usePosition} from 'use-position';

import './SimpleMap.css'
import {Guid} from "../utils/utils.jsx";
import VendorMarkers from "./VendorMarkers.jsx";
import VendorPopup from "./VendorPopup.jsx";
import VENDORS from "../data-sample/vendor.jsx";

const SimpleMap = () => {
    const {latitude, longitude} = usePosition(false);
    const [popupInfo, setPopupInfo] = useState(null);

    const [viewport, setViewport] = useState({
        latitude: 54.72744555070343,
        longitude: 25.341746138622348,
        width: '100vw',
        height: '100vh',
        zoom: 13
    });

    const [vendors, setVendors] = useState(VENDORS);

    const onClickAddVendor = (data) => {

        const marker = {
            id: `${Guid.newGuid()}`,
            position: {
                longitude: data.lngLat[0],
                latitude: data.lngLat[1]
            }
        };
        console.table(vendors)
        setVendors(markers => [...markers, marker])
    }

    useEffect(() => {
        if (latitude && longitude) {
            setViewport({
                ...viewport,
                longitude: longitude,
                latitude: latitude
            })
        }
    }, [latitude, longitude])

    // if (!latitude || !longitude)
    //     return (<div>Getting your location</div>)

    return (
        <ReactMapGL className='map'
                    {...viewport}
                    onViewportChange={setViewport}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
            // onClick={onClickAddVendor}
        >
            <VendorMarkers vendors={vendors} setPopupInfo={setPopupInfo}/>
            <VendorPopup popupInfo={popupInfo} setPopupInfo={setPopupInfo}/>
        </ReactMapGL>
    );
}

export default SimpleMap;
