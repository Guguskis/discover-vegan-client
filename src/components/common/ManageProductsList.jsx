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
import ReportIcon from '@material-ui/icons/Report';

const ManageProductsList = (props) => {
    const {products, onClickHandleEdit, onClickHandleReview} = props;

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
                        <IconButton onClick={() => onClickHandleReview(product)} edge="end" aria-label="delete">
                            <ReportIcon/>
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
