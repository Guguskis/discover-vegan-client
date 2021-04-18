import React from 'react';
import MaterialButton from "@material-ui/core/Button";

import "./Button.less"
import CircularProgress from "@material-ui/core/CircularProgress";

const Button = (props) => {
    const {onClick, text, size, icon, isLoading} = props;

    return (
        <MaterialButton variant="contained"
                        size={size ? size : "medium"}
                        className="button"
                        startIcon={isLoading ? null : icon}
                        onClick={onClick}>
            {isLoading ?
                <CircularProgress/>
                :
                text ? text : "Submit"
            }
        </MaterialButton>
    );
};

export default Button;
