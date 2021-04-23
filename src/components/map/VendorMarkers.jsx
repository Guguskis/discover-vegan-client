import React from 'react';
import {Marker} from "react-map-gl";
import StorefrontIcon from "@material-ui/icons/Storefront";
import IconButton from "@material-ui/core/IconButton";
import "./VendorMarkers.less"

const VendorMarkers = (props) => {
    const {vendors, setSelectedVendor} = props;

    return vendors.map(vendor => (
        <Marker
            key={vendor.vendorId}
            longitude={vendor.longitude}
            latitude={vendor.latitude}
            offsetTop={-26} // center
            offsetLeft={-26} // center
            className="vendor-marker"
        >
            <IconButton onClick={() => setSelectedVendor(vendor)}>
                <StorefrontIcon className='vendorIcon'/>
            </IconButton>
        </Marker>
    ))
};

export default VendorMarkers;
