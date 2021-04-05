import React, {useEffect, useState} from 'react'
import ReactMapGL from 'react-map-gl'
import {usePosition} from 'use-position';

import './Map.less'
import VendorMarkers from "./VendorMarkers.jsx";
import VendorPopup from "./VendorPopup.jsx";
import VENDORS from "../../data-sample/vendor.jsx";
import SearchBar from "../SearchBar.jsx";

const Map = () => {
    const {latitude, longitude} = usePosition(false);
    const [popupInfo, setPopupInfo] = useState(null);

    const [viewport, setViewport] = useState({
        latitude: 54.72744555070343,
        longitude: 25.341746138622348,
        zoom: 13
    });

    const [vendors, setVendors] = useState(VENDORS);

    useEffect(() => {
        if (latitude && longitude) {
            setViewport({
                ...viewport,
                longitude: longitude,
                latitude: latitude
            })
        }
    }, [latitude, longitude])

    return (
        <div className='map'>
            <ReactMapGL
                {...viewport}
                onViewportChange={setViewport}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
                width='100%'
                height='100%'>
                <VendorMarkers vendors={vendors} setPopupInfo={setPopupInfo}/>
                <VendorPopup popupInfo={popupInfo} setPopupInfo={setPopupInfo}/>
                <div className='ui-overlay'>
                    <SearchBar/>
                </div>
            </ReactMapGL>
        </div>
    );
}

export default Map;
