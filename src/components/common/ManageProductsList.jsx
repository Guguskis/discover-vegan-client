import React from 'react';
import "./ManageProductsList.less"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

const ManageProductsList = (props) => {
    const {products, onClickHandleEdit, onClickHandleDelete} = props;

    return (
        <List dense={false} className="manage-products-container">
            {products.map((product) =>
                React.cloneElement(<ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <LocalGroceryStoreIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        className="list-item-text"
                        primary={product.name}
                    />
                    <ListItemSecondaryAction>
                        <IconButton onClick={() => onClickHandleEdit(product, "UPDATE")} edge="end" aria-label="edit">
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={() => onClickHandleDelete(product)} edge="end" aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>, {
                    key: product.productId,
                }),
            )}
        </List>
    );
};

export default ManageProductsList;
