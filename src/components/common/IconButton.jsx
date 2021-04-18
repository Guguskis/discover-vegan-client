import React from 'react';
import MaterialButton from "@material-ui/core/Button";

import "./IconButton.less"

const IconButton = (props) => {
    const {onClick, text, size, icon} = props;

    return (
        <MaterialButton variant="contained"
                        size={size ? size : "medium"}
                        className="icon-button"
                        startIcon={icon}
                        onClick={onClick}>{text ? text : "Submit"}</MaterialButton>
    );
};

export default IconButton;
