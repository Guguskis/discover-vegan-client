import React from 'react'
import ReactMapGL from 'react-map-gl'

import './Map.less'
import VendorMarkers from "./VendorMarkers.jsx";
import VendorPopup from "./VendorPopup.jsx";

const Map = (props) => {
    const {
        vendors,
        selectedVendor,
        setSelectedVendor,
        onViewStateChange,
        viewport,
        setViewport,
        mapRef
    } = props;

    return (
        <div className='map'>
            <ReactMapGL
                {...viewport}
                ref={mapRef}
                onViewportChange={setViewport}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxApiAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
                width='100%'
                height='100%'
                onInteractionStateChange={onViewStateChange}>
                <VendorMarkers vendors={vendors} setSelectedVendor={setSelectedVendor}/>
                <VendorPopup vendor={selectedVendor} setSelectedVendor={setSelectedVendor}/>
                <div className='ui-overlay'>
                    {props.children}
                </div>
            </ReactMapGL>
        </div>
    );
}

export default Map;
