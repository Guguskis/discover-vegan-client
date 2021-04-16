import React, {useState} from 'react';
import FormContainer from "./FormContainer.jsx";
import "./EditProductForm.less";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import ImageDropzone from "./ImageDropzone.jsx";

const EditProductForm = (props) => {
    const {handleOnClose, handleOnSubmit} = props;
    const [product, setProduct] = useState(props.product ? props.product : {});


    const handleOnClickSubmit = () => {
        // todo input validation
        try {
            handleOnSubmit(product);
        } catch (ex) {
            console.log(ex)
        }
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
                <Button variant="contained"
                        size="medium"
                        className="button"
                        onClick={handleOnClickSubmit}>Submit</Button>
            </div>
        </FormContainer>
    );
}

export default EditProductForm;
