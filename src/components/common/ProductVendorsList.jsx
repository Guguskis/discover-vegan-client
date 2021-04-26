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

const ProductVendorsList = (props) => {
    const {productVendorDetails, flyToVendor} = props;

    return (
        <List dense={false} className="manage-products-container">
            {productVendorDetails.map((detail) => {
                    const vendor = detail.vendor;
                    const product = detail.product;
                    const price = `${product.price} €`;

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
