import React, {useState} from 'react';
import FormContainer from "./FormContainer.jsx";
import ProductSearchBar from "./ProductSearchBar.jsx";
import EditProductForm from "./EditProductForm.jsx";
import Modal from "@material-ui/core/Modal";

import "./VendorAddProductForm.less";
import AddIcon from "@material-ui/icons/Add.js";
import ManageProductsList from "./ManageProductsList.jsx";
import {ArraysState} from "../../utils/utils.jsx";
import {toast} from "react-toastify";
import {API} from "../../config/config.jsx";
import Button from "./Button.jsx";

const VendorAddProductForm = (props) => {
    const {handleOnClose, products, setProducts} = props;

    const [editProductFormOpen, setEditProductFormOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState();

    const [{data: fileUploadData, loading: fileUploadLoading, error: fileUploadError}, executeFileUpload] = API.useStorageAxios(
        {
            url: "/api/storage/file",
            method: 'POST'
        },
        {manual: true}
    )

    const handleOnProductSelect = (product) => {
        if (products.find(productInArray => productInArray.productId === product.productId)) {
            toast.error("This product already added", {
                position: toast.POSITION.TOP_CENTER
            })
        } else {
            ArraysState.add(setProducts, product);
        }
    };

    const handleOnEditProductSubmit = async (product) => {
        let newProduct = !product.hasOwnProperty("id"); // || !product.productId

        const formData = new FormData();
        formData.append("file", product.image)

        if (product.image instanceof File) {
            const response = await executeFileUpload({...fileUploadData, data: formData})
            product.imageUrl = response.data.fileUrl;
        }

        if (newProduct) {
            throw new Error("POST api/vendor/product, add response to products")
        } else {
            throw new Error("PUT api/vendor/product")
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
            <Button text="New product"
                    onClick={() => onClickEditProduct(null)}
                    icon={<AddIcon/>}/>
        </div>
    )

    return (
        <FormContainer handleOnClose={handleOnClose}>
            <div className="add-product-form-container">
                <ProductInputs/>
                <ManageProductsList products={products}
                                    onClickHandleEdit={onClickEditProduct}
                                    onClickHandleDelete={onClickDeleteProduct}/>
                <Button text="Done"
                        onClick={handleOnClose}/>

                <Modal
                    open={editProductFormOpen}
                    onClose={() => setEditProductFormOpen(false)} // todo onClickCancelEditProduct
                    aria-labelledby="server-modal-title"
                    aria-describedby="server-modal-description"
                    className="modal-container"
                >
                    <div>
                        <EditProductForm product={productToEdit}
                                         handleOnClose={onClickCancelEditProduct}
                                         handleOnSubmit={handleOnEditProductSubmit}
                                         loading={fileUploadLoading}/>
                    </div>
                </Modal>
            </div>
        </FormContainer>
    );
}

export default VendorAddProductForm;
