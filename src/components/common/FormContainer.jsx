import React from 'react';
import "./FormContainer.less"
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";

const FormContainer = (props) => {
    const {handleOnClose, title} = props;

    return (
        <div className="form-container">
            <div className="close-button-container">
                <IconButton onClick={handleOnClose}>
                    <CloseIcon/>
                </IconButton>
            </div>
            {title ?
                <div className="title">{title}</div>
                :
                null
            }
            <div className="form-body">
                {props.children}
            </div>
        </div>
    );
}

export default FormContainer;
