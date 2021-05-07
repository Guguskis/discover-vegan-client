import React from 'react';

import "./ProductDetailsForm.less"
import FormContainer from "./FormContainer.jsx";
import {useDictionary} from "../../config/dictionary.jsx";

const ProductDetailsForm = (props) => {
    const {product, onClose} = props;

    const {DICTIONARY} = useDictionary();

    return (
        <FormContainer handleOnClose={onClose} title={DICTIONARY.productDetails}>
            <div className="product-details-form-container">
                <div className="product-details-container">PRODUCT DETAILS</div>
                <div className="charts-container">
                    <div className="price-details-container">PRICE DETAILS</div>
                    <div className="reviews-details">REVIEWS DETAILS</div>
                </div>
            </div>
        </FormContainer>
    );
};

export default ProductDetailsForm;
