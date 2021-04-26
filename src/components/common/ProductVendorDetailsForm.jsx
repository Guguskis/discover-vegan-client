import React from 'react';

const ProductVendorDetailsForm = (props) => {
    const {product} = props;

    return (
        <div>
            {product.name}
        </div>
    );
};

export default ProductVendorDetailsForm;
