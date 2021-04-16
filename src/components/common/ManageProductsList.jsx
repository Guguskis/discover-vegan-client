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

const ManageProductsList = () => {

    function generate(element) {
        return [0, 1, 2].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }

    return (
        <List dense={false} className="manage-products-container">
            {generate(
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <LocalGroceryStoreIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        className="list-item-text"
                        primary="Single-line item"
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <EditIcon/>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )}
        </List>
    );
};

export default ManageProductsList;
