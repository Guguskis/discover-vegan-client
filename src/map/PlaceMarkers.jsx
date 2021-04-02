import React from 'react';
import {Marker} from "react-map-gl";
import StorefrontIcon from "@material-ui/icons/Storefront";

const PlaceMarkers = (props) => {
    const {places, setPopupInfo} = props;

    return places.map(place => (
        <Marker
            key={place.id}
            longitude={place.longitude}
            latitude={place.latitude}
            offsetTop={-20} // center
            offsetLeft={-20} // center
        >
            <button className='placeMarker' onClick={() => setPopupInfo(place)}>
                <StorefrontIcon className='placeIcon' width='auto' height='auto'/>
            </button>
        </Marker>
    ))
};

export default PlaceMarkers;
