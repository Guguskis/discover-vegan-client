import React from 'react';
import MaterialButton from "@material-ui/core/Button";

import "./SmallButton.less"

const SmallButton = (props) => {
    const {onClick, text, size, icon} = props;

    return (
        <MaterialButton variant="contained"
                        size={size ? size : "medium"}
                        className="small-button"
                        startIcon={icon}
                        onClick={onClick}>{text ? text : "Submit"}</MaterialButton>
    );
};

export default SmallButton;
