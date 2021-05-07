import React, {useEffect, useState} from 'react';

import "date-utils";
import "./ProductTrendAnalysis.less"
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {API} from "../../config/axiosConfig.jsx";
import {useDictionary} from "../../config/dictionary.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";


const ProductTrendAnalysis = (props) => {
    const {product, fromDate, toDate} = props;

    const {DICTIONARY} = useDictionary();

    const [searchRequests, setSearchRequests] = useState([])

    const [{data: productSearchRequestsData, loading: productSearchRequestsLoading, error: productSearchRequestsError}, executeProductSearchRequests] = API.useDiscoverVeganApiAxios(
        {
            url: `/api/trend/product/${product?.productId}/search`,
            method: 'GET',
            params: {
                fromDate: fromDate.toFormat("YYYY-MM-DD"),
                toDate: toDate.toFormat("YYYY-MM-DD"),
                stepCount: 20
            }
        }, {manual: true}
    )

    useEffect(() => {
        if (product) {
            executeProductSearchRequests()
        }
    }, [product, fromDate, toDate])

    useEffect(() => {
        if (!productSearchRequestsLoading && productSearchRequestsData) {

            const parsedProductSearchRequests = productSearchRequestsData.map(searchRequests => {
                return {
                    dateTime: new Date(searchRequests.dateTime),
                    count: searchRequests.count
                }
            })

            setSearchRequests(parsedProductSearchRequests)
        }
    }, [productSearchRequestsLoading])

    if (productSearchRequestsLoading) {
        return (
            <div className="no-product-selected"><CircularProgress/></div>
        )
    }

    if (!product) {
        return (
            <div className="no-product-selected">{DICTIONARY.selectProduct}</div>
        )
    }

    const formatDateTime = (dateTime) => {
        const daysBetween = fromDate.getDaysBetween(toDate);

        if (daysBetween >= 30) {
            return dateTime.toFormat("YYYY-MM-DD")
        } else if (daysBetween >= 2) {
            return dateTime.toFormat("MM-DD")
        } else {
            return dateTime.toFormat("DD HH24") + "h"
        }
    }

    const PriceTooltip = ({payload}) => {

        if (payload.length === 0) {
            return null;
        }

        const data = payload[0].payload;

        return (
            <div className="tooltip-container">
                <div>{data.dateTime.toFormat("YYYY-MM-DD HH24:MM")}</div>
                <div>{`${DICTIONARY.searchCount} ${data.count}`}</div>
            </div>
        )
    }

    return (
        <div className="product-trend-analysis">
            <div className="title">{`${DICTIONARY.interestInProduct} ${product.name}`}</div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={searchRequests}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="dateTime" stroke="#ffffff" angle={-45} tickFormatter={formatDateTime}/>
                    <YAxis stroke="#ffffff"/>
                    <Tooltip content={<PriceTooltip/>}/>
                    <Legend/>
                    <Line type="monotone" dataKey="count" name={DICTIONARY.searchCount} stroke="#ffffff"
                          activeDot={{r: 8}} strokeWidth={3}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProductTrendAnalysis;
