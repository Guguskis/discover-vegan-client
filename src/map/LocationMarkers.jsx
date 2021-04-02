import React from 'react';
import {Marker} from "react-map-gl";
import StorefrontIcon from "@material-ui/icons/Storefront";

const LocationMarkers = (props) => {
    const {markers, onCLick: onClick} = props;

    return markers.map(marker => (
        <Marker
            key={marker.id}
            longitude={marker.longitude}
            latitude={marker.latitude}
            offsetTop={-20} // center
            offsetLeft={-20} // center
        >
            <button className='locationMarker' onClick={onClick}>
                <StorefrontIcon className='locationIcon' width='auto' height='auto'/>
            </button>
        </Marker>
    ))
};

export default LocationMarkers;
