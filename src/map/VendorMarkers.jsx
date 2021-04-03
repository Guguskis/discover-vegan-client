import React from 'react';
import {Marker} from "react-map-gl";
import StorefrontIcon from "@material-ui/icons/Storefront";

const VendorMarkers = (props) => {
    const {vendors, setPopupInfo} = props;

    return vendors.map(vendor => (
        <Marker
            key={vendor.id}
            longitude={vendor.position.longitude}
            latitude={vendor.position.latitude}
            offsetTop={-20} // center
            offsetLeft={-20} // center
        >
            <button className='vendorMarker' onClick={() => setPopupInfo(vendor)}>
                <StorefrontIcon className='vendorIcon' width='auto' height='auto'/>
            </button>
        </Marker>
    ))
};

export default VendorMarkers;
