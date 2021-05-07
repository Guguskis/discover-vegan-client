import React, {useEffect, useState} from 'react';
import {Popup} from "react-map-gl";
import Product from "../common/Product.jsx";

import './VendorPopup.less'
import AddIcon from "@material-ui/icons/Add.js";
import Modal from "@material-ui/core/Modal";
import VendorAddProductForm from "../common/VendorAddProductForm.jsx";
import SmallButton from "../common/SmallButton.jsx";
import {useDictionary} from "../../config/dictionary.jsx";
import {API} from "../../config/axiosConfig.jsx";
import {useStore} from "react-context-hook";
import {useHistory} from "react-router-dom";
import ProductDetailsForm from "../common/ProductDetailsForm.jsx";

const VendorPopup = (props) => {
    const {vendor, setSelectedVendor} = props;

    if (!vendor) return null;

    const [{data: productsData, loading: productsLoading, error: productsError}, executeProducts] = API.useDiscoverVeganApiAxios(
        {
            url: `/api/vendor/${vendor.vendorId}/product`,
            method: 'GET'
        }
    )
    const {DICTIONARY} = useDictionary();
    const [user] = useStore('user');
    const history = useHistory();

    const [addProductFormOpen, setAddProductFormOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [productDetailsFormOpen, setProductDetailsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState()

    useEffect(() => {
        if (productsData) {
            setProducts(productsData.products);
        }
    }, [productsData])

    const onClickHandleAddProduct = () => {

        if (!user) {
            history.push("/login")
        } else {
            setAddProductFormOpen(true);
        }
    }

    const onClickHandleAddProductClose = () => {
        setAddProductFormOpen(false);
    }

    const onClickHandleProductDetailsClose = () => {
        setProductDetailsFormOpen(false);
        setSelectedProduct(null)
    }

    const onCLickHandleProductDetails = (product) => {
        setProductDetailsFormOpen(true)
        setSelectedProduct(product)
    }

    const ClickableProduct = (product) => {

        return (
            <div className="click-wrap"
                 onClick={() => onCLickHandleProductDetails(product)}
                 key={product.productId}>
                <Product key={product.productId} product={product}/>
            </div>
        )
    }

    return (
        <Popup
            tipSize={15}
            anchor="bottom"
            offsetTop={-15}
            longitude={vendor.longitude}
            latitude={vendor.latitude}
            closeOnClick={false}
            onClose={setSelectedVendor}
            className='popup-container'
            captureScroll={true}
            captureClick={true}
            capturePointerMove={true}
        >
            <div className="vendor-details">
                <div className="name">{vendor.name}</div>
                <div className="address">{vendor.address}</div>
            </div>
            <div className={`products-container ${products.length === 0 ? "empty" : ""}`}>{
                products.length > 0 ?
                    products.map(ClickableProduct)
                    :
                    <div>{DICTIONARY.listIsEmpty}</div>
            }
            </div>
            <div className="button-container">
                <SmallButton text={DICTIONARY.product}
                             icon={<AddIcon/>}
                             onClick={onClickHandleAddProduct}/>
            </div>
            <Modal
                open={addProductFormOpen}
                onClose={onClickHandleAddProductClose}
                className="modal-container"
            >
                <div><VendorAddProductForm products={products}
                                           setProducts={setProducts}
                                           vendor={vendor}
                                           handleOnClose={onClickHandleAddProductClose}/></div>
            </Modal>
            <Modal
                open={productDetailsFormOpen}
                onClose={onClickHandleProductDetailsClose}
                className="modal-container"
            >
                <div><ProductDetailsForm
                    product={selectedProduct}
                    vendor={vendor}
                    onClose={onClickHandleProductDetailsClose}
                /></div>
            </Modal>
        </Popup>
    );
};

export default VendorPopup;
