import React, {useState} from 'react';
import FormContainer from "./FormContainer.jsx";
import {useDictionary} from "../../config/dictionary.jsx";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import {API} from "../../config/axiosConfig.jsx";
import Button from "./Button.jsx";

import "./ReviewForm.less"
import {toast} from "react-toastify";

const ReviewForm = (props) => {
    const {handleOnClose, product, vendor} = props;
    const {DICTIONARY} = useDictionary();

    const [{data: reviewProductData, loading: reviewProductLoading, error: reviewProductError}, executeReviewProduct] = API.useDiscoverVeganApiAxios(
        {
            url: `/api/review`,
            method: 'POST'
        },
        {manual: true}
    )

    const [review, setReview] = useState();

    const onChangeHandleSelect = (event) => {
        setReview(event.target.value)
    }

    const onClickSubmitReview = async () => {

        if (review === "") {
            toast.error(DICTIONARY.selectReview)
            return;
        }

        try {
            await executeReviewProduct({
                ...reviewProductData, data: {
                    productId: product.productId,
                    vendorId: vendor.vendorId,
                    reviewType: review
                }
            });
            handleOnClose()
        } catch (ex) {
            const response = ex.response ? ex.response : 666;
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
                case 401:
                    toast.error(DICTIONARY.youMustBeLoggedIn)
                    break;
                default:
                    toast.error(DICTIONARY.somethingBadHappenedPleaseTryAgainLater)
                    break;
            }
        }
    }

    return (
        <FormContainer
            handleOnClose={handleOnClose}
            title={`${DICTIONARY.reviewProduct} ${product?.name}`}
        >
            <div className="review-product-container">
                <FormControl>
                    <InputLabel htmlFor="review-select-native">{DICTIONARY.review}</InputLabel>
                    <NativeSelect
                        id="review-select-native"
                        value={review}
                        onChange={onChangeHandleSelect}>
                        <option aria-label="None" value=""/>
                        <option value={"RECOMMENDED"}>{DICTIONARY.recommended}</option>
                        <option value={"NOT_RECOMMENDED"}>{DICTIONARY.notRecommended}</option>
                        <option value={"CANT_FIND"}>{DICTIONARY.cantFind}</option>
                        <option value={"NOT_VEGAN"}>{DICTIONARY.notVegan}</option>
                    </NativeSelect>
                </FormControl>
                <Button text={DICTIONARY.submit}
                        onClick={onClickSubmitReview}
                        loading={reviewProductLoading}/>
            </div>
        </FormContainer>
    );
};

export default ReviewForm;
