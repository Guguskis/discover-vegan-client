import React, {useEffect, useState} from 'react';
import {Popup} from "react-map-gl";
import Product from "../common/Product.jsx";

import './VendorPopup.less'
import AddIcon from "@material-ui/icons/Add.js";
import ListIcon from '@material-ui/icons/List';
import Modal from "@material-ui/core/Modal";
import VendorAddProductForm from "../common/VendorAddProductForm.jsx";
import SmallButton from "../common/SmallButton.jsx";
import {API} from "../../config/config.jsx";

const VendorPopup = (props) => {
    const {vendor, setVendor} = props;

    if (!vendor) return null;

    const [{data: productsData, loading: productsLoading, error: productsError}, executeProducts] = API.useDiscoverVeganApiAxios(
        {
            url: `/api/vendor/${vendor.vendorId}/product`,
            method: 'GET'
        }
    )
    const [addProductFormOpen, setAddProductFormOpen] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (productsData) {
            setProducts(productsData);
        }
    }, [productsData])


    const onClickHandleAddProduct = () => {
        setAddProductFormOpen(true);
    }
    const onClickHandleAddProductClose = () => {
        setAddProductFormOpen(false);
    }

    return (
        <Popup
            tipSize={15}
            anchor="bottom"
            offsetTop={-15}
            longitude={vendor.longitude}
            latitude={vendor.latitude}
            closeOnClick={false}
            onClose={setVendor}
            className='popup-container'
            captureScroll={true}
            captureClick={true}
            capturePointerMove={true}
        >
            <div className="products-container">
                {products.map(product => <Product key={product.productId} product={product}/>)}
            </div>
            <div className="button-container">
                <SmallButton text="Product"
                             icon={<AddIcon/>}
                             onClick={onClickHandleAddProduct}/>
                <SmallButton text="View all"
                             icon={<ListIcon/>}/>
            </div>
            <Modal
                open={addProductFormOpen}
                onClose={onClickHandleAddProductClose}
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className="modal-container"
            >
                <div><VendorAddProductForm products={products}
                                           setProducts={setProducts}
                                           vendor={vendor}
                                           handleOnClose={onClickHandleAddProductClose}/></div>
            </Modal>
        </Popup>
    );
};

export default VendorPopup;
