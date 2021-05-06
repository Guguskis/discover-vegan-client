import React, {useEffect, useState} from 'react';

import "date-utils";
import "./ProductTrendAnalysis.less"
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import Tooltip from "@material-ui/core/Tooltip";
import {API} from "../../config/axiosConfig.jsx";
import {useDictionary} from "../../config/dictionary.jsx";
import CircularProgress from "@material-ui/core/CircularProgress";


const ProductTrendAnalysis = (props) => {
    const {product} = props;

    const {DICTIONARY} = useDictionary();

    const [fromDate, setFromDate] = useState(Date.today().add({days: -3}))
    const [toDate, setToDate] = useState(Date.today())
    const [searchRequests, setSearchRequests] = useState([])

    const [{data: productSearchRequestsData, loading: productSearchRequestsLoading, error: productSearchRequestsError}, executeProductSearchRequests] = API.useDiscoverVeganApiAxios(
        {
            url: `/api/trend/${product?.productId}`,
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
    }, [product])

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

    return (
        <div className="product-trend-analysis">
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
                    <XAxis dataKey="dateTime" stroke="#ffffff" rotate={-45}/>
                    <YAxis stroke="#ffffff"/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="count" stroke="#000000" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProductTrendAnalysis;
