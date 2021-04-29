import React, {useEffect, useState} from 'react';
import FormContainer from "./FormContainer.jsx";
import "./EditProductForm.less";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ImageDropzone from "./ImageDropzone.jsx";
import {toast} from "react-toastify";
import {ObjectState} from "../../utils/utils.jsx";
import Button from "./Button.jsx";
import {useDictionary} from "../../config/dictionary.jsx";


const EditProductForm = (props) => {
    const {handleOnClose, formType, handleOnSubmit, loading} = props;
    const {DICTIONARY} = useDictionary();
    const [product, setProduct] = useState({});

    useEffect(() => {
        if (formType === "CREATE") {
            setProduct({
                name: "",
                producer: "",
                price: 0
            })
        } else {
            const propsProduct = props.product;
            if (propsProduct.price === null) {
                propsProduct.price = 0;
            }
            setProduct(propsProduct)
        }
    }, [])

    const handleOnClickSubmit = async () => {
        // todo input validation
        try {
            await handleOnSubmit(formType, product);
        } catch (ex) {
            const response = ex.response;
            switch (response.status) {
                case 500:
                    toast.error(DICTIONARY.pleaseTryAgainLater)
                    break;
                case 404:
                    toast.error(DICTIONARY.vendorMightBeDeleted)
                    break;
                case 400:
                    toast.error(DICTIONARY.checkYourInput)
                    break;
                default:
                    toast.error(DICTIONARY.somethingBadHappenedPleaseTryAgainLater)
                    break;
            }
        }
    }

    const onChangeUpdateProduct = (event) => {
        ObjectState.update(setProduct, event.target.name, event.target.value)
    }

    const setImage = (image) => {
        ObjectState.update(setProduct, "image", image)
    }

    // todo if edit disable title change
    return (
        <FormContainer handleOnClose={handleOnClose}>
            <div className="edit-product-form-container">
                <div className="edit-product-form">
                    <div className="details-container">
                        <TextField id="filled-basic"
                                   className="input-field"
                                   label={DICTIONARY.productName}
                                   variant="filled"
                                   name="name"
                                   disabled={formType === "UPDATE" || formType === "ADD"}
                                   value={product.name}
                                   onChange={onChangeUpdateProduct}
                                   required={true}/>
                        <TextField id="filled-basic"
                                   className="input-field"
                                   label={DICTIONARY.producer}
                                   variant="filled"
                                   name="producer"
                                   disabled={formType === "UPDATE" || formType === "ADD"}
                                   value={product.producer}
                                   onChange={onChangeUpdateProduct}
                                   required={true}/>
                        <TextField id="filled-start-adornment"
                                   className="input-field"
                                   label={DICTIONARY.price}
                                   variant="filled"
                                   required={true}
                                   type="number"
                                   name="price"
                                   value={product.price}
                                   onChange={onChangeUpdateProduct}
                                   InputProps={{
                                       startAdornment: <InputAdornment position="start">€</InputAdornment>
                                   }}/>
                    </div>
                    <ImageDropzone imageUrl={product.imageUrl}
                                   disabled={formType === "UPDATE" || formType === "ADD"}
                                   setImage={setImage}/>
                </div>
                <Button text={DICTIONARY.submit}
                        onClick={handleOnClickSubmit}
                        isLoading={loading}/>

            </div>
        </FormContainer>
    );
}

export default EditProductForm;
