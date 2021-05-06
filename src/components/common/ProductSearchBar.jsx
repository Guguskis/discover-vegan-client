import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import './ProductSearchBar.less'
import Product from "./Product.jsx";
import {useDictionary} from "../../config/dictionary.jsx";
import {API} from "../../config/axiosConfig.jsx";

const ProductSearchBar = (props) => {
    const {handleOnProductSelect} = props;
    const {DICTIONARY} = useDictionary();

    const [{data: productsData, loading: productsLoading, error: productsError}, executeProducts] = API.useDiscoverVeganApiAxios(
        {
            url: `/api/product`,
            method: 'GET'
        }, {manual: true}
    )

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("")
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (productsLoading)
            return undefined;

        (async () => {
            if (open) {
                fetchProducts();
            }
        })();
    }, [query]);

    const fetchProducts = () => {
        executeProducts({...productsData, params: {query: query}});
    }

    useEffect(() => {
        if (productsData) {
            setProducts(productsData.products)
        }
    }, [productsData])

    useEffect(() => {
        if (!open) {
            setProducts([]);
        }
    }, [open]);

    const handleOnOpen = () => {
        fetchProducts()
        setOpen(true)
    }
    const handleOnClose = () => {
        setOpen(false)
    }
    const handleOnChange = (event) => {
        setQuery(event.target.value)
    }

    return (
        <Autocomplete
            className='search-bar'
            open={open}
            onOpen={handleOnOpen}
            onClose={handleOnClose}
            getOptionSelected={(product, value) => product.productId === value.productId}
            getOptionLabel={(product) => product.name}
            options={products}
            loading={productsLoading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={DICTIONARY.searchVeganGoods}
                    variant="outlined"
                    onChange={handleOnChange}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {productsLoading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            renderOption={(product, state) => (
                <div className="click-wrap"
                     onClick={() => handleOnProductSelect(product)}>
                    <Product className='product' key={product.productId} product={product}/>
                </div>
            )}
        />
    );
}

export default ProductSearchBar;
