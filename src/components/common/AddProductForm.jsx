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

const AddProductForm = (props) => {
    const {handleOnClose} = props;

    const [editProductFormOpen, setEditProductFormOpen] = useState(false);
    const [products, setProducts] = useState([]);

    const handleOnProductSelect = (product) => {
        ArraysState.add(setProducts, product);
    };

    const handleOnEditProductSubmit = (product) => {
        let newProduct = !product.hasOwnProperty("id");

        if (newProduct) {
            console.log("POST request for new product")
            throw new Error("Failed to POST new product")
            console.log(product)

        } else {
            console.log("PUT request for edited product")
            console.log(product)
        }
    }

    const ProductInputs = () => (
        <div className="product-input-container">
            <div className="details-container">
                <ProductSearchBar handleOnOptionSelect={handleOnProductSelect}/>
            </div>
            <Button variant="contained"
                    size="small"
                    className="button"
                    startIcon={<AddIcon/>}
                    onClick={() => setEditProductFormOpen(true)}
            >New product</Button>
        </div>

    )

    return (
        <FormContainer handleOnClose={handleOnClose}>
            <div className="add-product-form-container">
                <ProductInputs/>
                <ManageProductsList products={products} setProducts={setProducts}/>
                <Button variant="contained"
                        size="medium"
                        className="button">Submit</Button>

                <Modal
                    open={editProductFormOpen}
                    onClose={() => setEditProductFormOpen(false)}
                    aria-labelledby="server-modal-title"
                    aria-describedby="server-modal-description"
                    className="modal-container"
                >
                    <div>
                        <EditProductForm handleOnClose={() => setEditProductFormOpen(false)}
                                         handleOnSubmit={handleOnEditProductSubmit}/>
                    </div>
                </Modal>
            </div>
        </FormContainer>
    );
}

export default AddProductForm;
