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
            url: `/api/trend/${product?.productId}/search`,
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
            setSearchRequests(productSearchRequestsData)
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

    const formatXAxisTick = (dateString) => {
        const daysBetween = fromDate.getDaysBetween(toDate);

        const date = new Date(dateString);
        if (daysBetween >= 30) {
            return date.toFormat("YYYY-MM-DD")
        } else if (daysBetween >= 2) {
            return date.toFormat("MM-DD")
        } else {
            return date.toFormat("DD HH24") + "h"
        }
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
                    <XAxis dataKey="dateTime" stroke="#ffffff" angle={-45} tickFormatter={formatXAxisTick}/>
                    <YAxis stroke="#ffffff"/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="count" name={DICTIONARY.searchCount} stroke="#000000"
                          activeDot={{r: 8}} strokeWidth={3}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProductTrendAnalysis;
