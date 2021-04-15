import React from 'react';
import {Marker} from "react-map-gl";
import StorefrontIcon from "@material-ui/icons/Storefront";
import IconButton from "@material-ui/core/IconButton";
import "./VendorMarkers.less"

const VendorMarkers = (props) => {
    const {vendors, setPopupInfo} = props;

    return vendors.map(vendor => (
        <Marker
            key={vendor.id}
            longitude={vendor.position.longitude}
            latitude={vendor.position.latitude}
            offsetTop={-26} // center
            offsetLeft={-26} // center
            className="vendor-marker"
        >
            <IconButton onClick={() => setPopupInfo(vendor)}>
                <StorefrontIcon className='vendorIcon' width='auto' height='auto'/>
            </IconButton>
        </Marker>
    ))
};

export default VendorMarkers;
