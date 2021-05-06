import React, {useEffect, useState} from 'react';

import "./TrendsPage.less";
import {useDictionary} from "../../config/dictionary.jsx";
import {API} from "../../config/axiosConfig.jsx";
import Header from "./Header.jsx";
import "date-utils";
import {toast} from "react-toastify";
import InfiniteScroll from 'react-infinite-scroll-component';
import {ArraysState} from "../../utils/utils.jsx";

const TrendsPage = () => {
    const {DICTIONARY} = useDictionary();

    const [productsTrends, setProductsTrends] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(0);

    const [fromDate, setFromDate] = useState(Date.today().add({months: -1}).toFormat("YYYY-MM-DD"))
    const [{data: productsTrendsData, loading: productsTrendsLoading, error: productsTrendsError}, executeProductsTrends] = API.useDiscoverVeganApiAxios(
        {
            url: `/api/trend/products`,
            method: 'GET',
            params: {
                fromDate: fromDate,
                pageToken: nextPageToken,
                pageSize: 20
            }
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
            toast.error(DICTIONARY.somethingBadHappenedPleaseTryAgainLater);
        }

        if (!productsTrendsLoading && productsTrendsData) {
            ArraysState.add(setProductsTrends, productsTrendsData.trends);
            setNextPageToken(productsTrendsData.nextPageToken)
        }
    }, [productsTrendsLoading])

    const ProductsTrendRow = (productsTrend) => {
        const product = productsTrend.product;
        const searchCount = productsTrend.searchCount;

        const handleOnProductsTrendClick = () => {
            console.log(product.productId)
        }

        return (
            <div className="product-trend-row"
                 key={productsTrend.product.productId}>
                <div className="product-name-column">{product.name}</div>
                <div className="search-count-column">{searchCount}</div>
            </div>
        );
    }

    const Loader = () => {
        return <p className="loading-message">{`${DICTIONARY.loading}...`}</p>;
    }

    const EndMessage = () => {
        return (
            <p className="end-message">
                {`${DICTIONARY.end}...`}
            </p>
        )
    }

    return (
        <div className="trends-page">
            <Header/>
            <div className="page-body">
                <div className="products-trends-container">
                    <div className="container-headers">
                        <div className="product-name-column">{DICTIONARY.productName}</div>
                        <div className="search-count-column">{DICTIONARY.searchCount}</div>
                    </div>
                    <div id="infinite-scroll-container">
                        <InfiniteScroll
                            dataLength={productsTrends.length}
                            next={fetchTrends}
                            hasMore={nextPageToken}
                            loader={<Loader/>}
                            scrollableTarget="products-trends-container"
                            endMessage={<EndMessage/>}
                        >
                            {productsTrends.map(ProductsTrendRow)}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendsPage;
