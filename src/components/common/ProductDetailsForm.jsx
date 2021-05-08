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

    const [fromDate, setFromDate] = useState(Date.today().add({months: -3}))
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
                dateTime: Date.UTCtoday(),
                price: priceTrendsData[priceTrendsData.length - 1].price
            }

            const parsedPriceTrends = priceTrendsData.map(priceTrend => {
                return {
                    dateTime: new Date(priceTrend.dateTime),
                    price: priceTrend.price
                }
            })

            setPriceTrends(parsedPriceTrends.concat(todayPriceTrend));
        }
    }, [priceTrendsLoading])

    useEffect(() => {
        if (!reviewTrendsLoading && reviewTrendsData) {

            const flattenedReviewTrends = reviewTrendsData.map(reviewTrend => {

                const flattenedReviewTrend = {
                    dateTime: new Date(reviewTrend.dateTime)
                }

                for (const [reviewType, count] of Object.entries(reviewTrend.counts)) {
                    flattenedReviewTrend[reviewType] = count;
                }

                return flattenedReviewTrend;
            })

            setReviewTrends(flattenedReviewTrends)
        }
    }, [reviewTrendsLoading])

    const formatXAxisTick = (dateString) => {
        return "";
    }

    const PriceTooltip = ({payload}) => {

        if (payload.length === 0) {
            return null;
        }

        const data = payload[0].payload;

        return (
            <div className="price-tooltip tooltip-container">
                <div>{data.dateTime.toFormat("YYYY-MM-DD")}</div>
                <div>{`${DICTIONARY.price} ${data.price.toFixed(2)}€`}</div>
            </div>
        )
    }

    const ReviewTooltip = ({payload}) => {

        if (!payload) {
            return null
        }

        if (payload.length === 0) {
            return null;
        }

        const reviewTrend = payload[0].payload;

        return (
            <div className="review-tooltip tooltip-container">
                <div className="date">{reviewTrend.dateTime.toFormat("YYYY-MM-DD")}</div>
                <div className="recommended">{`${DICTIONARY.recommended} ${reviewTrend.RECOMMENDED}`}</div>
                <div className="not-recommended">{`${DICTIONARY.notRecommended} ${reviewTrend.NOT_RECOMMENDED}`}</div>
                <div className="cant-find">{`${DICTIONARY.cantFind} ${reviewTrend.CANT_FIND}`}</div>
                <div className="not-vegan">{`${DICTIONARY.notVegan} ${reviewTrend.NOT_VEGAN}`}</div>
            </div>
        )
    }

    return (
        <FormContainer handleOnClose={onClose} title={DICTIONARY.productDetails}>
            <div className="product-details-form-container">
                <div className="product-details-container">
                    <img src={product.imageUrl} alt={DICTIONARY.productPhoto}/>
                    <div className="product-information">
                        <div className="text big">{product.name}</div>
                        <div className="text small">{product.producer}</div>
                        <div className="text">{product.price}€</div>
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
                                // margin={{
                                //     top: 5,
                                //     right: 30,
                                //     left: 20,
                                //     bottom: 5,
                                // }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <YAxis stroke="#ffffff"/>
                                <XAxis dataKey="dateTime" stroke="#ffffff" angle={-45} tickFormatter={formatXAxisTick}/>
                                <Tooltip content={<PriceTooltip/>}/>
                                <Legend/>
                                <Line type="monotone" dataKey="price" name={`${DICTIONARY.price} €`} stroke="#ffffff"
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
                                // margin={{
                                //     top: 20,
                                //     right: 30,
                                //     left: 20,
                                //     bottom: 5,
                                // }}
                            >
                                <XAxis dataKey="name" stroke="#ffffff"/>
                                <YAxis stroke="#ffffff"/>
                                <Tooltip content={<ReviewTooltip/>}/>
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
