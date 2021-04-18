import React, {useState} from 'react';
import FormContainer from "./FormContainer.jsx";
import "./EditProductForm.less";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ImageDropzone from "./ImageDropzone.jsx";
import {toast} from "react-toastify";
import {ObjectState} from "../../utils/utils.jsx";
import Button from "./Button.jsx";

const EditProductForm = (props) => {
    const {handleOnClose, handleOnSubmit, loading} = props;
    const [product, setProduct] = useState(props.product ? props.product : {});

    const handleOnClickSubmit = async () => {
        // todo input validation
        try {
            await handleOnSubmit(product);
        } catch (ex) {
            toast.error(ex.message)
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
                                   label="Product name"
                                   variant="filled"
                                   name="title"
                                   value={product.title}
                                   onChange={onChangeUpdateProduct}
                                   required={true}/>
                        <TextField id="filled-start-adornment"
                                   className="input-field"
                                   label="Price"
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
                                   setImage={setImage}/>
                </div>
                <Button text="Submit"
                        onClick={handleOnClickSubmit}
                        isLoading={loading}/>

            </div>
        </FormContainer>
    );
}

export default EditProductForm;
