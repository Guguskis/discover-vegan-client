import React, {useEffect, useState} from 'react';

import "./TrendsPage.less";
import {useDictionary} from "../../config/dictionary.jsx";
import {API} from "../../config/axiosConfig.jsx";
import Header from "./Header.jsx";
import "date-utils";
import {toast} from "react-toastify";
import InfiniteScroll from 'react-infinite-scroll-component';
import {ArraysState} from "../../utils/utils.jsx";
import ProductSearchBar from "../common/ProductSearchBar.jsx";
import {KeyboardDatePicker} from '@material-ui/pickers';
import SortingToggle from "../common/SortingToggle.jsx";
import ProductTrendAnalysis from "../common/ProductTrendAnalysis.jsx";


const TrendsPage = () => {
    const {DICTIONARY} = useDictionary();

    const [productsTrends, setProductsTrends] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState();
    const [sortDirection, setSortDirection] = useState("DESC")

    const [fromDate, setFromDate] = useState(Date.today().add({months: -1}))
    const [toDate, setToDate] = useState(Date.today().add({days: 1}))

    const [{data: productsTrendsData, loading: productsTrendsLoading, error: productsTrendsError}, executeProductsTrends] = API.useDiscoverVeganApiAxios(
        {
            url: `/api/trend/products`,
            method: 'GET',
            params: {
                fromDate: fromDate.toFormat("YYYY-MM-DD"),
                toDate: toDate.toFormat("YYYY-MM-DD"),
                pageToken: nextPageToken,
                pageSize: 20,
                sortDirection: sortDirection
            }
        }, {manual: true}
    )

    const fetchTrends = () => {
        executeProductsTrends({...productsTrendsData})
    }

    useEffect(() => {
        fetchTrends();
    }, [])

    useEffect(() => {
        setProductsTrends([])
        fetchTrends();
    }, [fromDate, toDate, sortDirection])

    useEffect(() => {
        if (productsTrendsError) {
            toast.error(DICTIONARY.somethingBadHappenedPleaseTryAgainLater);
        }

        if (!productsTrendsLoading && productsTrendsData) {
            ArraysState.add(setProductsTrends, productsTrendsData.trends);
            setNextPageToken(productsTrendsData.nextPageToken)
        }
    }, [productsTrendsLoading])

    const onClickHandleSortDirection = (direction) => {
        setSortDirection(direction)
        setNextPageToken(0)
    }

    const ProductsTrendRow = (productsTrend) => {
        const product = productsTrend.product;
        const searchCount = productsTrend.searchCount;

        const handleOnProductsTrendClick = () => {
            setSelectedProduct(product)
        }

        return (
            <div className="product-trend-row"
                 key={productsTrend.product.productId}
                 onClick={handleOnProductsTrendClick}>
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
                <div className="product-selection-container">
                    <ProductSearchBar handleOnProductSelect={setSelectedProduct}/>
                    <div className="filtering-container">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy/MM/dd"
                            margin="normal"
                            id="date-picker-inline"
                            label={DICTIONARY.from}
                            value={fromDate}
                            onChange={setFromDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy/MM/dd"
                            margin="normal"
                            id="date-picker-inline"
                            label={DICTIONARY.to}
                            value={toDate}
                            onChange={setToDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <SortingToggle setSortingValue={onClickHandleSortDirection}/>
                    </div>
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
                <ProductTrendAnalysis product={selectedProduct} fromDate={fromDate} toDate={toDate}/>
            </div>
        </div>
    );
};

export default TrendsPage;
