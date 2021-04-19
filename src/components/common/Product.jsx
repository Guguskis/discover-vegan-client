import React from 'react';
import './Product.less'

const Product = (props) => {
    const {product} = props;

    // todo add gamintojas

    return (
        <div className="product-container" key={product.productId}>
            <img src={product.imageUrl} alt="Product image"/>
            <div className='details'>
                <p className='name'>{product.name}</p>
                <p className='price'>{product.price}€</p>
            </div>
        </div>
    );
};

export default Product;
