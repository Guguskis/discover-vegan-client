import React from 'react';
import './Product.less'

const Product = (props) => {
    const {product} = props;

    return (
        <div className="product-container" key={product.id}>
            <img src={product.imageUrl} alt={product.title}/>
            <div className='details'>
                <p className='title'>{product.title}</p>
                <p className='description'>{product.description}</p>
            </div>
        </div>
    );
};

export default Product;
