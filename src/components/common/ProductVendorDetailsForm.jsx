import React, {useEffect, useState} from 'react';
import FormContainer from "./FormContainer.jsx";
import {API} from "../../config/axiosConfig.jsx";
import ProductVendorsList from "./ProductVendorsList.jsx";
import {useDictionary} from "../../config/dictionary.jsx";

const ProductVendorDetailsForm = (props) => {
    const {product, onClose, flyToVendor} = props;

    const {DICTIONARY} = useDictionary()

    const [{data: productVendorDetailsData, loading: productVendorDetailsLoading, error: productVendorDetailsError}, executeProductVendorDetails] = API.useDiscoverVeganApiAxios(
        {
            url: `/api/product/${product.productId}/vendor`,
            method: 'GET'
        }
    )

    const [productVendorDetails, setProductVendorDetails] = useState([])

    useEffect(() => {
        if (productVendorDetailsData) {
            setProductVendorDetails(productVendorDetailsData.details)
        }
    }, [productVendorDetailsData])

    const getTitle = () => {
        return `${DICTIONARY.locationsToBuy} ${product.name}`;
    }

    return (
        <FormContainer handleOnClose={onClose} title={getTitle()}>
            <div className="product-vendor-details-container">
                <ProductVendorsList productVendorDetails={productVendorDetails}
                                    flyToVendor={flyToVendor}/>
            </div>
        </FormContainer>
    );
};

export default ProductVendorDetailsForm;
