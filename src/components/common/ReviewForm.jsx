import React from 'react';
import FormContainer from "./FormContainer.jsx";
import {useDictionary} from "../../config/dictionary.jsx";

const ReviewForm = (props) => {
    const {handleOnClose, product, vendor} = props;

    const {DICTIONARY} = useDictionary();

    return (
        <FormContainer
            handleOnClose={handleOnClose}
            title={`${DICTIONARY.reviewProduct} ${product.name}`}
        >
            <div className="review-product-container">
                INPUT TO REVIEW PRODUCT
            </div>
        </FormContainer>
    );
};

export default ReviewForm;
