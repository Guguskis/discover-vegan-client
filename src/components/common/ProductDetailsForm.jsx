import React, {useEffect, useState} from 'react';

import "./ProductDetailsForm.less"
import "date-utils";
import FormContainer from "./FormContainer.jsx";
import {useDictionary} from "../../config/dictionary.jsx";
import {API} from "../../config/axiosConfig.jsx";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const ProductDetailsForm = (props) => {
    const {product, vendor, onClose} = props;

    const {DICTIONARY} = useDictionary();

    const [priceTrends, setPriceTrends] = useState([]);

    const [{data: priceTrendsData, loading: priceTrendsLoading, error: priceTrendsError}, executePriceTrends] = API.useDiscoverVeganApiAxios(
        {
            url: `/api/trend/vendor/${vendor?.vendorId}/product/${product?.productId}/price`,
            method: 'GET'
        },
        {manual: true}
    )

    useEffect(() => {
        if (product) {
            executePriceTrends()
        }
    }, [product])

    useEffect(() => {
        if (!priceTrendsLoading && priceTrendsData) {
            const todayPriceTrend = {
                dateTime: Date.today(),
                price: priceTrendsData[priceTrendsData.length - 1].price
            }

            setPriceTrends(priceTrendsData.concat(todayPriceTrend));
        }
    }, [priceTrendsLoading])

    useEffect(() => {
        console.log(priceTrends)
    }, [priceTrends])

    const formatXAxisTick = (dateString) => {
        return "";
    }

    return (
        <FormContainer handleOnClose={onClose} title={DICTIONARY.productDetails}>
            <div className="product-details-form-container">
                <div className="product-details-container">
                    <div className="left-section">
                        <div className="text big">{product.name}</div>
                        <div className="text small">{product.producer}</div>
                        <div className="text">{product.price}€</div>
                    </div>
                    <div className="right-section">
                        <img src={product.imageUrl} alt={DICTIONARY.productPhoto}/>
                    </div>
                </div>
                <div className="charts-container">
                    <div className="price-details-container">
                        <div className="title">{`${DICTIONARY.priceChange} ${product.name}`}</div>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                width={400}
                                height={300}
                                data={priceTrends}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <YAxis stroke="#ffffff"/>
                                <XAxis dataKey="dateTime" stroke="#ffffff" angle={-45} tickFormatter={formatXAxisTick}/>
                                <Tooltip/>
                                <Legend/>
                                <Line type="monotone" dataKey="price" name={`${DICTIONARY.price} €`} stroke="#000000"
                                      activeDot={{r: 8}} strokeWidth={3}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="reviews-details">REVIEWS DETAILS</div>
                </div>
            </div>
        </FormContainer>
    );
};

export default ProductDetailsForm;
