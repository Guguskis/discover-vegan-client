import React from 'react';
import {Popup} from "react-map-gl";
import Product from "../common/Product.jsx";

import './VendorPopup.css'

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
        </Popup>
    );
};

export default VendorPopup;
