import React, {useEffect, useState} from 'react';

import "./TrendsPage.less";
import {useDictionary} from "../../config/dictionary.jsx";
import {API} from "../../config/axiosConfig.jsx";
import Header from "./Header.jsx";
import "date-utils";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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

    const getProductsTrendItem = (productsTrend) => {
        const product = productsTrend.product;
        const searchCount = productsTrend.searchCount;

        return (
            <ListItem button key={product.productId} className="product-trend-item">
                <ListItemText primary={product.name} className="product-name"/>
                <ListItemText primary={searchCount} className="search-count"/>
            </ListItem>
        );
    }

    return (
        <div className="trends-page">
            <Header/>
            <div className="page-body">
                <List component="nav" className="products-trends-list">
                    {productsTrends.trends.map(getProductsTrendItem)}
                </List>
            </div>
        </div>
    );
};

export default TrendsPage;
