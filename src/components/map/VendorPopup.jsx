import React from 'react';
import {Popup} from "react-map-gl";
import Product from "../common/Product.jsx";

import './VendorPopup.less'
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add.js";
import ListIcon from '@material-ui/icons/List';

const VendorPopup = (props) => {
    const {popupInfo, setPopupInfo} = props;

    if (!popupInfo) return null;

    return (
        <Popup
            tipSize={15}
            anchor="bottom"
            offsetTop={-15}
            longitude={popupInfo.position.longitude}
            latitude={popupInfo.position.latitude}
            closeOnClick={false}
            onClose={setPopupInfo}
            className='productsContainer'
        >
            {popupInfo.products.map(product => <Product key={product.id} product={product}/>)}
            <div className="button-container">
                <Button variant="contained" size="small" startIcon={<AddIcon/>}>Product</Button>
                <Button variant="contained" size="small" startIcon={<ListIcon/>}>View all</Button>
            </div>
        </Popup>
    );
};

export default VendorPopup;
