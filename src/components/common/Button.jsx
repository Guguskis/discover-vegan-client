import React from 'react';
import MaterialButton from "@material-ui/core/Button";

import "./Button.less"
import CircularProgress from "@material-ui/core/CircularProgress";
import {useDictionary} from "../../config/dictionary.jsx";


const Button = (props) => {
    const {onClick, text, size, icon, isLoading} = props;
    const {DICTIONARY} = useDictionary();

    return (
        <MaterialButton variant="contained"
                        size={size ? size : "medium"}
                        className="button"
                        startIcon={isLoading ? null : icon}
                        onClick={onClick}>
            {isLoading ?
                <CircularProgress/>
                :
                text ? text : DICTIONARY.submit
            }
        </MaterialButton>
    );
};

export default Button;
