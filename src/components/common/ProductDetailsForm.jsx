import React from 'react';

import "./ProductDetailsForm.less"
import FormContainer from "./FormContainer.jsx";

const ProductDetailsForm = (props) => {
    const {product, onClose} = props;

    return (
        <FormContainer handleOnClose={onClose} title="TEST">
            <div className="product-details-form-container">
                {product.name}
            </div>
        </FormContainer>
    );
};

export default ProductDetailsForm;
