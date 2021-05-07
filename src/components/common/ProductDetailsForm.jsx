import React, {useEffect, useState} from 'react';

import "./ProductDetailsForm.less"
import "date-utils";
import FormContainer from "./FormContainer.jsx";
import {useDictionary} from "../../config/dictionary.jsx";
import {API} from "../../config/axiosConfig.jsx";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const ProductDetailsForm = (props) => {
    const {product, vendor, onClose} = props;

    const {DICTIONARY} = useDictionary();

    const [fromDate, setFromDate] = useState(Date.today().add({days: -5}))
    const [toDate, setToDate] = useState(Date.today())

    const [priceTrends, setPriceTrends] = useState([]);
    const [reviewTrends, setReviewTrends] = useState([]);

    const [{data: priceTrendsData, loading: priceTrendsLoading, error: priceTrendsError}, executePriceTrends] = API.useDiscoverVeganApiAxios(
        {
            url: `/api/trend/vendor/${vendor?.vendorId}/product/${product?.productId}/price`,
            method: 'GET'
        },
        {manual: true}
    )

    const [{data: reviewTrendsData, loading: reviewTrendsLoading, error: reviewTrendsError}, executeReviewTrends] = API.useDiscoverVeganApiAxios(
        {
            url: `/api/trend/vendor/${vendor?.vendorId}/product/${product?.productId}/review`,
            method: 'GET',
            params: {
                fromDate: fromDate.toFormat("YYYY-MM-DD"),
                toDate: toDate.toFormat("YYYY-MM-DD"),
                stepCount: 20
            }
        },
        {manual: true}
    )

    useEffect(() => {
        if (product) {
            executePriceTrends()
            executeReviewTrends()
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
        if (!reviewTrendsLoading && reviewTrendsData) {

            const flattenedReviewTrends = reviewTrendsData.map(reviewTrend => {

                const flattenedReviewTrend = {
                    dateTime: reviewTrend.dateTime
                }

                for (const [reviewType, count] of Object.entries(reviewTrend.counts)) {
                    flattenedReviewTrend[reviewType] = count;
                }

                return flattenedReviewTrend;
            })

            console.log(flattenedReviewTrends)

            setReviewTrends(flattenedReviewTrends)
        }
    }, [reviewTrendsLoading])

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
                        <div className="title">{`${DICTIONARY.priceChange}`}</div>
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
                    <div className="reviews-details-container">
                        <div className="title">{`${DICTIONARY.reviews}`}</div>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={400}
                                height={300}
                                data={reviewTrends}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name" stroke="#ffffff"/>
                                <YAxis stroke="#ffffff"/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="RECOMMENDED" name={DICTIONARY.recommended} stackId="a" fill="#38ec38"/>
                                <Bar dataKey="NOT_RECOMMENDED" name={DICTIONARY.notRecommended} stackId="a"
                                     fill="#ffa500"/>
                                <Bar dataKey="CANT_FIND" name={DICTIONARY.cantFind} stackId="a" fill="#e5e5e5"/>
                                <Bar dataKey="NOT_VEGAN" name={DICTIONARY.notVegan} stackId="a" fill="#91060e"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </FormContainer>
    );
};

export default ProductDetailsForm;
