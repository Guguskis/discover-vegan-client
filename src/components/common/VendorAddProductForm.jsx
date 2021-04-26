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
import Button from "./Button.jsx";
import {useDictionary} from "../../config/dictionary.jsx";
import {API} from "../../config/axiosConfig.jsx";


const VendorAddProductForm = (props) => {
    const {handleOnClose, products, setProducts, vendor} = props;
    const {DICTIONARY} = useDictionary();

    const [editProductFormOpen, setEditProductFormOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState();

    const [{data: fileUploadData, loading: fileUploadLoading, error: fileUploadError}, executeFileUpload] = API.useFileServiceAxios(
        {
            url: "/api/storage/file",
            method: 'POST'
        },
        {manual: true}
    )

    const [{data: createProductData, loading: createProductLoading, error: createProductError}, executeCreateProduct] = API.useDiscoverVeganApiAxios(
        {
            url: "/api/product",
            method: 'POST'
        },
        {manual: true}
    )
    const [{data: addProductToVendorData, loading: addProductToVendorLoading, error: addProductToVendorError}, executeAddProductToVendor] = API.useDiscoverVeganApiAxios(
        {
            url: `/api/vendor/${vendor.vendorId}/product`,
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

    const handleOnEditProductSubmit = async (isNewProduct, editedProductState) => {
        const formData = new FormData();
        formData.append("file", editedProductState.image)

        let editedProduct = editedProductState;

        if (editedProductState.image instanceof File) {
            const response = await executeFileUpload({...fileUploadData, data: formData})
            editedProduct.imageUrl = response.data.fileUrl;
        }

        if (isNewProduct) {
            const createProductResponse = await executeCreateProduct({...createProductData, data: editedProduct});
            const newProduct = createProductResponse.data;
            const addProductToVendorResponse = await executeAddProductToVendor({
                ...addProductToVendorData, data: {
                    productId: newProduct.productId,
                    price: editedProduct.price
                }
            })
            const vendorProduct = addProductToVendorResponse.data;
            ArraysState.add(setProducts, vendorProduct);
            closeEditProduct()
        } else {
            throw new Error("PUT api/vendor/product")
        }

    }

    const editProduct = (product) => {
        setEditProductFormOpen(true)
        setProductToEdit(product)
    }
    const closeEditProduct = () => {
        setEditProductFormOpen(false)
        setProductToEdit(null)
    }

    const onClickDeleteProduct = (product) => {
        // todo add confirmation prompt
        ArraysState.remove(setProducts, product);
    }

    const ProductInputs = () => (
        <div className="product-input-container">
            <ProductSearchBar handleOnProductSelect={handleOnProductSelect}/>
            <Button text={DICTIONARY.newProduct}
                    onClick={() => editProduct(null)}
                    icon={<AddIcon/>}/>
        </div>
    )

    return (
        <FormContainer handleOnClose={handleOnClose}>
            <div className="add-product-form-container">
                <ProductInputs/>
                <ManageProductsList products={products}
                                    onClickHandleEdit={editProduct}
                                    onClickHandleDelete={onClickDeleteProduct}/>
                <Button text={DICTIONARY.done}
                        onClick={handleOnClose}/>

                <Modal
                    open={editProductFormOpen}
                    onClose={closeEditProduct}
                    className="modal-container"
                >
                    <div>
                        <EditProductForm product={productToEdit}
                                         handleOnClose={closeEditProduct}
                                         handleOnSubmit={handleOnEditProductSubmit}
                                         loading={fileUploadLoading}/>
                    </div>
                </Modal>
            </div>
        </FormContainer>
    );
}

export default VendorAddProductForm;
