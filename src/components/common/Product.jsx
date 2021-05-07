import React from 'react';
import './Product.less'
import {useDictionary} from "../../config/dictionary.jsx";


const Product = (props) => {
    const {product, onClick} = props;
    const {DICTIONARY} = useDictionary();

    return (
        <div className="product-container" key={product.productId} onClick={onClick}>
            <img src={product.imageUrl} alt={DICTIONARY.productImage}/>
            <div className='details'>
                <p className='name'>{product.name}</p>
                <p className='producer'>{product.producer}</p>
                {product.price ?
                    <p className='price'>{product.price}€</p>
                    :
                    null
                }
            </div>
        </div>
    );
};

export default Product;
