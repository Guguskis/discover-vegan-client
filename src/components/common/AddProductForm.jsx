import React, {useState} from 'react';
import FormContainer from "./FormContainer.jsx";
import ProductSearchBar from "./ProductSearchBar.jsx";
import EditProductForm from "./EditProductForm.jsx";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

import "./AddProductForm.less";
import AddIcon from "@material-ui/icons/Add.js";
import ManageProductsList from "./ManageProductsList.jsx";
import {ArraysState} from "../../utils/utils.jsx";
import {toast} from "react-toastify";

const AddProductForm = (props) => {
    const {handleOnClose} = props;

    const [editProductFormOpen, setEditProductFormOpen] = useState(false);
    const [products, setProducts] = useState([]); // GET api/vendor/product
    const [productToEdit, setProductToEdit] = useState();

    const handleOnProductSelect = (product) => {
        if (products.find(productInArray => productInArray.id === product.id)) {
            toast.error("This product already added", {
                position: toast.POSITION.TOP_CENTER
            })
        } else {
            ArraysState.add(setProducts, product);
        }
    };

    const handleOnEditProductSubmit = (product) => {
        let newProduct = !product.hasOwnProperty("id"); // || !product.id

        if (newProduct) {
            console.log("POST api/vendor/product, add response to products")
            throw new Error("Not implemented")
        } else {
            console.log("PUT api/vendor/product")
            throw new Error("Not implemented")
        }
    }

    const onClickEditProduct = (product) => {
        setEditProductFormOpen(true)
        setProductToEdit(product)
    }
    const onClickCancelEditProduct = () => {
        setEditProductFormOpen(false)
        setProductToEdit(null)
    }

    const onClickDeleteProduct = (product) => {
        // todo add confirmation prompt
        ArraysState.remove(setProducts, product);
    }

    const ProductInputs = () => (
        <div className="product-input-container">
            <ProductSearchBar handleOnOptionSelect={handleOnProductSelect}/>
            <Button variant="contained"
                    size="small"
                    className="button"
                    startIcon={<AddIcon/>}
                    onClick={() => onClickEditProduct(null)}>
                New product
            </Button>
        </div>

    )

    return (
        <FormContainer handleOnClose={handleOnClose}>
            <div className="add-product-form-container">
                <ProductInputs/>
                <ManageProductsList products={products}
                                    onClickHandleEdit={onClickEditProduct}
                                    onClickHandleDelete={onClickDeleteProduct}/>
                <Button variant="contained"
                        size="medium"
                        className="button">Done</Button>

                <Modal
                    open={editProductFormOpen}
                    onClose={() => setEditProductFormOpen(false)}
                    aria-labelledby="server-modal-title"
                    aria-describedby="server-modal-description"
                    className="modal-container"
                >
                    <div>
                        <EditProductForm product={productToEdit}
                                         handleOnClose={onClickCancelEditProduct}
                                         handleOnSubmit={handleOnEditProductSubmit}/>
                    </div>
                </Modal>
            </div>
        </FormContainer>
    );
}

export default AddProductForm;
