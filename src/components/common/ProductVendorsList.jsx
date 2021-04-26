import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore.js";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit.js";
import DeleteIcon from "@material-ui/icons/Delete.js";
import List from "@material-ui/core/List";

const ProductVendorsList = (props) => {
    const {productVendorDetails} = props;

    return (
        <List dense={false} className="manage-products-container">
            {productVendorDetails.map((detail) =>
                React.cloneElement(<ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <LocalGroceryStoreIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        className="list-item-text"
                        primary={detail.product.name}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="edit">
                            <EditIcon/>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>, {
                    key: detail.vendor.vendorId,
                }),
            )}
        </List>
    );
};

export default ProductVendorsList;
