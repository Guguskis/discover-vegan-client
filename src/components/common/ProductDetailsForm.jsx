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

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

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
                    <div className="reviews-details-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
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
                                <Bar dataKey="pv" stackId="a" fill="#8884d8"/>
                                <Bar dataKey="uv" stackId="a" fill="#82ca9d"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </FormContainer>
    );
};

export default ProductDetailsForm;
