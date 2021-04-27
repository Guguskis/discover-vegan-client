import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import MapIcon from '@material-ui/icons/Map';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import StorefrontIcon from "@material-ui/icons/Storefront";

import "./ProductVendorsList.less"
import haversine from 'haversine-distance'
import {useStore} from "react-context-hook";

const ProductVendorsList = (props) => {
    const {productVendorDetails, flyToVendor} = props;
    const [location] = useStore('location')

    const sortByDistance = (productVendorDetails) => {
        if (!location)
            return productVendorDetails;

        return productVendorDetails.sort((detail1, detail2) => {
            const vendor1 = detail1.vendor;
            const vendor2 = detail2.vendor;
            return getDistance(vendor1) > getDistance(vendor2)
        })
    }

    const getDistance = (vendor) => {
        const currentLocation = [location.latitude, location.longitude]
        const vendorLocation = [vendor.latitude, vendor.longitude]
        return haversine(currentLocation, vendorLocation);
    }

    return (
        <List dense={false} className="manage-products-container">
            {sortByDistance(productVendorDetails).map((detail) => {
                const vendor = detail.vendor;
                const product = detail.product;
                const price = `${product.price} €`;


                let distanceMeters;
                if (location) {
                    distanceMeters = getDistance(vendor);
                }


                return (
                    React.cloneElement(<ListItem>
                        <ListItemAvatar>
                            <Avatar className="store-icon">
                                <StorefrontIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            className="list-item-text"
                            primary={vendor.name}/>
                        <ListItemText
                            className="list-item-text"
                            primary={price}/>
                        {distanceMeters ?
                            <ListItemText
                                className="list-item-text"
                                primary={`${distanceMeters.toFixed(0)}m`}/>
                            :
                            null}
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit"
                                        onClick={() => flyToVendor(vendor)}>
                                <MapIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>, {
                            key: vendor.vendorId,
                        })
                    )
                }
            )}
        </List>
    );
};

export default ProductVendorsList;
