import React, {useState} from 'react';
import {Popup} from "react-map-gl";
import Product from "../common/Product.jsx";

import './VendorPopup.less'
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add.js";
import ListIcon from '@material-ui/icons/List';
import Modal from "@material-ui/core/Modal";
import AddProductForm from "../common/AddProductForm.jsx";

const VendorPopup = (props) => {
    const {popupInfo, setPopupInfo} = props;

    const [addProductFormOpen, setAddProductFormOpen] = useState(false);

    if (!popupInfo) return null;

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
            longitude={popupInfo.position.longitude}
            latitude={popupInfo.position.latitude}
            closeOnClick={false}
            onClose={setPopupInfo}
            className='popup-container'
            captureScroll={true}
            captureClick={true}
            capturePointerMove={true}
        >
            <div className="products-container">
                {popupInfo.products.map(product => <Product key={product.id} product={product}/>)}
            </div>
            <div className="button-container">
                <Button variant="contained" size="small" startIcon={<AddIcon/>}
                        onClick={onClickHandleAddProduct}>Product</Button>
                <Button variant="contained" size="small" startIcon={<ListIcon/>}>View all</Button>
            </div>
            <Modal
                open={addProductFormOpen}
                onClose={onClickHandleAddProductClose}
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className="modal-container"
            >
                <div><AddProductForm handleOnClose={onClickHandleAddProductClose}/></div>
            </Modal>
        </Popup>
    );
};

export default VendorPopup;
