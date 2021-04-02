import React from 'react';
import './Product.css'

const Product = (props) => {
    const {product} = props;

    return (
        <div className='container' key={product.id}>
            <img src={product.imageUrl} alt={product.title}/>
            <div className='details'>
                <div>{product.title}</div>
                <div>{product.description}</div>
            </div>
        </div>
    );
};

export default Product;
