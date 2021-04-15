import React from 'react';
import FormContainer from "./FormContainer.jsx";
import "./AddProductForm.less";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

const AddProductForm = (props) => {
    const {handleOnClose} = props;

    return (
        <FormContainer handleOnClose={handleOnClose}>
            <div className="add-product-form-container">
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
                               startAdornment: <InputAdornment position="start">€</InputAdornment>,
                           }}/>
                <Button variant="contained"
                        size="medium"
                        className="button">Submit</Button>
            </div>
        </FormContainer>
    );
}

export default AddProductForm;
