import React from 'react';
import MaterialButton from "@material-ui/core/Button";

import "./Button.less"

const Button = (props) => {
    const {onClick, text, size, icon} = props;

    return (
        <MaterialButton variant="contained"
                        size={size ? size : "medium"}
                        className="button"
                        startIcon={icon}
                        onClick={onClick}>{text ? text : "Submit"}</MaterialButton>
    );
};

export default Button;
