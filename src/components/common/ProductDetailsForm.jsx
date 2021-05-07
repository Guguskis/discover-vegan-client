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
                <div className="product-details-container">
                    <div className="left-section">
                        <div className="text big">{product.name}</div>
                        <div className="text small">{product.producer}</div>
                        <div className="text">{product.price}€</div>
                    </div>
                    <div className="right-section">
                        <img src={product.imageUrl} alt={DICTIONARY.productPhoto}/>
                    </div>
                </div>
                <div className="charts-container">
                    <div className="price-details-container">PRICE DETAILS</div>
                    <div className="reviews-details">REVIEWS DETAILS</div>
                </div>
            </div>
        </FormContainer>
    );
};

export default ProductDetailsForm;
