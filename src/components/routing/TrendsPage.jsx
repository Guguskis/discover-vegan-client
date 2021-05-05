import React, {useEffect, useState} from 'react';

import "./TrendsPage.less";
import {useDictionary} from "../../config/dictionary.jsx";
import {API} from "../../config/axiosConfig.jsx";
import Header from "./Header.jsx";
import "date-utils";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const TrendsPage = () => {
    const {DICTIONARY} = useDictionary();

    const [productsTrends, setProductsTrends] = useState({trends: []});
    const [fromDate, setFromDate] = useState(Date.today().add({months: -1}).toFormat("YYYY-MM-DD"))

    const [{data: productsTrendsData, loading: productsTrendsLoading, error: productsTrendsError}, executeProductsTrends] = API.useDiscoverVeganApiAxios(
        {
            url: `/api/trend/products`,
            method: 'GET',
            params: {fromDate: fromDate}
        }, {manual: true}
    )

    const fetchTrends = () => {
        executeProductsTrends({...productsTrendsData})
    }

    useEffect(() => {
        fetchTrends()
    }, [])

    useEffect(() => {
        if (productsTrendsError) {
            console.log(productsTrendsError)
        }

        if (productsTrendsData) {
            console.log(productsTrendsData)
            setProductsTrends(productsTrendsData);
        }
    }, [productsTrendsData])

    const getProductsTrendRow = (productsTrend) => {
        const product = productsTrend.product;
        const searchCount = productsTrend.searchCount;

        const handleOnProductsTrendClick = () => {
            console.log(product.productId)
        }

        return (
            <TableRow key={product.productId} hover onClick={handleOnProductsTrendClick}>
                <TableCell component="th" scope="row">{product.name}</TableCell>
                <TableCell align="right">{searchCount}</TableCell>
            </TableRow>
        );
    }

    return (
        <div className="trends-page">
            <Header/>
            <div className="page-body">
                <TableContainer component={Paper} className="products-trends-table">
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>{DICTIONARY.productName}</TableCell>
                                <TableCell align="right">{DICTIONARY.searchCount}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productsTrends.trends.map(getProductsTrendRow)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default TrendsPage;
