import React from 'react';
import FormContainer from "./FormContainer.jsx";
import "./AddProductForm.less";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import ImageDropzone from "./ImageDropzone.jsx";

const AddProductForm = (props) => {
    const {handleOnClose} = props;

    const CreateNewProductForm = () => (
        <div className="create-new-product-form">
            <div className="details-container">
                <TextField id="filled-basic"
                           className="input-field"
                           label="Product name"
                           variant="filled"
                           required={true}/>
                <TextField id="filled-start-adornment"
                           className="input-field"
                           label="Price"
                           variant="filled"
                           required={true}
                           type="number"
                           InputProps={{
                               startAdornment: <InputAdornment position="start">€</InputAdornment>
                           }}/>
            </div>
            <ImageDropzone/>
        </div>
    )

    return (
        <FormContainer handleOnClose={handleOnClose}>
            <div className="add-product-form-container">
                <CreateNewProductForm/>

                <Button variant="contained"
                        size="medium"
                        className="button">Submit</Button>
            </div>
        </FormContainer>
    );
}

export default AddProductForm;
