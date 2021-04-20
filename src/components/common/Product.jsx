import React from 'react';
import './Product.less'
import {DICTIONARY} from "../../config/dictionary.jsx";

const Product = (props) => {
    const {product} = props;

    // todo add gamintojas

    return (
        <div className="product-container" key={product.productId}>
            <img src={product.imageUrl} alt={DICTIONARY.productImage}/>
            <div className='details'>
                <p className='name'>{product.name}</p>
                <p className='price'>{product.price}€</p>
            </div>
        </div>
    );
};

export default Product;
