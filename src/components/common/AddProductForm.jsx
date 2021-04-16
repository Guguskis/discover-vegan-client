import React, {useState} from 'react';
import FormContainer from "./FormContainer.jsx";
import ProductSearchBar from "./ProductSearchBar.jsx";
import EditProductForm from "./EditProductForm.jsx";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

import "./AddProductForm.less";
import AddIcon from "@material-ui/icons/Add.js";

const AddProductForm = (props) => {
    const {handleOnClose} = props;

    const [editProductFormOpen, setEditProductFormOpen] = useState(false);
    const [products, setProducts] = useState([]);

    const handleOnProductSelect = (product) => {
        setProducts(products => products.concat(product));
    };


    const SelectExistingProductForm = () => (
        <div className="select-existing-product-form">
            <div className="details-container">
                <ProductSearchBar handleOnOptionSelect={handleOnProductSelect}/>
            </div>
        </div>
    )

    return (
        <FormContainer handleOnClose={handleOnClose}>
            <div className="add-product-form-container">
                <div className="product-input-container">
                    <SelectExistingProductForm/>
                    <Button variant="contained"
                            size="small"
                            className="button"
                            startIcon={<AddIcon/>}
                            onClick={() => setEditProductFormOpen(true)}
                    >New product</Button>
                </div>

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
                                         handleOnSubmit={(product) => console.log(product)}/>
                    </div>
                </Modal>
            </div>
        </FormContainer>
    );
}

export default AddProductForm;
