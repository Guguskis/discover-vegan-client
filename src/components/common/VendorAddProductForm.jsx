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
import ReviewForm from "./ReviewForm.jsx";


const VendorAddProductForm = (props) => {
    const {handleOnClose, products, setProducts, vendor} = props;
    const {DICTIONARY} = useDictionary();

    const [editProductFormOpen, setEditProductFormOpen] = useState(false);
    const [formType, setFormType] = useState("")
    const [productToEdit, setProductToEdit] = useState();

    const [reviewProductFormOpen, setReviewProductFormOpen] = useState(false);
    const [productToReview, setProductToReview] = useState();

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

    const [{data: updateVendorProductData, loading: updateVendorProductLoading, error: updateVendorProductError}, executeUpdateVendorProduct] = API.useDiscoverVeganApiAxios(
        {
            url: ``,
            method: 'PATCH'
        },
        {manual: true}
    )

    const [{data: reviewProductData, loading: reviewProductLoading, error: reviewProductError}, executeReviewProduct] = API.useDiscoverVeganApiAxios(
        {
            url: `/api/review`,
            method: 'POST'
        },
        {manual: true}
    )

    const handleOnProductSelect = async (product) => {
        if (products.find(productInArray => productInArray.productId === product.productId)) {
            toast.error("This product already added", {
                position: toast.POSITION.TOP_CENTER
            })
        } else {
            editProduct(product, "ADD")
        }
    };

    const handleOnEditProductSubmit = async (formType, editedProductState) => {

        const formData = new FormData();
        formData.append("file", editedProductState.image)

        let editedProduct = editedProductState;

        if (editedProductState.image instanceof File) {
            const response = await executeFileUpload({...fileUploadData, data: formData})
            editedProduct.imageUrl = response.data.fileUrl;
        }

        if (formType === "CREATE") {
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
        } else if (formType === "ADD") {
            const addProductToVendorResponse = await executeAddProductToVendor({
                ...addProductToVendorData, data: {
                    productId: editedProduct.productId,
                    price: editedProduct.price
                }
            })
            const vendorProduct = addProductToVendorResponse.data;
            ArraysState.add(setProducts, vendorProduct);
        } else if (formType === "UPDATE") {
            const updateVendorProductResponse = await executeUpdateVendorProduct({
                ...updateVendorProductData,
                url: `/api/vendor/${vendor.vendorId}/product/${productToEdit.productId}`,
                data: {
                    price: editedProductState.price
                }
            })
            const vendorProduct = updateVendorProductResponse.data;
            ArraysState.replaceByKey(setProducts, vendorProduct, "productId")
        }

        closeEditProduct()
    }

    const editProduct = (product, formType) => {
        setFormType(formType)
        setEditProductFormOpen(true)
        setProductToEdit(product)
    }
    const closeEditProduct = () => {
        setFormType("")
        setEditProductFormOpen(false)
        setProductToEdit(null)
    }

    const onClickReviewProduct = (product) => {
        setProductToReview(product)
        setReviewProductFormOpen(true)
        // executeCreateProduct({...createProductData, data: editedProduct})

    }

    const onClickCloseReviewProduct = () => {
        setProductToReview(null)
        setReviewProductFormOpen(false)
    }

    const ProductInputs = () => (
        <div className="product-input-container">
            <ProductSearchBar handleOnProductSelect={handleOnProductSelect}/>
            <Button text={DICTIONARY.newProduct}
                    onClick={() => editProduct(null, "CREATE")}
                    icon={<AddIcon/>}/>
        </div>
    )

    const isLoading = () => {
        return fileUploadLoading || createProductLoading || addProductToVendorLoading || updateVendorProductLoading;
    }

    return (
        <FormContainer handleOnClose={handleOnClose}>
            <div className="add-product-form-container">
                <ProductInputs/>
                <ManageProductsList products={products}
                                    onClickHandleEdit={editProduct}
                                    onClickHandleReview={onClickReviewProduct}/>
                <Button text={DICTIONARY.done}
                        onClick={handleOnClose}/>

                <Modal
                    open={editProductFormOpen}
                    onClose={closeEditProduct}
                    className="modal-container"
                >
                    <div>
                        <EditProductForm product={productToEdit}
                                         formType={formType}
                                         handleOnClose={closeEditProduct}
                                         handleOnSubmit={handleOnEditProductSubmit}
                                         loading={isLoading()}/>
                    </div>
                </Modal>

                <Modal
                    open={reviewProductFormOpen}
                    onClose={onClickCloseReviewProduct}
                    className="modal-container"
                >
                    <div><ReviewForm handleOnClose={onClickCloseReviewProduct}
                                     product={productToReview}
                                     vendor={vendor}/>
                    </div>
                </Modal>


            </div>
        </FormContainer>
    );
}

export default VendorAddProductForm;
