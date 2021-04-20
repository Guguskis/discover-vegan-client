import React from 'react';
import MaterialButton from "@material-ui/core/Button";

import "./SmallButton.less"
import {DICTIONARY} from "../../config/dictionary.jsx";

const SmallButton = (props) => {
    const {onClick, text, size, icon} = props;

    return (
        <MaterialButton variant="contained"
                        size={size ? size : "medium"}
                        className="small-button"
                        startIcon={icon}
                        onClick={onClick}>{text ? text : DICTIONARY.submit}</MaterialButton>
    );
};

export default SmallButton;
