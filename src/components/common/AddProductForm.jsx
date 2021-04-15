import React from 'react';
import FormContainer from "./FormContainer.jsx";

const AddProductForm = (props) => {
    const {handleOnClose} = props;

    return (
        <FormContainer handleOnClose={handleOnClose}>
            <div>testing my body</div>
        </FormContainer>
    );
}

export default AddProductForm;
