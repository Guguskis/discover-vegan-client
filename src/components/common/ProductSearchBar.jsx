import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import './ProductSearchBar.less'
import PRODUCTS from "../../data-sample/product.jsx";
import Product from "./Product.jsx";
import {DICTIONARY} from "../../config/dictionary.jsx";

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const fetchProducts = (start, items) => {
    return PRODUCTS.slice(start, start + items);
}

const ProductSearchBar = (props) => {
    const {handleOnOptionSelect} = props;

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const products = fetchProducts(0, 5);

            await sleep(500)

            if (active) {
                setOptions(products);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            className='search-bar'
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            getOptionSelected={(product, value) => product.productId === value.productId}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={DICTIONARY.searchVeganGoods}
                    variant="outlined"
                    onChange={event => console.log(event.target.value)}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            renderOption={(product, state) => (
                <div onClick={() => handleOnOptionSelect(product)}>
                    <Product className='product' key={product.productId} product={product}/>
                </div>
            )}
        />
    );
}

export default ProductSearchBar;
