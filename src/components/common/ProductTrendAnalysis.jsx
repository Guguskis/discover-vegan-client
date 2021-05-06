import React, {useEffect, useState} from 'react';

import "date-utils";
import "./ProductTrendAnalysis.less"
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import Tooltip from "@material-ui/core/Tooltip";
import {API} from "../../config/axiosConfig.jsx";


const ProductTrendAnalysis = (props) => {
    const {product} = props;

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
        <div className="product-trend-analysis">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="pv" stroke="#000000" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="uv" stroke="#ffffff"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProductTrendAnalysis;
