import React from 'react';
import {Marker} from "react-map-gl";
import StorefrontIcon from "@material-ui/icons/Storefront";
import IconButton from "@material-ui/core/IconButton";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import "./VendorMarkers.less"

const VendorMarkers = (props) => {
    const {vendors, setSelectedVendor} = props;


    const getVendorIcon = (vendor) => {
        let icon;

        switch (vendor.vendorType) {
            case "STORE":
                icon = <StorefrontIcon className='vendorIcon'/>
                break;
            case "RESTAURANT":
                icon = <RestaurantIcon className='vendorIcon'/>
                break;
            default:
                console.log(`Icon for {vendorType: ${vendor.vendorType}} not specified`)
                icon = <StorefrontIcon className='vendorIcon'/>
                break;
        }

        return icon;
    }

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
                {getVendorIcon(vendor)}
            </IconButton>
        </Marker>
    ))
};

export default VendorMarkers;
